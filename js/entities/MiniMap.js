game.MiniMap = me.Entity.extend({
	init: function(x, y, setings){
		this._super(me.Entity, "init", [x, y, {
			image: "minimap",
			width: 1032,
			height: 303,
			spritewidth: "1032",
			spriteheight: "303",
			getShape: function(){
				return (new me.Rect(0, 0, 1032, 303)).toPolygon();
			}
		}]);

		this.floating = true;
	}
});