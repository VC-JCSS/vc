var quadrille;
let img;

function preload() {
    img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
}

function setup() {
    createCanvas(800, 550);
}

function draw() {
    let quadrille = createQuadrille(200, 200);
    drawQuadrille(quadrille, 50, 50, 20, 1, color(0), true);
    //if (frameCount % 200 === 0) {
    // let scl = 8; //2 ** int(random(4));
    // quadrille = createQuadrille(20 * scl, img);
    // drawQuadrille(quadrille, 0, 0, 40 / scl, 1.6 / scl, color(0));
    //}
}