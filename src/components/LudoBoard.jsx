import Square from "./Square";
import "../style/LudoBoard.css";
import Cells from "./Cells";
import { useEffect, useRef } from "react";
import pathsClasess from "../Utility/pathsClasess.json";
import { useLudo } from "../Context/LudoContext";

const LudoBoard = () => {
  const ludoRef = useRef(null);
  const { dispatch } = useLudo();

  const gameElementsExtractor = (gameCont) => {
    const allCells = Array.from(gameCont.querySelectorAll(".path-cell"));
    const tokensElements = Array.from(gameCont.querySelectorAll(`.pwan`));
    const pwanParentElements = Array.from(
      gameCont.querySelectorAll(`.pwanParent`)
    );
    const HomesElements = Array.from(gameCont.querySelectorAll(".triangle"));

    const gameData = pathsClasess.map((P) => {
      const path = P.path
        .map((clas) => allCells.find((cell) => cell.classList.contains(clas)))
        .filter(Boolean);
      const tokens = tokensElements.filter((t) => t.classList[1] === P.color);
      const tokensParents = pwanParentElements.filter(
        (t) => t.classList[1] === P.color
      );
      const tokensHome = HomesElements.find((t) => t.classList[1] === P.color)
        .children[0];

      return {
        color: P.color,
        path,
        tokens,
        tokensParents,
        tokensHome,
        isFinish: false,
      };
    });
    return gameData;
  };

  //Extract game elements from DOM
  useEffect(() => {
    if (!ludoRef.current) return;
    const game = gameElementsExtractor(ludoRef.current);
    dispatch({ type: "INIT", payload: game });
  }, []);

  return (
    <div className="flex flex-col flex-1 p-2" ref={ludoRef}>
      <div className="flex w-full">
        <Square clr={"red"} />
        <Cells position={"top"} color={"green"} />
        <Square clr={"green"} />
      </div>
      <div className="flex w-full">
        <Cells position={"left"} color={"red"} />
        <div className="basis-[30%] sm:basis-[20%] relative border-gray-950 border">
          <div class="triangle red bg-red-500">
            <div className=" h-full w-full flex flex-col self-center items-start justify-center"></div>
          </div>
          <div class="triangle blue bg-blue-500">
            <div className=" h-full w-full flex self-center items-end justify-center"></div>
          </div>
          <div class="triangle green bg-green-500">
            <div className=" h-full w-full flex self-center items-start justify-center"></div>
          </div>
          <div class="triangle yellow bg-yellow-500">
            <div className=" h-full w-full flex flex-col self-center items-end justify-center"></div>
          </div>
        </div>
        <Cells position={"right"} color={"yellow"} />
      </div>
      <div className="flex w-full">
        <Square clr={"blue"} />
        <Cells position={"bottom"} color={"blue"} />
        <Square clr={"yellow"} />
      </div>
    </div>
  );
};

export default LudoBoard;
