function MembersReducerLogic({ member, changes, setChanges }) {
  return changes.some((change) => change.member._id === member._id) ? (
    changes.filter((change) => change.member._id === member._id)[0].action ===
    "add" ? (
      <button
        type="button"
        onClick={() => setChanges({ type: "cancelAddMember", menber: member })}
      >
        Cancel
      </button>
    ) : (
      <button
        type="button"
        onClick={() =>
          setChanges({
            type: "cancelRemoveMember",
            menber: member,
          })
        }
      >
        Cancel
      </button>
    )
  ) : (
    <button
      type="button"
      onClick={() => setChanges({ type: "addMember", menber: member })}
    >
      Add
    </button>
  );
}

export default MembersReducerLogic;
