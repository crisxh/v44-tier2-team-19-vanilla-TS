import { canvasContext as ctx } from '../browser/browserElements'
import { type InterfacePositionsXY, type InterfaceBoundary } from '../utils/interfaces'

class Boundary {
  public position: InterfacePositionsXY
  public width: number
  public height: number
  public color: string
  static width: number = 40
  static height: number = 40

  constructor ({ position, color = 'green' }: InterfaceBoundary) {
    this.position = position
    this.width = 40
    this.height = 40
    this.color = color
  }

  draw (): void {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.height, this.width)
  }
}

export { Boundary }
