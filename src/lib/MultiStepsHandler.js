import { Exterminable } from "./Exterminable";
import { killingHandler } from "./KillingHandler";
import { useLudo } from '../Context/LudoContext'

export const MultiStepsHandler = (token, steps) => {
    if (!token || !token.nodeType || token.nodeType !== 1) {
      return;
    }
    let currentStep = 0;
    let currentPosition = parseInt(token.getAttribute("position"))
    const intervalId = setInterval(() => {
      dispatch({ type: "SET_ISROLLED", payload: false });
      if (currentStep === steps) {
        clearInterval(intervalId);

        if (Exterminable(path[currentStep], token)) {
          killingHandler(
            token,
            dispatch,
            path,
            steps,
            currentPosition,
            AlltknsParents
          );
          return;
        }

        if (steps !== 6) {
          dispatch({ type: "ACTIVE" });
        }
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