let fingers;

let outline = [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1]
];

let topSobel = [
    [1, 2, 1],
    [0, 0, 0],
    [-1, -2, -1]
];

let emboss = [
    [-2, -1, 0],
    [-1, 1, 1],
    [0, 1, 2]
];

let sharpen = [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0]
];


function preload() {
    fingers = createVideo("/vc/docs/sketches/fingers.webm");
}

function mousePressed() {
    fingers.loop();
}

function setup() {
    createCanvas(640, 480);
    fingers.hide();
}

function draw() {

    console.time("videos");

    fingers.loadPixels();
    loadPixels();

    let count = 0;

    for (let y = 1; y < fingers.height; y++) {
        count = count + 1;
        for (let x = 1; x < fingers.width; x++) {

            let c = convolution(x, y, emboss);
            let index = 4 * (x + fingers.width * (y + count));

            pixels[index] = red(c);
            pixels[index + 1] = green(c);
            pixels[index + 2] = blue(c);
            pixels[index + 3] = alpha(c);
        }
    }

    count = 0;

    for (let y = 1; y < fingers.height; y++) {
        count = count + 1;
        for (let x = 1; x < fingers.width; x++) {

            let c = convolution(x, y, topSobel);
            let index = 4 * ((x + 320) + fingers.width * (y + count));

            pixels[index] = red(c);
            pixels[index + 1] = green(c);
            pixels[index + 2] = blue(c);
            pixels[index + 3] = alpha(c);
        }
    }

    count = 0;

    for (let y = 1; y < fingers.height; y++) {
        count = count + 1;
        for (let x = 1; x < fingers.width; x++) {

            let c = convolution(x, y, outline);
            let index = 4 * (x + fingers.width * (y + 500 + count));

            pixels[index] = red(c);
            pixels[index + 1] = green(c);
            pixels[index + 2] = blue(c);
            pixels[index + 3] = alpha(c);
        }
    }

    count = 0;

    for (let y = 1; y < fingers.height; y++) {
        count = count + 1;
        for (let x = 1; x < fingers.width; x++) {

            let c = convolution(x, y, sharpen);
            let index = 4 * ((x + 320) + fingers.width * (y + 500 + count));

            pixels[index] = red(c);
            pixels[index + 1] = green(c);
            pixels[index + 2] = blue(c);
            pixels[index + 3] = alpha(c);
        }
    }
    updatePixels();

    fill(255, 255, 255);
    textSize(25);
    strokeWeight(0.1);
    text('Emboss', 220, 40);
    text('Outline', 230, 280);
    text('Top Sobel', 520, 40);
    text('Sharpen', 535, 280);

    stroke(255, 255, 255);
    strokeWeight(11);
    line(0, 246, 640, 246);
    strokeWeight(5);
    line(320, 0, 320, 480);

    console.timeEnd("videos");
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

            if ((xpos >= 0 && xpos < fingers.width) && (ypos >= 0 || ypos < fingers.height)) {
                let index = 4 * (xpos + fingers.width * ypos);
                r = fingers.pixels[index];
                g = fingers.pixels[index + 1];
                b = fingers.pixels[index + 2];
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