var dog,dogimg,dogHappy,foodStock,foods;
var database;
var food1;
var gameState = "filled"
var bone,boneImg;

function preload(){

dogimg = loadImage("dogImg.png");
dogHappy = loadImage("dogImg1.png");
boneImg = loadImage("bone.png")

}

function setup() {

  createCanvas(500, 500);
    
  dog = createSprite(250,250);
  dog.addImage(dogimg);
  dog.scale = 0.3;

bone = createSprite(140,320);
bone.addImage(boneImg);
bone.scale = 0.2;
bone.visible = false;


  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

}

function draw() {

  background(46,139,87); 

  if(gameState === "filled"){

  if (keyWentDown(UP_ARROW)){

        writeStock(foods);
    dog.addImage(dogHappy);
bone.visible = true;

  }

  if (keyWentUp(UP_ARROW)){
    dog.addImage(dogimg);

    bone.visible = false;

  }

  if(gameState === "filled"){


    textSize(25);
    text("Press the up arrow key to feed the dog",30,50);

  }

}
  drawSprites();

  textSize(30);
  text("Food remaining: "+foods,150,450);

if(gameState === "refill"){

  textSize(30);
  text("Press Down arrow to refill",100,50);

}

if(keyWentUp(DOWN_ARROW) && gameState === "refill"){
    
  foods = 20;
  gameState = "filled"
  dog.addImage(dogimg);
  bone.visible = false;

}

}

function readStock(data){

  foods = data.val();

}

function writeStock(x){

  if (x<=0){

    x = 0;
    gameState = "refill"
    

  }

  else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  });

}