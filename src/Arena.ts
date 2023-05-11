

class GridSquare{
posX:number
posY:number

    constructor(posX:number,posY:number){
        this.posX=posX
        this.posY=posY
    }
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.posX, this.posY, 100, 100);
    }
}

const square=new GridSquare(10,10)

square.draw()