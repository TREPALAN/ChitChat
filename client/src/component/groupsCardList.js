function GroupsCardList({ groups }) {
  return (
    <div className="card-group">
      {groups.map((group) => (
        <div
          className="card"
          style={{ width: "18rem", margin: "10px" }}
          key={group._id}
        >
          <div className="card-body">
            <h5 className="card-title">{group.name}</h5>
            <p className="card-text">{group.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GroupsCardList;
