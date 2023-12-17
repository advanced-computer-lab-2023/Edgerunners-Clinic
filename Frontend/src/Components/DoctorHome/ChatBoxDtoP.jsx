import React, { useState } from "react";
import axios from "axios";

const ChatBox = (props) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const fetchChatMessages = async () => {
    try {
      console.log(props.sender + " " + props.receiver);
      const response = await axios.get("http://localhost:3001/getChat", {
        params: {
          DoctorUsername: props.sender,
          PatientUsername: props.receiver,
        },
      });

      if (response.data.data) {
        setChatMessages(response.data.data.Messages);
      } else {
        console.error(response.data.message);
      }
      console.log(response.data.data.Messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  fetchChatMessages();

  const sendMessage = async (sender, receiver) => {
    try {
      console.log(sender);
      console.log(receiver);
      await axios.put("http://localhost:3001/sendChatDoctor", {
        DoctorUsername: props.sender,
        PatientUsername: props.receiver,
        message: message,
      });
      setMessage(""); // Clear the message input after sending
      fetchChatMessages(); // Refresh chat messages
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  console.log(chatMessages);

  return (
    <div>
      <div className="chat-header"></div>

      <div className="chat-content">
        {
          <>
            <div>
              <h2>Chat with {props.receiver}</h2>
              <div
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  height: "200px",
                  overflowY: "auto",
                }}
              >
                {chatMessages.length &&
                  chatMessages.map((chat, index) => (
                    <div key={index}>{chat}</div>
                  ))}
              </div>
            </div>
            <div>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                onClick={() => {
                  sendMessage(props.sender, props.receiver);
                }}
              >
                Send
              </button>
            </div>
          </>
        }
      </div>

      {/* Close chat button */}
      {<button className="close-button">Close</button>}
    </div>
  );
};

export default ChatBox;
