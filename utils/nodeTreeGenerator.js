const Agent = require("../models/agents");

const buildNode = async (memberId) => {
  const member = await Agent.findOne({ memberId })
    .populate("children.registrationId")
    .exec();

  if (!member) {
    return null;
  }

  const maxChildren = 5;

  const children = await Promise.all(
    member.children.map(async (child) => await buildNode(child.memberId))
  );

  for (let i = children.length; i < maxChildren; i++) {
    children.push({ name: "Add", isAddButton: true, parentId: memberId });
  }

  return {
    name: member.memberId,
    user: member.name,
    joiningDate: member.createdAt,
    phoneNumber: member.phoneNumber,
    sponsorId: member.sponsorId,
    sponsorName: member.sponsorName,
    level: member.applicantPlacementLevel,
    photoUrl: member.applicantPhoto,
    children,
  };
};

// sponsor tree

const sponserBuildNode = async (memberId) => {
  const member = await Agent.findOne({ memberId })
    .populate({
      path: "children.registrationId",
      select:
        "memberId name createdAt phoneNumber sponsorId sponsorName applicantPlacementLevel",
    })
    .exec();

  if (!member) {
    return null;
  }

  const children = member.children.map((child) => ({
    name: child.registrationId.memberId,
    user: child.registrationId.name,
    joiningDate: child.registrationId.createdAt,
    phoneNumber: child.registrationId.phoneNumber,
    sponsorId: child.registrationId.sponsorId,
    sponsorName: child.registrationId.sponsorName,
    level: child.registrationId.applicantPlacementLevel,
  }));

  return {
    name: member.memberId,
    user: member.name,
    joiningDate: member.createdAt,
    phoneNumber: member.phoneNumber,
    sponsorId: member.sponsorId,
    sponsorName: member.sponsorName,
    level: member.applicantPlacementLevel,
    children,
  };
};

const downlineBuildNode = async (memberId) => {
  const member = await Agent.findOne({ memberId })
    .populate({
      path: "children.registrationId",
      select:
        "memberId name createdAt phoneNumber sponsorId sponsorName applicantPlacementLevel applicantPhoto",
    })
    .exec();

  if (!member) {
    return null;
  }

  // Define max number of children a member can have
  const maxChildren = 5;

  const children = member.children.map((child) => ({
    name: child.registrationId.memberId,
    user: child.registrationId.name,
    joiningDate: child.registrationId.createdAt,
    phoneNumber: child.registrationId.phoneNumber,
    sponsorId: child.registrationId.sponsorId,
    sponsorName: child.registrationId.sponsorName,
    level: child.registrationId.applicantPlacementLevel,
    photoUrl: child.registrationId.applicantPhoto,
  }));

  // Add placeholders for "Add" buttons
  for (let i = children.length; i < maxChildren; i++) {
    children.push({ name: "Add", isAddButton: true });
  }

  return {
    name: member.memberId,
    user: member.name,
    joiningDate: member.createdAt,
    phoneNumber: member.phoneNumber,
    sponsorId: member.sponsorId,
    sponsorName: member.sponsorName,
    level: member.applicantPlacementLevel,
    photoUrl: member.applicantPhoto,
    children,
  };
};

// const userBuildNode = async (memberId, level = 0) => {
//   const member = await Agent.findOne({ memberId })
//     .populate("children.registrationId")
//     .exec();

//   if (!member) {
//     return null;
//   }

//   const maxChildren = 5;

//   // Recursively build children with incremented level
//   const children = await Promise.all(
//     member.children.map(async (child) => await userBuildNode(child.memberId, level + 1))
//   );

//   // Fill remaining child spots with "Add" button placeholders
//   for (let i = children.length; i < maxChildren; i++) {
//     children.push({ name: "Add", isAddButton: true, parentId: memberId });
//   }

//   // Return the built node with the current member data and children
//   return {
//     name: member.memberId,
//     user: member.name,
//     joiningDate: member.createdAt,
//     phoneNumber: member.phoneNumber,
//     sponsorId: member.sponsorId,
//     sponsorName: member.sponsorName,
//     level: level, // Current level of the member
//     photoUrl: member.applicantPhoto,
//     children, // Children with incremented levels
//   };
// };

const userBuildNode = async (memberId) => {
  const member = await Agent.findOne({ memberId })
    .populate("children.registrationId")
    .exec();

  if (!member) {
    return null;
  }

  const maxChildren = 5;

  // Direct children with their details
  const children = await Promise.all(
    member.children.map(async (child) => {
      const childDetails = await Agent.findOne({
        memberId: child.memberId,
      }).exec();
      return {
        name: childDetails.memberId,
        user: childDetails.name,
        phoneNumber: childDetails.phoneNumber,
        photoUrl: childDetails.applicantPhoto,
        isAddButton: false,
        level: childDetails.applicantPlacementLevel,
        joiningDate: childDetails.createdAt,
        sponsorId: childDetails.sponsorId,
        sponsorName: childDetails.sponsorName,
      };
    })
  );

  for (let i = children.length; i < maxChildren; i++) {
    children.push({ name: "Add", isAddButton: true, parentId: memberId });
  }

  return {
    name: member.memberId,
    user: member.name,
    joiningDate: member.createdAt,
    phoneNumber: member.phoneNumber,
    sponsorId: member.sponsorId,
    sponsorName: member.sponsorName,
    photoUrl: member.applicantPhoto,
    children,
  };
};

module.exports = {
  buildNode,
  sponserBuildNode,
  downlineBuildNode,
  userBuildNode,
};
