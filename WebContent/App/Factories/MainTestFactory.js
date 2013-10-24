MainTestApp.factory("MainTestFactory",
	function(){
		var dots = [];
		var factory = {};
		factory.getDots = function(){
			return dots;
		};
		factory.addDot =function(color, x,y,r){
				dots.push({
					color:color,
					x:x,
					y:y,
					r:r,
					velX:100,
					velY:100,
					movementCount:0,
					maxMovementCount:10,
					minMovements:4,
					maxMovements:10,
					orientation : 0,
					animated:false,
					stroke:"#000",
					strokeWidth:2
				});
		};
		factory.removeDot = function(){
			dots.pop();
		};
		return factory;
	}	
);