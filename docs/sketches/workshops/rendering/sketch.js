const rows = 700;
const cols = 700;
const length = 1;

let quadrille;
let v0x = 450;
let v0y = 650;
let v1x = 100;
let v1y = 50;
let v2x = 500;
let v2y = 200;

function setup() {

    createCanvas(rows * length, cols * length);

    let mat = [];
    for (let i = 0; i < cols; i++) {
        let vector = [];
        for (let j = 0; j < rows; j++) {
            vector[j] = isInside(j, i);
        }
        mat[i] = vector;
    }

    quadrille = createQuadrille(mat);
}

function draw() {
    drawQuadrille(quadrille, 0, 0, length, 0, color(250));
}

function isInside(px, py) {



    let f01 = (v0y - v1y) * px + (v1x - v0x) * py + (v0x * v1y - v0y * v1x);
    let f12 = (v1y - v2y) * px + (v2x - v1x) * py + (v1x * v2y - v1y * v2x);
    let f20 = (v2y - v0y) * px + (v0x - v2x) * py + (v2x * v0y - v2y * v0x);

    if (f12 > 0 && f20 > 0 && f01 > 0) {
        let delta = f01 + f12 + f20;
        let l0 = f01 / delta;
        let l1 = f12 / delta;
        let l2 = f20 / delta;
        return color(255 * l0, 255 * l1, 255 * l2, 255);
    }

    return color(0);
}