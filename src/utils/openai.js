import Groq from "groq-sdk";
import { GROQ_API_KEY } from "./constatns";

// const openai = new OpenAI({
//   apiKey: OPENAI_API_KEY,
//   dangerouslyAllowBrowser: true, // This is the default and can be omitted
// });
console.log("GROQ_API_KEY:", process.env.REACT_APP_GROQ_API_KEY);
const openai = new Groq({
  apiKey: process.env.REACT_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});
export default openai;
