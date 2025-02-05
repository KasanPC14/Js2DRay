var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var player = null;

var wallHeights = 15000;
var wallWidths = 200;
var brightness = 150;

var isMap = false;

setColor(ctx, 255, 255, 255, 255);


//MAIN 2D GAME

function Draw2D() {
    
    ctx.clearRect(0,0,800,600);


    player.draw2D(ctx);

    for (let i = 0; i < Rays.length; i++) {
        Rays[i].Draw(ctx);
    }

    for (let i = 0; i < Objects.length; i++) {
        Objects[i].Draw2D(ctx);
    }
}

function Draw3D(){

    //Sorting rays from their z-index(distance)
    player.lookRays = QuickSort(player.lookRays);

    //Background


    //ray_i stands for index of the ray
    
    for (let ray_i = 0; ray_i < player.lookRays.length; ray_i++){
        
        //if lookray has atleast one collision point, we are drawing it.
        if (player.lookRays[ray_i].colPoints.length > 0){
            var rayHit_x = player.lookRays[ray_i].colPoints[0][0];
            var rayHit_y = player.lookRays[ray_i].colPoints[0][1];
            
            var hitObj = player.lookRays[ray_i].hitObjects[0];
            
            var dis = getDistance(player.x,player.y,rayHit_x,rayHit_y);

            var correctedDis = dis * Math.cos(degtorad(player.rot - player.lookRays[ray_i].rot)); //Correct distance
                    



            if (hitObj.type == "wall"){


                //Calculation of the angle which the wall fills on the screen with cosine theorem.
                //With that angle we can calculate how many ray that hits the wall.
                //Hence, we can crop the texture properly.

                var a = getDistance(x1,y1,x2,y2);
                var b = getDistance(x2,y2,player.x,player.y);
                var c = getDistance(x1,y1,player.x,player.y);

                var x1 = player.lookRays[ray_i].hitWallPoints[0][0][0];
                var y1 = player.lookRays[ray_i].hitWallPoints[0][0][1];
                var x2 = player.lookRays[ray_i].hitWallPoints[0][1][0];
                var y2 = player.lookRays[ray_i].hitWallPoints[0][1][1];

                if (hitObj.texture){

                    // (x1,y1) & (x2,y2) two points of the wall

                    //Proportion of the ray hit's x or y position according to the wall
                    var ratio = 0; 

                    if (x1-x2==0){
                        ratio = Math.abs((rayHit_y - y1) / (y1-y2))
                    } else {
                        ratio = Math.abs((rayHit_x - x1) / (x1-x2))
                    }
                    


                    //Calculation of angle which helps us to calculate ray count that hits the wall that we are looking.
                    var alpha = Math.acos((c*c + b*b - a*a)/(2*c*b));   
                    var rayC = player.lookRays.length * (alpha/(degtorad(player.viewAngle)));
                    

                    //console.log(rayC);

                    var drawX = (player.lookRays[ray_i].queue) * 800/player.lookRays.length;
                    var drawY = 300 + player.camRotV - 1/correctedDis*wallHeights/2;
                    var drawW = (1/correctedDis) * wallWidths;
                    var drawH = (1/correctedDis) * wallHeights;

                    //Main Image
                    ctx.drawImage(hitObj.texture, (ratio*hitObj.texture.width), 0, rayC/hitObj.texture.width, hitObj.texture.height, drawX, drawY, drawW, drawH);
                
                    //Brigtness & Shader
                    setColor(ctx,0,0,0,NormalizeBetween(dis*2,0,player.viewRange,0,255));
                    ctx.fillRect(drawX,drawY, drawW, drawH);
                
                } else {

                    //Setting its color to (rgb * brightness / distance)
                    setColor(ctx, hitObj.color[0] * brightness/dis , hitObj.color[1] * brightness/dis, hitObj.color[2] * brightness/dis, 255);
                
                    //queue of the ray => order of the ray left to right
                    //TODO: Solve the fisheye problem.
                    ctx.fillRect((player.lookRays[ray_i].queue) * 800/player.lookRays.length, 300 + player.camRotV - 1/correctedDis*wallHeights/2, (1/correctedDis) * wallWidths, (1/correctedDis)*wallHeights);
                
                }
                
            }

           
        }

    }   

   
}

function Update(tick) {

    //Delta Time Calculation

    _deltaTime = (tick - _lastTick)/1000;
    _lastTick = tick;
    //console.log("FPS: " + Math.floor((1/_deltaTime)).toString() + " | deltaTime: "+ _deltaTime.toString());


    //Draw
    ctx.clearRect(0, 0, 800, 600);
    
    Draw3D();

    if (isMap) Draw2D();
    


    //
    player.Update();
    requestAnimationFrame(Update);

}

function Setup() {
    ctx.imageSmoothingEnabled = false;
    ///
    player = new Player(50, 100, 0);

    loadMap(player,_1_0);
    
    //Fire Update
    Update();
    
}

//INPUTS

canvas.addEventListener("click", ()=>{
    canvas.requestPointerLock({unadjustedMovement: true,});
})

window.addEventListener("mousemove", (event)=>{

    //Sets the quantity of the mouse position's change
    mouseDragPos[0] = event.movementX;
    mouseDragPos[1] = event.movementY;

    //Turn the player
    player.rot += mouseDragPos[0] * player.mouseSens;
    player.camRotV += -mouseDragPos[1] * player.mouseSens * 5;

    //Sets the mouse position
    mousePos[0] = event.clientX;
    mousePos[1] = event.clientY;
})

window.addEventListener("keydown", (event) => {
    if (Key[event.key] == false) {
        Key[event.key] = true;
    }

    if (event.key == "m") isMap = !isMap;

});

window.addEventListener("keyup", (event) => {
    if (Key[event.key] == true) {
        Key[event.key] = false;
    }

});

//
Setup();