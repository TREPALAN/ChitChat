function GroupCard({ id, name, description, members, admin }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">
          Admin: <strong>{admin}</strong>
        </p>
        <p className="card-text">
          Members: <strong>{members}</strong>
        </p>
        <a href={`/groupChat/${id}`} className="btn btn-primary">
          Enter Group
        </a>
      </div>
    </div>
  );
}

export default GroupCard;
