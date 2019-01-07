	var Scene = function (game) {

		var s = {
			paddle :Paddle(game),
			ball :Ball(game),
			blocks:[],
			score:0,
		}

		// 载入砖块
		var loadBlock = function (num) {
			var num = num-1
			var blocks = []
			for (var i = 0; i < levels[num].length; i++) {
				blocks.push(Block(game,levels[num][i]))
			}
			return blocks	
		}

		// 载入关卡
		s.loadLevel = function () {
			window.addEventListener('keydown',function (event) {
				var k = event.key
				if ("1234567".includes(k)) {
					s.blocks = loadBlock(Number(k))	
				}
			})
		}

		s.loadLevel()

		game.registerAction('a',function () {
			// 注册事件
			s.paddle.moveLeft()
		})

		game.registerAction('d',function () {
			// 注册事件
			s.paddle.moveRight()
		})

		game.registerAction('f',function () {
			// 注册事件
			s.ball.fire()
		})

		game.registerAction('k',function () {
			// 游戏开始按下K无效，知道游戏结束
		})

		game.registerAction('s',function () {
			// 注册事件
			s.ball.stop()
		})

		// 鼠标移动小球
		var dragMove = false
		// 鼠标按下
		game.canvas.addEventListener('mousedown',function (event) {
			// event.preventDefault()	
			if (s.ball.hasPoint(event.clientX,event.clientY)) {
				dragMove = true
			}
		})
		// 鼠标滑动
		game.canvas.addEventListener('mousemove',function (event) {
			if (dragMove) {
				s.ball.x = event.clientX
				s.ball.y = event.clientY
			}
		})
		// 鼠标松开
		game.canvas.addEventListener('mouseup',function (event) {
			if (s.ball.hasPoint(event.clientX,event.clientY)) {
				dragMove = false
			}
			
		})
		// 更新小球位置并判断碰撞
		s.updata = function () {
			s.ball.move()
			if (s.ball.y  + s.ball.height== 400) {
				var scene = new endScene(game)
				game.replaceScene(scene)
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

		// 画图
		s.draw = function () {	
			game.drawImage(s.paddle)
			game.drawImage(s.ball)
			game.drawBlock(s.blocks)
			game.drawText(s.score)
		}

		return s

	}