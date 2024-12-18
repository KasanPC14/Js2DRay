class Player {


    constructor(x, y, rot) {
        this.x = x;
        this.y = y;
        this.rot = rot;
        this.radius = 4;
        this.viewRange = 750;
        this.viewAngle = 90;
        this.walkSpeed = 0.5;
        this.rotSpeed = 0.75;

        this.lookRays = [];

        this.rayCount = 149;  //Make it odd for equal vision for left and right
        for (let i = 0; i < this.rayCount; i++) {
            var n_ray = new Ray(this.x, this.y, this.rot - this.viewAngle / 2 + (i * this.viewAngle / this.rayCount), this.viewRange);
            this.lookRays.push(n_ray);
            Rays.push(n_ray);
        }

        //MAP TEST

        
    }

    draw2D(ctx) {
        setColor(ctx, 255, 255, 255, 255);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();

        
    }

    

    Update() {
        if (Key["ArrowRight"]) {
            this.rot += this.rotSpeed;  //TODO: multiple Deltatime
        }

        if (Key["ArrowLeft"]) {
            this.rot -= this.rotSpeed;  //TODO: multiple Deltatime
        }

        if (Key["w"]) {

            this.x += this.walkSpeed * Math.cos(degtorad(this.rot));    //TODO: multiple Deltatime
            this.y += this.walkSpeed * Math.sin(degtorad(this.rot));    //TODO: multiple Deltatime

        } else if (Key["s"]) {

            this.x -= this.walkSpeed * Math.cos(degtorad(this.rot));    //TODO: multiple Deltatime
            this.y -= this.walkSpeed * Math.sin(degtorad(this.rot));    //TODO: multiple Deltatime
        }

        if (Key["a"]) {

            this.x -= this.walkSpeed * Math.cos(degtorad(this.rot + 90));    //TODO: multiple Deltatime
            this.y -= this.walkSpeed * Math.sin(degtorad(this.rot + 90));    //TODO: multiple Deltatime

        } else if (Key["d"]) {

            this.x -= this.walkSpeed * Math.cos(degtorad(this.rot - 90));    //TODO: multiple Deltatime
            this.y -= this.walkSpeed * Math.sin(degtorad(this.rot - 90));    //TODO: multiple Deltatime

        }


        
        //Rearranging the lookRays to their new positions.
        for (let i = 0; i < this.lookRays.length; i++) {

            this.lookRays[i].rot = this.rot - this.viewAngle / 2 + (i * this.viewAngle / this.rayCount);
            this.lookRays[i].x = this.x;
            this.lookRays[i].y = this.y;

        }
        
        // Getting all objects and rays.
        // Then, we are checking each object with each rays to detect any of them are colliding with each other.
        for (let ray_i = 0; ray_i < this.lookRays.length; ray_i++) {

            //x3,y3 => our ray's begin point
            //x4,y4 => our ray's end point
            var x3 = this.lookRays[ray_i].x;
            var y3 = this.lookRays[ray_i].y;
            var x4 = this.lookRays[ray_i].getEndPoint()[0];
            var y4 = this.lookRays[ray_i].getEndPoint()[1];

            // Defining two arrays which are our collision points and objects.
            var _collisionPoints = [];   //Intersaction points of the ray.
            var _collisionObjects = [];  //Objects which are colliding with the ray.

            for (let obj_i = 0; obj_i < Objects.length; obj_i++){
                for (let point_i = 0; point_i < Objects[obj_i].points.length-1; point_i++){

                    //x1,y1 => first point
                    //x2,y2 => second point (These two points define a wall)
                    var x1 = Objects[obj_i].points[point_i][0];
                    var y1 = Objects[obj_i].points[point_i][1];
                    var x2 = Objects[obj_i].points[point_i+1][0];
                    var y2 = Objects[obj_i].points[point_i+1][1];
                    
                    //Checking whether the ray is colliding with the wall line or not.
                    var _col = rayColCheck(x1,y1,x2,y2,x3,y3,x4,y4);

                    //If they are colliding we push the intersaction point and collision object to the arrays.
                    if (_col){
                        _collisionPoints.push(_col);
                        _collisionObjects.push(Objects[obj_i]);
                    }
                }

                //Last wall check
                var x1 = Objects[obj_i].points[Objects[obj_i].points.length-1][0];
                var y1 = Objects[obj_i].points[Objects[obj_i].points.length-1][1];
                var x2 = Objects[obj_i].points[0][0];
                var y2 = Objects[obj_i].points[0][1];
                    
                var _col = rayColCheck(x1,y1,x2,y2,x3,y3,x4,y4); //returns intersaction point [x,y]

                    if (_col){
                        _collisionPoints.push(_col);
                        _collisionObjects.push(Objects[obj_i]);
                    }
            }

            this.lookRays[ray_i].hitObjects = _collisionObjects;
            this.lookRays[ray_i].setCollisionPoints(_collisionPoints);

        }
        

    }

};