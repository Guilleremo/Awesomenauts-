game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [270, 240, 300,50]);
				this.font = new me.Font("Ariel", 46, "white");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			draw: function(render){
				this.font.draw(render.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
			},

			update: function(dt){
				return true;
			},

			newGame: function(){
				me.input.releasePointerEvent('pointerdown', this);
				me.state.change(me.state.NEW);
			}
		})));

		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				this._super(me.Renderable, 'init', [380, 340, 280,50]);
				this.font = new me.Font("Ariel", 46, "white");
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			draw: function(render){
				this.font.draw(render.getContext(), "CONTINUE", this.pos.x, this.pos.y);
			},

			update: function(dt){
				return true;
			},

			newGame: function(){
				game.data.exp = me.save.exp;
				me.input.releasePointerEvent('pointerdown', this);
				me.state.change(me.state.LOAD);
			}
		})));

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
