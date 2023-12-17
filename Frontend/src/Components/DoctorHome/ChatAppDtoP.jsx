// ChatComponent.js
import React, { useState, useEffect } from "react";
import { fetchPatients } from "./fetchChatDtoP";
import ChatBox from "./ChatBoxDtoP";

const ChatApp = () => {
  const [sender, setSender] = useState(sessionStorage.getItem("Username")); // Set the sender's username
  const [receiver, setReceiver] = useState(); // Set the receiver's username

  const [chatMessages, setChatMessages] = useState([]);

  const [isChatOpen, setChatOpen] = useState(false);

  const openChat = () => setChatOpen(true);
  const closeChat = () => setChatOpen(false);

  const d = fetchPatients();
  console.log(d);

  if (d) {
    return (
      <div>
        <div>
          {d.map((patient, index) => (
            <div key={index}>
              <a
                onClick={() => {
                  setReceiver(patient.Username);
                }}
              >
                <button
                  onClick={() => {
                    openChat();
                  }}
                ></button>
                {patient.Username}
              </a>
            </div>
          ))}
        </div>
        {isChatOpen ? (
          <ChatBox
            chatMessages={chatMessages}
            receiver={receiver}
            sender={sender}
          />
        ) : null}
      </div>
    );
  }
};

export default ChatApp;
