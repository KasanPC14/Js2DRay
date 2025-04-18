function loadMap(player,map){
    Objects = [];
    map.forEach(element => {
        switch(element["type"]){
            case "wall":

                var n_wall = new Obj(element["points"]);
                n_wall.type = "wall";
                

                if (element["texture"]){
                    var n_img = new Image();
                    n_img.src = element["texture"];
                    n_wall.texture = n_img;
                    n_wall.repetitiveTexture = element["repetitiveTexture"];
                } else {
                    n_wall.setColor(element["color"][0],element["color"][1],element["color"][2]);
                }

               
                Objects.push(n_wall);
                drawables3D.push(n_wall);

                break;

            case "player":
                player.x = element["startPosition"][0];
                player.y = element["startPosition"][1];
                break;
            
            case "entity":
                new Entity(element["position"][0],element["position"][1],element["name"],element["entityType"],element["texture_sources"]);
                break;
        }
    });
}