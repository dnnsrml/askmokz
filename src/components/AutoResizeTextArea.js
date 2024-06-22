import React, { useRef, useState } from "react";

const AutoResizeTextArea = ({ id, onSubmit }) => {
  const textareaRef = useRef(null);
  const [value, setValue] = useState("");

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    handleInput();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      setValue(""); // Clear the textarea after submission
      textareaRef.current.style.height = "auto"; // Reset the height
    }
  };

  return (
    <form
      className="flex-col full-width aligned-items justified-center p30"
      onSubmit={handleSubmit}
    >
      <textarea
        id={id}
        ref={textareaRef}
        className="input-area auto-resize-textarea full-width p20"
        rows="1"
        value={value}
        placeholder="Ask me anything.."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
};

export default AutoResizeTextArea;
