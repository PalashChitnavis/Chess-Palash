/* eslint-disable react/prop-types */
import Square from "./Square";
import Piece from "./Piece";
import {
  handleMove,
  gameSubject,
  getPiece,
  setPiece,
  getPiecesInfo,
  getPossibleMoves,
} from "./Game";
import { useDrop } from "react-dnd";
import { useEffect, useState } from "react";
import Promote from "./Promote";
//import { move } from "./Game";
const BoardSquare = ({ piece, black, position }) => {
  const [promotion, setPromotion] = useState(null);
  useEffect(() => {
    const subscribe = gameSubject.subscribe(({ pendingPromotion }) =>
      pendingPromotion && pendingPromotion.to === position
        ? setPromotion(pendingPromotion)
        : setPromotion(null)
    );

    return () => subscribe.unsubscribe();
  }, []);
  const [, drop] = useDrop({
    accept: "piece",
    drop: (item) => {
      const fromPosition = item.id.split("_")[0];
      const toPosition = position;
      handleMove(fromPosition, toPosition);
    },
  });

  function handleMoveClick(position) {
    const piece = getPiece(position);
    if (piece) {
      const pieces = getPiecesInfo();
      const moves = getPossibleMoves(pieces.from);
      if (pieces.from && moves.some((move) => move.to === position)) {
        setPiece(position, "to");
      } else {
        setPiece(position, "from");
        setPiece(null, "to");
      }
    } else {
      setPiece(position, "to");
    }
  }
  return (
    <div className="w-full h-full" ref={drop}>
      <Square black={black} position={position} moveClick={handleMoveClick}>
        {promotion ? (
          <Promote promotion={promotion} />
        ) : piece ? (
          <Piece piece={piece} position={position} />
        ) : null}
      </Square>
    </div>
  );
};

export default BoardSquare;
