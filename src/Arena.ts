import { canvasContext as ctx } from './browser/browserElements'

class GridSquare {
  posX: number
  posY: number

  constructor (posx: number, posy: number) {
    this.posX = posx
    this.posY = posy
  }

  draw (): void {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.posX, this.posY, 100, 100)
  }
}

// export { GridSquare }
