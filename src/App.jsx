import { useEffect } from "react";
import { gameSubject, initGame } from "./Game";
import { useState } from "react";
import Board from "./Board";
import Result from "./Result";
import Information from "./Information";
function App() {
  const [board, setBoard] = useState([]);
  const [isGameOver, setIsGameOver] = useState();
  const [result, setResult] = useState();
  useEffect(() => {
    initGame();
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board);
      setIsGameOver(game.isGameOver);
      setResult(game.result);
    });

    return () => subscribe.unsubscribe();
  }, []);
  return (
    <div className="min-h-[100vh] flex items-center justify-around bg-gray-500 h-full">
      {isGameOver && <Result result={result} />}
      <div className="w-[600px] h-[600px]">
        <Board board={board} />
      </div>
      <div className="w-[30%] h-[100%] border-2">
        <Information />
      </div>
    </div>
  );
}

export default App;
