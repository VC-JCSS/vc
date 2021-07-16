let img;
let shaderEmboss;
let shaderBlur;
let imgEmboss;
let imgBlur;

let v = 1.0 / 9.0;

let emboss = [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2]
];

let blurM = [
    [v, v, v],
    [v, v, v],
    [v, v, v]
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
    shaderEmboss = loadShader("/vc/docs/sketches/workshops/rendering/shader.vert", "/vc/docs/sketches/workshops/rendering/kernels.frag");
    shaderBlur = loadShader("/vc/docs/sketches/workshops/rendering/shader.vert", "/vc/docs/sketches/workshops/rendering/kernels.frag");
    shaderOutline = loadShader("/vc/docs/sketches/workshops/rendering/shader.vert", "/vc/docs/sketches/workshops/rendering/kernels.frag");
    shaderSharpen = loadShader("/vc/docs/sketches/workshops/rendering/shader.vert", "/vc/docs/sketches/workshops/rendering/kernels.frag");
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
}

function setup() {
    createCanvas(windowWidth - 15, windowHeight - 21);

    // perspective(PI / 3.0, width / height, 0.1, 500);
    // ortho(-width / 2, width / 2, -height / 2, height / 2);
    // createEasyCam();

    imgEmboss = shaderImage(shaderEmboss, emboss);
    imgBlur = shaderImage(shaderBlur, blurM);
    imgOutline = shaderImage(shaderOutline, outline);
    imgSharpen = shaderImage(shaderSharpen, sharpen);
}

function draw() {
    image(imgEmboss, 0, 0, windowWidth / 2, windowHeight / 2);
    image(imgBlur, windowWidth / 2, 0, windowWidth / 2, windowHeight / 2);
    image(imgOutline, 0, windowHeight / 2, windowWidth / 2, windowHeight / 2);
    image(imgSharpen, windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2);
}

function shaderImage(shader, matrix) {
    graphic = createGraphics(windowWidth - 15, windowHeight - 21, WEBGL);
    graphic.noStroke();

    graphic.shader(shader);
    shader.setUniform('texture', img);
    shader.setUniform('verticalOffset', 1 / height);
    shader.setUniform('horizontalOffset', 1 / width);
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

function windowResized() {
    resizeCanvas(windowWidth - 15, windowHeight - 21);
}