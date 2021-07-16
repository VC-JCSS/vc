let img;
let button;
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
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
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
}

function draw() {

    img.resize(windowWidth / 2, windowHeight / 2);

    img.loadPixels();

    eImg = createImage(img.width, img.height);
    bImg = createImage(img.width, img.height);
    oImg = createImage(img.width, img.height);
    sImg = createImage(img.width, img.height);

    eImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, emboss);
            let index = 4 * (x + img.width * y);

            eImg.pixels[index] = red(c);
            eImg.pixels[index + 1] = green(c);
            eImg.pixels[index + 2] = blue(c);
            eImg.pixels[index + 3] = alpha(c);
        }
    }
    eImg.updatePixels();
    image(eImg, 0, 0);

    bImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, blurM);
            let index = 4 * (x + img.width * y);

            bImg.pixels[index] = red(c);
            bImg.pixels[index + 1] = green(c);
            bImg.pixels[index + 2] = blue(c);
            bImg.pixels[index + 3] = alpha(c);
        }
    }
    bImg.updatePixels();
    image(bImg, windowWidth / 2, 0);


    oImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, outline);
            let index = 4 * (x + img.width * y);

            oImg.pixels[index] = red(c);
            oImg.pixels[index + 1] = green(c);
            oImg.pixels[index + 2] = blue(c);
            oImg.pixels[index + 3] = alpha(c);
        }
    }
    oImg.updatePixels();
    image(oImg, 0, windowHeight / 2);

    sImg.loadPixels();
    for (let x = 1; x < img.width; x++) {
        for (let y = 1; y < img.height; y++) {
            let c = convolution(x, y, sharpen);
            let index = 4 * (x + img.width * y);

            sImg.pixels[index] = red(c);
            sImg.pixels[index + 1] = green(c);
            sImg.pixels[index + 2] = blue(c);
            sImg.pixels[index + 3] = alpha(c);
        }
    }
    sImg.updatePixels();
    image(sImg, windowWidth / 2, windowHeight / 2);

    fill(255, 255, 255);
    textSize(32);
    text('Emboss', 270, 30);
    text('Outline', 280, 310);
    text('Blur', 730, 30);
    text('Sharpen', 665, 310);

}

function convolution(x, y, matrix) {
    let rtotal = 0;
    let gtotal = 0;
    let btotal = 0;

    for (kx = -1; kx <= 1; kx++) {
        for (ky = -1; ky <= 1; ky++) {
            let xpos = x + kx;
            let ypos = y + ky;
            let r = 0;
            let g = 0;
            let b = 0;

            if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
                let index = 4 * (xpos + img.width * ypos);
                r = img.pixels[index];
                g = img.pixels[index + 1];
                b = img.pixels[index + 2];
            }

            rtotal += matrix[kx + 1][ky + 1] * r;
            gtotal += matrix[kx + 1][ky + 1] * g;
            btotal += matrix[kx + 1][ky + 1] * b;
        }
    }

    rtotal = constrain(rtotal, 0, 255);
    gtotal = constrain(gtotal, 0, 255);
    btotal = constrain(btotal, 0, 255);

    return color(rtotal, gtotal, btotal);
}

function fullScreen() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth - 15, windowHeight - 21);
}