	var guaGame = function (images,callback) {
		var g = {
			// 每个按键与其事件存储
			actions:{},
			// 哪个按键和按键状态存储
			keydowns:{},
			images:{},
			scene:null,
		}

		g.canvas = document.querySelector("#canvas");

		g.context = canvas.getContext('2d');

		g.drawImage = function (guapaddle) {
			// 画图
			g.context.drawImage(guapaddle.img,guapaddle.x,guapaddle.y,guapaddle.width,guapaddle.height)			
		}

		// 画砖块
		g.drawBlock = function (blocks) {
			for (var i = 0; i < blocks.length; i++) {
				var block = blocks[i]
				if (block.life > 0 ) {
					g.drawImage(block)				
				}
			}				
		}

		// 画分数
		g.drawText = function (text) {
			g.context.font = '20px Calibri'
			g.context.fillText('分数：' + text,16,377)
		}

		// 按键按下事件监听
		window.addEventListener("keydown",function (event) {
			g.keydowns[event.key] = true
		})

		// 按键抬起事件监听
		window.addEventListener("keyup",function (event) {
			g.keydowns[event.key] = false
		})	

		// 按键事件注册
		g.registerAction = function (key,callback) {
			g.actions[key] = callback
		}

		var loads = []
		var names = Object.keys(images)

		// 载入图片
		for (var i = 0; i < names.length; i++) {
			(function () {
				var name = names[i]
				var path = images[name]
				var img = new Image()
				img.src = path
				img.onload = function () {
					g.images[name] = img
					loads.push(1)
					if (loads.length == names.length) {
						g.run()
					}
				}
			})(i)	
		}	

		g.imgByName = function (name) {
			var img = g.images[name]
			var image = {
				w:img.width,
				h:img.height,
				img:img,
			}	

			return image
		}

		// 更换场景
		g.replaceScene = function (scene) {
			g.scene = scene
		}

		g.runWithScene = function (s) {
			g.scene = s
			setInterval(function () {
				// 存储器中的按键与其事件的集合
				var actions = Object.keys(g.actions)

				for (var i = 0; i < actions.length; i++) {
					var key = actions[i]
					if (g.keydowns[key]) {
						g.actions[key]()
					}
				}
				// updata
				g.scene.updata()
				// clear
				g.context.clearRect(0,0,500,400)
				// draw
				g.scene.draw()

			},1000/200)

		}		
		g.run = function () {
			callback(g)
		}

		return g
	}