import { canvas, canvasContext as ctx } from './browser/browserElements'
import { Bot } from './classes/bot'
import { Boundary } from './classes/boundary'
import { botMovement, circleCollideWithReactangle, getRandomSpeed } from './utils/collitions'
// import { type GridSquare } from './classes/gridSquare'

/* ============= constants ============= */

// const gridSquares: GridSquare[] = []
const boundaries: Boundary[] = []
const bots: Bot[] = []

const grid = [
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
]

/* ============== Draw Map ============== */

grid.forEach((row, rowIndex) => {
  row.forEach((symbol, columnIndex) => {
    switch (symbol) {
      case '-':
        boundaries.push(new Boundary({
          position: {
            x: Boundary.width * columnIndex,
            y: Boundary.height * rowIndex
          }
        }))
        break
    }
  })
})

/* ============== Draw Bots ============== */

for (let i = 0; i < 8; i++) {
  const colors = ['blue', 'yellow', 'red', 'white', 'violet', 'green', 'lightBlue', 'gray']
  const bot = new Bot({
    position: {
      x: Boundary.width * 3 + (Boundary.width / 2),
      y: Boundary.height * 6 + (Boundary.height / 2)
    },
    velocity: {
      x: getRandomSpeed().x,
      y: getRandomSpeed().y
    },
    color: colors[i]
  })
  bots.push(bot)
}

/* ================== function Animate =================== */

function animate (): void {
  window.requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // place here the function to detect collision beteween bots

  bots.forEach((bot) => {
    // player bounces off the boundaries
    botMovement(bot, boundaries)

    // if player collide with boundary, player stop
    boundaries.forEach((boundary) => {
      boundary.draw()

      if (
        circleCollideWithReactangle({
          circle: bot,
          rectangle: boundary
        })) {
        bot.velocity.y = 0
        bot.velocity.x = 0
      }
    })
    bot.update()
  })
}

animate()
