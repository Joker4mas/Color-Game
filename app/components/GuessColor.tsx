"use client";

import { useState, useEffect } from "react";
import { AlertCircle, Award } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

// Predefined set of colors for the game
const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEEAD",
  "#D4A5A5",
  "#9B59B6",
  "#3498DB",
  "#E74C3C",
  "#2ECC71",
  "#F1C40F",
  "#E67E22",
];

const ColorGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

  // Initialize game
  const startNewGame = () => {
    const shuffled = [...COLORS].sort(() => 0.5 - Math.random());
    const newTarget = shuffled[0];
    const newOptions = shuffled.slice(0, 6);
    setTargetColor(newTarget);
    setOptions(newOptions);
    setGameStatus("");
    setShowAnimation(false);
  };

  // Start game on mount
  useEffect(() => {
    startNewGame();
  }, []);

  // Handle color guess

  interface HandleGuessProps {
    color: string;
  }

  const handleGuess = ({ color }: HandleGuessProps) => {
    setShowAnimation(true);
    if (color === targetColor) {
      setScore((prev) => prev + 1);
      setGameStatus("Correct! Well done! 🎉");
      setTimeout(startNewGame, 1500);
    } else {
      setGameStatus("Wrong guess! Try again! 🤔");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8 bg-gray-300">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Color Guessing Game</h1>
        <div data-testid="gameInstructions" className="text-lg">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Can you guess which color matches the box above? Click on one of
              the options below!
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <div className="space-y-8">
        {/* Target Color Box */}
        <div
          data-testid="colorBox"
          className="w-36 h-36 mx-auto rounded-lg shadow-lg transition-all duration-300"
          style={{ backgroundColor: targetColor }}
        />

        {/* Color Options */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {options.map((color, index) => (
            <button
              key={index}
              data-testid="colorOption"
              className="w-full h-24 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              style={{ backgroundColor: color }}
              onClick={() => handleGuess({ color })}
            />
          ))}
        </div>

        {/* Game Status and Score */}
        <div className="space-y-4 text-center">
          <div
            data-testid="gameStatus"
            className={`text-xl font-semibold transition-opacity duration-300 ${
              showAnimation ? "opacity-100" : "opacity-0"
            }`}
          >
            {gameStatus}
          </div>

          <div className="flex items-center justify-center space-x-2">
            <Award className="h-6 w-6" />
            <span data-testid="score" className="text-xl font-bold">
              Score: {score}
            </span>
          </div>
        </div>

        {/* New Game Button */}
        <button
          data-testid="newGameButton"
          onClick={() => {
            startNewGame();
            setScore(0);
          }}
          className="w-full max-w-xs mx-auto block px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default ColorGame;
