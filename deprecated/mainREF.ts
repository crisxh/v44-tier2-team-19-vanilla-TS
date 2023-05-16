// import { canvas as c, canvasContext as ctx, btnSquare as button } from '../src/browser/browserElements'
// import { Bot } from '../src/classes/bot'
// import { Boundary } from '../src/classes/boundary'
// import { GridSquare } from '../src/classes/gridSquare'
// import { type IntBorders, type IntCollitionCircleAndRectangle } from '../src/utils/interfaces'

// c.height = innerHeight
// c.width = innerWidth

// /* ============== Event listeners ============== */

// button.addEventListener('click', drawRandomSquare)

// /* ============== Constants ============== */

// const gridSquares: GridSquare[] = []
// const boundaries: Boundary[] = []
// const bots: Bot[] = []
// // let animationID: number

// const grid = [
//   ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
//   ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
//   ['+', '-', '+', '+', '+', '-', '+', '-', '+', '-', '+'],
//   ['+', '-', '+', '-', '-', '-', '-', '-', '-', '-', '+'],
//   ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
//   ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
//   ['+', '-', '+', '-', '+', '-', '+', '-', '+', '-', '+'],
//   ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
//   ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+']
// ]

// const grid2 = [
//   ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+'],
//   ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
//   ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
//   ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
//   ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
//   ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
//   ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
//   ['+', '-', '-', '-', '-', '-', '-', '-', '-', '-', '+'],
//   ['+', '+', '+', '+', '+', '+', '+', '+', '+', '+', '+']
// ]

// /* ============== Draw Map ============== */

// grid.forEach((row, rowIndex) => {
//   row.forEach((symbol, columnIndex) => {
//     switch (symbol) {
//       case '-':
//         gridSquares.push(new GridSquare({
//           position: {
//             x: 50 * columnIndex,
//             y: 50 * rowIndex
//           },
//           squareName: `${rowIndex.toString()}${columnIndex.toString()}`
//         }))

//         break
//       case '+':
//         boundaries.push(new Boundary({
//           position: {
//             x: 50 * columnIndex,
//             y: 50 * rowIndex
//           },
//           width: 50,
//           height: 50
//         }))

//         break
//     }
//   })
// })

// /* ============== Functions ============== */

// function drawRandomSquare (): void {
//   bots.length = 0

//   for (let i = 0; i < 4; i++) {
//     const index = Math.floor(Math.random() * gridSquares.length)
//     const square = gridSquares[index]
//     const bot = new Bot({
//       position: {
//         x: square.position.x + square.width / 2,
//         y: square.position.y + square.height / 2
//       },
//       velocity: {
//         x: 0,
//         y: 0
//       }
//     })
//     bots.push(bot)
//     // initial Movement
//     initBotMovement(bot)
//   }
// }

// drawRandomSquare()

// /* ============== Draw things on the map ============== */

// function animate (): void {
//   requestAnimationFrame(animate)
//   ctx.clearRect(0, 0, c.width, c.height)

//   gridSquares.forEach((square) => { square.draw() })

//   boundaries.forEach((boundary) => { boundary.draw() })

//   bots.forEach(bot => {
//     bot.update()

//     bots.forEach((bot) => {
//       bot.update()

//       // bot touch boundary
//       const collisions = checkCollitions(bot, Bot.speed)

//       if (collisions.length > bot.prevCollision.length) bot.prevCollision = collisions

//       // compare the collisions vs the previous collisions
//       if (JSON.stringify(collisions) !== JSON.stringify(bot.prevCollision)) {
//         if (bot.velocity.x > 0) bot.prevCollision.push('right')
//         else if (bot.velocity.x < 0) bot.prevCollision.push('left')
//         else if (bot.velocity.y < 0) bot.prevCollision.push('up')
//         else if (bot.velocity.y > 0) bot.prevCollision.push('down')

//         const pathways = bot.prevCollision.filter(collision => !collisions.includes(collision))

//         // bot chooses a random direction
//         changeDirection(bot, pathways)

//         bot.prevCollision = []
//       }
//     })
//   })
// }

// animate()

// function circleCollideWithReactangle ({
//   circle,
//   rectangle
// }: IntCollitionCircleAndRectangle): boolean {
//   const padding = Boundary.width / 2 - circle.radius - 1

//   const circleBorders = {
//     top: circle.position.y - circle.radius + circle.velocity.y, // 1
//     right: circle.position.x + circle.radius + circle.velocity.x, // 2
//     bottom: circle.position.y + circle.radius + circle.velocity.y, // 3
//     left: circle.position.x - circle.radius + circle.velocity.x // 4
//   }

//   const boundaryBorders: IntBorders = {
//     bottom: rectangle.position.y + rectangle.height + padding, // 1
//     left: rectangle.position.x - padding, // 2
//     top: rectangle.position.y - padding, // 3
//     right: rectangle.position.x + rectangle.width + padding // 4
//   }

//   return circleBorders.top <= boundaryBorders.bottom &&
//   circleBorders.right >= boundaryBorders.left &&
//   circleBorders.bottom >= boundaryBorders.top &&
//   circleBorders.left <= boundaryBorders.right
// }

// // ==================== tests ====================

// function initBotMovement (bot: Bot): void {
//   const allDirections = ['up', 'down', 'right', 'left']

//   const collisions = checkCollitions(bot, Bot.speed)

//   if (collisions.length > bot.prevCollision.length) bot.prevCollision = collisions

//   if (JSON.stringify(collisions) === JSON.stringify(bot.prevCollision)) {
//     const pathways = allDirections.filter((collision) => !collisions.includes(collision))

//     changeDirection(bot, pathways)
//   }
// }

// function checkCollitions (bot: Bot, speed: number): string[] {
//   const collisions: string[] = []

//   // bot touch boundary
//   boundaries.forEach(boundary => {
//     if (!collisions.includes('right') && circleCollideWithReactangle({
//       circle: {
//         ...bot,
//         velocity: { x: speed, y: 0 }
//       },
//       rectangle: boundary
//     })
//     ) { collisions.push('right') }

//     if (!collisions.includes('left') && circleCollideWithReactangle({
//       circle: {
//         ...bot,
//         velocity: { x: -speed, y: 0 }
//       },
//       rectangle: boundary
//     })
//     ) {
//       collisions.push('left')
//     }

//     if (!collisions.includes('up') && circleCollideWithReactangle({
//       circle: {
//         ...bot,
//         velocity: { x: 0, y: -speed }
//       },
//       rectangle: boundary
//     })
//     ) { collisions.push('up') }

//     if (!collisions.includes('down') && circleCollideWithReactangle({
//       circle: {
//         ...bot,
//         velocity: { x: 0, y: speed }
//       },
//       rectangle: boundary
//     })
//     ) { collisions.push('down') }
//   })

//   return collisions
// }

// function changeDirection (bot: Bot, pathways: string[]): void {
//   const direction = pathways[Math.floor(Math.random() * pathways.length)]

//   switch (direction) {
//     case 'down':
//       bot.velocity.y = Bot.speed
//       bot.velocity.x = 0
//       break
//     case 'up':
//       bot.velocity.y = -Bot.speed
//       bot.velocity.x = 0
//       break
//     case 'right':
//       bot.velocity.y = 0
//       bot.velocity.x = Bot.speed
//       break
//     case 'left':
//       bot.velocity.y = 0
//       bot.velocity.x = -Bot.speed
//       break
//   }
// }
