let img;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
}

function setup() {
    createCanvas(windowWidth - 15, windowHeight - 21, WEBGL);
    perspective(PI / 3.0, width / height, 0.1, 500);
    ortho(-width / 2, width / 2, -height / 2, height / 2);
    //perspective(PI/3.0, width/height, eyeZ/10.0, eyeZ*10.0);
    createEasyCam();
}

function draw() {
    background(0);
    texture(img);
    textureMode(NORMAL);
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