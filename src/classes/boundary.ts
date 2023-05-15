import { canvasContext as ctx } from '../browser/browserElements'
import { type IntCoordinatesXY, type IntBoundary } from '../utils/interfaces'

class Boundary {
  public position: IntCoordinatesXY
  public height: number
  public width: number
  static width = 50
  static height = 50

  constructor ({ position, width = 50, height = 50 }: IntBoundary) {
    this.position = position
    this.width = width
    this.height = height
  }

  draw (): void {
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.position.x, this.position.y, this.height, this.width)
  }
}

export { Boundary }
