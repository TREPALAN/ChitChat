function changesReducer(members, action) {
  switch (action.type) {
    case "setInitialMembers":
      return [];
    case "addMember":
      return [...members, { member: action.member, action: "add" }];

    case "cancelAddMember":
      return members.filter((member) => member.member !== action.menber);

    case "removeMember":
      return [...members, { member: action.menber, action: "remove" }];

    case "cancelRemoveMember":
      return members.filter((member) => member.member !== action.menber);

    default:
      return members;
  }
}

export default changesReducer;
