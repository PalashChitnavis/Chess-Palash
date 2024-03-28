/* eslint-disable react/prop-types */
import Square from "./Square";
import Piece from "./Piece";
import { handleMove } from "./Game";
import { useDrop } from "react-dnd";
//import { move } from "./Game";
const BoardSquare = ({ piece, black, position }) => {
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const fromPosition = item.id.split("_")[0];
      const toPosition = position;
      handleMove(fromPosition, toPosition);
    },
  });
  return (
    <div className="w-full h-full" ref={drop}>
      <Square black={black} position={position}>
        {piece && <Piece piece={piece} position={position} />}
      </Square>
    </div>
  );
};

export default BoardSquare;
