let img;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda2.jpg");
}

function setup() {
    createCanvas(800, 550);
    noLoop();
}

function draw() {
    img.resize(800, 550);
    image(img, 0, 0);

    //grey scale (rgb) -> ((r+g+b)/3, (r+g+b)/3, (r+g+b)/3)

    let d = pixelDensity();
    let npixels = 4 * (width * d) * (height * d);

    loadPixels();
    for (let i = 0; i < npixels; i += 4) {

        pixels[i] = Math.pow((pixels[i] / 255), (1 / 2.2)) * 255
        pixels[i+1] = Math.pow((pixels[i+1] / 255), (1 / 2.2)) * 255
        pixels[i+2] = Math.pow((pixels[i+2] / 255), (1 / 2.2)) * 255

        let gray = (pixels[i]*0.299 + pixels[i + 1]*0.587 + pixels[i + 2]*0.114);

        pixels[i] = gray;
        pixels[i + 1] = gray;
        pixels[i + 2] = gray;
        pixels[i + 3] = pixels[i + 3];

    }
    updatePixels();
    //filter(GRAY);
}