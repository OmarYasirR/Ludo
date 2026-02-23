export const killingHandler = (token, dispatch, path, steps, currentPosition, tknsParent) => {
  const cellChildrn = Array.from(path[steps].children)
  const tokenColor = token.classList[1]
  const strangeToken = cellChildrn.filter(child => child.classList[1] !== tokenColor)
  const stepCount = path.length - currentPosition
  const inervalHandler = setInterval(() => {
      stepCount -= 1
      token.remove();
      path[stepCount].appendChild(token)
      token.setAttribute("position", stepCount.toString());
    if(stepCount === 0){
      clearInterval(inervalHandler)
      const parent = tknsParent.find((prnt => Array.from(prnt.children).length === 0))
      if(parent){
        token.remove();
        parent.appendChild(token)
        token.setAttribute("position", 'home');
      }
      dispatch({ type: "ACTIVE" })
    }
  }, 500)
}