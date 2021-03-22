let img;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/mosaic/duck.jpg");
}

function setup() {
    createCanvas(600, 456);
    noLoop();
}

function draw() {
    img.resize(600, 456);
    image(img, 0, 0);

    //GET MAIN COLOR
    let r = 0; 
    let g = 0; 
    let b = 0;

    let d = pixelDensity();
    let npixels = 4 * (width * d) * (height * d);
    
    loadPixels();
    for (let i = 0; i < npixels; i += 4) {
        r+=pixels[i];
        g+=pixels[i+1];
        b+=pixels[i+2];
    }
    
    
    r /= (width * d) * (height * d);
    g /= (width * d) * (height * d);
    b /= (width * d) * (height * d);

    
    noStroke();     
    fill(r, g, b);
    ellipse(60,20,16,16);
    
    
}


