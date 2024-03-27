/* eslint-disable react/prop-types */
import Square from "./Square";
import Piece from "./Piece";
const BoardSquare = ({ piece }) => {
  return (
    <div>
      <Square>{piece && <Piece piece={piece} />}</Square>
    </div>
  );
};

export default BoardSquare;
