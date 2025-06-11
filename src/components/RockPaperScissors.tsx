
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState<number | null>(null);
  const [computerChoice, setComputerChoice] = useState<number | null>(null);
  const [result, setResult] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);

  const rock = `    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)`;

  const paper = `    _______
---'   ____)____
          ______)
          _______)
         _______)
---.__________)`;

  const scissors = `    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)`;

  const images = [rock, paper, scissors];
  const choices = ['Rock', 'Paper', 'Scissors'];

  const playGame = (userSelection: number) => {
    if (userSelection < 0 || userSelection > 2) {
      setResult("Invalid input. You lose!");
      return;
    }

    setIsPlaying(true);
    setUserChoice(userSelection);
    
    // Add suspense with delayed computer choice
    setTimeout(() => {
      const computerSelection = Math.floor(Math.random() * 3);
      setComputerChoice(computerSelection);
      
      // Determine winner based on your original logic
      let gameResult = '';
      if (userSelection === computerSelection) {
        gameResult = "It's a Draw!";
      } else if (userSelection === 0 && computerSelection === 1) {
        gameResult = "You lose!";
      } else if (userSelection === 0 && computerSelection === 2) {
        gameResult = "You win!";
      } else if (userSelection === 1 && computerSelection === 0) {
        gameResult = "You win!";
      } else if (userSelection === 1 && computerSelection === 2) {
        gameResult = "You lose!";
      } else if (userSelection === 2 && computerSelection === 0) {
        gameResult = "You lose!";
      } else if (userSelection === 2 && computerSelection === 1) {
        gameResult = "You win!";
      }
      
      setResult(gameResult);
      setIsPlaying(false);
    }, 1500);
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult('');
    setIsPlaying(false);
  };

  const getResultColor = () => {
    if (result.includes('win')) return 'text-green-400';
    if (result.includes('lose')) return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-white">
          Rock Paper Scissors
        </h1>
        
        {/* Game Controls */}
        <div className="text-center mb-8">
          <p className="text-xl mb-6 text-gray-300">
            Choose your weapon! Click on Rock, Paper, or Scissors
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {choices.map((choice, index) => (
              <button
                key={choice}
                onClick={() => playGame(index)}
                disabled={isPlaying}
                className={`
                  px-8 py-4 text-xl font-bold rounded-lg border-2 transition-all duration-300
                  ${isPlaying 
                    ? 'bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-800 border-white hover:bg-white hover:text-black hover:scale-105 active:scale-95'
                  }
                `}
              >
                {choice} ({index})
              </button>
            ))}
          </div>
        </div>

        {/* Game Display */}
        {(userChoice !== null || isPlaying) && (
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* User Choice */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">You chose:</h2>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                {userChoice !== null && (
                  <>
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      {choices[userChoice]}
                    </h3>
                    <pre className="text-sm font-mono text-green-400 whitespace-pre">
                      {images[userChoice]}
                    </pre>
                  </>
                )}
              </div>
            </div>

            {/* Computer Choice */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-red-400">Computer chose:</h2>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                {isPlaying ? (
                  <div className="flex items-center justify-center h-32">
                    <RefreshCw className="w-8 h-8 animate-spin text-white" />
                    <span className="ml-2 text-white">Thinking...</span>
                  </div>
                ) : computerChoice !== null ? (
                  <>
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      {choices[computerChoice]}
                    </h3>
                    <pre className="text-sm font-mono text-green-400 whitespace-pre">
                      {images[computerChoice]}
                    </pre>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="text-center mb-8">
            <h2 className={`text-4xl font-bold mb-4 ${getResultColor()}`}>
              {result}
            </h2>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Game Rules */}
        <div className="mt-12 bg-gray-900 p-6 rounded-lg border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-center text-white">Game Rules</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-300">
            <div className="text-center">
              <span className="font-semibold text-white">Rock</span> crushes Scissors
            </div>
            <div className="text-center">
              <span className="font-semibold text-white">Scissors</span> cuts Paper
            </div>
            <div className="text-center">
              <span className="font-semibold text-white">Paper</span> covers Rock
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RockPaperScissors;
