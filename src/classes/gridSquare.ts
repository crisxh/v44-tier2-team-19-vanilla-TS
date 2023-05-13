import { canvasContext as ctx } from '../browser/browserElements'
import { type IntGridSquare } from '../utils/interfaces'

class GridSquare {
  posX: number
  posY: number
  squareID: number
  squareName: string
  height: number
  width: number
  constructor ({ posX, posY, squareName, squareID }: IntGridSquare) {
    this.posX = posX
    this.posY = posY
    this.height = 50
    this.width = 50
    this.squareName = squareName
    this.squareID = squareID
  }

  draw (): void {
    ctx.fillStyle = 'green'
    ctx.fillRect(this.posX, this.posY, this.height, this.width)
  }

  drawID (): void {
    ctx.fillStyle = 'black'
    ctx.font = '30px Arial'
    ctx.fillText(this.squareName, this.posX + this.width / 2, this.posY + this.height / 2)
  }
}

export { GridSquare }
