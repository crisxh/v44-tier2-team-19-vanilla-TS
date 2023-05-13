import { gridSquares,boundaries} from './Grid';
import { canvas as c, canvasContext as ctx } from '../browser/browserElements';
import { TestPlayer } from './Classes'


function drawRandomSquare(){
    let index=Math.floor(Math.random()*gridSquares.length)
    let square=gridSquares[index]
    console.log('square: ',square)
    ctx.fillStyle = 'red';
     ctx.fillRect(square.posX, square.posY, 20, 20);
            
     }
    
   
   
   function Animate(){
     requestAnimationFrame(Animate)
     console.log('animating...')
       //ctx.clearRect(0,0,c.width,c.height)
       gridSquares.forEach((square) => {
         square.draw()
        // square.drawID()
       })
       
       boundaries.forEach((boundary) => {
         boundary.draw()
         
       })
   TestPlayer.update()
       
   }
   
  export {Animate,drawRandomSquare}