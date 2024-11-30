const User = require("../../models/User");
const Agent = require("../../models/agents");
const bcrypt = require("bcrypt");
const { STATUS_CODES, MESSAGES } = require("../../utils/constants");
const createError = require("../../utils/createError");
const {
  generateAccessToken,
  hashPassword,
  generateOtp,
} = require("../../utils/authUtils");
const Address = require("../../models/Address");

// REQUEST TO CREATE NEW ACCOUNT
exports.registerUser = async (req, res, next) => {
  const { name, email, phoneNumber, password } = req.body;

  try {
    const existingUser = await User.findOne({ phoneNumber });
    if (existingUser) {
      if (existingUser.isVerified) {
        return next(createError(STATUS_CODES.CONFLICT, MESSAGES.PHONE.TAKEN));
      }
    }
    if (existingUser) {
      const otp = await generateOtp();

      const hashedPassword = await hashPassword(password);

      existingUser.name = name;
      existingUser.email = email;
      existingUser.password = hashedPassword;
      existingUser.phoneNumber = phoneNumber;
      existingUser.otp = otp;
      (existingUser.otpExpires = Date.now() + 15 * 60 * 1000),
        await existingUser.save();

      return res
        .status(STATUS_CODES.SUCCESS)
        .json({ message: MESSAGES.OTP.SENT, otp: otp });
    }

    const otp = await generateOtp();
    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      phoneNumber,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 15 * 60 * 1000,
    });
    await user.save();

    res.status(STATUS_CODES.CREATED).json(otp);
  } catch (error) {
    next(error);
  }
};

// VERIFY OTP
exports.verifyOtp = async (req, res, next) => {
  const { phoneNumber, otp } = req.body;

  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: MESSAGES.USER.NOT_FOUND });
    }

    const isAgent = await Agent.findOne({ phoneNumber });

    if (user.otp !== otp) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: MESSAGES.OTP.INVALID });
    }

    if (Date.now() > user.otpExpires) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: MESSAGES.OTP.EXPIRED });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;

    if (isAgent) {
      if (isAgent.status === "Approved") {
        user.isMlmAgent = true;
        user.role = "MLM Agent";
        user.mlmId = isAgent.memberId;
      }
    }

    await user.save();

    const memberId = user.isMlmAgent && user.mlmId;

    res
      .status(STATUS_CODES.CREATED)
      .json({ message: MESSAGES.OTP.VERIFIED, memberId: memberId });
  } catch (error) {
    next(error);
  }
};

// RESEND OTP
exports.resendOtp = async (req, res, next) => {
  const { phoneNumber } = req.body;
  try {
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: MESSAGES.USER.NOT_FOUND });
    }

    if (user.isVerified) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ message: MESSAGES.USER.ALREADY_VERIFIED });
    }

    const otp = await generateOtp();

    user.otp = otp;
    user.otpExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: MESSAGES.OTP.SENT, otp: otp });
  } catch (error) {
    next(error);
  }
};

// CHECK PHONE NUMBER VERIFICATION
exports.checkPhoneNumberVerification = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;

    const user = await User.findOne({ phoneNumber, isVerified: true });

    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: MESSAGES.USER.NOT_FOUND });
    }

    res.status(STATUS_CODES.SUCCESS).json({
      message: "Verified",
      phoneNumber,
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN USING PASSWORD
exports.loginReqByPassword = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({ phoneNumber, isVerified: true });

    if (!user) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: MESSAGES.USER.NOT_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(STATUS_CODES.UNAUTHORIZED)
        .json({ message: MESSAGES.PASSWORD.INVALID });
    }

    const accessToken = await generateAccessToken(user);

    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict",
    });

    res.status(STATUS_CODES.SUCCESS).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

// OTP REQ TO LOGIN
exports.logReqByOtp = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ phoneNumber, isVerified: true });

    if (!user) {
      return next(createError(STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND));
    }

    const otp = await generateOtp();

    user.otp = otp;
    user.otpExpires = Date.now() + 1800000;

    await user.save();
    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: MESSAGES.OTP.SENT, otp: otp });
  } catch (error) {
    next(error);
  }
};

// VALIDATE OTP USER AND LOGIN
exports.validateAndLogin = async (req, res, next) => {
  try {
    const { phoneNumber, otp } = req.body;

    const user = await User.findOne({
      phoneNumber,
      otp,
      otpExpires: { $gt: Date.now() },
      isVerified: true,
    });

    if (!user) {
      return next(STATUS_CODES.NOT_FOUND, MESSAGES.OTP.INVALID);
    }

    const accessToken = await generateAccessToken(user);

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

// RESEND OTP FOR LOGIN
exports.resendLoginOtp = async (req, res, next) => {
  const { phoneNumber } = req.body;
  try {
    const user = await User.findOne({ phoneNumber, isVerified: true });

    if (!user) {
      return next(createError(STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND));
    }

    const otp = await generateOtp();

    user.otp = otp;
    user.otpExpires = Date.now() + 30 * 60 * 1000;

    await user.save();

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: MESSAGES.OTP.SENT, otp: otp });
  } catch (error) {
    next(error);
  }
};

