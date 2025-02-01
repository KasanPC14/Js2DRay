function loadMap(map){
    map.forEach(element => {
        if (element["type"] == "wall"){

            var n_wall = new Obj(element["points"]);
            n_wall.setColor(element["color"][0],element["color"][1],element["color"][2]);
            Objects.push(n_wall);
        }
    });
}