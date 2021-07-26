let image;
let video;
let om;
let mosaic;
let resolution;
let video_on;
let om_on;

function preload() {
    
    image = loadImage('/vc/docs/sketches/workshops/imaging/hardware/mosaic/duck.png');
    video = createVideo(['/vc/docs/sketches/workshops/imaging/hardware/mosaic/duck.webm']);
    //   om = loadImage('/vc/docs/sketches/workshops/imaging/hardware/mosaic/html_color.jpg');
    // om = loadImage('/vc/docs/sketches/workshops/imaging/hardware/mosaic/omkara.png');
    om = loadImage('/vc/docs/sketches/workshops/imaging/hardware/mosaic/html_colors.png');


    mosaic = loadShader('/vc/docs/sketches/workshops/imaging/hardware/mosaic/shader.vert',
        '/vc/docs/sketches/workshops/imaging/hardware/mosaic/photomosaic.frag');

    video.hide();




}

function setup() {
    console.time("Mosaic: Hardware")
    createCanvas(800, 450, WEBGL);
    textureMode(NORMAL);
    noStroke();
    shader(mosaic);

    mosaic.setUniform('om', om);
    

    om_on = createCheckbox('Mosaico', false);
    om_on.changed(() => mosaic.setUniform('om_on', om_on.checked()));
    om_on.position(10, 10);

    video_on = createCheckbox('Video', false);
    video_on.changed(() => {
        if (video_on.checked()) {
            mosaic.setUniform('img', video);
            video.loop();
        } else {
            mosaic.setUniform('img', image);
        }
    });
    video_on.position(10, 30);


    mosaic.setUniform('img', image);
    resolution = createSlider(1, 200, 30, 1);
    resolution.position(10, 50);
    resolution.style('width', '80px');
    resolution.input(() => mosaic.setUniform('resolution', resolution.value()));
    mosaic.setUniform('resolution', resolution.value());

    console.log({ resolution })
    console.timeEnd("Mosaic: Hardware")
}



function draw() {
    
    background(33);
    cover(true);
    
}



function cover(texture = false) {
    beginShape();
    if (texture) {
        vertex(-width / 2, -height / 2, 0, 0, 0);
        vertex(width / 2, -height / 2, 0, 1, 0);
        vertex(width / 2, height / 2, 0, 1, 1);
        vertex(-width / 2, height / 2, 0, 0, 1);
    }
    else {
        vertex(-width / 2, -height / 2, 0);
        vertex(width / 2, -height / 2, 0);
        vertex(width / 2, height / 2, 0);
        vertex(-width / 2, height / 2, 0);
    }
    endShape(CLOSE);
}

