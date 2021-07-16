let fingers;
let shaderTexture;
let test = [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2]
];

function preload() {
    shaderTexture = loadShader("/vc/docs/sketches/workshops/rendering/shader.vert", "/vc/docs/sketches/workshops/rendering/kernels.frag");
    fingers = createVideo("/vc/docs/sketches/fingers.webm");
}

function mousePressed() {
    fingers.loop();
}

function setup() {
    createCanvas(320, 240, WEBGL);
    fingers.hide();
    fingers.volume(0);

    shader(shaderTexture);
    shaderTexture.setUniform('texture', fingers);
    shaderTexture.setUniform('verticalOffset', 1 / height);
    shaderTexture.setUniform('horizontalOffset', 1 / width);
    shaderTexture.setUniform('kernelRow1', test[0]);
    shaderTexture.setUniform('kernelRow2', test[1]);
    shaderTexture.setUniform('kernelRow3', test[2]);
}

function draw() {
    beginShape();
    vertex(-width / 2, -height / 2, 0, 0);
    vertex(width / 2, -height / 2, 1, 0);
    vertex(width / 2, height / 2, 1, 1);
    vertex(-width / 2, height / 2, 0, 1);
    endShape(CLOSE);
}

function windowResized() {
    resizeCanvas(windowWidth - 15, windowHeight - 21);
}