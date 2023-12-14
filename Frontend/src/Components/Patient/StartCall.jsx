import { useState, useEffect, useRef } from "react";
import VideoCall from "../VideoCall";
import axios from "axios";

function StartCall() {


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

    
   
    const patientUsername = sessionStorage.getItem("Username");
    const d = doctor.current.value;
    console.log(d);
  
    const notificationMessage = `Hello Dr ${d},  ${patientUsername} wants to start a video call with you at ${new Date().toLocaleString()}`;
    console.log(notificationMessage);
      try {
      await axios.post("http://localhost:3001/createNotification",{doctorUsername:d,message: notificationMessage}
        );
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
            />
          </label>
          <button type="submit">Start Call</button>
        </form>
      ) : (
        <VideoCall doctorusername={doctor.current.value} />
      )}
    </div>
  );
}

export default StartCall;