// GENERATE OTP FOR FORGOT PASSWORD
exports.forgotPassword = async (req, res, next) => {
  try {
    const { phoneNumber } = req.body;

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return next(createError(STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND));
    }

    const otp = await generateOtp();

    user.otp = otp;
    user.otpExpires = Date.now() + 1800000;
    await user.save();

    res.status(STATUS_CODES.SUCCESS).json({ message: MESSAGES.OTP.SENT, otp });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// VERIFY OTP
exports.verifyforgotOtp = async (req, res, next) => {
  try {
    const { phoneNumber, otp } = req.body;

    const user = await User.findOne({
      phoneNumber,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(createError(STATUS_CODES.NOT_FOUND, MESSAGES.OTP.INVALID));
    }

    res.status(STATUS_CODES.SUCCESS).json({ message: MESSAGES.OTP.VERIFIED });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// RESET PASSWORD
exports.resetPassword = async (req, res, next) => {
  try {
    const { phoneNumber, otp, newPassword } = req.body;

    const user = await User.findOne({
      phoneNumber,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(STATUS_CODES.NOT_FOUND, MESSAGES.OTP.INVALID);
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();

    res.status(STATUS_CODES.SUCCESS).json({ message: MESSAGES.PASSWORD.RESET_SUCCESS });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

//GET USER
exports.getUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: MESSAGES.USER.NOT_FOUND });
    }

    const user = await User.findById(userId).select("name phoneNumber email");

    if (!user) {
      return next(createError(STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
// UPDATE USER
exports.updateUserDetails = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { name, phoneNumber, email } = req.body;

    if (!name && !phoneNumber && !email) {
      return next(
        createError(
          STATUS_CODES.BAD_REQUEST,
          "At least one field is required to update"
        )
      );
    }

    // Update user details
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phoneNumber, email },
      { new: true, runValidators: true }
    ).select("name phoneNumber email");

    if (!updatedUser) {
      return next(createError(STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND));
    }

    res.status(STATUS_CODES.SUCCESS).json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
// CREATE USER ADDRESS
exports.createAddress = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const newAddress = await Address.create({ userId, ...req.body });

    res
      .status(STATUS_CODES.CREATED)
      .json({ message: MESSAGES.ADDRESS.CREATED, newAddress });
  } catch (error) {
    next(error);
  }
};

// GET USER SPECIFIC ADDRESS
exports.getAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const { userId } = req.user;

    const address = await Address.findOne({ _id: addressId, userId });

    if (!address) {
      return next(
        createError(STATUS_CODES.NOT_FOUND, MESSAGES.ADDRESS.NOT_FOUND)
      );
    }

    res.status(STATUS_CODES.SUCCESS).json({ address });
  } catch (error) {
    next(error);
  }
};

// GET ALL ADDRESS OF USER
exports.getAddresses = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const addresses = await Address.find({ userId });
    if (!addresses.length) {
      return next(
        createError(STATUS_CODES.NOT_FOUND, MESSAGES.ADDRESS.NOT_FOUND)
      );
    }

    res.status(STATUS_CODES.SUCCESS).json({ addresses });
  } catch (error) {
    next(error);
  }
};

// UPDATE USER ADDRESS
exports.updateAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const { userId } = req.user;

    const existingAddress = await Address.findOne({ _id: addressId, userId });
    if (!existingAddress) {
      return next(
        createError(STATUS_CODES.NOT_FOUND, MESSAGES.ADDRESS.NOT_FOUND)
      );
    }

    Object.entries(req.body).forEach(([key, value]) => {
      if (value !== undefined) existingAddress[key] = value;
    });

    await existingAddress.save();

    res
      .status(STATUS_CODES.NOT_FOUND)
      .json({ message: MESSAGES.ADDRESS.UPDATED, existingAddress });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// DELETE ADDRESS
exports.deleteAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const { userId } = req.user;

    const existingAddress = await Address.findOne({ _id: addressId, userId });
    if (!existingAddress) {
      return next(
        createError(STATUS_CODES.NOT_FOUND, MESSAGES.ADDRESS.NOT_FOUND)
      );
    }

    await Address.deleteOne({ _id: addressId });

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: MESSAGES.ADDRESS.DELETED });
  } catch (error) {
    next(error);
  }
};
