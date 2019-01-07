class Ball extends InitProp {
	constructor(game,prop,width,height) {
		super(game,prop,width,height)
		this.x=144
		this.y=312
		this.speedX=1
		this.speedY=1		
		this.fired=false
	}

	fire() {
		var o = this
		o.fired = true
	}

	move() {
		var o = this
		if (o.fired) {
			if(o.x < 0 || o.x + o.width > 500){
				o.speedX = -o.speedX
			}
			if (o.y <0 || o.y + o.height > 400) {
				o.speedY = -o.speedY
			}

			o.x += o.speedX
			o.y += o.speedY
		}
	}

	// 小球碰撞函数
	collide(paddle) {
		var ball = this
		if(pubCollide(paddle,ball) == "topCollined"){
			ball.speedY = -ball.speedY
			return true
		}
		if (pubCollide(paddle,ball) == "leftCollined") {
			ball.speedX = -ball.speedX
			return true
		}		

		return false	
	}
		// 小球停止
	stop() {
		var o = this
		o.fired = false
	}

		// 判断是否在小球内部
	hasPoint(a,b){
		var o = this
		if (a >= o.x && a <= o.x + o.width) {
			if (b >= o.y && b <= o.y + o.height) {
				return true
			}
		}
		return false
	}

}


// 面向对象重构前
	// var Ball = function (game) {
	// 	var o = game.imgByName('ball')
	// 	o.x=144
	// 	o.y=312
	// 	o.speedX=1
	// 	o.speedY=1		
	// 	o.fired=false
	// 	o.width=16
	// 	o.height=13

	// 	o.fire = function () {
	// 		o.fired = true
	// 	}
	// 	o.move = function () {
	// 		if (o.fired) {
	// 			if(o.x < 0 || o.x + o.width > 500){
	// 				o.speedX = -o.speedX
	// 			}
	// 			if (o.y <0 || o.y + o.height > 400) {
	// 				o.speedY = -o.speedY
	// 			}

	// 			o.x += o.speedX
	// 			o.y += o.speedY
	// 		}
	// 	}

	// 	// 小球碰撞函数
	// 	o.collide = function (paddle) {
	// 		var ball = o
	// 		if(pubCollide(paddle,ball) == "topCollined"){
	// 			ball.speedY = -ball.speedY
	// 			return true
	// 		}
	// 		if (pubCollide(paddle,ball) == "leftCollined") {
	// 			ball.speedX = -ball.speedX
	// 			return true
	// 		}		

	// 		return false	
	// 	}
	// 	// 小球停止
	// 	o.stop = function () {
	// 		o.fired = false
	// 	}

	// 	// 判断是否在小球内部
	// 	o.hasPoint = function (a,b) {
	// 		if (a >= o.x && a <= o.x + o.width) {
	// 			if (b >= o.y && b <= o.y + o.height) {
	// 				return true
	// 			}
	// 		}
	// 		return false
	// 	}
	// 	return o		
	// }
