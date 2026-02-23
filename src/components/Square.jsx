import { useEffect, useRef } from "react";
import "../style/Square.css";
import { GiChessPawn } from "react-icons/gi";
import { useLudo } from "../Context/LudoContext";
import { MultiStepsHandler } from "../lib/MultiStepsHandler";
import { AutoMove } from "../lib/AutoMove";
import { useMove } from "../Hooks/useMove";
import { useMultuStepsMoving } from "../Hooks/useMultuStepsMoving";

const Square = ({ clr }) => {
  const {
    dispatch,
    active,
    diceValue,
    path,
    tokens,
    isRolled,
    color,
    isMoving,
  } = useLudo();

  const isActive = color === clr;
  const colorClasses = {
    red: isActive ? `bg-red-500` : `bg-red-300`,
    blue: isActive ? `bg-blue-500` : `bg-blue-300`,
    green: isActive ? `bg-green-500` : `bg-green-300`,
    yellow: isActive ? `bg-yellow-500` : `bg-yellow-300`,
  };

  const { MovmentHandler } = useMove();
  const { MultiStepsHandler } = useMultuStepsMoving();

  const enableMove = (id) => {
    if (!isActive) return;
    const tknPosition = tokens
      .find((tkn) => tkn.getAttribute("id") === id)
      ?.getAttribute("position");
    const main =
      isActive &&
      isMoving &&
      (parseInt(tknPosition) + diceValue <= path.length ||
        tknPosition === "home");
    // const tknPosition = tkn?.getAttribute('position')
    const condition1 = diceValue === 6 && tknPosition !== "finish" && main;
    const condition2 =
      tknPosition !== "home" && tknPosition !== "finish" && main;

    const moveAble = condition1 || condition2;
    return moveAble;
  };

  const handleTokenClick = (e) => {
    const token = e.currentTarget;
    dispatch({ type: "ISMOVING", payload: false });
    // dispatch({ type: "SET_ISROLLED", payload: true });
    if (token.getAttribute("position") === "home") {
      token.remove();
      token.classList.add(`bg-white`);
      const fristCell = path[0];
      if (Array.from(fristCell.children).length) {
        dispatch({ type: "SET_IN_CELL", payload: fristCell.children[0] });
      }
      fristCell.appendChild(token);
      token.setAttribute("position", "0");
      dispatch({ type: "SET_ISROLLED", payload: false });
      return;
    }
    MultiStepsHandler(token, diceValue);
  };

  const diseClassHandler = () => {
    const isClickable = !isRolled && isActive;
    switch (clr) {
      case "red":
        return `top-[-50px] left-0 ${colorClasses[clr]} ${
          isClickable
            ? "pointer-events-auto cursor-pointer"
            : "pointer-events-none"
        }`;
      case "green":
        return `top-[-50px] right-0 ${colorClasses[clr]} ${
          isClickable
            ? "pointer-events-auto cursor-pointer"
            : "pointer-events-none"
        }`;
      case "blue":
        return `bottom-[-50px] left-0 ${colorClasses[clr]} ${
          isClickable
            ? "pointer-events-auto cursor-pointer"
            : "pointer-events-none"
        }`;
      default:
        return `bottom-[-50px] right-0 ${colorClasses[clr]} ${
          isClickable
            ? "pointer-events-auto cursor-pointer"
            : "pointer-events-none"
        }`;
    }
  };

  const borderRudioHandler = () => {
    switch (clr) {
      case "red":
        return "rounded-tl-md";
      case "green":
        return "rounded-tr-md";
      case "blue":
        return "rounded-bl-md";
      default:
        return "rounded-br-md";
    }
  };
  const TokenColorizer = () => {
    switch (clr) {
      case "red":
        return "#ef4444";
      case "green":
        return "#22c55e";
      case "blue":
        return "#3b82f6";
      default:
        return "#eab308";
    }
  };


  return (
    <div
      className={`grid grid-cols-2 p-2 items-center justify-center basis-[35%] sm:basis-[40%] border border-black bg-${clr}-500 relative ${borderRudioHandler()}`}
    >
      <div
        onClick={() => MovmentHandler()}
        className={`flex justify-center items-center text-white size-11 rounded-md border absolute ${diseClassHandler()}`}
      >
        {isActive ? diceValue : ""}
      </div>
      {[...Array(4)].map((_, i) => (
        <div
          className={`pwanParent ${clr} rounded-full bg-white size-9 sm:size-16 flex items-center justify-center m-auto ${clr}`}
          key={i}
        >
          <span
            onClick={(e) => {
              handleTokenClick(e);
            }}
            className={`pwan ${clr} flex justify-center items-center text-2xl shadow-xl ease-in-out duration-75 pointer-events-none rounded-full z-10 p-[1px] ${
              enableMove(`${clr}-${i}`) ? "canMove" : ""
            }`}
            position="home"
            id={`${clr}-${i}`}
          >
            <GiChessPawn
              className={`text-2xl`}
              style={{ color: TokenColorizer() }}
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default Square;
