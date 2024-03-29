/* eslint-disable react/prop-types */
import Square from "./Square";
import Piece from "./Piece";
import { handleMove, gameSubject } from "./Game";
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
  return (
    <div className="w-full h-full" ref={drop}>
      <Square black={black} position={position}>
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
