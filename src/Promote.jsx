import React from "react";
import Square from "./Square";
import { move } from "./Game";
const promotePieces = ["r", "n", "b", "q"];

const Promote = ({ promotion }) => {
  const { from, to, color } = promotion;
  return (
    <div className="w-full h-full flex flex-wrap">
      {promotePieces.map((p, i) => (
        <div key={i} className="w-1/2 h-1/2 ">
          <Square black={i % 3 === 0} className="">
            <div>
              <img
                src={`./pieces/${p}_${color}.png`}
                alt="piece"
                className="cursor-pointer"
                onClick={() => {
                  move(from, to, p);
                }}
              />
            </div>
          </Square>
        </div>
      ))}
    </div>
  );
};

export default Promote;
