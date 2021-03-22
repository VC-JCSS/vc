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

function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return [ h, s, l ];
}

function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
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
    for (let i = 0; i < npixels; i += 4) {
        buffer = rgbToHsl(pixels[i],pixels[i+1],pixels[i+2]);
        // let gray = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        buffer[1] *= 0;
        buffer = hslToRgb(buffer[0],buffer[1],buffer[2]);

        pixels[i] = buffer[0];
        pixels[i + 1] = buffer[1];
        pixels[i + 2] = buffer[2];
        pixels[i + 3] = pixels[i + 3];
    }
    updatePixels();
    //filter(GRAY);
}