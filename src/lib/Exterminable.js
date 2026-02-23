export const Exterminable = (cell, token) => {
  const isProtected = Array.from(cell.classList).includes("protected");
  const tokenColor = token.classList[1];
  const cellChildrn = Array.from(cell.children)
  const hasStrangeToken = cellChildrn.every(
    (child) => child.classList[1] !== tokenColor
  );

  return !isProtected && hasStrangeToken;
};
