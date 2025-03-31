
// src/api/wordBridgeApi.js
import axios from "axios";


//const API_URL = "https://word-game-api-rxap.onrender.com"

// Create axios instance with credentials to handle cookies
const api = axios.create({
  baseURL: 'https://word-game-api-rxap.onrender.com',
  withCredentials: true, // Change to false since the API is using '*' for CORS
  // Increase timeout for slow free tier services
  timeout: 10000,
});
// Add request debug logging in development

export type GuessResponse = {
  data: {
    correct: boolean;
    correct_word: string;
    next_position: number;
    game_completed: boolean;
    new_score: number;
  };
};
export type Guess = {
  pairId: number;
  position: number;
  word: string;
};
export type GameResponse = {
  data: {
    pair_id: number;
    start_word: string;
    end_word: string;
    steps: [
      {
        position: number;
        correct_word: string;
        options: [string];
      },
    ];
  };
};
type SessionResponse = {
  data:{
  user_id: string, 
  username: string, 
  score:number
}}
// Session endpoints
// export const createSession = async () => {
//   const response = await api.post("/session");
//   return response.data;
// };

export const getSession = async () => {
    const response:SessionResponse = await api.get("/session");
    return response.data;
};

// Game endpoints
export const startGame = async () => {
  const response:GameResponse = await api.post("/game", {});
  return response.data;
};

export const makeGuess = async ( pairId:number, position:number, word:string) => {
  const response: GuessResponse = await api.post("/guess", {
    pair_id: pairId,
    position: position,
    word: word,
  });
  return response.data;
};

export const restartGame = async () => {
  const response = await api.post("/restart", {});
  return response.data;
};

