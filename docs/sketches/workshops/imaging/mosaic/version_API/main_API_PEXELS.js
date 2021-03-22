let img;

function preload() {
    img = loadImage("https://upload.wikimedia.org/wikipedia/commons/a/a1/Mallard2.jpg");
}

function setup() {
    createCanvas(600, 456);
    noLoop();
}

function draw() {
    img.resize(600, 456);
    image(img, 0, 0);

    let d = pixelDensity();
    
    let mosaic_part_x =30;
    let mosaic_part_y =30;

    loadPixels();

    for(let i=0; i< Math.floor(width/mosaic_part_x); i++ ){
        for(let j=0; j< Math.floor(height/mosaic_part_y); j++ ){
            let r = 0; 
            let g = 0; 
            let b = 0;

            for(let k=0; k<mosaic_part_x; k++){
                for(let l=0; l<mosaic_part_y; l++){
                    
                    let x = i*mosaic_part_x + k;
                    let y = j*mosaic_part_y + l;

                    let off = (y * width + x) * d * 4;
                    r+= pixels[off];
                    g+= pixels[off + 1];
                    b+= pixels[off + 2];
                }
            }

            r = Math.floor(r / (mosaic_part_x*mosaic_part_y));
            g = Math.floor(g / (mosaic_part_x*mosaic_part_y));
            b = Math.floor(b / (mosaic_part_x*mosaic_part_y));

            //console.log(rgbToHex(r,g,b));

            
            imageFromPexels(rgbToHex(r,g,b), i*mosaic_part_x, j*mosaic_part_y, mosaic_part_x, mosaic_part_y);
        }
    }

    
}





function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}



function rgbToHex(r, g, b) {
    return componentToHex(r) + componentToHex(g) + componentToHex(b);
}



