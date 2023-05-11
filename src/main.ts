import {GridSquare} from './Arena';

var c:any = document.getElementById("scene");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(95, 50, 40, 0, 2 * Math.PI);
ctx.stroke(); 

class GridSquare{
  posX:number
  posY:number
  index1:string
  index2:string
      constructor(posx:number,posy:number,i:string,j:string){
          this.posX=posx
          this.posY=posy
          this.index1=i
          this.index2=j
      }
      draw(){
          ctx.fillStyle = 'green';
          ctx.fillRect(this.posX, this.posY, 35, 35);
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
    gridSquares.push(new GridSquare(40*j,40*i,i.toString()+j.toString(),j.toString()))
    break; 
  }

  })
})

gridSquares.forEach((square)=>{
  square.draw()
}

)

console.log(gridSquares)