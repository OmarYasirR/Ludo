import { CellChecker } from './CellChecker';
import {MultiStepsHandler} from './MultiStepsHandler'

export const AutoMove = ({gettingOut, tokens, diceValue, path, isRolled, dispatch, token, tknsInHome, AlltknsParents}) => {
  
  if(token && gettingOut){
    CellChecker(path[0], token, dispatch)
    path[0].appendChild(token);
    token.setAttribute("position", "0");
    dispatch({ type: 'SET_ISROLLED', payload: false})
    return
  }
  // getting out token automaticly
  if(gettingOut){
    const randomIndex = Math.floor(Math.random() * 4);
    const token = tokens[randomIndex];
    const tokenColor = token.classList[1]
    path[0].appendChild(token);
    token.setAttribute("position", "0");
    dispatch({ type: 'SET_ISROLLED', payload: false}) 
    const filterdToken = tokens.filter((_, i) => i !== randomIndex)
    return
  }
  if(token){
    MultiStepsHandler(token, dispatch, path, diceValue, AlltknsParents)
  }
};
