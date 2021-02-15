var gameState = "start";
var term = 0;
var energy = 100;

function preload(){
	battlefieldLongerBg = loadImage("battlefield_longer_bg.png");
	battlefieldLongBg = loadImage("battlefield_long_bg.png");
	battlefieldMediumBg = loadImage("battlefield_medium_bg.png");
	storyBg = loadImage("story_bg.png");
	warBg = loadImage("war_bg.jpeg");
	endBg = loadImage("end_bg.jpeg")
	
	redButtonImg = loadImage("red_button.png");
	greenButtonImg = loadImage("green_button.png");
	yellowButtonImg = loadImage("yellow_button.png");
	
	easyPreview = loadImage("easy_preview.png");
	mediumPreview = loadImage("medium_preview.png");
	hardPreview = loadImage("hard_preview.png");

	helicopterImg = loadImage("helicopter.png");
	packageImg = loadImage("package.png");
	energyLevelBarImg = loadImage("energy_level_bar.png");

	fireballImg = loadImage("fireball_img.png");
	lightningImg = loadImage("lightning_img.png");
}

function setup() {
	createCanvas(1400,800);

	helicopter = createSprite(200,200,100,100);
	helicopter.addImage(helicopterImg);
	helicopter.scale = 0.85;

	packageObj = createSprite();
	packageObj.addImage(packageImg);
	packageObj.scale = 0.25;

	fireballsGroup = createGroup();
	lightningGroup = createGroup();
}

