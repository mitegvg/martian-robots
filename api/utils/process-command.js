module.exports = processCommandRequest;

const Robot = require('../objects/robot');

function processCommandRequest(body,worldMargin,trail){
	return new Promise( (resolve,reject) => {
		let result;
		let commandFirst = body.commandFirst.replace(/ /g,'');
		let commandSecond = body.commandSecond.replace(/ /g,'');
		if(!commandFirst.length || commandFirst.length<3 ){
			result = false;
		} else {
			let commandFirstArray = commandFirst.split('');
			let robot = new Robot(commandFirstArray[0],commandFirstArray[1],commandFirstArray[2],worldMargin,trail);
			result = robot.x+' '+robot.y+' '+robot.direction;
			if(commandSecond.length){
				let commandSecondArray = commandSecond.split('');
				for (var i =0; i < commandSecondArray.length; i++) {
					let command = commandSecondArray[i];
					if (robot.lost==''){
						if(command=='L' || command=='R') robot.changeDirection(command)
						if(command=='F') robot.moveForward()
					}
				}

				result = robot.x+' '+robot.y+' '+robot.direction+' '+robot.lost;
				trail = robot.trail;
			}
		}
		resolve({location:result,trail:trail});
	});
}