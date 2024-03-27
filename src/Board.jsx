/* eslint-disable react/prop-types */
import BoardSquare from "./BoardSquare";
const Board = ({ board }) => {
  function getXYPos(id) {
    const x = id % 8;
    const y = Math.abs(Math.floor(id / 8));

    return { x, y };
  }
  function isBlack(id) {
    const { x, y } = getXYPos(id);
    return (x + y) % 2 === 1;
  }
  return (
    <div className="w-[100%] h-[100%] flex flex-wrap">
      {board.flat().map((piece, id) => (
        <div key={id} className="w-[12.5%] h-[12.5%]">
          {isBlack(id)}
          <BoardSquare piece={piece} black={isBlack(id)} />
        </div>
      ))}
    </div>
  );
};

export default Board;
