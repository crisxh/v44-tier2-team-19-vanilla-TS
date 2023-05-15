import { canvasContext as ctx } from '../browser/browserElements'
import { type IntCoordinatesXY, type IntGridSquare } from '../utils/interfaces'

class GridSquare {
  public position: IntCoordinatesXY
  public squareName: string
  public height: number
  public width: number

  constructor ({ position, squareName }: IntGridSquare) {
    this.position = position
    this.height = 50
    this.width = 50
    this.squareName = squareName
  }

  draw (): void {
    ctx.strokeStyle = 'black'
    ctx.strokeRect(this.position.x, this.position.y, this.height, this.width)
    ctx.fillStyle = 'green'
    ctx.fillRect(this.position.x, this.position.y, this.height, this.width)
  }

  drawID (): void {
    ctx.fillStyle = 'black'
    ctx.font = '30px Arial'
  }
}

export { GridSquare }
