const router = require("express").Router();
const UserController = require("../../controllers/ecommerce/user.controllers");
const { authenticateToken } = require("../../utils/jwt");
 

// CREATE NEW LOGIN ACCOUNT
router.post("/register-request", UserController.registerUser);
router.post("/verify-otp", UserController.verifyOtp);
router.post("/login", UserController.loginReqByPassword);
// LOGIN USING OTP
router.post("/req-login-otp", UserController.logReqByOtp);
router.post("/login-by-otp", UserController.validateAndLogin);
// FORGOT PASSWORD AND RESET
router.post("/forget-password", UserController.forgotPassword);
router.post("/reset-password", UserController.resetPassword);
// GET USER INFORMATION
router.get("/details",authenticateToken,UserController.getUserDetails);
router.put("/update",authenticateToken,UserController.updateUserDetails);
// USER ADDRESS (CRUD)
router.post("/address", authenticateToken, UserController.createAddress);
// GET SPECIFIC ADDRESS BY ID
router.get("/address/:addressId", authenticateToken, UserController.getAddress);
// GET ARRAY OF ADDRESS UNDER USER
router.get("/address", authenticateToken,UserController.getAddresses);
// UPDATE USER ADDRESS
router.put("/address/:addressId", authenticateToken,UserController.updateAddress);
// DELETE
router.delete("/address/:addressId", authenticateToken,UserController.deleteAddress);



module.exports = router;
