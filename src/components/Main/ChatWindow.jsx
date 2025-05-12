import React, { useRef, useContext, useEffect } from "react";
import { Context } from "../../context/context";
import { IoSend } from "react-icons/io5";
import MessageBubble from "./MessageBubble";

const ChatWindow = () => {
  const {
    onSent,
    setInput,
    input,
    showResult,
    loading,
    resultData,
    recentPrompt,
  } = useContext(Context);

  const chatRef = useRef(null);

  const suggestedQuestions = [
    "What's the weather today?",
    "Tell me a joke",
    "How do I learn React?",
  ];

  const handleSuggestionClick = (question) => {
    setInput(question);
    onSent(question);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [resultData]);

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#121212]">
      {/* Header */}
      <p className="text-gray-900 dark:text-white pl-6 pt-5 text-2xl font-semibold">
        Vchat
      </p>

      {/* Chat Scroll Area */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-4 pb-[140px] sm:pb-[120px] scroll-smooth custom-scrollbar"
      >
        {!showResult ? (
          <div className="flex flex-wrap gap-2 mb-3 px-1 justify-center lg:m-70 lg:pl-30 ">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(question)}
                className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 text-sm transition-all"
              >
                {question}
              </button>
            ))}
          </div>
        ) : (
          <div className="px-2 py-4 max-w-full">
            <div className="mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Prompt:</p>
              <p className="text-base text-blue-600 dark:text-blue-400 font-medium break-words">
                {recentPrompt}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center mt-8">
                <div className="loader"></div>
              </div>
            ) : (
              <div
                className="text-md text-gray-800 dark:text-gray-100 whitespace-pre-line leading-relaxed break-words  w-full pb-32 px-2 "
                dangerouslySetInnerHTML={{ __html: resultData }}
              />
            )}
          </div>
        )}
      </div>

      {/* Bottom Fixed Input */}
      <div className="w-full fixed bottom-0  bg-white dark:bg-[#121212] px-4 py-3 z-50 border-t border-gray-300 dark:border-gray-700">
        <div className="flex items-center w-[300px] lg:w-3xl lg:mx-auto bg-gray-100 dark:bg-[#2a2a2a] rounded-full px-4 py-2 shadow-inner  ">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400  sm:w-[500px]"
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim()) {
                onSent(input.trim());
              }
            }}
          />
          <button
            onClick={() => input.trim() && onSent(input.trim())}
            className="ml-3 text-blue-600 dark:text-blue-400 hover:text-blue-800 transition-colors"
          >
            <IoSend className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
