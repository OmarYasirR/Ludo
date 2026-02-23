import { AutoMove } from "./AutoMove";

export const MovmentHandler = (
  active,
  tokens,
  path,
  isRolled,
  tknsInHome,
  tknsInCell,
  dispatch,
  AlltknsParents
) => {
  const num = Math.trunc(Math.random() * 6) + 1;
  dispatch({ type: "ROLL_DICE", payload: num })

  
  const TokensInHome = tokens?.filter(tokn => tokn.getAttribute("position") === 'home')
  if(TokensInHome.length < 4){
    dispatch({ type: 'SET_IN_HOME', payload: TokensInHome})
  }
  // Handle special cases
  if (TokensInHome.length === 4 && num === 6) {
    AutoMove({gettingOut: true, tokens, diceValue: num, path, isRolled, token: false, dispatch});
    return;
  } else if (TokensInHome.length === 4 && num < 6) {
    dispatch({ type: "SET_ISROLLED", payload: false });
    return;
  } else if (TokensInHome.length === 3 && num < 6) {
    const token = tokens.filter((t) => t.getAttribute("position") !== "home");
    AutoMove({tokens, diceValue: num, path, isRolled, dispatch, token: token[0], AlltknsParents});
    return
  }
    else if (TokensInHome.length == 2 && tknsInCell.length == 2 && num < 6) {
    AutoMove({tokens, diceValue: num, path, isRolled, dispatch, token: tknsInCell[0], AlltknsParents});
    return;
  }
};
