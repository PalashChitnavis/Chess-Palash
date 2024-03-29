import { useEffect } from "react";
import { gameSubject, initGame } from "./Game";
import { useState } from "react";
import Board from "./Board";
import Result from "./Result";
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
    <div className="min-h-[100vh] flex items-center justify-center bg-gray-500">
      {isGameOver && <Result result={result} />}
      <div className="w-[600px] h-[600px]">
        <Board board={board} />
      </div>
    </div>
  );
}

export default App;
