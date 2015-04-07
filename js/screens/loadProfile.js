game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); //TODO

		document.getElementById("input").style.visibility = "ibile";
		document.getElementById("load").style.visibility = "ibile";


		me.input.unbindKey(me.input.KEY.B);
		me.input.unbindKey(me.input.KEY.Q);
		me.input.unbindKey(me.input.KEY.E);
		me.input.unbindKey(me.input.KEY.W);
		me.input.unbindKey(me.input.KEY.A);

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [10, 10, 300,50]);
				this.font = new me.Font("Ariel", 26, "white");			
			},

			draw: function(renderer){
				this.font.draw(renderer.getContext(), "ENTER USERNAME AND PASSWORD", this.pos.x, this.pos.y);
			},

		})));

		this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
			if(action === "F1"){
				if(game.data.exp1 >= exp1cost){
					game.data.exp1 += 1;
					game.data.exp -= exp1cost;
					me.state.change(me.state.PLAY);
				}else{
					console.log("not enough expirience");
				}
			}else if(action === "F2"){

			}else if(action === "F3"){
				
			}else if(action === "F4"){
				
			}else if(action === "F5"){
				me.state.change(me.state.PLAY);
			}
		});

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	
	}
});
