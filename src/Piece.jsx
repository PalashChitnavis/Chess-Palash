/* eslint-disable react/prop-types */
const Piece = ({ piece }) => {
  const { type, color } = piece;
  return (
    <div className="w-full h-full cursor-grab flex justify-center items-center">
      <img
        src={`/pieces/${type}_${color}.png`}
        alt={`piece - ${type}`}
        className="max-w-[70%] max-h-[70%]"
      />
    </div>
  );
};

export default Piece;
