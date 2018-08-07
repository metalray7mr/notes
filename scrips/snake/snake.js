class Snake {

	constructor(d,x,y){
		this.x=x;
		this.y=y;
		this.score=0;
		this.foodxy;
		this.last=null;
		this.grid= new Grid(0,x,y);
		this.queue=[{x:10,y:10}];
		this.direction=d;
		this.brain= new NeuralNetwork(2,4,4);
		this.init();
		this.died=false;
	}

	init(){
		this.grid.set(1,10,10);
		this.last = this.queue[0];
		this.setFood();
	}
	reset(){
		this.grid= new Grid(0,this.x,this.y);
		this.queue=[{x:10,y:10}];
		this.last = this.queue[0];
		this.score=0;
		this.setFood();
	}

	insert(j=1,x,y){
	    this.grid.set(j,x,y);
	    this.queue.unshift({x,y});
		this.last = this.queue[0];
	}

	remove(){
		this.last=this.queue.pop();
		this.grid.set(0,this.last.x,this.last.y);
	}

	show(){
		for(let i=0;i<this.x;i++){
			for(let j=0;j<this.x;j++){
				switch (this.grid.get(i, j)) {
					case 0:
						fill("#fff");
						break;
					case 1:
						fill("#0ff");
						break;
					case 2:
						fill("#f00");
						break;
				}
				noStroke();
				rect(COLS*i,ROWS*j,COLS,ROWS);
			}
		}
	}

    update(){
			// each five frames update the game state.
				// pop the last element from the snake queue i.e. the
				// head
				var nx = this.last.x;
				var ny = this.last.y;
				// updates the position depending on the snake direction
				switch (this.direction) {
					case 1:
						nx--;
						break;
					case 2:
						ny--;
						break;
					case 3:
						nx++;
						break;
					case 4:
						ny++;
						break;
				}
				// checks all gameover conditions
				if (0 > nx || nx > this.grid.width-1  ||
					0 > ny || ny > this.grid.height-1 ||
					this.grid.get(nx, ny) === 1
				) {
					return this.died=true;
				}
				// check wheter the new position are on the fruit item
				if (this.grid.get(nx, ny) === 2) {
					// increment the score and sets a new fruit position
					this.score++;
					this.setFood();
				} else {
					// take out the first item from the snake queue i.e
					// the tail and remove id from grid
					this.remove();
				}
				// add a snake id at the new position and append it to
				// the snake queue
				this.grid.set(0,nx,ny);
				this.insert(1,nx, ny);
			this.think();

		}

		setFood(){
			var empty = [];
			// iterate through the grid and find all empty cells
			for (var x=0; x < this.grid.width; x++) {
				for (var y=0; y < this.grid.height; y++) {
					if (this.grid.get(x, y) === 0) {
						empty.push({x:x, y:y});
					}
				}
			}
			// chooses a random cell
			var randpos = empty[Math.round(Math.random()*(empty.length - 1))];
			this.foodxy=randpos;
			this.grid.set(2, randpos.x, randpos.y);
		}

		think(){

			let a=this.queue[length].x-this.foodxy.x;
			let b=this.queue[length].y-this.foodxy.y;
			let newPos=this.brain.predict([a,b]);
			let largest=0;
			let largestIndex=0;

			for (let i=0; i<=newPos.length;i++){
			    if (newPos[i]>largest) {
			        largest=newPos[i];
			        largestIndex=i;
			    }
			}
			console.log(largestIndex);
			this.direction=largestIndex+1;

			// let u=newPos[0]-newPos[1];
			

			// if(u > -1 && u< -0.5) {
			// 	this.direction=0;
			// }
			// if(u>-0.5 && u <0){
			// 	this.direction=1;
			// }
			// if(u>0 && u <0.5){
			// 	this.direction=2;
			// }
			// if(u>0.5 && u <1){
			// 	this.direction=3;
			// }
			// console.log(u);
			
			//this.brain.predict();
		}
}
