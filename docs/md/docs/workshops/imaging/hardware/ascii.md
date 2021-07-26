# Basic, negative and Gray scale

## Code & Results

A continuación se muestra la imagen original y los 3 filtros implementados como resultado de una imagen.

> :Tabs
> > :Tab title=Resultado Imagen
> >
> > > :P5 sketch=/docs/sketches/workshops/imaging/hardware/asciiArt/asciiArt.js, width=800, height=550
>
> > :Tab title=Codigo P5.js
> >
> > ``` js | asciiArt.js
> > let img;
> >let shaderLuma;
> >let imgLuma;
> >let symbols;
> >let symbols1;
> >let symbols2;
> >let symbols3;
> >let symbols4;
> >let symbols5;
> >let symbols6;
> >let symbols7;
> >let symbols8;
> >let symbols9;
> >let symbols10;
> >let symbols11;
> >let symbols12;
> >let symbols13;
> >let symbols14;
> >let symbols15;
> >let debug;
> >
> >function preload() {
> >  shaderLuma = loadShader(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/shader.vert",
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/asciiArt.frag"
> >  );
> >  img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda2.jpg");
> >  symbols = loadImage(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/0.png"
> >  );
> >  symbols1 = loadImage(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/1.png"
> >  );
> >  symbols2 = loadImage(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/2.png"
> >  );
> >  symbols3 = loadImage(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/3.png"
> > );
> > symbols4 = loadImage(
> >   "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/4.png"
> >  symbols5 = loadImage(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/5.png"
> >  );
> >  symbols6 = loadImage(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/6.png"
> > );
> > symbols7 = loadImage(
> >   "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/7.png"
> >  );
> >  symbols8 = loadImage(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/8.png"
> >  );
> > symbols9 = loadImage(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/9.png"
> >  );
> >  symbols10 = loadImage(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/10.png"
> > );
> > symbols11 = loadImage(
> >   "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/11.png"
> >  );
> >  symbols12 = loadImage(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/12.png"
> >  );
> >  symbols13 = loadImage(
> >   "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/13.png"
> >  );
> >  symbols14 = loadImage(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/14.png"
> >  );
> >  symbols15 = loadImage(
> >    "/vc/docs/sketches/workshops/imaging/hardware/asciiArt/symbols/20.png"
> >  );
> > debug = false;
> >}
> >
> >function setup() {
> >  createCanvas(windowWidth - 15, windowHeight - 21);
> >  noLoop();
> > button = createButton("FullScreen");
> >  button.attribute(
> >   "style",
> >   "box-shadow:inset 0px 1px 0px 0px #000000;\n" +
> >      "\tborder-radius:6px;\n" +
> >      "\tborder:1px solid #000000;\n" +
> >      "\tdisplay:inline-block;\n" +
> >      "\tcursor:pointer;\n" +
> >      "\tcolor:#000000;\n" +
> >      "\tfont-family:Arial;\n" +
> >      "\tfont-size:15px;\n" +
> >      "\tfont-weight:bo ld;\n" +
> >      "\tpadding:6px 24px;\n" +
> >      "\ttext-decoration:none;\n"
> >  );
> >  button.position(3, 3);
> >  button.mousePressed(fullScreen);
> >
> >  imgLuma = shaderImage(shaderLuma);
> >}
> >
> >function draw() {
> >  console.time("Ascii Art image");
> >  image(img, 0, 0, windowWidth, windowHeight);
> >  rect(windowWidth/2, 0, windowWidth/2, windowHeight);
> >  image(imgLuma, windowWidth / 2, 0, windowWidth, windowHeight);
> >  fill(255, 255, 255);
> >  console.timeEnd("GrayScale image");
> >}
> >
> >function shaderImage(shader) {
> >  graphic = createGraphics(windowWidth - 15, windowHeight - 21, WEBGL);
> >  graphic.textureMode(NORMAL);
> >  graphic.shader(shader);
> >  shader.setUniform("texture", img);
> >  shader.setUniform("symbols", symbols);
> >  shader.setUniform("symbols1", symbols1);
> >  shader.setUniform("symbols2", symbols2);
> >  shader.setUniform("symbols3", symbols3);
> >  shader.setUniform("symbols4", symbols4);
> >  shader.setUniform("symbols5", symbols5);
> >  shader.setUniform("symbols6", symbols6);
> >  shader.setUniform("symbols7", symbols7);
> >  shader.setUniform("symbols8", symbols8);
> >  shader.setUniform("symbols9", symbols9);
> >  shader.setUniform("symbols10", symbols10);
> >  shader.setUniform("symbols11", symbols11);
> >  shader.setUniform("symbols12", symbols12);
> >  shader.setUniform("symbols13", symbols13);
> >  shader.setUniform("symbols14", symbols14);
> >  shader.setUniform("symbols15", symbols15);
> >  shader.setUniform("verticalOffset", 1 / img.height);
> >  shader.setUniform("horizontalOffset", 1 / img.width);
> >  shader.setUniform("resolution", 160);
> >  shader.setUniform("debug", debug);
> >  graphic.beginShape();
> >  graphic.vertex(-width / 2, -height / 2, 0, 0);
> >  graphic.vertex(width / 2, -height / 2, 1, 0);
> >  graphic.vertex(width / 2, height / 2, 1, 1);
> >  graphic.vertex(-width / 2, height / 2, 0, 1);
> >  graphic.endShape(CLOSE);
> >  return graphic;
> >}
> >
> >function fullScreen() {
> >  let fs = fullscreen();
> >  fullscreen(!fs);
> >}
> >
> >function windowResized() {
> >  resizeCanvas(windowWidth - 15, windowHeight - 21);
> >}
> >
> > ```
> 
> > :Tab title=Fragment shader
> >
> > ``` glsl | asciiArt.frag
> >precision mediump float;
> >uniform sampler2D texture;
> >uniform sampler2D symbols;
> >uniform sampler2D symbols1;
> >uniform sampler2D symbols2;
> >uniform sampler2D symbols3;
> >uniform sampler2D symbols4;
> >uniform sampler2D symbols5;
> >uniform sampler2D symbols6;
> >uniform sampler2D symbols7;
> >uniform sampler2D symbols8;
> >uniform sampler2D symbols9;
> >uniform sampler2D symbols10;
> >uniform sampler2D symbols11;
> >uniform sampler2D symbols12;
> >uniform sampler2D symbols13;
> >uniform sampler2D symbols14;
> >//uniform sampler2D symbols15;
> >
> >uniform float resolution;
> >vec4 textureColor;
> >float luma;
> >varying vec2 vTexCoord;
> >varying vec4 vVertexColor;
> >
> >float sRGBtoLin(in float colorChannel) {
> >    if(colorChannel <= 0.04045) {
> >        return colorChannel / 12.92;
> >    } else {
> >        return pow(((colorChannel + 0.055) / 1.055), 2.2);
> >    }
> >}
> >
> >float gam_sRGB(in float v) {
> >    if(v <= 0.0031308) {
> >        v *= 12.92;
> >    } else {
> >        v = (1.055 * (pow(v, 1.0 / 2.4))) - 0.055;
> >    }
> >    return v * 255.0;
> >}
> >
> >float lumaFunc(in float r, in float g, in float b) {
> >    float rY = 0.212655;
> >    float gY = 0.715158;
> >    float bY = 0.072187;
> >    //Convert all sRGB 8 bit integer values to decimal 0.0-1.0
> >    float vR = r / 255.0;
> >    float vG = g / 255.0;
> >    float vB = b / 255.0;
> >    //Convert a gamma encoded RGB to a linear value.
> >    float rLin = sRGBtoLin(vR);
> >    float gLin = sRGBtoLin(vG);
> >    float bLin = sRGBtoLin(vB);
> >    //Find Luminance (Y)
> >    float Y = ((rY * rLin) + (gY * gLin) + (bY * bLin));
> >    //float Y = ((rY) + (gY) + (bY)) * 255.0;
> >    return gam_sRGB(Y);
> >}
> >
> >void main() {
> >    vec2 symbolCoord = vTexCoord * resolution;
> >    vec2 imageCoord = floor(symbolCoord);
> >    symbolCoord = symbolCoord - imageCoord;
> >    imageCoord = imageCoord * vec2(1.0) / vec2(resolution);
> >    textureColor = texture2D(texture, imageCoord);
> >
> >    luma = lumaFunc(textureColor.r, textureColor.g, textureColor.b);
> >    textureColor.r = luma;
> >    textureColor.g = luma;
> >    textureColor.b = luma;
> >    textureColor.a = 1.0;
> >    float result = luma;
> >    if(result > 0.0 && result <= 0.0625) {
> >        textureColor = texture2D(symbols, symbolCoord);
> >    } else if(result > 0.0625 && result <= 0.125) {
> >        textureColor = texture2D(symbols1, symbolCoord);
> >    } else if(result > 0.125 && result <= 0.1875) {
> >        textureColor = texture2D(symbols2, symbolCoord);
> >    } else if(result > 0.1875 && result <= 0.25) {
> >        textureColor = texture2D(symbols3, symbolCoord);
> >    } else if(result > 0.25 && result <= 0.3125) {
> >        textureColor = texture2D(symbols4, symbolCoord);
> >    } else if(result > 0.3125 && result <= 0.375) {
> >        textureColor = texture2D(symbols5, symbolCoord);
> >    } else if(result > 0.375 && result <= 0.4375) {
> >        textureColor = texture2D(symbols6, symbolCoord);
> >    } else if(result > 0.4375 && result <= 0.5) {
> >        textureColor = texture2D(symbols7, symbolCoord);
> >    } else if(result > 0.5 && result <= 0.5625) {
> >        textureColor = texture2D(symbols8, symbolCoord);
> >    } else if(result > 0.5625 && result <= 0.625) {
> >        textureColor = texture2D(symbols9, symbolCoord);
> >    } else if(result > 0.625 && result <= 0.6875) {
> >        textureColor = texture2D(symbols10, symbolCoord);
> >    } else if(result > 0.6875 && result <= 0.75) {
> >        textureColor = texture2D(symbols11, symbolCoord);
> >    } else if(result > 0.75 && result <= 0.8125) {
> >        textureColor = texture2D(symbols12, symbolCoord);
> >    } else if(result > 0.8125 && result <= 0.875) {
> >        textureColor = texture2D(symbols13, symbolCoord);
> >    } else if(result > 0.875 && result <= 0.9375) {
> >        textureColor = texture2D(symbols14, symbolCoord);
> >    }/* else if(result > 0.9375 && result <= 1.0) {
> >        textureColor = texture2D(symbols15, symbolCoord);
> >    }*/
> >    gl_FragColor = textureColor * vVertexColor;
> >}
> >
> > ```
>

> :ToCPrevNext