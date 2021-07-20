let rows;
let cols;
let windowSize = 700;
let actualPixels;
let borderCheckbox;

let PixelLength, sLabelPL;
let labelV0x, sliderV0x, sLabelV0x;
let labelV0y, sliderV0y, sLabelV0y;
let labelV1x, sliderV1x, sLabelV1x;
let labelV1y, sliderV1y, sLabelV1y;
let labelV2x, sliderV2x, sLabelV2x;
let labelV2y, sliderV2y, sLabelV2y;

let c0;
let c1;
let c2;

let quadrille;

function setup() {
    createCanvas(windowSize, windowSize);

    generateCheckbox('Contorno');
    generateLengthLabel('Longitud por pixel ');
    generatePositionSliders();
    generateColorPickers();

    generateQuadrille();
}

function generateCheckbox(name) {
    borderCheckbox = createCheckbox(name, false);
    borderCheckbox.position(10, 10);
    borderCheckbox.style('color', '#ffffff');
    borderCheckbox.changed(() => { if (PixelLength.value() != 1) generateQuadrille(); });
}

function generateLengthLabel(name) {
    let label = createDiv(name);
    label.position(13, 30);
    label.style('color', '#ffffff');

    PixelLength = createSlider(1, 150, 5);
    PixelLength.style('width', '80px');
    PixelLength.changed(() => {
        sLabelPL.remove();
        sLabelPL = createSpan(' ' + PixelLength.value());
        sLabelPL.parent(label);

        generatePositionSliders();
        generateQuadrille();
    });
    PixelLength.parent(label);

    sLabelPL = createSpan(' ' + PixelLength.value());
    sLabelPL.parent(label);
}

function generatePositionSliders() {

    let newpixels = Math.floor(windowSize / PixelLength.value()) - 1;

    let v1 = (sliderV0x) ? sliderV0x.value() * newpixels / actualpixels : 100 / PixelLength.value();
    let v2 = (sliderV0y) ? sliderV0y.value() * newpixels / actualpixels : 340 / PixelLength.value();
    let v3 = (sliderV1x) ? sliderV1x.value() * newpixels / actualpixels : 500 / PixelLength.value();
    let v4 = (sliderV1y) ? sliderV1y.value() * newpixels / actualpixels : 50 / PixelLength.value();
    let v5 = (sliderV2x) ? sliderV2x.value() * newpixels / actualpixels : 450 / PixelLength.value();
    let v6 = (sliderV2y) ? sliderV2y.value() * newpixels / actualpixels : 650 / PixelLength.value();

    if (labelV0x) labelV0x.remove();
    if (labelV0y) labelV0y.remove();
    if (labelV1x) labelV1x.remove();
    if (labelV1y) labelV1y.remove();
    if (labelV2x) labelV2x.remove();
    if (labelV2y) labelV2y.remove();

    [labelV0x, sliderV0x] = createLabel('X0', 0, v1, sLabelV0x);
    [labelV0y, sliderV0y] = createLabel('Y0', 1, v2, sLabelV0y);
    [labelV1x, sliderV1x] = createLabel('X1', 2, v3, sLabelV1x);
    [labelV1y, sliderV1y] = createLabel('Y1', 3, v4, sLabelV1y);
    [labelV2x, sliderV2x] = createLabel('X2', 4, v5, sLabelV2x);
    [labelV2y, sliderV2y] = createLabel('Y2', 5, v6, sLabelV2y);

    actualpixels = Math.floor(windowSize / PixelLength.value()) - 1;
}

function createLabel(name, nlabel, coord, secondaryLabel) {

    let label = createDiv('Coord ' + name + ' ');
    label.position(13, 50 + (20 * nlabel));
    label.style('color', '#ffffff');

    let slider = createSlider(0, Math.floor(windowSize / PixelLength.value()) - 1, coord);
    slider.style('width', '80px');
    slider.changed(() => {
        secondaryLabel.remove();
        secondaryLabel = createSpan(' ' + slider.value());
        secondaryLabel.parent(label);

        generateQuadrille();
    });
    slider.parent(label);

    secondaryLabel = createSpan(' ' + slider.value());
    secondaryLabel.parent(label);

    return [label, slider];
}

function generateColorPickers() {

    let label1 = createDiv('Color V0 ');
    label1.position(13, 170);
    label1.style('color', '#ffffff');

    c2 = createColorPicker(color(70, 70, 180));
    c2.style('width', '80px');
    c2.style('height', '15px');
    c2.changed(() => generateQuadrille());
    c2.parent(label1);


    let label2 = createDiv('Color V1 ');
    label2.position(13, 190);
    label2.style('color', '#ffffff');

    c0 = createColorPicker(color(0, 125, 255));
    c0.style('width', '80px');
    c0.style('height', '15px');
    c0.changed(() => generateQuadrille());
    c0.parent(label2);


    let label3 = createDiv('Color V1 ');
    label3.position(13, 210);
    label3.style('color', '#ffffff');

    c1 = createColorPicker(color(15, 255, 15));
    c1.style('width', '80px');
    c0.style('height', '15px');
    c1.changed(() => generateQuadrille());
    c1.style('height', '15px');
    c1.parent(label3);
}

function generateQuadrille() {

    rows = Math.floor(windowSize / PixelLength.value());
    cols = Math.floor(windowSize / PixelLength.value());

    background(0);

    let mat = [];
    for (let i = 0; i < cols; i++) {
        let vector = [];
        for (let j = 0; j < rows; j++) {
            vector[j] = isInside(j, i);
        }
        mat[i] = vector;
    }

    drawQuadrille(createQuadrille(mat), 0, 0, PixelLength.value(), (borderCheckbox.checked() && PixelLength.value() != 1 ? 1 : 0), color(255));
}

function isInside(px, py) {

    let f20 = (sliderV2y.value() - sliderV0y.value()) * px + (sliderV0x.value() - sliderV2x.value()) * py + (sliderV2x.value() * sliderV0y.value() - sliderV2y.value() * sliderV0x.value());
    let f01 = (sliderV0y.value() - sliderV1y.value()) * px + (sliderV1x.value() - sliderV0x.value()) * py + (sliderV0x.value() * sliderV1y.value() - sliderV0y.value() * sliderV1x.value());
    let f12 = (sliderV1y.value() - sliderV2y.value()) * px + (sliderV2x.value() - sliderV1x.value()) * py + (sliderV1x.value() * sliderV2y.value() - sliderV1y.value() * sliderV2x.value());

    if ((f01 >= 0 && f12 >= 0 && f20 >= 0) || (f12 <= 0 && f20 <= 0 && f01 <= 0)) {
        let delta = f20 + f01 + f12;
        let l0 = f20 / delta;
        let l1 = f01 / delta;
        let l2 = f12 / delta;

        let r = red(c0.color()) * l0 + red(c1.color()) * l1 + red(c2.color()) * l2;
        let g = green(c0.color()) * l0 + green(c1.color()) * l1 + green(c2.color()) * l2;
        let b = blue(c0.color()) * l0 + blue(c1.color()) * l1 + blue(c2.color()) * l2;

        return color(r, g, b, 255);
    }

    return color(0);
}