/* eslint-disable react/prop-types */
import Square from "./Square";
import Piece from "./Piece";
const BoardSquare = ({ piece, black }) => {
  return (
    <div className="w-full h-full">
      <Square black={black}>{piece && <Piece piece={piece} />}</Square>
    </div>
  );
};

export default BoardSquare;
