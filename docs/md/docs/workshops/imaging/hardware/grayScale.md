# Basic, negative and Gray scale

## Code & Results

A continuación se muestra la imagen original y los 3 filtros implementados como resultado de una imagen.

> :Tabs
> > :Tab title=Resultado Imagen
> >
> > A continuación se muestran los resultados obtenidos aplicando las funciones que se explicarán a continuación.
> > Arriba izquierda se muestra la imagen original, arriba derecha se muestra la imagen en negativo, abajo izquierda se muestra aplicando luma, abajo derecha se muestra aplicando el promedio RGB
> >
> > > :P5 sketch=/docs/sketches/workshops/imaging/hardware/grayScale/grayScale.js, width=800, height=550
>
> >
> > :Tab title=Codigo P5.js
> >
> > ``` js | grayScale.js
> > let img;
> > 
> > let shaderPred;
> > let shaderNegative;
> > let shaderLuma;
> > let shaderRGB;
> > 
> > let imgPred;
> > let imgNegative;
> > let imgLuma;
> > let imgRGB;
> > 
> > let pred = 1;
> > let negative = 2;
> > let luma = 3;
> > let rgb = 4;
> > 
> > function preload() {
> >     shaderPred = loadShader("/vc/docs/sketches/workshops/imaging/hardware/grayScale/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/grayScale/grayScale.frag");
> >     shaderNegative = loadShader("/vc/docs/sketches/workshops/imaging/hardware/grayScale/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/grayScale/grayScale.frag");
> >     shaderLuma = loadShader("/vc/docs/sketches/workshops/imaging/hardware/grayScale/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/grayScale/grayScale.frag");
> >     shaderRGB = loadShader("/vc/docs/sketches/workshops/imaging/hardware/grayScale/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/grayScale/grayScale.frag");
> >     img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda2.jpg", () => img.resize(windowWidth / 2, windowHeight / 2));
> > }
> > 
> > function setup() {
> >     createCanvas(windowWidth - 15, windowHeight - 21);
> >     noLoop();
> > 
> >     button = createButton('FullScreen');
> >     button.attribute('style', 'box-shadow:inset 0px 1px 0px 0px #000000;\n' +
> >         '\tborder-radius:6px;\n' +
> >         '\tborder:1px solid #000000;\n' +
> >         '\tdisplay:inline-block;\n' +
> >         '\tcursor:pointer;\n' +
> >         '\tcolor:#000000;\n' +
> >         '\tfont-family:Arial;\n' +
> >         '\tfont-size:15px;\n' +
> >         '\tfont-weight:bold;\n' +
> >         '\tpadding:6px 24px;\n' +
> >         '\ttext-decoration:none;\n');
> >     button.position(3, 3);
> >     button.mousePressed(fullScreen);
> > 
> >     imgPred = shaderImage(shaderPred, pred);
> >     imgNegative = shaderImage(shaderNegative, negative);
> >     imgLuma = shaderImage(shaderLuma, luma);
> >     imgRGB = shaderImage(shaderRGB, rgb);
> > }
> > 
> > function draw() {
> > 
> >     image(imgPred, 0, 0, windowWidth / 2, windowHeight / 2);
> >     image(imgNegative, windowWidth / 2, 0, windowWidth / 2, windowHeight / 2);
> >     image(imgLuma, 0, windowHeight / 2, windowWidth / 2, windowHeight / 2);
> >     image(imgRGB, windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2);
> > 
> >     fill(255, 255, 255);
> >     textSize(32);
> >     text('Emboss', 0, 0);
> >     text('Outline', windowWidth / 2, 0);
> >     text('Blur', 0, windowHeight / 2);
> >     text('Sharpen', windowWidth / 2, windowHeight / 2);
> > 
> >     console.timeEnd("kernels");
> > }
> > 
> > function shaderImage(shader, grayType) {
> >     graphic = createGraphics(windowWidth - 15, windowHeight - 21, WEBGL);
> >     graphic.textureMode(NORMAL);
> >     graphic.shader(shader);
> >     shader.setUniform('texture', img);
> >     shader.setUniform('verticalOffset', 1 / img.height);
> >     shader.setUniform('horizontalOffset', 1 / img.width);
> >     shader.setUniform("grayType", grayType);
> >     
> >     graphic.beginShape();
> >     graphic.vertex(-width / 2, -height / 2, 0, 0);
> >     graphic.vertex(width / 2, -height / 2, 1, 0);
> >     graphic.vertex(width / 2, height / 2, 1, 1);
> >     graphic.vertex(-width / 2, height / 2, 0, 1);
> >     graphic.endShape(CLOSE);
> >     return graphic;
> > }
> > 
> > function fullScreen() {
> >     let fs = fullscreen();
> >     fullscreen(!fs);
> > }
> > 
> > function windowResized() {
> >     resizeCanvas(windowWidth - 15, windowHeight - 21);
> > }
> > ```
> 
> > :Tab title=Fragment shader
> >
> > ``` glsl | grayScale.frag
> > precision mediump float;
> > uniform sampler2D texture;
> > uniform int grayType;
> > 
> > varying vec4 vVertexColor;
> > 
> > vec4 textureColor;
> > 
> > float luma;
> > float average;
> > 
> > varying vec2 vTexCoord;
> > 
> > float sRGBtoLin(in float colorChannel) {
> >     if ( colorChannel <= 0.04045 ) {
> >         return colorChannel / 12.92;
> >     } else {
> >         return pow((( colorChannel + 0.055)/1.055),2.2);
> >     }
> > }
> > 
> > float gam_sRGB(in float v) {
> >     if(v <= 0.0031308){
> >         v *= 12.92;
> >     } else {
> >         v = (1.055 * (pow(v,1.0/2.4))) - 0.055;
> >     }
> >     return v*255.0;
> > }
> > 
> > float lumaFunc(in float r, in float g, in float b) {
> >     float rY = 0.212655;
> >     float gY = 0.715158;
> >     float bY = 0.072187;
> >     //Convert all sRGB 8 bit integer values to decimal 0.0-1.0
> >     float vR = r / 255.0;
> >     float vG = g / 255.0;
> >     float vB = b / 255.0;
> >     //Convert a gamma encoded RGB to a linear value.
> >     float rLin = sRGBtoLin(vR);
> >     float gLin = sRGBtoLin(vG);
> >     float bLin = sRGBtoLin(vB);
> >     //Find Luminance (Y)
> >     float Y = ((rY * rLin) + (gY * gLin) + (bY * bLin));
> >     //float Y = ((rY) + (gY) + (bY)) * 255.0;
> >     return gam_sRGB(Y) ;
> > }
> > 
> > void main() {
> >     textureColor = texture2D(texture, vTexCoord);
> >     if(grayType == 1){}
> >     if(grayType == 2){
> >         textureColor.r = 1.0-textureColor.r;
> >         textureColor.g = 1.0-textureColor.g;
> >         textureColor.b = 1.0-textureColor.b;
> >         textureColor.a = 1.0;
> >     }
> >     if(grayType == 3){
> >         luma = lumaFunc(textureColor.r, textureColor.g, textureColor.b);
> >         textureColor.r = luma;
> >         textureColor.g = luma;
> >         textureColor.b = luma;
> >         textureColor.a = 1.0;
> >     }
> >     if(grayType == 4){
> >         average = (textureColor.r + textureColor.g + textureColor.b) / 3.0;
> >         textureColor.r = average;
> >         textureColor.g = average;
> >         textureColor.b = average;
> >         textureColor.a = 1.0;
> >     }
> >     gl_FragColor = textureColor * vVertexColor;
> > }
> > ```
>

