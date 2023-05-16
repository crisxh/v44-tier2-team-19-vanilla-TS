/* ============= Interfaces ============= */

(() => {
  interface InterfacePositionsXY {
    x: number
    y: number
  }

  interface InterfacePosition {
    position: InterfacePositionsXY
  }

  interface InterfaceBorders {
    top: number
    bottom: number
    left: number
    right: number
  }

  interface InterfacePlayer extends InterfacePosition {
    velocity: InterfacePositionsXY
    radius?: number
    color?: string
  }

  interface InterfaceBoundary extends InterfacePosition {
    color?: string
  }

  interface InterfaceCircle extends InterfacePlayer {
    velocity: InterfacePositionsXY
    radius: number
  }

  interface InterfaceRectangle {
    height: number
    width: number
    position: InterfacePositionsXY
  }

  interface InterfaceColitionElements {
    circle: InterfaceCircle
    rectangle: InterfaceRectangle
  }

  /* ============= constants ============= */

  const canvas = window.document.getElementById('canvas') as HTMLCanvasElement

  // canvas context
  const c = canvas.getContext('2d') as CanvasRenderingContext2D

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const map = [
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-']
  ]

  const boundaries: Boundary[] = []
  const players: Player[] = []

  let lastKey = ''
  // let animationID: number

  const keys = {
    up: {
      pressed: false
    },
    left: {
      pressed: false
    },
    down: {
      pressed: false
    },
    right: {
      pressed: false
    }
  }

  const GAME_KEYS = {
    UP: 'w',
    DOWN: 's',
    RIGHT: 'd',
    LEFT: 'a'
  }

  /* ============= Classes ============= */

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
      c.fillStyle = this.color
      c.fillRect(this.position.x, this.position.y, this.height, this.width)
    }
  }

  class Player {
    public position: InterfacePositionsXY
    public velocity: InterfacePositionsXY
    public prevCollision: string[]
    public radius: number
    public color: string

    constructor ({ position, velocity, color = 'yellow', radius = 15 }: InterfacePlayer) {
      this.position = position
      this.velocity = velocity
      this.color = color
      this.radius = radius
      this.prevCollision = []
    }

    draw (): void {
      c.translate(this.position.x, this.position.y)
      c.translate(-this.position.x, -this.position.y)
      c.beginPath()
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
      c.fillStyle = this.color
      c.fill()
      c.closePath()
    }

    update (): void {
      this.draw()
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
  }

  /* ============= Functions and stuff ============= */

  const player = new Player({
    position: {
      x: Boundary.width + (Boundary.width / 2),
      y: Boundary.height + (Boundary.height / 2)
    },
    velocity: {
      x: getRandomSpeed().x,
      y: getRandomSpeed().y
    }
  })

  for (let i = 0; i < 8; i++) {
    const colors = ['blue', 'yellow', 'red', 'white', 'violet', 'green', 'lightBlue', 'gray']
    const player = new Player({
      position: {
        x: Boundary.width * 3 + (Boundary.width / 2),
        y: Boundary.height * 6 + (Boundary.height / 2)
      },
      velocity: {
        x: getRandomSpeed().x,
        y: getRandomSpeed().y
      },
      color: colors[i]
    })
    players.push(player)
  }

  map.forEach((row, rowIndex) => {
    row.forEach((symbol, columnIndex) => {
      switch (symbol) {
        case '-':
          boundaries.push(new Boundary({
            position: {
              x: Boundary.width * columnIndex,
              y: Boundary.height * rowIndex
            }
          }))
          break
      }
    })
  })

  function circleCollideWithReactangle ({
    circle,
    rectangle
  }: InterfaceColitionElements): boolean {
    const padding = Boundary.width / 2 - circle.radius - 1
    // const padding = 0

    const playerBorders = {
      top: circle.position.y - circle.radius + circle.velocity.y, // 1
      right: circle.position.x + circle.radius + circle.velocity.x, // 2
      bottom: circle.position.y + circle.radius + circle.velocity.y, // 3
      left: circle.position.x - circle.radius + circle.velocity.x // 4
    }

    const boundaryBorders: InterfaceBorders = {
      bottom: rectangle.position.y + rectangle.height + padding, // 1
      left: rectangle.position.x - padding, // 2
      top: rectangle.position.y - padding, // 3
      right: rectangle.position.x + rectangle.width + padding // 4
    }

    return playerBorders.top <= boundaryBorders.bottom &&
  playerBorders.right >= boundaryBorders.left &&
  playerBorders.bottom >= boundaryBorders.top &&
  playerBorders.left <= boundaryBorders.right
  }

  function animate (): void {
    window.requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    // place here the function to move player with keyboard

    // place here the function to detect collision beteween ghost and player

    players.forEach((player) => {
      // player bounces off the boundaries
      playerMoveByIA(player)

      // if player collide with boundary, player stop
      boundaries.forEach((boundary) => {
        boundary.draw()

        if (
          circleCollideWithReactangle({
            circle: player,
            rectangle: boundary
          })) {
          player.velocity.y = 0
          player.velocity.x = 0
        }
      })
      player.update()
    })
  }

  animate()

  /* ============= player movement ============= */

  function getRandomSpeed (collitionWall = ''): InterfacePositionsXY {
    const speedX = Math.round(Math.random() * 5)
    const speedY = Math.round(Math.random() * 5)
    let x: number = 0
    let y: number = 0

    function randomMultiply (num: number): number {
      const randomNum = Math.round(Math.random())
      if (randomNum === 1) {
        return num * 1
      } else {
        return num * -1
      }
    }

    /*
      Direction
        x --> value can be random, positive or negative
        y --> value can be random, positive or negative

        up
          x --> random
          y --> positive (if the bot is on top, it need to move down in the y-axis)
        down
          x --> random
          y --> negative (if the bot is on top, it need to move up in the y-axis)
        right
          x --> negative
          y --> random
        left
          x --> positive
          y --> random
    */

    if (collitionWall === 'up') {
      x = randomMultiply(speedX)
      y = speedY
    } else if (collitionWall === 'down') {
      x = randomMultiply(speedX)
      y = -speedY
    } else if (collitionWall === 'right') {
      x = -speedX
      y = randomMultiply(speedY)
    } else if (collitionWall === 'left') {
      x = speedX
      y = randomMultiply(speedY)
    } else {
      x = randomMultiply(speedX)
      y = randomMultiply(speedY)
    }

    return { x, y }
  }

  function playerMoveByIA (player: Player): void {
    // player touch boundary
    const collisions: string[] = []

    boundaries.forEach(boundary => {
      if (!collisions.includes('right') && circleCollideWithReactangle({
        circle: {
          ...player,
          velocity: { x: 5, y: 0 }
        },
        rectangle: boundary
      })
      ) {
        const speeds = getRandomSpeed('right')
        player.velocity.y = speeds.y
        player.velocity.x = speeds.x
      }

      if (!collisions.includes('left') && circleCollideWithReactangle({
        circle: {
          ...player,
          velocity: { x: -5, y: 0 }
        },
        rectangle: boundary
      })
      ) {
        const speeds = getRandomSpeed('left')
        player.velocity.y = speeds.y
        player.velocity.x = speeds.x
      }

      if (!collisions.includes('up') && circleCollideWithReactangle({
        circle: {
          ...player,
          velocity: { x: 0, y: -5 }
        },
        rectangle: boundary
      })
      ) {
        const speeds = getRandomSpeed('up')
        player.velocity.y = speeds.y
        player.velocity.x = speeds.x
      }

      if (!collisions.includes('down') && circleCollideWithReactangle({
        circle: {
          ...player,
          velocity: { x: 0, y: 5 }
        },
        rectangle: boundary
      })
      ) {
        const speeds = getRandomSpeed('down')
        player.velocity.y = speeds.y
        player.velocity.x = speeds.x
      }
    })
  }

  function movePlayerWithKeyboard (): void {
    if (keys.up.pressed && lastKey === GAME_KEYS.UP) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]

        if (
          circleCollideWithReactangle({
            circle: {
              ...player,
              velocity: {
                x: 0,
                y: -5
              }
            },
            rectangle: boundary
          })
        ) {
          player.velocity.y = 0
          break
        } else {
          player.velocity.y = -5
        }
      }
    } else if (keys.down.pressed && lastKey === GAME_KEYS.DOWN) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]

        if (
          circleCollideWithReactangle({
            circle: {
              ...player,
              velocity: {
                x: 0,
                y: 5
              }
            },
            rectangle: boundary
          })
        ) {
          player.velocity.y = 0
          break
        } else {
          player.velocity.y = 5
        }
      }
    } else if (keys.left.pressed && lastKey === GAME_KEYS.LEFT) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]

        if (
          circleCollideWithReactangle({
            circle: {
              ...player,
              velocity: {
                x: -5,
                y: 0
              }
            },
            rectangle: boundary
          })
        ) {
          player.velocity.x = 0
          break
        } else {
          player.velocity.x = -5
        }
      }
    } else if (keys.right.pressed && lastKey === GAME_KEYS.RIGHT) {
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]

        if (
          circleCollideWithReactangle({
            circle: {
              ...player,
              velocity: {
                x: 5,
                y: 0
              }
            },
            rectangle: boundary
          })
        ) {
          player.velocity.x = 0
          break
        } else {
          player.velocity.x = 5
        }
      }
    }
  }

  /* ============= Add event listeners for the keys ============= */

  window.addEventListener('keydown', (event) => {
    const { key } = event

    switch (key) {
      case GAME_KEYS.UP:
        keys.up.pressed = true
        lastKey = GAME_KEYS.UP
        break
      case GAME_KEYS.DOWN:
        keys.down.pressed = true
        lastKey = GAME_KEYS.DOWN
        break
      case GAME_KEYS.RIGHT:
        keys.right.pressed = true
        lastKey = GAME_KEYS.RIGHT
        break
      case GAME_KEYS.LEFT:
        keys.left.pressed = true
        lastKey = GAME_KEYS.LEFT
        break
    }
  })

  window.addEventListener('keyup', (event) => {
    const { key } = event

    switch (key) {
      case GAME_KEYS.UP:
        keys.up.pressed = false
        break
      case GAME_KEYS.DOWN:
        keys.down.pressed = false
        break
      case GAME_KEYS.RIGHT:
        keys.right.pressed = false
        break
      case GAME_KEYS.LEFT:
        keys.left.pressed = false
        break
    }
  })
})()

/*

  // put inside a function because this is the colittion between ghost and player
  // for (let i = ghosts.length - 1; i >= 0; i--) {
    //   const ghost = ghosts[i]

    //   // player lose condition
    //   if ((Math.hypot(ghost.position.x - player.position.x,
    //     ghost.position.y - player.position.y)) <
    //   (ghost.radius + player.radius)) {
    //     if (Ghost.scared) {
    //       ghosts.splice(i, 1)
    //     } else {
    //       cancelAnimationFrame(animationID)
    //       console.log('f')
    //     }
    //   }
    // }

*/

/*
  if we want to use images
  // function createImage (src: string): HTMLImageElement {
  //   const image = new Image()
  //   image.src = `./images/${src}`
  //   return image
  // }
*/
