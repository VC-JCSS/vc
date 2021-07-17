let video;
let shaderVideo;
let videofinal;
let interfaz;

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
    shaderVideo = loadShader("/vc/docs/sketches/workshops/rendering/shader.vert", "/vc/docs/sketches/workshops/rendering/kernels.frag");
    video = createVideo("/vc/docs/sketches/fingers.webm");
}

function mousePressed() {
    video.loop();
}

function setup() {
    createCanvas(640, 480, WEBGL);
    noStroke();
    video.hide();
    video.volume(0);

    cam = createCamera();
    cam.setPosition(320, 240, (height / 2) / tan(PI / 6));

    interfaz = createGraphics(640, 480);
    interfaz.fill(255);
    interfaz.textSize(25);
    interfaz.text('Emboss', 220, 35);
    interfaz.text('Outline', 230, 275);
    interfaz.text('Top Sobel', 520, 35);
    interfaz.text('Sharpen', 535, 275);

    stroke(255, 255, 255);
    strokeWeight(11);
    line(0, 246, 640, 246);
    strokeWeight(5);
    line(320, 0, 320, 480);

    shader(shaderVideo);
    shaderVideo.setUniform('texture', video);
    shaderVideo.setUniform('verticalOffset', 1 / video.height);
    shaderVideo.setUniform('horizontalOffset', 1 / video.width);
}

function draw() {

    shaderVideo.setUniform('kernelRow1', emboss[0]);
    shaderVideo.setUniform('kernelRow2', emboss[1]);
    shaderVideo.setUniform('kernelRow3', emboss[2]);

    beginShape();
    vertex(0, 0, 0, 0);
    vertex(width / 2, 0, 1, 0);
    vertex(width / 2, height / 2, 1, 1);
    vertex(0, height / 2, 0, 1);
    endShape(CLOSE);

    shaderVideo.setUniform('kernelRow1', blurM[0]);
    shaderVideo.setUniform('kernelRow2', blurM[1]);
    shaderVideo.setUniform('kernelRow3', blurM[2]);

    beginShape();
    vertex(width / 2, 0, 0, 0);
    vertex(width, 0, 1, 0);
    vertex(width, height / 2, 1, 1);
    vertex(width / 2, height / 2, 0, 1);
    endShape(CLOSE);

    shaderVideo.setUniform('kernelRow1', outline[0]);
    shaderVideo.setUniform('kernelRow2', outline[1]);
    shaderVideo.setUniform('kernelRow3', outline[2]);

    beginShape();
    vertex(0, height / 2, 0, 0);
    vertex(width / 2, height / 2, 1, 0);
    vertex(width / 2, height, 1, 1);
    vertex(0, height, 0, 1);
    endShape(CLOSE);

    shaderVideo.setUniform('kernelRow1', sharpen[0]);
    shaderVideo.setUniform('kernelRow2', sharpen[1]);
    shaderVideo.setUniform('kernelRow3', sharpen[2]);

    beginShape();
    vertex(width / 2, height / 2, 0, 0);
    vertex(width, height / 2, 1, 0);
    vertex(width, height, 1, 1);
    vertex(width / 2, height, 0, 1);
    endShape(CLOSE);

    image(interfaz, 0, 0);

}