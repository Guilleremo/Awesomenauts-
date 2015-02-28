game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings){
        this.getSuper();
        this.setPlayerTimers();
        this.setAttributes();
		this.type = "PlayerEntity";
		
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        
		this.renderable.setCurrentAnimation("idle");
    },
    
    setSuper: function () {
    	this._super(me.Entity, 'init', [x, y, {
            image: "player",
            width: 64,
            height: 64,
            spritewidth: "64",
            spriteheight: "64",
            getShape: function(){
                return(new me.Rect(0, 0, 64, 64)).toPolygon();
            }
        }]);
    },

    setPlayerTimers: function() {
    	this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime();  //Haven't used this
    },

    setAttributes: function(){
    	this.health = game.data.playerHealth;
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		//keeps track of which direction your character is going
		this.attack = game.data.playerAttack;
    },

    setFlags: function(){
    	//Keeps track of which direction your character is going 
    	this.facing = "right";
		this.dead = false;
		this.attacking = false;
    },

    addAnimation: function(){
    	this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
    },

    update: function(delta){
        this.now = new Date().getTime();
        this.dead = checkIfDead();
        this.checkKeyPressesAndMove();
        this.setAnimation();        
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },

    checkIfDead: function(){
    	if (this.health <= 0){
        	return true;
        }
        return false;
    },

    checkKeyPressesAndMove: function(){
    	if(me.input.isKeyPressed("right")){
			this.moveRight();   
        }else if(me.input.isKeyPressed("left")){
        	this.moveLeft();
        }else{
            this.body.vel.x = 0;
        }
        //i made the character go left when the left key is pressed
        if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling){
            this.jump();
        }

        this,attacking = me.input.isKeyPressed("attack");
    },

    moveRight: function(){
    	//adds the position of my x by the velocity defined above in
	    //setVelocity() and multiplying it by me.timer.tick
		//me.timer.tick makes movement look smooth
        this.body.vel.x += this.body.accel.x * me.timer.tick;
	    this.facing = "right";
		this.flipX(true);
    },

    moveLeft: function(){
    	this.facing = "left";
	    this.body.vel.x -=this.body.accel.x * me.timer.tick;
		this.flipX(false);
    },

    jump: function(){
    	this.jumping = true;
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
    }

    setAnimation: function(){
    	if(this.attacking){
            if(!this.renderable.isCurrentAnimation("attack")){
                //sets the current animation to attack and once that is over
                //goes back to the idle animation
                this.renderable.setCurrentAnimation("attack", "idle");
                //makes it so the next time we start this sequence we begin
                //from the first animation, not from wherever we left off when we
                //switched to another animation
                this.renderable.setAnimationFrame();
            }
        }
        
        else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
             if(!this.renderable.isCurrentAnimation("walk")){
                 this.renderable.setCurrentAnimation("walk");
        	}
        }else if(!this.renderable.isCurrentAnimation("attack")){
           this.renderable.setCurrentAnimation("idle");
        }

    },

    loseHealth: function(damage){
    	this.health = this.health - damage;
    },

    collideHandler: function(response){
        if(response.b.type==='EnemyBaseEntity'){
            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;
            
            if(ydif<-40 && xdif< 70 && xdif>-35){
                this.body.falling = false;
                this.body.vel.y = -1;
            }
            else if(xdif>-35 && this.facing==='right' && (xdif<0)){
                this.body.vel.x = 0;
                //this.pos.x = this.pos.x -1;
            }else if(xdif<70 && this.facing==='left' && (xdif>0)){
                this.body.vel.x = 0;
                //this.pos.x = this.pos.x +1;
            }
            
            if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer){
                this.lastHit = this.now;
                response.b.loseHealth(game.data.playerAttack);
            }
        }else if(response.b.type==='EnemyCreep'){
        	var xdif = this.pos.x - response.b.pos.x;
        	var ydif = this.pos.x - response.b.pos.x;

        	if(xdif>0){
        		//this.pos.x = this.pos.x + 1;
        		if(this.facing==="left"){
        			this.body.vel.x = 0;
        		}
        	}else{
        		//this.pos.x = this.pos.x + 1;
        		if(this.facing==="right"){
        			this.body.vel.x = 0;
        		}
        	}
        	if(this.renderable.isCurrentAnimation("attack")&& this.now-this.lastHit >= game.data.playerAttackTimerk
        			&& (Math.abs(ydif) <=40) && 
        			(((xdif>0) && this.facing==="left") || ((xdif<0) && this.facing==="right"))
        			){
        		this.last = this.now;
        	//if the creeps health is less than our attack, execute code in if statement
        	if(response.b.health <= this.attack){
        		game.data.gold += 1;
        		console.log("Current gold; " + game.data.gold)
        	}

        		response.b.loseHealth(game.data.playerAttack);
        	}
        }
    }
});

