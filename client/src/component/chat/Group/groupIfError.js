import { useState } from "react";
import api from "../../../interceptors/axios";
import { useParams } from "react-router-dom";

function GroupÍfError(props) {
  const [isRequestedToJoin, setIsRequestedToJoin] = useState(
    props.error.requested
  );
  const message = props.error.message;

  const { groupId } = useParams();

  async function RequestToJoin() {
    try {
      const result = await api.put("/chat/requestToJoin", { groupId });
      if (result.status === 200) {
        setIsRequestedToJoin(!isRequestedToJoin);
      } else {
        console.log(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {message}
      <br />
      {isRequestedToJoin ? (
        <>
          <p>You have already requested to join this group</p>
          <button onClick={RequestToJoin}>Dlete Request</button>
        </>
      ) : (
        <button onClick={RequestToJoin}>Request to Join</button>
      )}
    </>
  );
}

export default GroupÍfError;
