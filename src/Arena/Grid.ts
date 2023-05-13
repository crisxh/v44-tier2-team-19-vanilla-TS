import { Boundary,GridSquare } from "./Classes";
const gridSquares:any[] = []
const boundaries:any[]=[];

const grid = [
  ["+",'+', '+', '+', '+', '+', '+', '+', '+','+'],
  ["+",'-', '-', '-', '-', '-', '-', '-', '-','+'],
  ["+",'-', '-', '-', '-', '-', '-', '-', '-','+'],
  ["+",'-', '-', '-', '-', '-', '-', '-', '-','+'],
  ["+",'-', '-', '-', '-', '-', '-', '-', '-','+'],
  ["+",'-', '-', '-', '-', '-', '-', '-', '-','+'],
  ["+",'-', '-', '-', '-', '-', '-', '-', '-','+'],
  ["+",'-', '-', '-', '-', '-', '-', '-', '-','+'],
  ["+",'-', '-', '-', '-', '-', '-', '-', '-','+'],
  ["+",'+', '+', '+', '+', '+', '+', '+', '+','+'],
]

grid.forEach((row, i) => {
  row.forEach((symbol, j) => {
    let count=0;
    count++
    switch (symbol) {
      case '-':
        let squareName=i.toString()+j.toString();
        
        gridSquares.push(new GridSquare(52 * j, 52 * i, squareName,count))
        
        break;
        case '+':
        
        
        boundaries.push(new Boundary(52*j,52*i,50,50))
        
        break
    }
  })
})

export {gridSquares,boundaries}

