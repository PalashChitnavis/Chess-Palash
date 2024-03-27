import { useEffect } from "react";
import { gameSubject } from "./Game";
import { useState } from "react";
import Board from "./Board";
function App() {
  const [board, setBoard] = useState([]);
  useEffect(() => {
    const subscribe = gameSubject.subscribe((game) => setBoard(game.board));

    return () => subscribe.unsubscribe();
  }, []);
  return (
    <div className="min-h-[100vh] flex items-center justify-center bg-gray-500">
      <div className="w-[600px] h-[600px]">
        <Board board={board} />
      </div>
    </div>
  );
}

export default App;
