let img;
let v = 1.0 / 9.0;
let blockSize = 3;
let count = 500;
let slider, button;

function preload() {
  img = loadImage("/vc/docs/sketches/workshops/imaging/mosaic/duck.jpg");
}

function setup() {
  createCanvas(windowWidth-15, windowHeight-21);
  noLoop();
  
  button = createButton('FullScreen');
  button.attribute('style','box-shadow:inset 0px 1px 0px 0px #000000;\n' +
      '\tborder-radius:6px;\n' +
      '\tborder:1px solid #000000;\n' +
      '\tdisplay:inline-block;\n' +
      '\tcursor:pointer;\n' +
      '\tcolor:#000000;\n' +
      '\tfont-family:Arial;\n' +
      '\tfont-size:15px;\n' +
      '\tfont-weight:bold;\n' +
      '\tpadding:6px 24px;\n' +
      '\ttext-decoration:none;\n' );
  button.position(3, 3);
  button.mousePressed(fullScreen);

  slider = createElement("input");
  slider.id("slider_proof");
  slider.attribute("type", "range");
  slider.attribute("min", "3");
  slider.attribute("max", "10");
  slider.attribute("value", "6");
  blockSize = slider.value();
  slider.position(3, 35);

  document
    .getElementById("slider_proof")
    .addEventListener("click", function () {
      blockSize = slider.value();
      console.log(slider.value());
      draw();
    });
}

function draw() {
  img.resize(windowWidth-15, windowHeight-21);
  background(255);

  img.loadPixels();

  slider.attribute('disable', '' );

  let d = pixelDensity();
  let npixels = 4 * (width * d) * (height * d);
  //text(pixels.length, 200, 200);
  for (let x = 0; x < width; x += blockSize) {
    for (let y = 0; y < height; y += blockSize) {
      scanBlock(x, y);
    }
  }
  slider.removeAttribute('disable');
}

function scanBlock(x, y) {
  let sizeDef = 4 * blockSize;
  let blockInformation = new Array(4 * blockSize);
  let index = 0;
  while (index < blockSize) {
    let startPosition = (x + y * width) * 4;
    blockInformation[index * 4] = img.pixels[startPosition];
    blockInformation[index * 4 + 1] = img.pixels[startPosition + 1];
    blockInformation[index * 4 + 2] = img.pixels[startPosition + 2];
    blockInformation[index * 4 + 3] = img.pixels[startPosition + 3];
    index++;
  }
  let res = patternDef(blockInformation);
  textSize(10);
  text(res, x, y);
}

function patternDef(blockInformation) {
  let brillos = [];
  let suma = 0;
  for (let i = 0; i < blockInformation.length; i += 4) {
    let br =
      blockInformation[i] * 0.2126 +
      blockInformation[i + 1] * 0.7152 +
      blockInformation[i + 2] * 0.0722;
    brillos.push(br);
  }

  brillos.forEach((element) => {
    suma += element;
  });
  let promedio = suma / brillos.length;
  let result = promedio / 255;
  return selectCharacter(result);
}

function selectCharacter(result) {
  if (result > 0 && result <= 0.0625) {
    return "@";
  } else if (result > 0.0625 && result <= 0.125) {
    return "M";
  } else if (result > 0.125 && result <= 0.1875) {
    return "N";
  } else if (result > 0.1875 && result <= 0.25) {
    return "H";
  } else if (result > 0.25 && result <= 0.3125) {
    return "Q";
  } else if (result > 0.3125 && result <= 0.375) {
    return "&";
  } else if (result > 0.375 && result <= 0.4375) {
    return "O";
  } else if (result > 0.4375 && result <= 0.5) {
    return "C";
  } else if (result > 0.5 && result <= 0.5625) {
    return "?";
  } else if (result > 0.5625 && result <= 0.625) {
    return "7";
  } else if (result > 0.625 && result <= 0.6875) {
    return ">";
  } else if (result > 0.6875 && result <= 0.75) {
    return "!";
  } else if (result > 0.75 && result <= 0.8125) {
    return ";";
  } else if (result > 0.8125 && result <= 0.875) {
    return ":";
  } else if (result > 0.875 && result <= 0.9375) {
    return "-";
  } else if (result > 0.9375 && result <= 0.1) {
    return ".";
  }
}

function fullScreen() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth-15, windowHeight-21);
}
