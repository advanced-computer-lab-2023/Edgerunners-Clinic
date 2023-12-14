import { useState, useEffect } from "react";
import axios from "axios";
import VideoCall from "../VideoCall";

function Notificationp() {
  const [notification, setNotification] = useState([]);
const [joiningCall,setJoiningCall]=useState(false);
let p="";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const u = sessionStorage.getItem("Username");
        const response = await axios.get("http://localhost:3001/getNotification", {
          params: {
            patientUsername: u,
          },
        });

        setNotification(Array.isArray(response.data.notifications) ? response.data.notifications : []);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };
    fetchData();
  }, []);

  const handleRemove = async (message) => {
    try {
      await axios.delete("http://localhost:3001/deleteNotification", {
        params: { message: message },
      });

      // Remove the deleted notification from the state
      setNotification((prevNotifications) =>
        prevNotifications.filter((notification) => notification.Message !== message)
      );
    } catch (error) {
      console.error("Error removing notification:", error);
    }
  };
  const handleJoinCall = (message, doctorUsername) => {
    if (message.toLowerCase().includes("video call")) {
      setJoiningCall(true);
      p=doctorUsername; // Save Patient_Username for later use
    }
  };

  return (
    <div>
      {notification.map((notification) => (
        <div key={notification._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p>{notification.Message}</p>

          {notification.Message.toLowerCase().includes("video call") && (
            <button onClick={() => handleJoinCall(notification.Message)}>Join</button>
          )}

          <button onClick={() => handleRemove(notification.Message,notification.Doctor_Username)}>Remove</button>
        </div>
      ))}

      {/* Conditional rendering of VideoCall component */}
      {joiningCall && <VideoCall user={p} />}
    </div>
  );
}

export default Notificationp;
