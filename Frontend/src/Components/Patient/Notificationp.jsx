import { useState, useEffect } from "react";
import axios from "axios";
import VideoCall from "../VideoCall";
import FilterModal from "../PatientHome/FilterModal";
function Notificationp() {
  const [notification, setNotification] = useState([]);
const [joiningCall,setJoiningCall]=useState(false);
const [sure,setSure]=useState(false);
const[message,setMessage]=useState("");
let p="";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const u = sessionStorage.getItem("Username");
        const response = await axios.get("http://localhost:3005/getNotification",{params:{patientUsername: u}
            
      });

        setNotification(Array.isArray(response.data.notifications) ? response.data.notifications : []);
      } catch (error) {
        console.error("Error fetching prescription data:", error);
      }
    };
    fetchData();
  }, []);

  const handleRemove = async () => {
    try {
      await axios.delete("http://localhost:3005/deleteNotification", {
        params: { message: message },
      });

      setSure(false);
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

          <button onClick={() => {setSure(true);setMessage(notification.Message)}}>Remove</button>
        </div>
      ))}
{sure && <FilterModal>
       <div className=" h-24  mb-4">
       <body>
          Are you sure you want to delete this notification?
        </body>
        <button onClick={() => handleRemove(notification.Patient_Username)}>
          Yes
        </button>
        <button
              onClick={() => {setSure(false);}}
            >
          No
        </button>
       </div>
        </FilterModal>}
      {/* Conditional rendering of VideoCall component */}
      {joiningCall && <VideoCall user={p} />}
    </div>
  );
}

export default Notificationp;
