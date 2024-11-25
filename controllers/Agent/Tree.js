const User = require("../../models/login");
const Agent = require("../../models/agents");
const {userBuildNode } = require("../../utils/nodeTreeGenerator");

const userTree = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId).select("registrationId");

    if (!user) {
      return res.status(400).json("User not found");
    }

    const agent = await Agent.findById(user.registrationId).select("memberId");

    const treeData = await userBuildNode(agent.memberId);
    if (!treeData) {
      return res.status(404).json({ error: "Member not found" });
    }
    res.status(200).json(treeData);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { userTree };
