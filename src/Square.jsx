/* eslint-disable react/prop-types */

const Square = ({ children, black }) => {
  return (
    <div
      className={`${black ? "bg-[#779556]" : "bg-[#ebecd0]"} w-full h-full `}
    >
      {children}
    </div>
  );
};

export default Square;
