class endScene extends initScene{
	constructor(game) {
		super(game)
		game.registerAction('r',function () {
			// 重新开始
			var s = new titleScene(game)
			game.replaceScene(s)
			
		})		
	}

	updata() {

	}

	draw() {
		this.game.context.font = '20px Calibri'
		this.game.context.fillText('游戏结束,按R重新开始',150,200)		
	}
}
