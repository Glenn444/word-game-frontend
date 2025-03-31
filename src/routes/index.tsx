import ButtonComponent from "@/components/ButtonComponent";
import Confetti from "@/components/Confetti";
import InputForm from "@/components/InputForm";
import { useStartGame, useGetCreateSession } from "@/hooks/usegameHook";
import { createFileRoute } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

type GuessRespose = {
  correct: boolean;
  correct_word: string;
  next_position: number;
  game_completed: boolean;
  new_score: number;
};

function RouteComponent() {
  const { data: session } = useGetCreateSession();
  const { data: game } = useStartGame();
  const [currentPosition, setCurrentPosition] = useState(1);
  const [response, setResponse] = useState<GuessRespose>();
  const [loadingGuess,setloadingGuess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  // Find the current step based on position
  const currentStep = game?.steps?.find(
    (step) => step.position === currentPosition
  );
  const previousPosition = currentPosition - 1;
  console.log("currentStep: ",currentStep);
  console.log("currentStep: ",currentPosition);
  useEffect(() => {
    if (response?.game_completed) {
      setShowConfetti(true);
      
      // Hide confetti after 3 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 6000);
      setCurrentPosition(1)
      // Clean up timer
      return () => clearTimeout(timer);
    }
  }, [response]);
  return (
    <>
      {showConfetti && (
        <Confetti />
      )}
      
      <div className="text-green-700 text-xl flex justify-center">
        <div>
          <h1>
            Hello{" "}
            <span className="text-white text-sm">{session?.username}</span>
          </h1>
          <h1>Your Score: {response?.new_score}</h1>
          <h1>Welcome to the Word Game</h1>
        </div>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {/* Starting word */}
        <InputForm inputText={game?.start_word} />
        <div className="flex items-center justify-center">
          <FaArrowRight className="text-3xl" />
        </div>

        {/* Steps */}
        {game?.steps.map((step, index) => (
          <React.Fragment key={index}>
            {index < previousPosition ? (
              <InputForm inputText={step.correct_word} />
            ) : (
              <InputForm inputText="" />
            )}
            {/* Add arrow after each step except the last one */}
            {index < game?.steps.length - 1 && (
              <div className="flex items-center justify-center">
                <FaArrowRight className="text-3xl" />
              </div>
            )}
          </React.Fragment>
        ))}

        {/* Add arrow between last step and end word */}
        <div className="flex items-center justify-center">
          <FaArrowRight className="text-3xl" />
        </div>

        {/* End word */}
        <InputForm inputText={game?.end_word} />
      </div>
      
      <h1 className="text-white flex justify-center mt-16">
        "Click the Next word below"
      </h1>

      <div className="flex space-x-2 justify-center">
        {currentStep?.options?.map((word, index) => (
          <div key={index}>
            <ButtonComponent
              inputText={word}
              pairId={game?.pair_id}
              position={currentPosition}
              setCurrentPosition={setCurrentPosition}
              setResponse={setResponse}
              setLoadingGuess={setloadingGuess}
            />
          </div>
        ))}
      </div>

      <div className="flex space-x-2 justify-center mt-16">
        {
          loadingGuess &&
          <h1>loading...</h1>
        }
        {/* <StartButton inputText="Start Game" /> */}
      </div>

      <div className="flex space-x-2 justify-center mt-1 text-green-600">
        <div>
          {response && (
            <>
              {response.correct ? (
                <h1 className="text-green-600">Correct</h1>
              ) : (
                <h1 className="text-red-600">Incorrect!!</h1>
              )}
              <h1>Score: {response.new_score}</h1>
            </>
          )}
        </div>
      </div>
    </>
  );
}

