import { canvasContext as ctx } from '../browser/browserElements'
import { type InterfaceGridSquare, type InterfacePositionsXY } from '../utils/interfaces'

class GridSquare {
  public position: InterfacePositionsXY
  public squareName: string
  public height: number
  public width: number
  public color: string

  constructor ({ position, color = 'green', squareName }: InterfaceGridSquare) {
    this.position = position
    this.height = 50
    this.width = 50
    this.color = color
    this.squareName = squareName
  }

  draw (): void {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.height, this.width)
  }

  drawID (): void {
    ctx.fillStyle = 'black'
    ctx.font = '30px Arial'
  }
}

export { GridSquare }
