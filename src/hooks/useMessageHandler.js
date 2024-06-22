import { useState } from "react";
import axios from "axios";

const useMessageHandler = () => {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetConversation = () => {
    setConversation([]);
  };

  const addMessage = async (message) => {
    setConversation((prevConversation) => [...prevConversation, message]);

    // Make the API call only if the message role is 'user'
    if (message.role === "user") {
      setLoading(true);
      setError(null);

      // Limit the conversation history to the last 5 messages
      const limitedConversation = [...conversation, message].slice(-4);

      try {
        const result = await axios.post(
          `${process.env.REACT_APP_ROOT_URL}/api/openai`,
          {
            messages: limitedConversation,
          }
        );

        const botMessage = {
          role: "assistant",
          content: result.data.choices[0].message.content,
        };
        setConversation((prevConversation) => [
          ...prevConversation,
          botMessage,
        ]);
      } catch (err) {
        setError(err.message);
        console.error("Error making the API request:", err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return { conversation, addMessage, error, loading, resetConversation };
};

export default useMessageHandler;
