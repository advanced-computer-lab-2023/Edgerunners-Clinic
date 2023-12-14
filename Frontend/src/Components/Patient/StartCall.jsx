import { useState, useEffect, useRef } from "react";
import VideoCall from "../VideoCall";
import axios from "axios";

function StartCall() {
  const [doctorusername, setdoctorUsername] = useState("");
  const [isCallStarted, setIsCallStarted] = useState(false);
  const videoCallRef = useRef();
  const doctor = useRef();
  const handleCallStart = () => {
    // Perform any necessary actions before starting the call
    setIsCallStarted(true);
  };

  useEffect(() => {
    return () => {
      setIsCallStarted(false);
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const doctorusername = doctor.current.value;
    const patientUsername = sessionStorage.getItem("Username");
    const notificationMessage = `Hello Dr ${doctorusername},  ${patientUsername} wants to start a video call with you at ${new Date().toLocaleString()}`;
    try {
      await axios.post("http://localhost:3001/createNotification", {
        params: {
          doctorUsername: doctorusername,
          message: notificationMessage,
        },
      });
    } catch (error) {
      console.error("Error removing notification:", error);
    }

    handleCallStart();
  };

  return (
    <div>
      <h1>Choose Your Doctor</h1>
      {!isCallStarted ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Doctor Username:
            <input
              type="text"
              ref={doctor}
              onChange={(e) => setdoctorUsername(e.target.value)}
            />
          </label>
          <button type="submit">Start Call</button>
        </form>
      ) : (
        <VideoCall doctorusername={videoCallRef.current} />
      )}
    </div>
  );
}

export default StartCall;
