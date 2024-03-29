import { boardInfo } from "./Game";
const Information = () => {
  console.log(boardInfo().history);
  return (
    <div className="flex flex-col justify-normal items-center h-[80vh]">
      <div className="text-5xl text-black">Board Info</div>
      <div
        className={`text-3xl ${
          boardInfo().turn === "w" ? "text-white" : "text-black"
        }`}
      >
        {boardInfo().turn === "w" ? "White to move" : "Black to move"}
      </div>
      <div className="overflow-y-scroll h-full no-scrollbar border-2 w-[70%] m-2 flex flex-col">
        <div className="flex justify-center w-full">History</div>
        {boardInfo()
          .history.reverse()
          .map((element, index) => (
            <div
              key={index}
              className={`flex w-full justify-center ${
                element.color === "w"
                  ? "bg-white text-black"
                  : "bg-black text-white"
              } bg-opacity-30`}
            >
              {`${element.color === "w" ? "White" : "Black"} ${
                element.piece === "b"
                  ? "Bishop"
                  : element.piece === "k"
                  ? "King"
                  : element.piece === "n"
                  ? "Knight"
                  : element.piece === "p"
                  ? "Pawn"
                  : element.piece === "r"
                  ? "Rook"
                  : "Queen"
              } moves from ${element.from} to ${element.to}`}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Information;
