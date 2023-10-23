import axios from "axios";
import React, { useState } from "react";

export default function ChangePass() {
  const username = sessionStorage.getItem("Username");
  const [Edit, setEdit] = useState(false);
  const [Updated, setUpdated] = useState();
  const [Success, setSuccess] = useState(false);
  const [Failed, setFailed] = useState(false);
  const handleUpdate = async () => {
    const res = await axios.put("http://localhost:3001/updatePatient", {
      params: {
        Username: username,
        Password: Updated,
      },
    });
    if (res.data == "all good") {
      setSuccess(true);
    } else {
      setFailed(true);
    }
    setEdit(false);
  };
  return (
    <div>
      username: {username}
      <div>
        {!Edit ? (
          <button onClick={() => setEdit(true)}>Change password</button>
        ) : (
          <>
            <input type="text" onChange={(e) => setUpdated(e.target.value)} />
            <button onClick={() => handleUpdate()}>confirm</button>
          </>
        )}
      </div>
      <br />
      {Success && <p>Password updated successfully.</p>}
      {Failed && <p>an error happened.</p>}
    </div>
  );
}
