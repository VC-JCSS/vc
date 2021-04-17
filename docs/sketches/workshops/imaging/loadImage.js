let img;
let button;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();

    button = createButton('FullScreen');
    button.attribute('style','box-shadow:inset 0px 1px 0px 0px #000000;\n' +
        '\tbackground-color:transparent;\n' +
        '\tborder-radius:6px;\n' +
        '\tborder:1px solid #000000;\n' +
        '\tdisplay:inline-block;\n' +
        '\tcursor:pointer;\n' +
        '\tcolor:#000000;\n' +
        '\tfont-family:Arial;\n' +
        '\tfont-size:15px;\n' +
        '\tfont-weight:bold;\n' +
        '\tpadding:6px 24px;\n' +
        '\ttext-decoration:none;\n' );
    button.position(0, 0);
    button.mousePressed(fullScreen);
}

function draw() {
    img.resize(windowWidth, windowHeight);
    image(img, 0, 0);
}

function fullScreen() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}