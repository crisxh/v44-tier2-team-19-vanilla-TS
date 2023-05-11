

export class GridSquare{
posX:number
posY:number

    constructor(posx:number,posy:number){
        this.posX=posx
        this.posY=posy
    }
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.posX, this.posY, 100, 100);
    }
}





