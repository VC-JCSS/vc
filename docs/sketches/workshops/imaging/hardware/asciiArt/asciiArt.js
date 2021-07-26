let img;
let shaderLuma;
let imgLuma;
let symbols;
let symbols1;
let symbols2;
let symbols3;
let symbols4;
let symbols5;
let symbols6;
let symbols7;
let symbols8;
let symbols9;
let symbols10;
let symbols11;
let symbols12;
let symbols13;
let symbols14;
let symbols15;
let debug;

function preload() {
  shaderLuma = loadShader(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/shader.vert",
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/asciiArt.frag"
  );
  img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda2.jpg");
  symbols = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/0.png"
  );
  symbols1 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/1.png"
  );
  symbols2 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/2.png"
  );
  symbols3 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/3.png"
  );
  symbols4 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/4.png"
  );
  symbols5 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/5.png"
  );
  symbols6 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/6.png"
  );
  symbols7 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/7.png"
  );
  symbols8 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/8.png"
  );
  symbols9 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/9.png"
  );
  symbols10 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/10.png"
  );
  symbols11 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/11.png"
  );
  symbols12 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/12.png"
  );
  symbols13 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/13.png"
  );
  symbols14 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/14.png"
  );
  symbols15 = loadImage(
    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/20.png"
  );
  debug = false;
}

function setup() {
  createCanvas(windowWidth - 15, windowHeight - 21);
  noLoop();
  button = createButton("FullScreen");
  button.attribute(
    "style",
    "box-shadow:inset 0px 1px 0px 0px #000000;\n" +
      "\tborder-radius:6px;\n" +
      "\tborder:1px solid #000000;\n" +
      "\tdisplay:inline-block;\n" +
      "\tcursor:pointer;\n" +
      "\tcolor:#000000;\n" +
      "\tfont-family:Arial;\n" +
      "\tfont-size:15px;\n" +
      "\tfont-weight:bold;\n" +
      "\tpadding:6px 24px;\n" +
      "\ttext-decoration:none;\n"
  );
  button.position(3, 3);
  button.mousePressed(fullScreen);

  imgLuma = shaderImage(shaderLuma);
}

function draw() {
  image(img, 0, 0, windowWidth, windowHeight);
  rect(windowWidth/2, 0, windowWidth/2, windowHeight);
  image(imgLuma, windowWidth / 2, 0, windowWidth, windowHeight);
  console.time("Ascii Art image");
  fill(255, 255, 255);
  console.timeEnd("Ascii Art image");
}

function shaderImage(shader) {
  graphic = createGraphics(windowWidth - 15, windowHeight - 21, WEBGL);
  graphic.textureMode(NORMAL);
  graphic.shader(shader);
  shader.setUniform("texture", img);
  shader.setUniform("symbols", symbols);
  shader.setUniform("symbols1", symbols1);
  shader.setUniform("symbols2", symbols2);
  shader.setUniform("symbols3", symbols3);
  shader.setUniform("symbols4", symbols4);
  shader.setUniform("symbols5", symbols5);
  shader.setUniform("symbols6", symbols6);
  shader.setUniform("symbols7", symbols7);
  shader.setUniform("symbols8", symbols8);
  shader.setUniform("symbols9", symbols9);
  shader.setUniform("symbols10", symbols10);
  shader.setUniform("symbols11", symbols11);
  shader.setUniform("symbols12", symbols12);
  shader.setUniform("symbols13", symbols13);
  shader.setUniform("symbols14", symbols14);
  shader.setUniform("symbols15", symbols15);
  shader.setUniform("verticalOffset", 1 / img.height);
  shader.setUniform("horizontalOffset", 1 / img.width);
  shader.setUniform("resolution", 160);
  shader.setUniform("debug", debug);
  graphic.beginShape();
  graphic.vertex(-width / 2, -height / 2, 0, 0);
  graphic.vertex(width / 2, -height / 2, 1, 0);
  graphic.vertex(width / 2, height / 2, 1, 1);
  graphic.vertex(-width / 2, height / 2, 0, 1);
  graphic.endShape(CLOSE);
  return graphic;
}

function fullScreen() {
  let fs = fullscreen();
  fullscreen(!fs);
}

function windowResized() {
  resizeCanvas(windowWidth - 15, windowHeight - 21);
}
