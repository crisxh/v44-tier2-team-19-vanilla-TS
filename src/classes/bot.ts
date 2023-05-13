import { canvasContext as ctx } from '../browser/browserElements'
import { type IntCoordinatesXY, type IntBot } from '../utils/interfaces'

class Bot {
  public position: IntCoordinatesXY
  public velocity: IntCoordinatesXY
  public radius: number
  public color: string
  public prevCollision: string[]
  public speed: number
  static initialSpeed: number = 2
  static scared: boolean = false

  constructor ({ position, velocity, radius = 15, color = 'red' }: IntBot) {
    this.position = position
    this.velocity = velocity
    this.radius = radius
    this.color = color
    this.prevCollision = []
    this.speed = 2
  }

  draw (): void {
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = Bot.scared ? 'blue' : this.color
    ctx.fill()
    ctx.closePath()
  }
}

export { Bot }
