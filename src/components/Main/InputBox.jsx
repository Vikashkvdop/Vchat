import React, { useState } from "react";
import { IoSend } from "react-icons/io5";

const InputBox = ({ onSend }) => {
  const [input, setInput] = useState();



  return (
    <div className="flex items-center   bg-gray-100 dark:bg-[#1E1E1E] rounded-full px-4 py-2 shadow-inner w-[600px]">
      <input
        type="text"
        className="flex-1 bg-transparent outline-none text-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 "
        placeholder="Ask anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        // onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button onClick={input} className="ml-3 text-blue-600 dark:text-blue-400">
        <IoSend className="text-xl" />
      </button>
    </div>
  );
};

export default InputBox;
