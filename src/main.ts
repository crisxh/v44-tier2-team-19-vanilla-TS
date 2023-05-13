import { canvas as c, canvasContext as ctx, btnSquare as button } from './browser/browserElements'
import { Bot } from './classes/bot'
import { Boundary } from './classes/boundary'
import { GridSquare } from './classes/gridSquare'

c.height = innerHeight
c.width = innerWidth

/* ============== Event listeners ============== */

button.addEventListener('click', drawRandomSquare)

// ctx.beginPath()
// ctx.arc(95, 50, 40, 0, 2 * Math.PI)
// ctx.stroke()

// ctx.beginPath()
// ctx.arc(95, 50, 40, 0, 2 * Math.PI)
// ctx.stroke()

/* ============== Constants ============== */

const gridSquares: GridSquare[] = []
const boundaries: Boundary[] = []
const bots: Bot[] = []

const grid = [
  ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
  ['+', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
  ['+', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
  ['+', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
  ['+', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
  ['+', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
  ['+', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
  ['+', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
  ['+', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
  ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+']
]

/* ============== Draw Map ============== */

grid.forEach((row, rowIndex) => {
  row.forEach((symbol, columnIndex) => {
    let count = 0
    count++
    switch (symbol) {
      case '-':
        gridSquares.push(new GridSquare({
          posX: 52 * columnIndex,
          posY: 52 * rowIndex,
          squareName: `${rowIndex.toString()}${columnIndex.toString()}`,
          squareID: count
        }))

        break
      case '+':
        boundaries.push(new Boundary({
          posX: 52 * columnIndex,
          posY: 52 * rowIndex,
          width: 50,
          height: 50
        }))

        break
    }
  })
})

/* ============== Functions ============== */

function drawRandomSquare (): void {
  console.log('draw random square')

  const index = Math.floor(Math.random() * gridSquares.length)
  const square = gridSquares[index]

  const bot = new Bot({
    position: {
      x: square.posX + square.width / 2,
      y: square.posY + square.height / 2
    },
    velocity: {
      x: 0,
      y: 0
    }
  })
  bots.length = 0
  bots.push(bot)
  console.log('square: ', square)
}
drawRandomSquare()

/* ============== Draw things on the map ============== */

function animate (): void {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, c.width, c.height)
  gridSquares.forEach((square) => {
    square.draw()
  })

  boundaries.forEach((boundary) => {
    boundary.draw()
  })

  bots.forEach(bot => {
    bot.draw()
  })
}

animate()
