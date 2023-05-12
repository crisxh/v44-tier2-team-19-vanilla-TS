const canvas = document.getElementById('scene') as HTMLCanvasElement
const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D
const button =document.getElementById('addSquare') as HTMLButtonElement ;

export { canvas, canvasContext, button }
