import { canvasContext as ctx } from '../browser/browserElements'
import { drawRandomSquare } from './Functions'

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

  class TestPlayer{
    posX:number
  posY:number
  height:number
  width:number
   
    
    constructor(posX:number,posY:number){
        this.posX=posX
        this.posY=posY
        this.height=25
        this.width=25;
    }
    draw(){
        ctx.fillStyle = 'red';
          ctx.fillRect(this.posX, this.posY, this.height, this.width);

    }
    update(){
        

    }
  }

export { GridSquare,Boundary,TestPlayer }
