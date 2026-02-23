import { useLudo } from '../Context/LudoContext'

export const useMultuStepsMoving = () => {
  const { dispatch, path, home, playersData, color } = useLudo()

  const killingHandler = (
    token,
    currentPosition) => {
    const cellChildrn = Array.from(path[currentPosition].children);
    const tokenColor = token.classList[1];
    const strangeToken = cellChildrn.find(
      (child => child.classList[1] !== tokenColor))
    const strangeToknColor = strangeToken.classList[1]
    
    const strangeToknPath = playersData.find((item => item.color === strangeToknColor))?.path
    const StrangeToknParents = playersData.find((item => item.color === strangeToknColor))?.tokensParents
    let strangeTokenPosition = parseInt(strangeToken.getAttribute("position"))
    const inervalHandler = setInterval(() => {
      strangeTokenPosition --;
      strangeToken.remove();
      strangeToknPath[strangeTokenPosition].appendChild(strangeToken);
      strangeToken.setAttribute("position", strangeTokenPosition.toString());
      if (strangeTokenPosition === 0) {
        clearInterval(inervalHandler);
        const parent = StrangeToknParents.find(
          (prnt) => Array.from(prnt.children).length === 0
        );
        if (parent) {
          // strangeToken.remove();
          parent.appendChild(strangeToken);
          strangeToken.setAttribute("position", "home");
          dispatch({ type: "SET_ISROLLED", payload: false });
        }
      }
    }, 300);
  }

  const Exterminable = (cell, token) => {
  const isProtected = Array.from(cell.classList).includes("protected");
  const tokenColor = token.classList[1];
  const cellChildrn = Array.from(cell.children)
  const StrangeToken = cellChildrn.filter(
    (child) => child.classList[1] !== tokenColor
  )
  return !isProtected && StrangeToken.length && cellChildrn.length < 3;
};


  const MultiStepsHandler = (token, diceValue) => {
    if (!token || !token.nodeType || token.nodeType !== 1) {
      return;
    }
    let currentStep = 0;
    let currentPosition = parseInt(token.getAttribute("position"))


    if(currentPosition + diceValue > path.length){
      dispatch({ type: "SET_ISROLLED", payload: false });
      return
    }

    const intervalId = setInterval(() => {


      if (currentStep === diceValue) {
        clearInterval(intervalId);

        const isExerminable = Exterminable(path[currentPosition], token)
        if (isExerminable) {
          killingHandler(
            token,
            currentPosition
          );
          return;
        }else{
          dispatch({ type: "SET_ISROLLED", payload: false });
        }

        if (diceValue !== 6) {
          dispatch({ type: "ACTIVE" });
        }
        return;
      }

      if(currentPosition >= 50){
          if(currentPosition + diceValue === path.length){

          }
      }

      if(currentPosition + 1 === path.length){
        home.appendChild(token)
        dispatch({ type: "SET_ISROLLED", payload: false })
        token.setAttribute("position", 'finish');
        if(Array.from(home.children).length === 4){
          dispatch({type: 'FINISH'})
          dispatch({type: 'ACTIVE'})
        }
        clearInterval(intervalId);
        return;
      }

      const nextPosition = currentPosition + 1;
      const nextCell = path[nextPosition];

      if (!nextCell) {
        console.error(" Next cell not found at position:", nextPosition);
        clearInterval(intervalId);
        return;
      }

      token.remove();

      nextCell.appendChild(token);
      token.setAttribute("position", nextPosition.toString());

      currentPosition = nextPosition;
      currentStep++;
    }, 500);
  };
  
  return { MultiStepsHandler }
};
