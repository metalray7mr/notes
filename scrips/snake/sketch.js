var snake;
var COLS=20;
var ROWS=20;
var population=[];

function setup(){
	createCanvas(20*20,20*20);
	for(let i=0;i<5;i++){
	snake=new Snake(1,COLS,ROWS);
	population.push(snake);
	}
	frameRate(30);
}
function draw(){
	if(population.length<1){
		return;
	}else{
		for(let i=0;i<5;i++){
			if(population[i].died){
				population.splice(i,1);
			}else{
			population[i].show();
			population[i].update();	
			}
		}
		
	}


	noFill();
	stroke(0);
	rect(0,0,20*19.97,20*19.97);

}
