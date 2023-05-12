import {GridSquare} from './Arena';

var c:any = document.getElementById("scene");
var ctx = c.getContext("2d");
c.height=innerHeight;
c.width=innerWidth;

ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke(); 

class Boundary{
  constructor(){

  }
}

class GridSquare{
  posX:number
  posY:number
  squareID:string
  height:number
  width:number
      constructor(posX:number,posY:number,squareID:string){
          this.posX=posX
          this.posY=posY
          this.height=50
          this.width=50;
          this.squareID=squareID
      }
      draw(){
          ctx.fillStyle = 'green';
          ctx.fillRect(this.posX, this.posY, this.height, this.width);
          
      }
      drawID(){
        ctx.fillStyle = 'black';
        ctx.font = "30px Arial";
ctx.fillText(this.index1, this.posX, this.posY); 
      }
  }

// const square=new GridSquare(10,10)

// square.draw()

const gridSquares=[];

const grid = [
  ["-","-","-","-","-","-","-","-"],
  ["-","-","-","-","-","-","-","-"],
  ["-","-","-","-","-","-","-","-"],
  ["-","-","-","-","-","-","-","-"],
  ["-","-","-","-","-","-","-","-"],
  ["-","-","-","-","-","-","-","-"],
  ["-","-","-","-","-","-","-","-"],
  ["-","-","-","-","-","-","-","-"]
]

grid.forEach((row,i)=>{
  row.forEach((symbol,j)=>{
    switch(symbol){ 
    case "-":
    gridSquares.push(new GridSquare(52*j,52*i,i.toString()+j.toString(),j.toString()))
    break; 
  }

  })
})

gridSquares.forEach((square)=>{
  square.draw()
  square.drawID()
}

)

console.log(gridSquares)