var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var player = null;

var wallHeights = 15000;
var wallWidths = 800;
var brightness = 14000;

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

    /*setColor(ctx,0,200,200,255);
    ctx.fillRect(0,0,800,600);

    setColor(ctx,0,200,0,255);
    ctx.fillRect(0,300,800,300);*/

    for (let ray_i = 0; ray_i < player.lookRays.length; ray_i++){
        
        if (player.lookRays[ray_i].colPoints.length > 0){
            var rayHit_x = player.lookRays[ray_i].colPoints[0][0];
            var rayHit_y = player.lookRays[ray_i].colPoints[0][1];
    
            var dis = getDistance(player.x,player.y,rayHit_x,rayHit_y);
            setColor(ctx, brightness/dis , brightness/dis, brightness/dis, 255);
            ctx.fillRect(ray_i * 800/player.lookRays.length , 300 - 1/dis*wallHeights/2 ,(1/dis) * wallWidths,(1/dis)*wallHeights);
        }

    }   

    setColor(ctx, 255, 255, 255, 255);
}

function Update() {

    //Draw
    ctx.clearRect(0, 0, 800, 600);
    
    Draw3D();

    if (isMap) Draw2D();
    


    //
    player.Update();

}

function Setup() {
    player = new Player(100, 100, 0);

    var n_obj= new Obj([[400,300],[500,300],[500,400],[400,400]]);
    Objects.push(n_obj);

    n_obj = new Obj([[250,150],[350,50],[450,150],[400,275],[300,275]]);
    Objects.push(n_obj);

    //Fire Update
    setInterval(Update, 5);
}

//INPUTS

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