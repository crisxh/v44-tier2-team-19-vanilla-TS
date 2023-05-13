interface IntBoundary {
  posY: number
  posX: number
  height: number
  width: number
}

interface IntGridSquare {
  posX: number
  posY: number
  squareID: number
  squareName: string
}

interface IntCoordinatesXY {
  x: number
  y: number
}

interface IntBot {
  position: IntCoordinatesXY
  velocity: IntCoordinatesXY
  radius?: number
  color?: string
}

export type {
  IntBoundary,
  IntGridSquare,
  IntCoordinatesXY,
  IntBot
}
