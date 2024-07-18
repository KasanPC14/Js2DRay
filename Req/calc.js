function setColor(ctx,r,g,b,a){
    ctx.fillStyle = "rgb( "+ r.toString() + " " + g.toString() + " " + b.toString() + " / " + (a/255 * 100).toString() + "%)";
}

function addText(x,y,text) {
    ctx.fillText(text,x,y)
}

function degtorad(degree){
    return (degree/180 * Math.PI);
}

function radtodeg(rad){
    return (rad/Math.PI * 180);
}

function getDistance(x1,y1,x2,y2){
    
    return Math.sqrt(((x1-x2)*(x1-x2)) + (y1-y2)*(y1-y2));
}

function rayColCheck(x1,y1,x2,y2,x3,y3,x4,y4){
       

    var uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
    var uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

    var intersectionX = x1 + (uA * (x2 - x1));
    var intersectionY = y1 + (uA * (y2 - y1));

    if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
        
        return ([intersectionX, intersectionY]);
    }

    return false;
                
}