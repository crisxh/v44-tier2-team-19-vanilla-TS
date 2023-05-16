interface InterfacePositionsXY {
  x: number
  y: number
}

interface InterfacePosition {
  position: InterfacePositionsXY
}

interface InterfaceBot extends InterfacePosition {
  velocity: InterfacePositionsXY
  radius?: number
  color?: string
}

interface InterfaceBoundary extends InterfacePosition {
  color?: string
}

interface InterfaceCircle extends InterfaceBot {
  velocity: InterfacePositionsXY
  radius: number
}

interface InterfaceRectangle {
  height: number
  width: number
  position: InterfacePositionsXY
}

interface InterfaceGridSquare {
  position: InterfacePositionsXY
  color: string
  squareName: string
}

interface InterfaceColitionElements {
  circle: InterfaceCircle
  rectangle: InterfaceRectangle
}

export type {
  InterfacePositionsXY,
  InterfacePosition,
  InterfaceBot,
  InterfaceBoundary,
  InterfaceCircle,
  InterfaceRectangle,
  InterfaceColitionElements,
  InterfaceGridSquare
}
