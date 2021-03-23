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

function lab2rgb(lab){
    var y = (lab[0] + 16) / 116,
        x = lab[1] / 500 + y,
        z = y - lab[2] / 200,
        r, g, b;

    x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
    y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
    z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);

    r = x *  3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y *  1.8758 + z *  0.0415;
    b = x *  0.0557 + y * -0.2040 + z *  1.0570;

    r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
    g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
    b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;

    return [Math.max(0, Math.min(1, r)) * 255,
        Math.max(0, Math.min(1, g)) * 255,
        Math.max(0, Math.min(1, b)) * 255]
}

function rgb2lab(rgb){
    var r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255,
        x, y, z;

    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
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
    let cond = Math.pow((6/29), 3)
    let t
    for (let i = 0; i < npixels; i += 4) {

        buffer[0] = pixels[i];
        buffer[1] = pixels[i+1];
        buffer[2] = pixels[i+2];

        let gray = pixels[i] * 0.2126 + pixels[i + 1] * 0.7152 + pixels[i + 2] * 0.0722;

        if (gray > cond) {
            t = Math.pow(gray, 1/3)
        } else {
            t = ((1/3) * Math.pow(29/6,2) * gray) + (4/29)
        }

        t = (1/100) * ((116 * t) - 116)
        buffer = rgb2lab(buffer);
        //buffer[0] = t
        buffer[1] = t
        buffer[2] = t
        buffer = lab2rgb(buffer);
        pixels[i] = buffer[0];
        pixels[i + 1] = buffer[1];
        pixels[i + 2] = buffer[2];
        pixels[i + 3] = pixels[i + 3];
    }
    updatePixels();
    //filter(GRAY);
}