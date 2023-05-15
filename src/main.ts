import { canvas as c, canvasContext as ctx } from './browser/browserElements'
// import { Bot } from './classes/bot'
import { Boundary } from './classes/boundary'
import { GridSquare } from './classes/gridSquare'
import { type IntCollitionCircleAndRectangle } from './utils/interfaces'

c.width = window.innerWidth
c.height = window.innerHeight

/* ============= constants ============= */

const gridSquares: GridSquare[] = []
const boundaries: Boundary[] = []
const bots: Player[] = []

let animationID = 0

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

/* ============== Draw Map ============== */

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

/* ================== functions =================== */

function animate (): void {
  animationID = requestAnimationFrame(animate)
  ctx.clearRect(0, 0, c.width, c.height)

  gridSquares.forEach((square) => { square.draw() })

  boundaries.forEach((boundary) => {
    bots.forEach((bot) => {
      bot.draw()
    })

    boundary.draw()
  })

  // change this
  // if (pellets.length === 0) {
  // cancelAnimationFrame(animationID)
  // }
}

animate()

function circleCollideWithReactangle ({
  circle,
  rectangle
}: IntCollitionCircleAndRectangle): boolean {
  // const padding = Boundary.width / 2 - circle.radius - 1

  const circleBorders = {
    top: circle.position.y - circle.radius + circle.velocity.y, // 1
    right: circle.position.x + circle.radius + circle.velocity.x, // 2
    bottom: circle.position.y + circle.radius + circle.velocity.y, // 3
    left: circle.position.x - circle.radius + circle.velocity.x // 4
  }

  const boundaryBorders = {
    bottom: rectangle.position.y + rectangle.height, // 1
    left: rectangle.position.x, // 2
    top: rectangle.position.y, // 3
    right: rectangle.position.x + rectangle.width // 4
  }

  return circleBorders.top <= boundaryBorders.bottom &&
  circleBorders.right >= boundaryBorders.left &&
  circleBorders.bottom >= boundaryBorders.top &&
  circleBorders.left <= boundaryBorders.right
}

/* classes */

class Player {
  public position: InterfacePositionsXY
  public velocity: InterfacePositionsXY
  public radius: number

  constructor ({ position, velocity, radius = 15 }: InterfacePlayer) {
    this.position = position
    this.velocity = velocity
    this.radius = radius
  }

  draw (): void {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = 'yellow'
    ctx.fill()
    ctx.closePath()
  }

  update (): void {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

/* ================== Create Player (future bot) ================== */

const player = new Player({
  position: {
    x: Boundary.width + (Boundary.width / 2),
    y: Boundary.height + (Boundary.height / 2)
  },
  velocity: {
    x:  2,
    y: 0
  }
})

bots.push(player)
