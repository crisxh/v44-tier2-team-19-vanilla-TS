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
    image: HTMLImageElement
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
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
  ]

  const boundaries: Boundary[] = []
  const pellets: Pellet[] = []
  const powerUps: PowerUp[] = []

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

  let lastKey = ''

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
    public image: HTMLImageElement
    static width: number = 40
    static height: number = 40
    constructor ({ position, image }: InterfaceBoundary) {
      this.position = position
      this.width = 40
      this.height = 40
      this.image = image
    }

    draw (): void {
      c.drawImage(this.image, this.position.x, this.position.y)
    }
  }

  class Player {
    public position: InterfacePositionsXY
    public velocity: InterfacePositionsXY
    public prevCollision: string[]
    public radius: number

    constructor ({ position, velocity, radius = 15 }: InterfacePlayer) {
      this.position = position
      this.velocity = velocity
      this.radius = radius
      this.prevCollision = []
    }

    draw (): void {
      c.translate(this.position.x, this.position.y)
      c.translate(-this.position.x, -this.position.y)
      c.beginPath()
      c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
      c.fillStyle = 'yellow'
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
      x: 0,
      y: 0
    }
  })

  function createImage (src: string): HTMLImageElement {
    const image = new Image()
    image.src = `./images/${src}`
    return image
  }

  map.forEach((row, rowIndex) => {
    row.forEach((symbol, columnIndex) => {
      switch (symbol) {
        case '-':
          boundaries.push(new Boundary({
            position: {
              x: Boundary.width * columnIndex,
              y: Boundary.height * rowIndex
            },
            image: createImage('pipeHorizontal.png')
          }))
          break
        case '|':
          boundaries.push(new Boundary({
            position: {
              x: Boundary.width * columnIndex,
              y: Boundary.height * rowIndex
            },
            image: createImage('pipeVertical.png')
          }))
          break
        case '1':
          boundaries.push(new Boundary({
            position: {
              x: Boundary.width * columnIndex,
              y: Boundary.height * rowIndex
            },
            image: createImage('pipeCorner1.png')
          }))
          break
        case '2':
          boundaries.push(new Boundary({
            position: {
              x: Boundary.width * columnIndex,
              y: Boundary.height * rowIndex
            },
            image: createImage('pipeCorner2.png')
          }))
          break
        case '3':
          boundaries.push(new Boundary({
            position: {
              x: Boundary.width * columnIndex,
              y: Boundary.height * rowIndex
            },
            image: createImage('pipeCorner3.png')
          }))
          break
        case '4':
          boundaries.push(new Boundary({
            position: {
              x: Boundary.width * columnIndex,
              y: Boundary.height * rowIndex
            },
            image: createImage('pipeCorner4.png')
          }))
          break
        case 'b':
          boundaries.push(new Boundary({
            position: {
              x: Boundary.width * columnIndex,
              y: Boundary.height * rowIndex
            },
            image: createImage('block.png')
          }))
          break
        case '[':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * columnIndex,
                y: Boundary.height * rowIndex
              },
              image: createImage('capLeft.png')
            })
          )
          break
        case ']':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * columnIndex,
                y: Boundary.height * rowIndex
              },
              image: createImage('capRight.png')
            })
          )
          break
        case '_':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * columnIndex,
                y: Boundary.height * rowIndex
              },
              image: createImage('capBottom.png')
            })
          )
          break
        case '^':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * columnIndex,
                y: Boundary.height * rowIndex
              },
              image: createImage('capTop.png')
            })
          )
          break
        case '+':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * columnIndex,
                y: Boundary.height * rowIndex
              },
              image: createImage('pipeCross.png')
            })
          )
          break
        case '5':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * columnIndex,
                y: Boundary.height * rowIndex
              },
              // color: 'blue',
              image: createImage('pipeConnectorTop.png')
            })
          )
          break
        case '6':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * columnIndex,
                y: Boundary.height * rowIndex
              },
              // color: 'blue',
              image: createImage('pipeConnectorRight.png')
            })
          )
          break
        case '7':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * columnIndex,
                y: Boundary.height * rowIndex
              },
              // color: 'blue',
              image: createImage('pipeConnectorBottom.png')
            })
          )
          break
        case '8':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * columnIndex,
                y: Boundary.height * rowIndex
              },
              image: createImage('pipeConnectorLeft.png')
            })
          )
          break
        case '.':
          pellets.push(
            new Pellet({
              position: {
                x: Boundary.width * columnIndex + Boundary.width / 2,
                y: Boundary.height * rowIndex + Boundary.height / 2
              }
            })
          )
          break
        case 'p':
          powerUps.push(
            new PowerUp({
              position: {
                x: Boundary.width * columnIndex + Boundary.width / 2,
                y: Boundary.height * rowIndex + Boundary.height / 2
              }
            })
          )
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

  // let animationID: number

  function animate (): void {
    window.requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    // move player with keyboard
    // movePlayerWithKeyboard()

    // detect collision beteween ghost and player

    // player moves automatic
    playerMoveByIA()

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
  }

  animate()

  /* ============= player movement ============= */

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

  function getRandomSpeed (collitionWall: string): InterfacePositionsXY {
    const speedX = Math.round(Math.random() * 5)
    const speedY = Math.round(Math.random() * 5)
    let x: number = 0
    let y: number = 0

    function randomMultiply (num: number): number {
      const randomNum = Math.round(Math.random())
      if (randomNum === 1) {
        return num * 1
      } else {
        return num * 0
      }
    }

    /*
      Directions
        up
          x --> random
          y --> positive
        down
          x --> random
          y --> negative
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
    }

    return { x, y }
  }

  function playerMoveByIA (): void {
    // player touch boundary
    const collisions: string[] = []

    boundaries.forEach(boundary => {
      // console.log(boundary)
      if (!collisions.includes('right') && circleCollideWithReactangle({
        circle: {
          ...player,
          velocity: { x: 5, y: 0 }
        },
        rectangle: boundary
      })
      ) {
        // collisions.push('right')
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
        // collisions.push('left')
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
        // collisions.push('up')
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
        // collisions.push('down')
        const speeds = getRandomSpeed('down')
        player.velocity.y = speeds.y
        player.velocity.x = speeds.x
      }
    })
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
