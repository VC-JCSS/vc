let img;

let shaderPred;
let shaderNegative;
let shaderLuma;
let shaderRGB;

let imgPred;
let imgNegative;
let imgLuma;
let imgRGB;

let pred = 1;
let negative = 2;
let luma = 3;
let rgb = 4;

let v = 1.0 / 9.0;



function preload() {
    shaderPred = loadShader("/vc/docs/sketches/workshops/imaging/hardware/grayScale/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/grayScale/grayScale.frag");
    shaderNegative = loadShader("/vc/docs/sketches/workshops/imaging/hardware/grayScale/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/grayScale/grayScale.frag");
    shaderLuma = loadShader("/vc/docs/sketches/workshops/imaging/hardware/grayScale/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/grayScale/grayScale.frag");
    shaderRGB = loadShader("/vc/docs/sketches/workshops/imaging/hardware/grayScale/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/grayScale/grayScale.frag");
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda2.jpg", () => img.resize(windowWidth / 2, windowHeight / 2));
}

function setup() {
    createCanvas(windowWidth - 15, windowHeight - 21);
    noLoop();

    button = createButton('FullScreen');
    button.attribute('style', 'box-shadow:inset 0px 1px 0px 0px #000000;\n' +
        '\tborder-radius:6px;\n' +
        '\tborder:1px solid #000000;\n' +
        '\tdisplay:inline-block;\n' +
        '\tcursor:pointer;\n' +
        '\tcolor:#000000;\n' +
        '\tfont-family:Arial;\n' +
        '\tfont-size:15px;\n' +
        '\tfont-weight:bold;\n' +
        '\tpadding:6px 24px;\n' +
        '\ttext-decoration:none;\n');
    button.position(3, 3);
    button.mousePressed(fullScreen);

    imgPred = shaderImage(shaderPred, pred);
    imgNegative = shaderImage(shaderNegative, negative);
    imgLuma = shaderImage(shaderLuma, luma);
    imgRGB = shaderImage(shaderRGB, rgb);
}

function draw() {

    image(imgPred, 0, 0, windowWidth / 2, windowHeight / 2);
    image(imgNegative, windowWidth / 2, 0, windowWidth / 2, windowHeight / 2);
    image(imgLuma, 0, windowHeight / 2, windowWidth / 2, windowHeight / 2);
    image(imgRGB, windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2);

    fill(255, 255, 255);
    textSize(32);
    text('Emboss', 0, 0);
    text('Outline', windowWidth / 2, 0);
    text('Blur', 0, windowHeight / 2);
    text('Sharpen', windowWidth / 2, windowHeight / 2);
}

function shaderImage(shader, grayType) {
    graphic = createGraphics(windowWidth - 15, windowHeight - 21, WEBGL);
    graphic.textureMode(NORMAL);
    graphic.shader(shader);
    shader.setUniform('texture', img);
    shader.setUniform('verticalOffset', 1 / img.height);
    shader.setUniform('horizontalOffset', 1 / img.width);
    shader.setUniform("grayType", grayType);

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