let img;

function preload() {
    colorMode(HSB)
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda2.jpg");
}

function setup() {
    createCanvas(800, 550);
    colorMode(HSB)
    noLoop();
}

function rgbToHsv(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    let d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
        h = 0; // achromatic
    } else {
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [ h, s, v ];
}

function hsvToRgb(h, s, v) {
    let r, g, b;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return [ r * 255, g * 255, b * 255 ];
}

function draw() {
    colorMode(HSB)
    img.resize(800, 550);
    image(img, 0, 0);

    let buffer = [0,0,0];
    //grey scale (rgb) -> ((r+g+b)/3, (r+g+b)/3, (r+g+b)/3)

    let d = pixelDensity();
    let npixels = 4 * (width * d) * (height * d);
    loadPixels();
    let p = 0;
    for (let i = 0; i < npixels; i += 4) {
        buffer = rgbToHsv(pixels[i],pixels[i+1],pixels[i+2]);
        // let gray = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        buffer[1] *= 0;
        buffer = hsvToRgb(buffer[0],buffer[1],buffer[2]);

        pixels[i] = buffer[0];
        pixels[i + 1] = buffer[1];
        pixels[i + 2] = buffer[2];
        pixels[i + 3] = pixels[i + 3];
    }
    updatePixels();
    //filter(GRAY);
}