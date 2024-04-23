import checkSquareFillGreen from "../../../icons/checkSquareFillGreen.svg";
import squareFillRed from "../../../icons/squareFillRed.svg";

function MembersReducerLogic({ member, changes, setChanges }) {
  return changes.some((change) => change.member._id === member._id) ? (
    changes.filter((change) => change.member._id === member._id)[0].action ===
    "add" ? (
      <>
        <img
          src={squareFillRed}
          onClick={() =>
            setChanges({ type: "cancelAddMember", menber: member })
          }
          alt="Cancel"
          title="Cancel"
        />
        Cancel
      </>
    ) : (
      <>
        <img
          src={squareFillRed}
          title="Remove"
          alt="Remove"
          onClick={() =>
            setChanges({
              type: "cancelRemoveMember",
              menber: member,
            })
          }
        />
        Cancel
      </>
    )
  ) : (
    <>
      <img
        src={checkSquareFillGreen}
        onClick={() => setChanges({ type: "addMember", menber: member })}
        title="Add"
        alt="Add"
      />
      Add
    </>
  );
}

export default MembersReducerLogic;
