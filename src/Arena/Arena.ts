
import { canvas as c, canvasContext as ctx } from '../browser/browserElements'
import { Animate,drawRandomSquare } from './Functions'
import { gridSquares,boundaries} from './Grid';
import { TestPlayer } from './Classes';


c.height = innerHeight
c.width = innerWidth


const testPlayer=new TestPlayer(50,50)


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

    testPlayer.update()

    
}

function Arena(){
  Animate();

}

export {Arena}
