let img;

let shaderEmboss;
let shaderTopSobel;
let shaderOutline;
let shaderSharpen;

let imgEmboss;
let imgTopSobel;
let imgOutline;
let imgSharpen;

let v = 1.0 / 9.0;

let emboss = [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2]
];

let topSobel = [
    [1, 2, 1],
    [0, 0, 0],
    [-1, -2, -1]
];

let outline = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1]
];

let sharpen = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]
];



function preload() {
    shaderEmboss = loadShader("/vc/docs/sketches/workshops/imaging/hardware/kernels/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/kernels/kernels.frag");
    shaderTopSobel = loadShader("/vc/docs/sketches/workshops/imaging/hardware/kernels/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/kernels/kernels.frag");
    shaderOutline = loadShader("/vc/docs/sketches/workshops/imaging/hardware/kernels/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/kernels/kernels.frag");
    shaderSharpen = loadShader("/vc/docs/sketches/workshops/imaging/hardware/kernels/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/kernels/kernels.frag");
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg", () => img.resize(windowWidth / 2, windowHeight / 2));
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

    imgEmboss = shaderImage(shaderEmboss, emboss);
    imgTopSobel = shaderImage(shaderTopSobel, topSobel);
    imgOutline = shaderImage(shaderOutline, outline);
    imgSharpen = shaderImage(shaderSharpen, sharpen);
}

function draw() {
    console.time("kernels");

    image(imgEmboss, 0, 0, windowWidth / 2, windowHeight / 2);
    image(imgTopSobel, windowWidth / 2, 0, windowWidth / 2, windowHeight / 2);
    image(imgOutline, 0, windowHeight / 2, windowWidth / 2, windowHeight / 2);
    image(imgSharpen, windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2);

    fill(255, 255, 255);
    textSize(32);
    text('Emboss', windowWidth/2 - 120, 30);
    text('Top Sobel', windowWidth - 160, 30);
    text('Outline', windowWidth/2 - 105, windowHeight / 2 + 30);
    text('Sharpen', windowWidth - 140, windowHeight / 2 + 30);

    console.timeEnd("kernels");

}

function shaderImage(shader, matrix) {
    graphic = createGraphics(windowWidth - 15, windowHeight - 21, WEBGL);

    graphic.shader(shader);
    shader.setUniform('texture', img);
    shader.setUniform('verticalOffset', 1 / img.height);
    shader.setUniform('horizontalOffset', 1 / img.width);
    shader.setUniform('kernelRow1', matrix[0]);
    shader.setUniform('kernelRow2', matrix[1]);
    shader.setUniform('kernelRow3', matrix[2]);

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
