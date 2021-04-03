let vid;

function preload() {
    vid = createVideo("/vc/docs/sketches/fingers.webm");
}

function setup() {
    createCanvas(320, 240);
    vid.loop();
    vid.hide();
    vid.volume(0);
}

function draw() {
    image(vid, 0, 0);
    let d = pixelDensity();
    let npixels = 4 * (width * d) * (height * d);
    loadPixels();

    for (let i = 0; i < npixels; i += 4) {
        //let y = luma(pixels[i], pixels[i+1], pixels[i+2])
        pixels[i] = pixels[i];
        pixels[i + 1] = pixels[i + 1];
        pixels[i + 2] = pixels[i + 2];
        pixels[i + 3] = pixels[i+3];
    }
    updatePixels();

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