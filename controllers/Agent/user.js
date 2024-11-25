const User = require("../../models/login");
const Agent = require("../../models/agents");

const userDashboard = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId).select("registrationId");

    if (!user) {
      return res.status(400).json("User not found");
    }

    const agent = await Agent.findById(user.registrationId)
      .select(
        "name sponsorId sponsorName applicantPlacementLevel placementId treeName memberId phoneNumber sponsorName"
      )
      .populate({
        path: "sponsoredChildren",
        select: "memberId registrationId",
        populate: {
          path: "registrationId",
          model: "Agent",
          select: "name applicantPhoto",
        },
      });

    if (!agent) {
      return res.status(400).json("Agent registration not found");
    }

    res.status(200).json(agent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { userDashboard };