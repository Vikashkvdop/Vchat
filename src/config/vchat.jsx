import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with API key
const genAI = new GoogleGenerativeAI("AIzaSyBYGUSPJRoADLpMKfOnk6eZmLdU6yfvPfk");

async function main(prompt) {
  // Load the model
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // or "gemini-1.5-flash"

  try {
    // Send prompt
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    console.log("AI Response:", response);
    return response
  } catch (err) {
    console.error("Error:", err);
  }
}

// Example call
export default main
