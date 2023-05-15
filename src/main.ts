import { canvas as c, canvasContext as ctx, btnSquare as button } from './browser/browserElements'
import { Bot } from './classes/bot'
import { Boundary } from './classes/boundary'
import { GridSquare } from './classes/gridSquare'
import { type IntBorders, type IntCollitionCircleAndRectangle } from './utils/interfaces'
c.height = innerHeight
c.width = innerWidth

button.addEventListener('click', createBot)

/* ============== Constants ============== */

const gridSquares: GridSquare[] = []
const boundaries: Boundary[] = []
const bots: Bot[] = []

const grid = [
    ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
    ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
    ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
    ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
    ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
    ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
    ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
    ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
    ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+']
  ]

  grid.forEach((row, rowIndex) => {
    row.forEach((symbol, columnIndex) => {
      switch (symbol) {
        case '-':
          gridSquares.push(new GridSquare({
            position: {
              x: 50 * columnIndex,
              y: 50 * rowIndex
            },
            squareName: `${rowIndex.toString()}${columnIndex.toString()}`
          }))
  
          break
        case '+':
          boundaries.push(new Boundary({
            position: {
              x: 50 * columnIndex,
              y: 50 * rowIndex
            },
            width: 50,
            height: 50
          }))
  
          break
      }
    })
  })

  /* ============== Draw things on the map ============== */

function animate (): void {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, c.width, c.height)
  
    gridSquares.forEach((square) => { square.draw() })
  
    boundaries.forEach((boundary) => { boundary.draw() })

    bots.forEach((bot)=>{
      bot.draw()
      boundaries.forEach((boundary)=>{
        
          if(!circleCollideWithReactangle({rectangle:boundary,circle:bot})){
            bot.update()
          
          

        }else if(circleCollideWithReactangle({rectangle:boundary,circle:bot})){
          bot.velocity.x*=-1;
        }
    
        

      })
      
      
      })
  
  }
  
  animate()

  function createBot (): void {
  const index = Math.floor(Math.random() * gridSquares.length)
      const square = gridSquares[index]
      const bot = new Bot({
        position: {
          x: square.position.x + square.width / 2,
          y: square.position.y + square.height / 2
        },
        velocity: {
          x: 2,
          y: 0
        }
      })
      bots.push(bot)
      // initial Movement
     // initBotMovement(bot)
    
  }

  function circleCollideWithReactangle ({
    circle,
    rectangle
  }: IntCollitionCircleAndRectangle): boolean {
    const padding = Boundary.width / 2 - circle.radius - 1
  
    const circleBorders = {
      top: circle.position.y - circle.radius + circle.velocity.y, // 1
      right: circle.position.x + circle.radius + circle.velocity.x, // 2
      bottom: circle.position.y + circle.radius + circle.velocity.y, // 3
      left: circle.position.x - circle.radius + circle.velocity.x // 4
    }
  
    const boundaryBorders: IntBorders = {
      bottom: rectangle.position.y + rectangle.height + padding, // 1
      left: rectangle.position.x - padding, // 2
      top: rectangle.position.y - padding, // 3
      right: rectangle.position.x + rectangle.width + padding // 4
    }
  
    return circleBorders.top <= boundaryBorders.bottom &&
    circleBorders.right >= boundaryBorders.left &&
    circleBorders.bottom >= boundaryBorders.top &&
    circleBorders.left <= boundaryBorders.right
  }