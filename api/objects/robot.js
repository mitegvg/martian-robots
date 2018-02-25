module.exports = Robot;


function Robot(x,y,direction,worldMargin,trail){
	this.lost = '';
	this.trail = trail;
	this.setPosition = (x,y,direction) => {
		this.x =x;
		this.y =y;
		this.direction =direction;
	};
	this.setPosition(x,y,direction);
	this.changeDirection = (command) => {
		let directions = ['S','W','N','E'];
		if(command == 'L'){
			if(this.direction!='S')
				this.direction = directions[directions.indexOf(this.direction)-1];
			else
				this.direction = 'E';
		} else {
			if(this.direction!='E')
				this.direction = directions[directions.indexOf(this.direction)+1];
			else
				this.direction = 'S';		
		}
	};
	this.moveForward = () => {
		let originalX = this.x;
		let originalY = this.y; 
		if(this.direction=='S') this.y = parseInt(this.y)-1;
		if(this.direction=='W') this.x = parseInt(this.x)-1;
		if(this.direction=='N') this.y = parseInt(this.y)+1;
		if(this.direction=='E') this.x = parseInt(this.x)+1;
		if((this.x <0 || this.x>worldMargin.x) || (this.y <0 || this.y>worldMargin.y)){
			if(this.trail.includes( this.x+','+this.y ) ){
				this.x = originalX;
				this.y = originalY;
			} else {
				this.trail.push( this.x+','+this.y  );
				this.lost = 'LOST';
			}
		}
	};

};