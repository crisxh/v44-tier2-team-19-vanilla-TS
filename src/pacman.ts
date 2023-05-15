/* ============= Notas ============= */

/*
  para ir  hacia arriba, debemos recordar como es el sistema de coordenadas en el canvas
  0,0 -> + x
  ↓
  + y
*/

/*
  Nota A-1
  player.borders.top + player.velocity.y
    Esto lo hacemos para que, antes de chocar, se frene el jugador
    EL jugador quedara a una corta distancia de la pared pero no la tocara
    Si esto no estuviera, el jugador chocaria con la pared y no permitiria continuar el juego
    ya que, al agregar esto, si el jugador, supongamos que choca con la pared superior,
    intenta moverse hacia abajo podra, ya que la velocidad ira disminuyendo permitiendo que
    el jugador se eleje, si esto no estuviera, el jugador choca contra la pared y ahi se quedara por siempre

  Lo mismo aplica para el eje x
*/

// Nota B-2
// le damos color porque sino los pinta de negro y con un fondo negro no vamos a ver nada

/*
  Nota C-2
  Descripciones de cada item:
    '-' -> equivale a una caja (box)
    ' ' -> equivale a un espacio vacio`
*/

// Nota D-4
// de esta forma indicamos que vamos a comenzar a dibujar algo (como en los svg)

/*
  Nota E-4
  en este caso vamos a dibujar un arc, el arc toma varios parametros
  this.position.x -> ancho
  this.position.y -> alto
  this.radius -> radio
  0 -> inicio del arco medido en radianes, no en grados
  Math.PI * 2 -> fin del arco (2 pi en radianes es un circulo completo)
*/

// Nota F-6
// method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation right before the next repaint.

/*
  Nota G-7
  debemos limpiar el camvas en cada iteracion
  0 -> inicio en x
  0 -> inicio en y
  canvas.width -> fin en x
  canvas.height -> fin en y
*/

/* ============= Interfaces ============= */

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

interface InterfacePellet extends InterfacePosition {
  radius?: number
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

const scoreEl = window.document.getElementById('score') as HTMLSpanElement

// canvas context
const c = canvas.getContext('2d') as CanvasRenderingContext2D

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Nota C-3

const map = [
  ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
  ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
  ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
  ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
  ['|', '.', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
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

let score = 0

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
  public radius: number
  public radiands: number
  public openRate: number
  public rotation: number

  constructor ({ position, velocity, radius = 15 }: InterfacePlayer) {
    this.position = position
    this.velocity = velocity
    this.radius = radius
    this.radiands = 0.75
    this.openRate = 0.08
    this.rotation = 0
  }

  draw (): void {
    c.save()
    c.translate(this.position.x, this.position.y)
    c.rotate(this.rotation)
    c.translate(-this.position.x, -this.position.y)
    // Nota D-4
    c.beginPath()
    // Nota E-4
    c.arc(
      this.position.x,
      this.position.y,
      this.radius,
      this.radiands,
      Math.PI * 2 - this.radiands
    )
    c.lineTo(this.position.x, this.position.y)
    c.fillStyle = 'yellow'
    c.fill()
    c.closePath()
    c.restore()
  }

  update (): void {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.radiands < 0 || this.radiands > 0.75) {
      this.openRate = -this.openRate
    }
    this.radiands += this.openRate
  }
}

class Ghost {
  public position: InterfacePositionsXY
  public velocity: InterfacePositionsXY
  public radius: number
  public color: string
  public prevCollision: string[]
  public speed: number
  static initialSpeed: number = 2
  static scared: boolean = false
  // static SCARED: boolean = false

  constructor ({ position, velocity, radius = 15, color = 'red' }: InterfacePlayer) {
    this.position = position
    this.velocity = velocity
    this.radius = radius
    this.color = color
    this.prevCollision = []
    this.speed = 2
    // this.scared = false
  }

  draw (): void {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = Ghost.scared ? 'blue' : this.color
    c.fill()
    c.closePath()
  }

