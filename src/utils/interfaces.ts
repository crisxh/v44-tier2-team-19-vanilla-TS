interface IntCoordinatesXY {
  x: number
  y: number
}

interface IntBorders {
  top: number
  bottom: number
  left: number
  right: number
}

interface IntGridSquare {
  position: IntCoordinatesXY
  squareName: string
}

interface IntBoundary {
  position: IntCoordinatesXY
  height: number
  width: number
}

interface IntBot {
  position: IntCoordinatesXY
  velocity: IntCoordinatesXY
  radius?: number
  color?: string
}

interface IntCircle extends IntBot {
  velocity: IntCoordinatesXY
  radius: number
}

interface InterfaceRectangle {
  height: number
  width: number
  position: IntCoordinatesXY
}

interface IntCollitionCircleAndRectangle {
  circle: IntCircle
  rectangle: InterfaceRectangle
}

export type {
  IntBoundary,
  IntGridSquare,
  IntCoordinatesXY,
  IntBorders,
  IntBot,
  IntCircle,
  InterfaceRectangle,
  IntCollitionCircleAndRectangle
}
