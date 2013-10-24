MainTestApp.controller("SVGController",
	function($scope, $rootScope,MainTestFactory){
		$scope.dots = [];
		$scope.boxHeight = []; 
		$scope.boxWidth = [];
		
		$scope.dotsCount=[];
		$scope.difficulty=[];
		
		init();
		function init(){
			$scope.boxHeight = 600; 
			$scope.boxWidth = 600;
				
			$scope.dotsCount = 1;
			$scope.difficulty = 1;
			$scope.difficulty.text = "Normal";
			$scope.dots = MainTestFactory.getDots();
			
			$scope.updateDotsCount = function(){
				var diff = $scope.dots.length -$scope.dotsCount;
				if(diff > 0){
					for(var i =0; i < diff;i++){
						$scope.removeDot();
					};
				}
				else if(diff < 0){
					for(var i = 0; i>diff;i--){
						$scope.addDot();
					};
				}
				for(var i =0; i <$scope.dots.length;i++){
					if(!$scope.dots[i].animated){
						animateRandomPath(
							$scope.dots[i], 
							$rootScope
						);
						$scope.dots[i].animated=true;
					}
				}
				$scope.updateDotSize();
			};
			$scope.addDot = function(){
				var r = $scope.difficulty*2;
				var randomX = Math.floor(Math.random()*($scope.boxWidth-r/2),r/2);
				var randomY = Math.floor(Math.random()*($scope.boxHeight-r/2),r/2);
				MainTestFactory.addDot(getRandomColor(), randomX,randomY,$scope.difficulty*10);
			};
			$scope.removeDot = function(){
				MainTestFactory.removeDot();
			};
			 $scope.updateDotSize = function(){
				 if($scope.difficulty == 0){
					 $scope.difficultyText = "Easy";
				 }
				 else if($scope.difficulty == 1){
					 $scope.difficultyText = "Normal";
				 }
				 else if($scope.difficulty == 2){
					 $scope.difficultyText = "Hard";
				 }
				 for(var i =0; i <$scope.dots.length;i++){
					 	$scope.dots[i].r = (3-$scope.difficulty)*10;
					}
			 };
			 $scope.removeClickedDot =function(dot){
				 var index = $scope.dots.indexOf(dot);
				 if(index >-1){
					 $scope.dots.splice(index,1);
					 $scope.dotsCount --;
				 }
				 else{
					 $scope.messageText ="whups";
				 }
			 };
			 $scope.updateDotsCount();
		}
	}
);
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}
function resetMovementCount(object){
	object.movementCount = 0;
	object.maxMovementCount = Math.floor((Math.random()*object.maxMovements+object.minMovements));
	object.orientation = Math.floor((Math.random()*8));
}
function animateRandomPath(object,$rootScope){
	(function tick(){
		object.movementCount++;
		if(object.movementCount == object.maxMovementCount){
			 resetMovementCount(object);
		}
		var now = new Date().getTime();
		var elapsed = (object.timestamp || now) - now;
		object.timestamp = now;
		
		move(object.orientation,elapsed,object);
		if(object.x <object.r){
			resetMovementCount(object);
			moveRight(elapsed, object);
			moveRight(elapsed, object);
		}
		if(object.x > $rootScope.boxWidth-object.r*4){
			resetMovementCount(object);
			moveLeft(elapsed, object);
			moveLeft(elapsed, object);
		}
		if(object.y <object.r){
			resetMovementCount(object);
			moveDown(elapsed, object);
			moveDown(elapsed, object);
		}
		if(object.y > $rootScope.boxHeight-object.r*4){
			resetMovementCount(object);
			moveUp(elapsed, object);
			moveUp(elapsed, object);
		}
		
		if(typeof object !="undefined"){
			requestAnimationFrame(
					function(){
						$rootScope.$apply(tick);
					}
				);
		}
		else{
			alert("whups");
		}
	})();
}
function move(orientation,elapsed,object){
	if(orientation == 0){
		moveUp(elapsed,object);
	}
	else if(orientation == 1){
		moveUp(elapsed,object);
		moveRight(elapsed,object);
	}
	else if(orientation == 2){
		moveRight(elapsed,object);
	}
	else if(orientation == 3){
		moveDown(elapsed,object);
		moveRight(elapsed,object);
	}
	else if(orientation == 4){
		moveDown(elapsed,object);
	}
	else if(orientation == 5){
		moveDown(elapsed,object);
		moveLeft(elapsed,object);
	}
	else if(orientation == 6){
		moveLeft(elapsed,object);
	}
	else if(orientation == 7){
		moveUp(elapsed,object);
		moveLeft(elapsed,object);
	}
	else{
		
	}
}
function moveUp(elapsed,object){
	object.velY = Math.abs(object.velY);
	object.y += elapsed*object.velY /1000;
}
function moveDown(elapsed,object){
	object.velY = Math.abs(object.velY)*-1;
	object.y += elapsed*object.velY /1000;
}
function moveLeft(elapsed,object){
	object.velX = Math.abs(object.velX);
	object.x += elapsed*object.velX /1000;
}
function moveRight(elapsed,object){
	object.velX = Math.abs(object.velX)*-1;
	object.x += elapsed*object.velX /1000;
}