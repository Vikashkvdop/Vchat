import { createContext, useState } from "react";
import main from "../config/vchat";

export const Context = createContext();

const ContextProvider = (props) => {

  const [input,setInput]=useState("");
  const [recentPrompt,setRecentPrompt]=useState("");
  const [prevPrompts,setPrevPrompts]=useState([]);
  const [showResult,setShowResult]=useState(false);
  const [loading,setLoading]=useState(false);
  const [resultData,setResultData]=useState("");


  const delayPara=(index,nextWord)=>{
    setTimeout(function(){
      setResultData(prev=>prev+nextWord);
    },75*index)
  }

  const newChat=()=>{
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
  setResultData(""); // clear existing result
  setLoading(true);
  setShowResult(true);
  
   let response;
  if (prompt !== undefined) {
    response = await main(prompt);
    setRecentPrompt(prompt); // Save the current prompt as the recent one
    setPrevPrompts((prev) => {
      const updatedPrev = [...prev, prompt]; // Add the prompt to the history
      console.log("Updated prevPrompts:", updatedPrev); // Log to check if the update is happening
      return updatedPrev;
    });
  } else {
    setPrevPrompts((prev) => {
      const updatedPrev = [...prev, prompt]; // Add the prompt to the history
      console.log("Updated prevPrompts:", updatedPrev); // Log to check if the update is happening
      return updatedPrev;
    });
    setRecentPrompt(prompt);
    response = await main(prompt);
  }


  

  // Initialize newResponse as an empty string to avoid "undefined"
  let newResponse = "";

  // Bold formatting with ** handling
  let responseArray = response.split("**");
  for (let i = 0; i < responseArray.length; i++) {
    if (i === 0 || i % 2 !== 1) {
      newResponse += responseArray[i];
    } else {
      newResponse += "<b>" + responseArray[i] + "</b>";
    }
  }

  // Line break handling
  let newResponseWithLineBreaks = newResponse.split("*").join("<br/>");

  // Typing effect word by word
  const newResponseArray = newResponseWithLineBreaks.split(" ");
  setResultData(""); // ensure resultData is reset before animation

  for (let i = 0; i < newResponseArray.length; i++) {
    const nextWord = newResponseArray[i];
    delayPara(i, nextWord + " ");
  }

  setLoading(false);
  setInput("");
 };

  

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
