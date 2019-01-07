class Paddle extends InitProp {
	constructor(game,prop,width,height) {
		super(game,prop,width,height)
		this.x = 160
		this.y = 338
		this.speed = 2
	}

	moveLeft() {
		var o = this
		o.x-=o.speed
		if (o.x < 0) {
			o.x = 0
		}
	}
	moveRight() {
		var o = this
		o.x+=o.speed
		if (o.x + o.width >  500) {
			o.x = 500 - o.width 
		}		
	}

}

// 面向对象重构前

	// var Paddle = function (game) {
	// 	var o = game.imgByName('paddle')
	// 	o.x=160
	// 	o.y=338
	// 	o.speed=2
	// 	o.width=160
	// 	o.height=26		
	// 	o.moveLeft = function () {
	// 		o.x-=o.speed
	// 		if (o.x < 0) {
	// 			o.x = 0
	// 		}
	// 	}
	// 	o.moveRight = function () {
	// 		o.x+=o.speed
	// 		if (o.x + o.width >  500) {
	// 			o.x = 500 - o.width 
	// 		}			
	// 	}
	// 	return o
	// }
