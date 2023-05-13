import { canvasContext as ctx } from '../browser/browserElements'
import { type IntBoundary } from '../utils/interfaces'

class Boundary {
  posY: number
  posX: number
  height: number
  width: number
  constructor ({ posY, posX, width, height }: IntBoundary) {
    this.posY = posY
    this.posX = posX
    this.width = width
    this.height = height
  }

  draw (): void {
    ctx.fillStyle = 'blue'
    ctx.fillRect(this.posX, this.posY, this.height, this.width)
  }
}

export { Boundary }
