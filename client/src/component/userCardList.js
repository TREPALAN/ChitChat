import UserCard from "./userCard";

function UserCardList({ users }) {
  return (
    <>
      {users &&
        users.map(
          ({
            _id,
            username,
            profilePicture,
            isFriend,
            isRequestSent,
            isRequestReceived,
          }) => (
            <UserCard
              key={_id}
              id={_id}
              username={username}
              profilePicture={profilePicture}
              isFriend={isFriend}
              isRequestSent={isRequestSent}
              isRequestReceived={isRequestReceived}
            />
          )
        )}
    </>
  );
}

export default UserCardList;
