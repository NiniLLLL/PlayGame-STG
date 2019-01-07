class MainScene extends initScene {
	constructor(game) {
		super(game)
		this.paddle = new Paddle(game,'paddle',160,26)
		this.ball = new Ball(game,'ball',16,13)
		this.blocks = []
		this.score = 0
		this.loadLevel()
		this.init()
	}

	loadLevel() {
		var self = this
		var loadBlock = (num) => {
			var num = num-1
			var blocks = []
			for (var i = 0; i < levels[num].length; i++) {
				blocks.push(new Block(self.game,'block',48,26,levels[num][i]))
			}
			return blocks
		}
		window.addEventListener('keydown',function (event) {
				var k = event.key
				if ("1234567".includes(k)) {
					self.blocks = loadBlock(Number(k))	
				}
			})

	}

	init() {

		var s = this
		this.game.registerAction('a',function () {
			// 注册事件
			s.paddle.moveLeft()
		})

		this.game.registerAction('d',function () {
			// 注册事件
			s.paddle.moveRight()
		})

		this.game.registerAction('f',function () {
			// 注册事件
			s.ball.fire()
		})

		this.game.registerAction('k',function () {
			// 游戏开始按下K无效，知道游戏结束
		})

		this.game.registerAction('s',function () {
			// 注册事件
			s.ball.stop()
		})

		// 鼠标移动小球
		var dragMove = false
		// 鼠标按下
		this.game.canvas.addEventListener('mousedown',function (event) {
			// event.preventDefault()	
			if (s.ball.hasPoint(event.clientX,event.clientY)) {
				dragMove = true
			}
		})
		// 鼠标滑动
		this.game.canvas.addEventListener('mousemove',function (event) {
			if (dragMove) {
				s.ball.x = event.clientX
				s.ball.y = event.clientY
			}
		})
		// 鼠标松开
		this.game.canvas.addEventListener('mouseup',function (event) {
			if (s.ball.hasPoint(event.clientX,event.clientY)) {
				dragMove = false
			}
			
		})
	}

	updata() {

		var s = this
		s.ball.move()
		if (s.ball.y  + s.ball.height== 400) {
			var scene = new endScene(this.game)
			this.game.replaceScene(scene)
			return
		}
		s.ball.collide(s.paddle)
		// 砖块碰撞
		for (var i = 0; i < s.blocks.length; i++) {
			var block = s.blocks[i]
			if (s.ball.collide(block)) {
				block.killOneLife()
				s.score +=100
				if (block.life == 0) {
					s.blocks.splice(i,1)			
				}
				
			}
		}
	}

	draw() {
		var s = this
		this.game.drawImage(s.paddle)
		this.game.drawImage(s.ball)
		this.game.drawBlock(s.blocks)
		this.game.drawText(s.score)
	}
}