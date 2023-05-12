import { canvas as c, canvasContext as ctx } from './browser/browserElements'
// import { GridSquare } from './Arena'

c.height = innerHeight
c.width = innerWidth

// ctx.beginPath()
// ctx.arc(95, 50, 40, 0, 2 * Math.PI)
// ctx.stroke()

// ctx.beginPath()
// ctx.arc(95, 50, 40, 0, 2 * Math.PI)
// ctx.stroke()

class Boundary{
  posY:number
  posX:number
  height:number
  width:number
  constructor(posY:number,posX:number,width:number,height:number){
    this.posY=posY
    this.posX=posX
    this.width=width
    this.height=height
  }
  draw(){
    ctx.fillStyle = 'blue';
    ctx.fillRect(this.posX, this.posY, this.height, this.width);
  }
}

class GridSquare{
  posX:number
  posY:number
  height:number
  width:number
  squareID:number
  squareName:string
      constructor(posX:number,posY:number,squareName:string,squareID:number){
          this.posX=posX
          this.posY=posY
          this.height=50
          this.width=50;
          this.squareName=squareName
          this.squareID=squareID
      }
      draw(){
          ctx.fillStyle = 'green';
          ctx.fillRect(this.posX, this.posY, this.height, this.width);
          
      }
      drawID(){
        ctx.fillStyle = 'black';
        ctx.font = "30px Arial";
ctx.fillText(this.squareName, this.posX+this.width/2, this.posY+this.height/2); 
      }
  }

// const square=new GridSquare(10,10)

// square.draw()

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

gridSquares.forEach((square) => {
  square.draw()
 // square.drawID()
})

boundaries.forEach((boundary) => {
  boundary.draw()
  
}

)
let scene= document.getElementById('scene');


function drawRandomSquare(){
 let index=Math.floor(Math.random()*gridSquares.length)
 let square=gridSquares[index]
 console.log('square: ',square)

          ctx.fillStyle = 'red';
          ctx.fillRect(square.posX, square.posY, 20, 20);
         
  }
  drawRandomSquare();

if(scene){ 
  scene.addEventListener('onClick',(e)=>{
    console.log(e);
    console.log('randomSquare!')
    drawRandomSquare();
  })

}

console.log(gridSquares)
console.log(boundaries)