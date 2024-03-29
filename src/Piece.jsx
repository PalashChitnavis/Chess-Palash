/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDrag, DragPreviewImage } from "react-dnd";
import { possibleMoves } from "./Game";
import { useState } from "react";
const Piece = ({ piece, position }) => {
  const { type, color } = piece;
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: "piece", id: `${position}_${type}_${color}` },
    type: "piece",
    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  });

  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={`/pieces/${type}_${color}.png`}
        className="bg-transparent"
      />
      <div
        className="w-full h-full cursor-grab flex justify-center items-center"
        ref={drag}
      >
        <img
          src={`/pieces/${type}_${color}.png`}
          alt={`piece - ${type}_${color}`}
          className={`max-w-[70%] max-h-[70%] ${
            isDragging ? "opacity-0" : "opacity-100"
          } bg-transparent`}
          onClick={() => {
            possibleMoves(position);
          }}
          onDrag={() => {
            possibleMoves(position);
          }}
        />
      </div>
    </>
  );
};

export default Piece;
