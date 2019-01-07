class titleScene extends initScene{
	constructor(game) {
		super(game)
		game.registerAction('k',function () {
			// 开始
			var s = new MainScene(game)
			game.replaceScene(s)
			
		})		
	}

	updata() {

	}

	draw() {
		this.game.context.font = '20px Calibri'
		this.game.context.fillText('欢迎来玩,按k开始',150,200)		
	}
}