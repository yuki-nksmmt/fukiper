var myRec = new p5.SpeechRec(); // new P5.SpeechRec object
var builder = kuromoji.builder({ dicPath: "./dict/" });
var is_recognition_activated = true;
let said = "";
let saying = "";
let sent_count = 0;
let saying_count = 0;
let history_1;
let sbox;
let font;
let i = 0;
const test_txt = "親譲りの無鉄砲で小供の時から損ばかりしている";

// const assert = require("assert");
// const kuromoji = require("kuromoji");
// const analyze = require("negaposi-analyzer-ja");

//var builder;

  // "Continuous recognition" (as opposed to one time only)
  let continuous = true;
  // If you want to try partial recognition (faster, less accurate)
  let interimResults = true;

function preload() {
    fuki = loadImage('Data/fuki.png');
    font = loadFont('Data/NotoSansJP-Medium.otf');
}

function setup(){
    createCanvas(windowWidth,windowHeight);
    background(20);
    speech_setup();

    textFont(font);

    i = width/2-(75);

    sbox = font.textBounds(saying, 0,0);
    //builder = gen_kuromoji_builder();
}

function call_speech(){
  parseResult();
  toggleSpeechRecognition();
  endSpeech();
}



function draw(){
    background(0);

    image(fuki,50,50,width/3.5,height/3);

    noFill();
    stroke(255);

    //History_flame
    /*rect(50,height/2-(30),100,30);
    for(let x=0;x<5;x++){
        rect(50,height/2+(30*x),300,30);
    }*/

    //Saying_frame
    rect(50,height-80,100,30);
    rect(50,height-50,width/2-(75),30);

    //text
    push();
    noStroke();
    fill(255);
    textSize(24);
    //History
    //text("History",60,height/2-5);
    //saying
    text("Saying",60,height-55);
    pop();

    //said text
    push();
    fill(0);
    translate(520,85);
    textAlign(CENTER);
    textSize(26);
    //textSize(36);
    textWrap(CHAR);
    scale(-1,1);
    noStroke();
    fill(0);
    //rect(0,0,410,height/3-120);
    text(said,0,0,400,220);
    pop();


    push();
    fill(255);
    noStroke();
    textSize(26);
    text(saying,i,height-25);

    if(i <= width-sbox.x){
        i = i-2;
      }
    if(-(sbox.w*2) > i){
        i = width/2;
      }

      fill(0);
      rect((width/2)-25,height-100,width,height);
      rect(0,height-100,50,height);
    pop();
}

// クリック毎に音声認識切り替えを行う
function mouseClicked(){
    toggleSpeechRecognition()
  }
