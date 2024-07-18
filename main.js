var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var player = null;



setColor(ctx, 255, 255, 255, 255);


//MAIN 2D GAME

function Draw2D() {
   player.draw2D(ctx);

   for (let i = 0; i < Rays.length; i++) {
        Rays[i].Draw(ctx);
    }
    

    for (let i = 0; i < Objects.length; i++) {
        Objects[i].Draw2D(ctx);
    }
}

function Update() {

    //Draw
    ctx.clearRect(0, 0, 800, 600);
    Draw2D();

    


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

});

window.addEventListener("keyup", (event) => {
    if (Key[event.key] == true) {
        Key[event.key] = false;
    }

});

//
Setup();