function draw() {
  
  if(gameState === "start"){
	background(storyBg);
	textSize(67);
	textFont("Georgia");
	stroke(random(0,255),random(0,255),random(0,255));
	strokeWeight(7);
	fill(255);
	text("A Battle Above the Field",10,100);

	if(keyDown("space")){
		gameState = "choose";
	}
	
  }

  if(gameState === "choose"){
	  background(warBg);
	  textSize(67);
	  textFont("Georgia");
	  stroke(random(0,255),random(0,255),random(0,255));
  	  strokeWeight(7);
	  fill(255);
	  text("Choose the level of difficulty:",250,200);
	  
	  image(greenButtonImg,150,300,250,250);
	  textSize(42);
	  stroke("darkgreen");
	  strokeWeight(10);
	  fill("lightgreen");
	  text("Easy",230,425);

	  image(yellowButtonImg,550,300,250,250);
	  stroke("orange");
	  strokeWeight(10);
	  fill("yellow");
	  text("Medium",597.5,425);

	  image(redButtonImg,950,300,250,250);
	  stroke("maroon");
	  strokeWeight(10);
	  fill("lightpink");
	  text("Hard",1025,425);

	  if(mouseX <= 375 && mouseX >= 175 && mouseY >= 315 && mouseY <= 515){
		image(easyPreview,130,530,300,250);
		easyInvisible = createSprite(275,410,150,150);
		easyInvisible.visible = false;
		if(mousePressedOver(easyInvisible)){
			gameState = "easyPlay";
		}
	  }
	  if(mouseX >= 575 && mouseX <= 775 && mouseY >= 315 && mouseY <= 515){
		image(mediumPreview,520,530,300,250);
		mediumInvisible = createSprite(675,410,150,150);
		mediumInvisible.visible = false;
		if(mousePressedOver(mediumInvisible)){
			gameState = "mediumPlay";
		}
	  }
	  if(mouseX >= 975 && mouseX <= 1175 && mouseY >= 315 && mouseY <= 515){
		image(hardPreview,920,530,300,250);
		hardInvisible = createSprite(1075,410,150,150);
		hardInvisible.visible = false;
		if(mousePressedOver(hardInvisible)){
			gameState = "hardPlay";
		}
	  }
	  
  }

  if(gameState === "easyPlay"){
	background(235,235,235);
	image(battlefieldMediumBg,-500,0,10000,height);
	
	drawSprites();
	helicopter.visible = true;
	camera.position.x = helicopter.x;

	textSize(40);
	fill(0);
	stroke(0);
	strokeWeight(5);
	text("Energy Level: "+energy+"%",helicopter.x-680,50);

	if(helicopter.x < 9350){
		helicopter.velocityX = 10;
		packageObj.visible = false;

		packageObj.x = helicopter.x+10;
		packageObj.y = helicopter.y+10;

		spawnLightningEasy();
		spawnFireballsEasy();

		if(keyDown(UP_ARROW) && helicopter.y >= 80){
			helicopter.y-=10;
		}
		if(keyDown(DOWN_ARROW) && helicopter.y <= height-80){
			helicopter.y+=10;
		}

		if(fireballsGroup.isTouching(helicopter)||lightningGroup.isTouching(helicopter)){
			energy-= 0.5;
		}

		if(energy <= 0){
			gameState = "end";
		}
		
	} 
	
	else {
		helicopter.velocityX = 0;
		packageObj.visible = true;

		textSize(65);
		textFont("Georgia");
		fill("lightgreen");
		strokeWeight(7);
		stroke("green");
		text("Press 1 to deliver",9540,200);
		text("the package!",9590,275);
		
		if(keyWentDown("1") && term === 0){
			term += 1;
		}
		
		if(term === 1){
			if(packageObj.y < height-50){
				packageObj.velocityY = 20;
			} else {
				packageObj.velocityY = 0;
			}
			
			textSize(80);
			fill("lightblue");
			strokeWeight(7);
			stroke("blue");
			text("Mission",helicopter.x+300,400);
			text("accomplished!",helicopter.x+180,480);

			textSize(60);
			fill("violet");
			strokeWeight(7);
			stroke("purple");
			text("Press the spacebar",helicopter.x+180,610);
			text("to play again!",helicopter.x+250,680);

			if(keyDown("space")){
				gameState = "choose";
				energy = 100;
				term = 0;
				helicopter.x = 200;
				packageObj.x = helicopter.x+10;
		        packageObj.y = helicopter.y+10;
				camera.position.x = width/2;
			}
		}
	}
  }

  if(gameState === "mediumPlay"){
	background(235,235,235);
	image(battlefieldLongBg,-500,0,20000,height);
	
	drawSprites();
	helicopter.visible = true;
	camera.position.x = helicopter.x;

	textSize(40);
	fill(0);
	stroke(0);
	strokeWeight(5);
	text("Energy Level: "+energy+"%",helicopter.x-680,50);

	if(helicopter.x < 19350){
		helicopter.velocityX = 10;
		packageObj.visible = false;

		packageObj.x = helicopter.x+10;
		packageObj.y = helicopter.y+10;

		spawnLightningMedium();
		spawnFireballsMedium();

		if(keyDown(UP_ARROW) && helicopter.y >= 80){
			helicopter.y-=10;
		}
		if(keyDown(DOWN_ARROW) && helicopter.y <= height-80){
			helicopter.y+=10;
		}

		if(fireballsGroup.isTouching(helicopter)||lightningGroup.isTouching(helicopter)){
			energy-= 0.5;
		}

		if(energy <= 0){
			gameState = "end";
		}
		
	} else {
		helicopter.velocityX = 0;
		packageObj.visible = true;

		textSize(65);
		textFont("Georgia");
		fill("lightgreen");
		strokeWeight(7);
		stroke("green");
		text("Press 1 to deliver",19540,200);
		text("the package!",19590,275);
		
		if(keyWentDown("1") && term === 0){
			term += 1;
		}
		
		if(term === 1){
			if(packageObj.y < height-50){
				packageObj.velocityY = 20;
			} else {
				packageObj.velocityY = 0;
			}
			
			textSize(80);
			fill("lightblue");
			strokeWeight(7);
			stroke("blue");
			text("Mission",helicopter.x+300,400);
			text("accomplished!",helicopter.x+180,480);

			textSize(60);
			fill("violet");
			strokeWeight(7);
			stroke("purple");
			text("Press the spacebar",helicopter.x+180,610);
			text("to play again!",helicopter.x+250,680);

			if(keyDown("space")){
				gameState = "choose";
				energy = 100;
				term = 0;
				helicopter.x = 200;
				packageObj.x = helicopter.x+10;
		        packageObj.y = helicopter.y+10;
				camera.position.x = width/2;
			}
		}
	}
  }

  if(gameState === "hardPlay"){
	background(235,235,235);
	image(battlefieldLongerBg,-500,0,40000,height);
	
	drawSprites();
	helicopter.visible = true;
	camera.position.x = helicopter.x;

	textSize(40);
	fill(0);
	stroke(0);
	strokeWeight(5);
	text("Energy Level: "+energy+"%",helicopter.x-680,50);

	if(helicopter.x < 39350){
		helicopter.velocityX = 10;
		packageObj.visible = false;

		packageObj.x = helicopter.x+10;
		packageObj.y = helicopter.y+10;

		spawnLightningHard();
		spawnFireballsHard();

		if(keyDown(UP_ARROW) && helicopter.y >= 80){
			helicopter.y-=10;
		}
		if(keyDown(DOWN_ARROW) && helicopter.y <= height-80){
			helicopter.y+=10;
		}

		if(fireballsGroup.isTouching(helicopter)||lightningGroup.isTouching(helicopter)){
			energy-= 0.5;
		}

		if(energy <= 0){
			gameState = "end";
		}
		
	} else {
		helicopter.velocityX = 0;
		packageObj.visible = true;

		textSize(65);
		textFont("Georgia");
		fill("lightgreen");
		strokeWeight(7);
		stroke("green");
		text("Press 1 to deliver",39540,200);
		text("the package!",39590,275);
		
		if(keyWentDown("1") && term === 0){
			term += 1;
		}
		
		if(term === 1){
			if(packageObj.y < height-50){
				packageObj.velocityY = 20;
			} else {
				packageObj.velocityY = 0;
			}
			
			textSize(80);
			fill("lightblue");
			strokeWeight(7);
			stroke("blue");
			text("Mission",helicopter.x+300,400);
			text("accomplished!",helicopter.x+180,480);

			textSize(60);
			fill("violet");
			strokeWeight(7);
			stroke("purple");
			text("Press the spacebar",helicopter.x+180,610);
			text("to play again!",helicopter.x+250,680);

			if(keyDown("space")){
				gameState = "choose";
				energy = 100;
				term = 0;
				helicopter.x = 200;
				packageObj.x = helicopter.x+10;
		        packageObj.y = helicopter.y+10;
				camera.position.x = width/2;
			}
		}
	}
  }

  if(gameState === "end"){
	  background(endBg);
	  energy = 100;
	  term = 0;
	  helicopter.x = 200;
	  packageObj.x = helicopter.x+10;
	  packageObj.y = helicopter.y+10;
	  camera.position.x = width/2;
	  if(keyDown("r")){
		  gameState = "choose";
	  }
	  textFont("Impact");
	  textSize(75);
	  fill(255);
	  text("Press r to play again...",400,700);
  }
  
}

