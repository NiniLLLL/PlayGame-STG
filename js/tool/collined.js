	var pubCollide = function (block,ball) {
		// 笨方法
		// 取小球的4点坐标
		var ballCoordinate = {
			leftTop:[ball.x,ball.y],
			rightTop:[ball.x+ball.width,ball.y],
			leftDown:[ball.x,ball.y+ball.height],
			rightDown:[ball.x+ball.width,ball.y+ball.height]
		}
		var blockCoordinate = {
			leftTop:[block.x,block.y],
			rightTop:[block.x+block.width,block.y],
			leftDown:[block.x,block.y+block.height],
			rightDown:[block.x+block.width,block.y+block.height]
		}


		// 上层碰撞区域
		if (ballCoordinate.leftDown[0]>=blockCoordinate.leftTop[0]-ball.width && ballCoordinate.rightDown[0]<=blockCoordinate.rightTop[0] + ball.width && ballCoordinate.rightDown[1] == blockCoordinate.leftTop[1]) {
			return "topCollined"
		}

		// 下层碰撞区域
		if (ballCoordinate.leftTop[0]>=blockCoordinate.leftDown[0]-ball.width && ballCoordinate.rightTop[0]<=blockCoordinate.rightDown[0] + ball.width && ballCoordinate.rightTop[1] == blockCoordinate.leftDown[1]) {
			return "topCollined"
		}

		// 左碰撞区域
		if (ballCoordinate.rightTop[1]>=blockCoordinate.leftTop[1]-ball.height && ballCoordinate.rightDown[1]<=blockCoordinate.leftDown[1] + ball.height && ballCoordinate.rightDown[0] == blockCoordinate.leftTop[0]) {
			return "leftCollined"
		}

		// 右碰撞区域
		if (ballCoordinate.leftTop[1]>=blockCoordinate.rightTop[1]-ball.height && ballCoordinate.leftDown[1]<=blockCoordinate.rightDown[1] + ball.height && ballCoordinate.leftDown[0] == blockCoordinate.rightTop[0]) {
			return "leftCollined"
		}

		return false
	}