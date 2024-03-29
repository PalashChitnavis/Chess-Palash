/* eslint-disable react/prop-types */

const Square = ({ children, black, position, moveClick }) => {
  return (
    <div
      className={`${black ? "bg-[#779556]" : "bg-[#ebecd0]"} w-full h-full `}
      id={position}
      onClick={() => {
        moveClick(position);
      }}
    >
      {children}
    </div>
  );
};

export default Square;
