var Rays = [];

class Ray {
    constructor(x, y, rot, range) {
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.range = range;
        this.overridable = false;
        this.endPoint = []
        this.colPoints = []
    }

    Draw(ctx) {
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);

        if (this.colPoints.length == 0){
            ctx.lineTo(this.x + Math.cos(degtorad(this.rot)) * this.range, this.y + Math.sin(degtorad(this.rot)) * this.range);
        } else {
            ctx.lineTo(this.colPoints[0][0],this.colPoints[0][1]);
        }

        ctx.stroke();
    }

    getEndPoint(){
        return [this.x + Math.cos(degtorad(this.rot)) * this.range, this.y + Math.sin(degtorad(this.rot)) * this.range];
    }

    setCollisionPoints(points){

        

        if (!this.overridable && points.length > 1){
            
            this.colPoints = [[points[0][0],points[0][1]]];
            var curDis = getDistance(this.x,this.y,this.colPoints[0][0],this.colPoints[0][1]);;

            for (let i = 0; i < points.length; i++){

                curDis = getDistance(this.x,this.y,this.colPoints[0][0],this.colPoints[0][1]);
                var newDis = getDistance(this.x,this.y,points[i][0],points[i][1]);

                if (newDis < curDis) {
                    delete this.colPoints;
                    this.colPoints = [[points[i][0],points[i][1]]];
                }
                
            }
        } else {
            this.colPoints = points;
        } 
    }
};