class guaGame {
	constructor(images,callback) {
		this.actions = {}
		this.keydowns = {}
		this.images = images
		this.scene = null
		this.callback = callback
		this.canvas = document.querySelector("#canvas")
		this.context = canvas.getContext('2d')

		this.init()
		var self = this
		window.addEventListener("keydown",function (event) {
			self.keydowns[event.key] = true
		})

		// 按键抬起事件监听
		window.addEventListener("keyup",function (event) {
			self.keydowns[event.key] = false
		})

	}

	drawImage(prop) {
		
		this.context.drawImage(prop.img.img,prop.x,prop.y,prop.width,prop.height)
	}

	drawBlock(blocks) {
		for (var i = 0; i < blocks.length; i++) {
			var block = blocks[i]
			if (block.life > 0 ) {
				this.drawImage(block)				
			}
		}

	}

	drawText(text) {
		this.context.font = '20px Calibri'
		this.context.fillText('分数：' + text,16,377)
	}

	registerAction(key,callback) {

		this.actions[key] = callback
	}

	init() {
		var loads = []
		var names = Object.keys(this.images)
		// 载入图片
		var self = this
		for (var i = 0; i < names.length; i++) {
			(function () {
				var name = names[i]
				var path = self.images[name]
				var img = new Image()
				img.src = path
				img.onload = function () {
					self.images[name] = img
					loads.push(1)
					if (loads.length == names.length) {
						self.run()
					}
				}
			})(i)	
		}
	}

	imgByName(name) {
		var g = this
		var img = g.images[name]
		var image = {
			w:img.width,
			h:img.height,
			img:img,
		}
		return image
	}

	replaceScene(scene) {

		this.scene = scene
	}

	runWithScene(s) {
		var g = this
		this.scene = s
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

	run() {

		this.callback(this)
	}

}