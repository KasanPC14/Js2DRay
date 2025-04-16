const ObjectTypes = {
    Box : 1,
}

var Objects = [];

class Obj{
    constructor(points){
        this.points = points;
        this.collision = true;
        this.customColor = false;
        this.color = [255,255,255];
        this.height = 1;
        this.texture = null;
        this.repetitiveTexture = true;
        this.type = "wall";
    }

    Draw2D(ctx){

        switch(this.type){
            case "wall":

                if (this.texture){
                    ctx.strokeStyle = "white";
                    ctx.beginPath();
            
                    ctx.moveTo(this.points[0][0], this.points[0][1]);
            
                    for (let i = 1; i < this.points.length; i++){
                        ctx.lineTo(this.points[i][0], this.points[i][1]);
                    }
            
                    ctx.lineTo(this.points[0][0], this.points[0][1]);
                    
                    ctx.stroke();
                } else {
                    setStrokeColor(ctx,this.color[0],this.color[1],this.color[2],255);
                    ctx.beginPath();
            
                    ctx.moveTo(this.points[0][0], this.points[0][1]);
            
                    for (let i = 1; i < this.points.length; i++){
                        ctx.lineTo(this.points[i][0], this.points[i][1]);
                    }
            
                    ctx.lineTo(this.points[0][0], this.points[0][1]);
                    
                    ctx.stroke();
                }
                    
            
                break;
        }
        

    }

    setColor(r,g,b){
        this.color = [r,g,b];
    }
};