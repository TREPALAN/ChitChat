function UserCard({ id, username, profilePicture }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{username}</h5>
        <p className="card-text">{profilePicture}</p>
      </div>
    </div>
  );
}

export default UserCard;
