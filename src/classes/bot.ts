import { canvasContext as ctx } from '../browser/browserElements'
import { type IntCoordinatesXY, type IntBot } from '../utils/interfaces'

class Bot {
  public position: IntCoordinatesXY
  public velocity: IntCoordinatesXY
  public radius: number
  public color: string
  public prevCollision: string[]
  static speed: number = 1

  constructor ({ position, velocity, radius = 10, color = 'red' }: IntBot) {
    this.position = position
    this.velocity = velocity
    this.radius = radius
    this.color = color
    this.prevCollision = []
  }

  draw (): void {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  update (): void {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

export { Bot }
