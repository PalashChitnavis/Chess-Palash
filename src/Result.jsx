import { resetGame } from "./Game";
const Result = ({ result }) => {
  const { type, reason } = result;
  return (
    <div className="w-[100vw] h-[100vh] bg-gray-500 bg-opacity-50 fixed flex justify-center items-center z-10">
      <div className="w-[50%] h-[50%] border-2 flex flex-col justify-around items-center border-black rounded-xl bg-gray-600">
        <div className="text-6xl text-white">Game Over</div>
        <div className="text-6xl text-white">{type}</div>
        <div className="text-6xl text-white">{reason}</div>
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={resetGame}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default Result;
