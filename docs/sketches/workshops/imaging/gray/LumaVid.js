let fingers;

function preload() {
    fingers = createVideo("/vc/docs/sketches/UseTheForce.mp4");
}

function setup() {
    createCanvas(320, 240);
    //fingers.loop();
    fingers.hide();

}

function draw() {
    console.time("GrayScale vid luma");
    image(fingers,0,0);
    fingers.loadPixels();
    loadPixels();
    for (let x = 1; x < fingers.width; x++) {
        for (let y = 1; y < fingers.height; y++) {
            let index = 4 * (x + fingers.width * y);
            let lum = luma(fingers.pixels[index], fingers.pixels[index + 1],fingers.pixels[index + 2])
            pixels[index] = lum;
            pixels[index + 1] = lum;
            pixels[index + 2] = lum;
            pixels[index + 3] = fingers.pixels[index + 3];
        }
    }

    updatePixels();
    console.timeEnd("GrayScale vid luma");
}

function mousePressed() {
    fingers.loop();
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

