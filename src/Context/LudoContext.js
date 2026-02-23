import {
  createContext,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
  useContext,
} from "react";

export const LudoContext = createContext();

const initState = {
  playersData: [],
  tokens: [],
  path: [],
  tokensParents: [],
  tknsInHome: [],
  tknsInCell: null,
  color: null,
  home: null,
  diceValue: 0,
  active: 0,
  isRolled: false,
  isLoading: true,
  isMoving: false
};

export const ludoReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      const playersData = action.payload;
      return {
        ...state,
        playersData,
        home: playersData[state.active].tokensHome,
        tknsInHome: playersData[state.active].tokens,
        tokens: playersData[state.active].tokens,
        path: playersData[state.active].path,
        tokensParents: playersData[state.active].tokensParents,
        color: playersData[state.active].color,
        isLoading: false,
      };
    case "SET_ISROLLED":
      return {
        ...state,
        isRolled: action.payload,
      };
      case "ROLL_DICE":
        return {
          ...state,
          isRolled: true,
          diceValue: action.payload
      };
    case "ACTIVE":
      let active = state.active < 3 ? (state.active += 1) : 0;
      // making sure the active player is not finish
      for(let i = 0; i < state.playersData.length; i++){      
        if(!state.playersData[active].isFinish){
          break
        }
        active = active + 1 < 3? active+=1 : 0  
      }

      return {
        ...state,
        active: active,
        home: state.playersData[active].tokensHome,
        tokens: state.playersData[active].tokens,
        path: state.playersData[active].path,
        tokensParents: state.playersData[state.active].tokensParents,
        color: state.playersData[active].color,
        diceValue: 0,
        tknsInCell: null
      };
    case "SET_IN_CELL":
      return {
        ...state,
        tknsInCell: action.payload,
      };
    case "SET_IN_HOME":
      return {
        ...state,
        tknsInHome: action.payload,
      };
    case "FINISH":
      return {
        ...state,
        playersData: state.playersData.map((player, i) =>
          i === state.active ? { ...player, isFinish: true } : player
        ),
      };
    case "ISMOVING":
      return {
        ...state,
        isMoving: action.payload,
      };

    default:
      return state;
  }
};

// custom hook
export const useLudo = () => {
  const context = useContext(LudoContext);
  if (!context) {
    throw new Error("useLudo must be use inside LudoContextProvider");
  }
  return context;
};

export const LudoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ludoReducer, initState);

  return (
    <LudoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LudoContext.Provider>
  );
};
