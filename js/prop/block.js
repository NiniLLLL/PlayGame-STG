class Block extends InitProp {
	constructor(game,prop,width,height,p) {
		super(game,prop,width,height)
		this.x = p[0]
		this.y = p[1]
		this.life = p[2] || 1
	}

	killOneLife() {
		this.life -- 
	}
}

// 面向对象重构前
	// var Block = function (game,position) {
	// 	var p = position
	// 	var o = game.imgByName('block')
	// 	o.x=p[0]
	// 	o.y=p[1]
	// 	o.width=48
	// 	o.height=26
	// 	o.life=p[2] || 1

	// 	o.killOneLife = function () {
	// 		return o.life--
	// 	}
	// 	return o
	// }
