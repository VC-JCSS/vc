let img;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
}

function setup() {
    createCanvas(windowWidth-15, windowHeight-21);
    noLoop();

    button = createButton('FullScreen');
    button.attribute('style','box-shadow:inset 0px 1px 0px 0px #000000;\n' +
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
    button.position(3, 3);
    button.mousePressed(fullScreen);
}

function draw() {
    img.resize(windowWidth, windowHeight);
    image(img, 0, 0);

    //negative (rgb) -> (255-r,255-g,255-b)

    let d = pixelDensity();
    let npixels = 4 * (width * d) * (height * d);
    loadPixels();
    for (let i = 0; i < npixels; i += 4) {

        pixels[i] = 255 - pixels[i];
        pixels[i + 1] = 255 - pixels[i + 1];
        pixels[i + 2] = 255 - pixels[i + 2];
    }
    updatePixels();
    //filter(INVERT);
}

function fullScreen() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth-15, windowHeight-21);
}