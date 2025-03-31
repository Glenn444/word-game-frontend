/* eslint-disable react-refresh/only-export-components */
// src/contexts/GameContext.js
import { createContext, useState, useEffect, useContext } from 'react';
import * as api from '../api/wordbridge';
import { GameResponse } from '../api/wordbridge';

interface SessionData {
  user_id: string;
  username: string;
  score: number;
}
export interface GuessResult {
  correct: boolean;
  correct_word: string;
  next_position: number;
  game_completed: boolean;
  new_score: number;
  gameCompleted?: boolean; // Added property in our code
}
interface GameContextType {
  session: SessionData | null;
  loading: boolean;
  error: string | null;
  currentGame: GameResponse["data"] | undefined;
  currentStep: number;
  score: number;
  startNewGame: (categoryId?: number | null) => Promise<GameResponse["data"] | undefined>;
  makeGuess: (word: string) => Promise<GuessResult | undefined>;
  restartGame: (categoryId?: number | null) => Promise<GameResponse["data"] | undefined>;
}
const GameContext = createContext<GameContextType | undefined>(
  {
    session: null,
    loading: false,
    error: null,
    currentGame: undefined,
    currentStep: 1,
    score: 0,
    startNewGame: async () => undefined,
    makeGuess: async () => undefined,
    restartGame: async () => undefined
  }
);

interface GameProviderProps {
  children: React.ReactNode;
}
export const GameProvider: React.FC<GameProviderProps> = ({ children })=> {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentGame, setCurrentGame] = useState<GameResponse["data"]>();
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [score, setScore] = useState(0);

  // Initialize session on first load
  useEffect(() => {
    async function initSession() {
      try {
        setLoading(true);
        // Try to get existing session
        let sessionData = await api.getSession();
        
        // If no session exists, create a new one
        if (!sessionData) {
          sessionData = await api.createSession();
        }
        
        setSession(sessionData);
        setScore(sessionData.score);
        
        // Load categories
     
      
      } catch (err) {
        setError('Failed to initialize session');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    
    initSession();
  }, []);

  // Start a new game
  const startNewGame = async () => {
    try {
      setLoading(true);
      const gameData = await api.startGame();
      setCurrentGame(gameData);
      setCurrentStep(1);
      return gameData;
    } catch (err) {
      setError('Failed to start game');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Make a guess
  const makeGuess = async (word:string) => {
    if (!currentGame) return;
    
    try {
      setLoading(true);
      const result = await api.makeGuess(
        currentGame.pair_id,
        currentStep,
        word
    );
      
      // Update session score
      setScore(result.new_score);
      
      if (result.correct) {
        if (result.game_completed) {
          // Game is completed
          return { ...result, gameCompleted: true };
        } else if (result.next_position) {
          // Move to next step
          setCurrentStep(result.next_position);
        }
      }
      
      return result;
    } catch (err) {
      setError('Failed to process guess');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Restart game
  const restartGame = async () => {
    try {
      setLoading(true);
      const gameData = await api.restartGame();
      setCurrentGame(gameData);
      setCurrentStep(1);
      setScore(0); // Score is reset on restart
      return gameData;
    } catch (err) {
      setError('Failed to restart game');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const contextValue: GameContextType = {
    session,
    loading,
    error,
    currentGame,
    currentStep,
    score,
    startNewGame,
    makeGuess,
    restartGame,
  };
  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  
  return context;
};