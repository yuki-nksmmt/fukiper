let fuki,toge;
let mic;

function preload() {
    fuki = loadImage('data/fuki.png');
    toge = loadImage('data/toge.png');
  }

function setup(){
    createCanvas(windowWidth,windowHeight);
    background(200);

    mic = new p5.AudioIn();
    mic.start();

    imageMode(CENTER);
}

function draw(){
    background(200);
    image(fuki,width/2,height/2);

    let vol = mic.getLevel();
    let h = map(vol, 0, 0.5, 0, 3);

    text(h,10,10);

    image(toge, width/2, height/2, toge.width *h, toge.height *h);
}