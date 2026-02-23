export const CellChecker = (cell, token, dispatch) => {
  const tokensInCell = Array.from(cell.children)
    if(tokensInCell.length){
      dispatch({type: 'SET_IN_CELL', payload: [...tokensInCell, token]})
    }
}