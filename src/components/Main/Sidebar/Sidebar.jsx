import { useContext, useState } from "react";
import { MdMenu } from "react-icons/md";
import { TiEdit } from "react-icons/ti";
import { IoSettingsOutline } from "react-icons/io5";
import clsx from "clsx"; // Optional: for clean conditional classnames (install with `npm i clsx`)
import { Context } from "../../../context/context";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt); // Update the recent prompt state
    await onSent(prompt); // Send the prompt and get the result
  };

  return (
    <div
      className={clsx(
        "h-screen flex flex-col justify-between bg-[#1E1E1E] text-white shadow-md transition-all duration-300 ",
        isExpanded ? "w-64" : "w-16"
      )}
    >
      {/* Top Section */}
      <div>
        {/* Menu Icon */}
        <div
          className="p-4 hover:bg-[#2A2A2A] rounded-full cursor-pointer w-fit"
          onClick={toggleSidebar}
        >
          <MdMenu className="text-2xl" />
        </div>

        {/* New Chat */}
        <div className="flex items-center space-x-2 p-4 hover:bg-[#2A2A2A] cursor-pointer">
          <TiEdit className="text-xl" />
          {isExpanded && (
            <p onClick={() => newChat()} className="text-sm">
              New chat
            </p>
          )}
        </div>

        {/* Divider */}
        {isExpanded && <div className="border-t border-gray-700 my-2" />}

        {/* Recent */}
        {isExpanded && (
          <>
            <div className="px-4 py-2 text-xs text-gray-400 uppercase">
              Recent
            </div>
            {prevPrompts.length > 0 ? (
              prevPrompts.map((item, index) => (
                <div
                  key={index}
                  onClick={() => loadPrompt(item)}
                  className="px-4 py-2 text-sm text-gray-200 italic bg-gray-800 p-2 rounded-full mb-3 cursor-pointer hover:bg-gray-700"
                >
                  {item.slice(0, 18)}...
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-400">No recent prompts</div>
            )}
          </>
        )}
      </div>

      {/* Bottom Section */}
      <div className="p-4 hover:bg-[#2A2A2A] cursor-pointer flex items-center space-x-2">
        <IoSettingsOutline className="text-xl" />
        {isExpanded && <p className="text-sm">Settings & Help</p>}
      </div>
    </div>
  );
};

export default Sidebar;
