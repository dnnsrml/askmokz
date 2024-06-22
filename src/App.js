import React, { useRef, useEffect } from "react";
import useMessageHandler from "./hooks/useMessageHandler";
import AutoResizeTextArea from "./components/AutoResizeTextArea";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import avatar from "./images/ava1.png";

function App() {
  const { conversation, addMessage, resetConversation } = useMessageHandler();
  const conversationRef = useRef(null);

  const handleAddMessage = (message) => {
    if (message.trim()) {
      addMessage({ role: "user", content: message });
    }
  };

  const handleNewChat = () => {
    resetConversation();
  };

  useEffect(() => {
    // Scroll to the bottom whenever the conversation updates
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="flex-col full-width full-height spaced-between">
      <div
        style={{ overflowY: "auto", flex: 1 }}
        className="flex-col ph30"
        ref={conversationRef}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "white",
            zIndex: 10,
            padding: "30px 0", // Optional: adjust as needed
          }}
          className="flex-row spaced-between aligned-items pb30"
        >
          <div className="flex-row aligned-items">
            <img className="avatar" src={avatar} alt="avatar" />
            <p style={{ fontSize: "1.5rem" }} className="normal-text-color">
              <span
                className="weight-bold normal-text-color"
                style={{ fontSize: "1.5rem" }}
              >
                ASK
              </span>
              MOKZ
            </p>
          </div>

          <div className="flex-col">
            <FontAwesomeIcon
              icon={faEdit}
              className="cogwheel"
              onClick={handleNewChat}
            />
          </div>
        </div>

        <div className="flex-col">
          {conversation.map((msg, index) => (
            <p
              className={msg.role === "user" ? "user" : "bot"}
              key={index}
              dangerouslySetInnerHTML={{
                __html: msg.content.replace(/\n/g, "<br />"),
              }}
            ></p>
          ))}
        </div>
      </div>

      <div className="flex-col full-width aligned-items justified-center">
        <AutoResizeTextArea
          id="autoResizeTextArea"
          onSubmit={handleAddMessage}
        />
      </div>
    </div>
  );
}

export default App;
