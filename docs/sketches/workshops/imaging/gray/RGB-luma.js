let img;
let button;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda2.jpg");

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

function fullScreen() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    img.resize(windowWidth/2, windowHeight/2);
    noLoop();
}

function draw() {

    eImg = createImage(img.width, img.height);
    bImg = createImage(img.width, img.height);
    oImg = createImage(img.width, img.height);
    sImg = createImage(img.width, img.height);


    background(150);
    image(img, windowWidth/2, 0);
    filter(GRAY);
    //Imagen original
    let d = pixelDensity();
    let npixels = 4 * (img.width * d) * (img.height * d);
    img.loadPixels();
    eImg.loadPixels();
    for (let i = 0; i < npixels; i += 4) {

        eImg.pixels[i] = img.pixels[i];
        eImg.pixels[i + 1] = img.pixels[i + 1];
        eImg.pixels[i + 2] = img.pixels[i + 2];
        eImg.pixels[i + 3] = img.pixels[i + 3];

    }
    eImg.updatePixels();
    image(eImg, 0, 0);

    //FUncion gray de P5js


    //Luma
    oImg.loadPixels();
    for (let i = 0; i < npixels; i += 4) {
        let y = luma(img.pixels[i], img.pixels[i+1],img.pixels[i+2])
        oImg.pixels[i] = y;
        oImg.pixels[i + 1] = y;
        oImg.pixels[i + 2] = y;
        oImg.pixels[i + 3] = img.pixels[i+3];
    }
    oImg.updatePixels();
    image(oImg, 0, windowHeight/2);

    //Promedio RGB
    sImg.loadPixels();
    for (let i = 0; i < npixels; i += 4) {
        let gray = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
        sImg.pixels[i] = gray;
        sImg.pixels[i + 1] = gray;
        sImg.pixels[i + 2] = gray;
        sImg.pixels[i + 3] = img.pixels[i + 3];
    }
    sImg.updatePixels();
    image(sImg, windowWidth/2, windowHeight/2);
}

function gammaCorrected(pix) {
    let res;
    res = 255 * Math.pow(( pix / 255), (1 / 2.2));
    return res;
}

function luma(r, g, b) {

    let rY = 0.212655;
    let gY = 0.715158;
    let bY = 0.072187;
    //Convert all sRGB 8 bit integer values to decimal 0.0-1.0
    let vR = r / 255;
    let vG = g / 255;
    let vB = b / 255;
    //Convert a gamma encoded RGB to a linear value.
    let rLin = sRGBtoLin(vR)
    let gLin = sRGBtoLin(vG)
    let bLin = sRGBtoLin(vB)
    //Find Luminance (Y)
    let Y = ((rY * rLin) + (gY * gLin) + (bY * bLin));
    return Y * 255;
}

function sRGBtoLin(colorChannel) {
    if ( colorChannel <= 0.04045 ) {
        return colorChannel / 12.92;
    } else {
        return Math.pow((( colorChannel + 0.055)/1.055),2.4);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
