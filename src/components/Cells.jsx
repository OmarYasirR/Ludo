import React, { useRef } from "react";
import "../style/Cells.css";
import { FaStar } from "react-icons/fa";
import { RiStarLine, RiStarOffFill } from "react-icons/ri";

const Cells = ({ position, color }) => {
  const cellsPosition = (po) => {
    if (po === "top" || po === "bottom") {
      return 'grid-cols-3 basis-[20%]';
    }
    if (po === "right" || po === "left") {
      return 'grid-cols-6 basis-[40%]';
    }
  };

  const collerizer = (i, color, po) => {
    if (po === "left" && [1, 7, 8, 9, 10, 11].includes(i)) {
      return `bg-${color}-500`;
    }
    if (po === "top" && [5, 4, 7, 10, 13, 16].includes(i)) {
      return `bg-${color}-500`;
    }
    if (po === "right" && [16, 10, 7, 9, 8, 6].includes(i)) {
      return `bg-${color}-500`;
    }
    if (po === "bottom" && [12, 13, 10, 7, 4, 1].includes(i)) {
      return `bg-${color}-500`;
    }
  };

  const protectedCellDetector = (p, i) => {
    if (p === "left" && [1, 14].includes(i)) {
      return "protected";
    }
    if (p === "top" && [5, 6].includes(i)) {
      return "protected";
    }
    if (p === "right" && [16, 3].includes(i)) {
      return "protected";
    }
    if (p === "bottom" && [12, 11].includes(i)) {
      return "protected";
    }
    return ''
  };

  // cell star detector
  const starDetector = (p, i) => {
    if (p === "left" && i === 14) {
      return "star";
    }
    if (p === "top" && i === 6) {
      return "star";
    }
    if (p === "right" && i === 3) {
      return "star";
    }
    if (p === "bottom" && i === 11) {
      return "star";
    }
    return ''
  };

  return (
    <div className={`grid w-full h-full border border-black ${cellsPosition(position)}`}>
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className={`path-cell text-center text-sm border border-black flex justify-center items-center relative h-7 leading-6 ${color}-${i} ${protectedCellDetector(
            position,
            i
          )} ${collerizer(i, color, position)}`}
        >
          {i === 14 && position === 'left' && <RiStarLine className="text-2xl text-gray-300 absolute z-0" />}
          {i === 6 && position === 'top' && <RiStarLine className="text-2xl text-gray-300 absolute z-0" />}
          {i === 3 && position === 'right' && <RiStarLine className="text-2xl text-gray-300 absolute z-0" />}
          {i === 11 && position === 'bottom' && <RiStarLine className="text-2xl text-gray-300 absolute z-0" />}
        </div>
      ))}
    </div>
  );
};

export default Cells;
