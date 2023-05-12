import { canvas as c, canvasContext as ctx } from './browser/browserElements'
// import { GridSquare } from './Arena'

c.height = innerHeight
c.width = innerWidth

ctx.beginPath()
ctx.arc(95, 50, 40, 0, 2 * Math.PI)
ctx.stroke()

ctx.beginPath()
ctx.arc(95, 50, 40, 0, 2 * Math.PI)
ctx.stroke()

class GridSquare {
  posX: number
  posY: number
  index1: string
  index2: string
  height: number
  width: number
  constructor (posx: number, posy: number, i: string, j: string) {
    this.posX = posx
    this.posY = posy
    this.index1 = i
    this.index2 = j
    this.height = 50
    this.width = 50
  }

  draw (): void {
    ctx.fillStyle = 'green'
    ctx.fillRect(this.posX, this.posY, this.height, this.width)
  }

  drawID (): void {
    ctx.fillStyle = 'black'
    ctx.font = '30px Arial'
    ctx.fillText(this.index1, this.posX, this.posY)
  }
}

// const square=new GridSquare(10,10)

// square.draw()

const gridSquares = []

const grid = [
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-'],
  ['-', '-', '-', '-', '-', '-', '-', '-']
]

grid.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case '-':
        gridSquares.push(new GridSquare(52 * j, 52 * i, i.toString() + j.toString(), j.toString()))
        break
    }
  })
})

gridSquares.forEach((square) => {
  square.draw()
  square.drawID()
}

)

console.log(gridSquares)
