import { useLudo } from "../Context/LudoContext.js";
import { useMultuStepsMoving } from "./useMultuStepsMoving.js";

export const useMove = () => {
  const {
    tokens,
    path,
    isRolled,
    tknsInCell,
    dispatch,
  } = useLudo();

  const { MultiStepsHandler } = useMultuStepsMoving()

  const GettingOut = () => {
    const randomIndex = Math.floor(Math.random() * 4);
    const token = tokens[randomIndex]
    token.remove()    
    path[0].appendChild(token);
    token.setAttribute("position", "0");
    dispatch({ type: "SET_ISROLLED", payload: false })
    dispatch({ type: "ISMOVING", payload: false }) 
  };

  const MovmentHandler = () => {
    const num = Math.trunc(Math.random() * 6) + 1;
    dispatch({ type: "ROLL_DICE", payload: num });
    
    const TokensInHome = tokens?.filter(
      (tokn) => tokn.getAttribute("position") === "home" || tokn.getAttribute("position") === "finish"
    );
    if (TokensInHome.length < 4) {
      dispatch({ type: "SET_IN_HOME", payload: TokensInHome });
    }

    // const tknsInCell = tokens?.map((token, i) => {
    //   const crntPostion = token.getAttribute("position")
    //   return tokens.find((t, j) =>  i !== j && t.getAttribute("position") === crntPostion && t.getAttribute("position") !== 'home' && t.getAttribute("position") !== 'finish')
    // })


    
    // Handle special cases
    if (TokensInHome.length === 4 && num === 6) {
      GettingOut()
      return;
    } else if (TokensInHome.length === 4 && num < 6) {
      dispatch({ type: "SET_ISROLLED", payload: false });
      return;
    } else if (TokensInHome.length === 3 && num < 6) {
      const token = tokens.filter((t) => t.getAttribute("position") !== "home" && t.getAttribute("position") !== "finish");
      MultiStepsHandler(...token, num)
      return;
    } else if (TokensInHome.length == 2 && tknsInCell && num < 6) {
      MultiStepsHandler(tknsInCell, num)
      dispatch({type: 'SET_IN_CELL', payload: null})
      return;
    } else {
      dispatch({ type: "ISMOVING", payload: true }) 
    }
  };
  return { MovmentHandler};
};
