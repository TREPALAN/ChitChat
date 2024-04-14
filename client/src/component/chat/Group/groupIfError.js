const { useState } = require("react");
const { useParams } = require("react-router-dom");
const api = require("../../../interceptors/axios");

function GroupÍfError({ error }) {
  const [isRequestedToJoin, setIsRequestedToJoin] = useState(false);
  const { groupId } = useParams();

  async function RequestToJoin() {
    try {
      const result = await api.post("/chat/requestToJoinGroup/", {
        groupId,
      });
      if (result.status === 200) {
        setIsRequestedToJoin(true);
      } else {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {error}
      <br />
      {isRequestedToJoin ? (
        <p>You have already requested to join this group</p>
      ) : (
        <button onClick={RequestToJoin}>Request to Join</button>
      )}
    </>
  );
}

export default GroupÍfError;
