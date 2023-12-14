import { useState, useEffect, useRef } from "react";
import VideoCall from "../VideoCall";
import axios from "axios";


function StartACall() {
  const [patientusername, setPatientUsername] = useState("");
  const [isCallStarted, setIsCallStarted] = useState(false);
  const patient = useRef();

  const handleCallStart = () => {
    // Perform any necessary actions before starting the call
    setIsCallStarted(true);
  };

  useEffect(() => {
    
    return () => {
      setIsCallStarted(false);
    };
  }, []);

  const handleFormSubmit =async (e) => {
    e.preventDefault();
    
   
  
    const p = patient.current.value;
    const doctorUsername = sessionStorage.getItem("Username");
    const notificationMessage = `Hello ${p}, Dr ${doctorUsername} wants to start a video call with you at ${new Date().toLocaleString()}`;
      try {
      await axios.post("http://localhost:3001/createNotification", {patientUsername:p,message: notificationMessage}
        
        
        );
        
      } catch (error) {
        console.error("Error removing notification:", error);
      }
      
    handleCallStart();
  };
 


  return (
    <div>
      <h1>Choose Your Patient</h1>
      {!isCallStarted ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Patient Username:
            <input
              type="text"
              ref={patient}
              onChange={(e) => setPatientUsername(e.target.value)}
            />
          </label>
          <button type="submit">Start Call</button>
        </form>
      ) : (
        <VideoCall user={patient.current.value} />
      )}
    </div>
  );
}


export default StartACall;