function spawnFireballsEasy(){
	if(frameCount % 80 === 0 && helicopter.x <= 8400){
		fireball = createSprite(helicopter.x+700,random(150,height-50));
		fireball.addImage(fireballImg);
		fireball.lifetime = width/10;
		fireball.scale = 0.3;
		fireballsGroup.add(fireball);
	}
}

function spawnLightningEasy(){
	if(frameCount % 120 === 0 && helicopter.x <= 8400){
		lightning = createSprite(helicopter.x+700,150);
		lightning.addImage(lightningImg);
		lightning.lifetime = width/10;
		lightning.scale = random(1,1.5);
		lightningGroup.add(lightning);
	}
}

function spawnFireballsMedium(){
	if(frameCount % 70 === 0 && helicopter.x <= 18400){
		fireball = createSprite(helicopter.x+700,random(150,height-50));
		fireball.addImage(fireballImg);
		fireball.lifetime = width/10;
		fireball.scale = 0.35;
		fireballsGroup.add(fireball);
	}
}

function spawnLightningMedium(){
	if(frameCount % 110 === 0 && helicopter.x <= 18400){
		lightning = createSprite(helicopter.x+700,150);
		lightning.addImage(lightningImg);
		lightning.lifetime = width/10;
		lightning.scale = random(1.25,1.5);
		lightningGroup.add(lightning);
	}
}

function spawnFireballsHard(){
	if(frameCount % 60 === 0 && helicopter.x <= 38400){
		fireball = createSprite(helicopter.x+700,random(150,height-50));
		fireball.addImage(fireballImg);
		fireball.lifetime = width/10;
		fireball.scale = 0.375;
		fireballsGroup.add(fireball);
	}
}

function spawnLightningHard(){
	if(frameCount % 100 === 0 && helicopter.x <= 38400){
		lightning = createSprite(helicopter.x+700,150);
		lightning.addImage(lightningImg);
		lightning.lifetime = width/10;
		lightning.scale = random(1.3,1.5);
		lightningGroup.add(lightning);
	}
}