  update (): void {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class Pellet {
  public position: InterfacePositionsXY
  public radius: number

  constructor ({ position }: InterfacePellet) {
    this.position = position
    this.radius = 3
  }

  draw (): void {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'white'
    c.fill()
    c.closePath()
  }
}

class PowerUp {
  public position: InterfacePositionsXY
  public radius: number

  constructor ({ position }: InterfacePellet) {
    this.position = position
    this.radius = 6
  }

  draw (): void {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'white'
    c.fill()
    c.closePath()
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

const ghosts = [
  new Ghost({
    position: {
      x: (Boundary.width * 6) + (Boundary.width / 2),
      y: Boundary.height + (Boundary.height / 2)
    },
    velocity: {
      x: Ghost.initialSpeed,
      y: 0
    }
  }),
  new Ghost({
    position: {
      x: Boundary.width + (Boundary.width / 2),
      y: (Boundary.height * 9) + (Boundary.height / 2)
    },
    velocity: {
      x: Ghost.initialSpeed,
      y: 0
    },
    color: 'pink'
  }),
  new Ghost({
    position: {
      x: (Boundary.width * 7) + (Boundary.width / 2),
      y: Boundary.height * 11 + (Boundary.height / 2)
    },
    velocity: {
      x: Ghost.initialSpeed,
      y: 0
    },
    color: 'green'
  })
]

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
  /*
    El padding es para evitar que, si el fantasma se mueve lento,
    el sistema de colision no nos de una direccion errorea al pensar que
    tiene lugar para moverse en una direccion

    el padding seria el espacio restante entre el objeto que se mueve y el limite de un borde
  */
  const padding = Boundary.width / 2 - circle.radius - 1

  // Los numeros indican cual debe comprarse con cual
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

  // Nota A-1
  return playerBorders.top <= boundaryBorders.bottom &&
  playerBorders.right >= boundaryBorders.left &&
  playerBorders.bottom >= boundaryBorders.top &&
  playerBorders.left <= boundaryBorders.right
}

let animationID: number

function animate (): void {
  // Nota F-6
  animationID = window.requestAnimationFrame(animate)
  // Nota G-7
  c.clearRect(0, 0, canvas.width, canvas.height)

  if (keys.up.pressed && lastKey === GAME_KEYS.UP) {
    // Por cada borde (boundary) compararemos si ese borde esta tocando a nuestro player
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

  // render pellets
  for (let i = pellets.length - 1; i >= 0; i--) {
    const pellet = pellets[i]

    pellet.draw()

    // touch pellets
    // hypot is an static method returns the square root of the sum of squares of its arguments
    // lo usamos para calcular la distancia mas larga de un triangulo (la hipotenusa)
    if ((Math.hypot(
      pellet.position.x - player.position.x,
      pellet.position.y - player.position.y
    ) < pellet.radius + player.radius)) {
      pellets.splice(i, 1)
      score += 10
      scoreEl.innerText = `${score}`
    }
  }

  // detect collision beteween ghost and player
  for (let i = ghosts.length - 1; i >= 0; i--) {
    const ghost = ghosts[i]

    // player lose condition
    if ((Math.hypot(ghost.position.x - player.position.x,
      ghost.position.y - player.position.y)) <
      (ghost.radius + player.radius)) {
      if (Ghost.scared) {
        ghosts.splice(i, 1)
      } else {
        cancelAnimationFrame(animationID)
        console.log('f')
      }
    }
  }

  // win condition

  if (pellets.length === 0) {
    console.log('you win')
    cancelAnimationFrame(animationID)
  }

  // render power up
  for (let i = powerUps.length - 1; i >= 0; i--) {
    const powerUp = powerUps[i]

    powerUp.draw()

    // touch powerUps
    if ((Math.hypot(
      powerUp.position.x - player.position.x,
      powerUp.position.y - player.position.y
    ) < powerUp.radius + player.radius)) {
      powerUps.splice(i, 1)

      // make ghost scared
      Ghost.scared = true

      // reset property scared
      setTimeout(() => {
        Ghost.scared = false
      }, 3000)
    }
  }

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
  player.update() // hereasdsadasadasdas

  ghosts.forEach((ghost) => {
    ghost.update()

    // ghost touch player

    const collisions: string[] = []

    boundaries.forEach(boundary => {
      if (!collisions.includes('right') && circleCollideWithReactangle({
        circle: {
          ...ghost,
          velocity: { x: ghost.speed, y: 0 }
        },
        rectangle: boundary
      })
      ) { collisions.push('right') }

      if (!collisions.includes('left') && circleCollideWithReactangle({
        circle: {
          ...ghost,
          velocity: { x: -ghost.speed, y: 0 }
        },
        rectangle: boundary
      })
      ) {
        collisions.push('left')
      }

      if (!collisions.includes('up') && circleCollideWithReactangle({
        circle: {
          ...ghost,
          velocity: { x: 0, y: -ghost.speed }
        },
        rectangle: boundary
      })
      ) { collisions.push('up') }

      if (!collisions.includes('down') && circleCollideWithReactangle({
        circle: {
          ...ghost,
          velocity: { x: 0, y: ghost.speed }
        },
        rectangle: boundary
      })
      ) { collisions.push('down') }
    })

    if (collisions.length > ghost.prevCollision.length) ghost.prevCollision = collisions

    // comparamos las colisiones vs las coliciones anteriores
    if (JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollision)) {
      if (ghost.velocity.x > 0) ghost.prevCollision.push('right')
      else if (ghost.velocity.x < 0) ghost.prevCollision.push('left')
      else if (ghost.velocity.y < 0) ghost.prevCollision.push('up')
      else if (ghost.velocity.y > 0) ghost.prevCollision.push('down')

      const pathways = ghost.prevCollision.filter(collision => !collisions.includes(collision))

      // escogemos una direccion disponible al azar
      const direction = pathways[Math.floor(Math.random() * pathways.length)]

      switch (direction) {
        case 'down':
          ghost.velocity.y = ghost.speed
          ghost.velocity.x = 0
          break
        case 'up':
          ghost.velocity.y = -ghost.speed
          ghost.velocity.x = 0
          break
        case 'right':
          ghost.velocity.y = 0
          ghost.velocity.x = ghost.speed
          break
        case 'left':
          ghost.velocity.y = 0
          ghost.velocity.x = -ghost.speed
          break
      }

      ghost.prevCollision = []
    }
  })

  if (player.velocity.x > 0) player.rotation = 0
  else if (player.velocity.x < 0) player.rotation = Math.PI
  else if (player.velocity.y > 0) player.rotation = Math.PI / 2 // ok
  else if (player.velocity.y < 0) player.rotation = Math.PI * 1.5
}

animate()

/* ============= Add event listeners for the keys ============= */

window.addEventListener('keydown', (event) => {
  event.preventDefault()

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
  event.preventDefault()

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