Adicionalmente se realizó el mismo procedimiento para video, se muestra a continuación:

> :Tabs
> > :Tab title=Resultado video
> >
> > Adicionalmente se realizó el mismo procedimiento para video, se muestra a continuación:
> >
> >
> > > :P5 sketch=/docs/sketches/workshops/imaging/hardware/grayScale/videos.js, width=640, height=485
>
> > :Tab title=Código P5.js
> >
> > ``` js | videos
> > let video;
> > let shaderVideo;
> > let interfaz;
> > 
> > let pred = 1;
> > let negative = 2;
> > let luma = 3;
> > let rgb = 4;
> > 
> > function preload() {
> >     shaderVideo = loadShader("/vc/docs/sketches/workshops/imaging/hardware/grayScale/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/grayScale/grayScale.frag");
> >     video = createVideo("/vc/docs/sketches/fingers.webm");
> > }
> > 
> > function mousePressed() {
> >     video.loop();
> > }
> > 
> > function setup() {
> >     createCanvas(640, 480, WEBGL);
> >     noStroke();
> >     video.hide();
> >     video.volume(0);
> > 
> >     cam = createCamera();
> >     cam.setPosition(320, 240, (height / 2) / tan(PI / 6));
> > 
> >     interfaz = createGraphics(640, 480);
> >     interfaz.fill(255);
> >     interfaz.textSize(25);
> >     interfaz.text('Original', 220, 35);
> >     interfaz.text('Negative', 230, 275);
> >     interfaz.text('Luma', 520, 35);
> >     interfaz.text('RGB', 535, 275);
> > 
> >     stroke(255, 255, 255);
> >     strokeWeight(11);
> >     line(0, 246, 640, 246);
> >     strokeWeight(5);
> >     line(320, 0, 320, 480);
> > 
> >     shader(shaderVideo);
> >     shaderVideo.setUniform('texture', video);
> >     shaderVideo.setUniform('verticalOffset', 1 / video.height);
> >     shaderVideo.setUniform('horizontalOffset', 1 / video.width);
> > }
> > 
> > function draw() {
> >     filterVideo(pred, 1);
> >     filterVideo(negative, 2);
> >     filterVideo(luma, 3);
> >     filterVideo(rgb, 4);
> > 
> >     image(interfaz, 0, 0);
> > }
> > 
> > function filterVideo(grayType, nVideo) {
> >     shaderVideo.setUniform('grayType', grayType);
> > 
> >     var x0 = (width / 2) * (1 - (nVideo % 2));
> >     var x1 = (width / 2) * (2 - (nVideo % 2));
> >     var y0 = (height / 2) * (Math.ceil(nVideo / 2) - 1);
> >     var y1 = (height / 2) * Math.ceil(nVideo / 2);
> > 
> >     beginShape();
> >     vertex(x0, y0, 0, 0);
> >     vertex(x1, y0, 1, 0);
> >     vertex(x1, y1, 1, 1);
> >     vertex(x0, y1, 0, 1);
> >     endShape(CLOSE);
> > }
> > ```
>

*Nota:* Para imagen y para video es usado el mismo fragment shader.

**Explicación más detallada en:** https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color




> :ToCPrevNext