# Code & Results: Image and Video Kernels

Utilizando los conceptos explicados en laboratorios anteriores, se hace la convolución de la imagen y el video con las matrices de los kernels: Emboss, Top Sobel, Outline y Sharpen. Utilizando la GPU en lugar de la CPU.
 
> :Tabs
> > :Tab title=Kernels on Images
> > 
> > > :P5 sketch=/docs/sketches/workshops/imaging/hardware/kernels/kernels.js, width=800, height=550
>
> > :Tab title=Código p5.js
> >
> > ```js | kernels.js
> > let img;
> > 
> > let shaderEmboss;
> > let shaderTopSobel;
> > let shaderOutline;
> > let shaderSharpen;
> > 
> > let imgEmboss;
> > let imgTopSobel;
> > let imgOutline;
> > let imgSharpen;
> > 
> > let v = 1.0 / 9.0;
> > 
> > let emboss = [
> >     [-2, -1, 0],
> >     [-1, 1, 1],
> >     [0, 1, 2]
> > ];
> > 
> > let topSobel = [
> >     [1, 2, 1],
> >     [0, 0, 0],
> >     [-1, -2, -1]
> > ];
> > 
> > let outline = [
> >     [-1, -1, -1],
> >     [-1, 8, -1],
> >     [-1, -1, -1]
> > ];
> > 
> > let sharpen = [
> >     [0, -1, 0],
> >     [-1, 5, -1],
> >     [0, -1, 0]
> > ];
> > 
> > 
> > 
> > function preload() {
> >     shaderEmboss = loadShader("/vc/docs/sketches/workshops/imaging/hardware/kernels/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/kernels/kernels.frag");
> >     shaderTopSobel = loadShader("/vc/docs/sketches/workshops/imaging/hardware/kernels/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/kernels/kernels.frag");
> >     shaderOutline = loadShader("/vc/docs/sketches/workshops/imaging/hardware/kernels/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/kernels/kernels.frag");
> >     shaderSharpen = loadShader("/vc/docs/sketches/workshops/imaging/hardware/kernels/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/kernels/kernels.frag");
> >     img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg", () => img.resize(windowWidth / 2, windowHeight / 2));
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
> >     imgEmboss = shaderImage(shaderEmboss, emboss);
> >     imgTopSobel = shaderImage(shaderTopSobel, topSobel);
> >     imgOutline = shaderImage(shaderOutline, outline);
> >     imgSharpen = shaderImage(shaderSharpen, sharpen);
> > }
> > 
> > function draw() {
> >     console.time("kernels");
> > 
> >     image(imgEmboss, 0, 0, windowWidth / 2, windowHeight / 2);
> >     image(imgTopSobel, windowWidth / 2, 0, windowWidth / 2, windowHeight / 2);
> >     image(imgOutline, 0, windowHeight / 2, windowWidth / 2, windowHeight / 2);
> >     image(imgSharpen, windowWidth / 2, windowHeight / 2, windowWidth / 2, windowHeight / 2);
> > 
> >     fill(255, 255, 255);
> >     textSize(32);
> >     text('Emboss', 270, 30);
> >     text('Outline', 280, 315);
> >     text('Top Sobel', 644, 30);
> >     text('Sharpen', 665, 315);
> > 
> >     console.timeEnd("kernels");
> > }
> > 
> > function shaderImage(shader, matrix) {
> >     graphic = createGraphics(windowWidth - 15, windowHeight - 21, WEBGL);
> > 
> >     graphic.shader(shader);
> >     shader.setUniform('texture', img);
> >     shader.setUniform('verticalOffset', 1 / img.height);
> >     shader.setUniform('horizontalOffset', 1 / img.width);
> >     shader.setUniform('kernelRow1', matrix[0]);
> >     shader.setUniform('kernelRow2', matrix[1]);
> >     shader.setUniform('kernelRow3', matrix[2]);
> > 
> >     graphic.beginShape();
> >     graphic.vertex(-width / 2, -height / 2, 0, 0);
> >     graphic.vertex(width / 2, -height / 2, 1, 0);
> >     graphic.vertex(width / 2, height / 2, 1, 1);
> >     graphic.vertex(-width / 2, height / 2, 0, 1);
> >     graphic.endShape(CLOSE);
> > 
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
> > :Tab title=Vertex shader
> >
> > ```glsl | shader.vert
> > 
> > precision highp float;
> > 
> > attribute vec3 aPosition;
> > attribute vec2 aTexCoord;
> > attribute vec4 aVertexColor;
> > 
> > uniform mat4 uProjectionMatrix;
> > uniform mat4 uModelViewMatrix;
> > 
> > varying vec4 vVertexColor;
> > varying vec2 vTexCoord;
> > 
> > void main() {
> >   vVertexColor = aVertexColor;
> >   vTexCoord = aTexCoord;
> >   gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
> > }
> > 
> > ```
>
> > :Tab title=Fragment shader
> >
> > ```glsl | kernels.frag
> > 
> > 
> > precision mediump float;
> > 
> > uniform sampler2D texture;
> > uniform float verticalOffset;
> > uniform float horizontalOffset;
> > uniform vec3 kernelRow1;
> > uniform vec3 kernelRow2;
> > uniform vec3 kernelRow3;
> > 
> > mat3 kernelMatrix;
> > 
> > varying vec4 vVertexColor;
> > varying vec2 vTexCoord;
> > 
> > float constrain(in float value, in float constraint1, in float constraint2);
> > vec4 convolution();
> > 
> > void main() {
> >     kernelMatrix = mat3(kernelRow1, kernelRow2, kernelRow3);
> >     gl_FragColor = convolution() * vVertexColor;
> > }
> > 
> > float constrain(in float value, in float constraint1, in float constraint2) {
> >     return  (value>=constraint1) ? (value<=constraint2) ? value : constraint2 : constraint1;
> > }
> > 
> > vec4 convolution() {
> >     float rtotal = 0.0;
> >     float gtotal = 0.0;
> >     float btotal = 0.0;
> > 
> >     for (float kx = -1.0; kx <= 1.0; kx++) {
> >         for (float ky = -1.0; ky <= 1.0; ky++) {
> >             vec2 coords = vec2(vTexCoord.x + (kx*horizontalOffset), vTexCoord.y + (ky*verticalOffset));
> >             float r = 0.0;
> >             float g = 0.0;
> >             float b = 0.0;
> > 
> >             if ((coords.x >= 0.0 && coords.x <= 1.0) && (coords.y >= 0.0 || coords.y <= 1.0)) {
> >                 vec4 actualPixel = texture2D(texture, coords);
> >                 r = actualPixel.r;
> >                 g = actualPixel.g;
> >                 b = actualPixel.b;
> >             }
> > 
> >             rtotal += kernelMatrix[int(kx) + 1][int(ky) + 1] * r;
> >             gtotal += kernelMatrix[int(kx) + 1][int(ky) + 1] * g;
> >             btotal += kernelMatrix[int(kx) + 1][int(ky) + 1] * b;
> >         }
> >     }
> > 
> >     rtotal = constrain(rtotal, 0.0, 255.0);
> >     gtotal = constrain(gtotal, 0.0, 255.0);
> >     btotal = constrain(btotal, 0.0, 255.0);
> > 
> >     return vec4(rtotal, gtotal, btotal, 1.0);
> > }
> > 
> > ```

<br/>

> :Tabs
> > :Tab title=Kernels on Videos
> > 
> > > :P5 sketch=/docs/sketches/workshops/imaging/hardware/kernels/videos.js, width=640, height=480
>
> > :Tab title=Código p5.js
> >
> > ```js | videos.js
> > let video;
> > let shaderVideo;
> > let videofinal;
> > let interfaz;
> > 
> > let emboss = [
> >     [-2, -1, 0],
> >     [-1, 1, 1],
> >     [0, 1, 2]
> > ];
> > 
> > let topSobel = [
> >     [1, 2, 1],
> >     [0, 0, 0],
> >     [-1, -2, -1]
> > ];
> > 
> > let outline = [
> >     [-1, -1, -1],
> >     [-1, 8, -1],
> >     [-1, -1, -1]
> > ];
> > 
> > let sharpen = [
> >     [0, -1, 0],
> >     [-1, 5, -1],
> >     [0, -1, 0]
> > ];
> > 
> > 
> > 
> > function preload() {
> >     shaderVideo = loadShader("/vc/docs/sketches/workshops/imaging/hardware/kernels/shader.vert", "/vc/docs/sketches/workshops/imaging/hardware/kernels/kernels.frag");
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
> >     interfaz.text('Emboss', 220, 35);
> >     interfaz.text('Outline', 230, 275);
> >     interfaz.text('Top Sobel', 520, 35);
> >     interfaz.text('Sharpen', 535, 275);
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
> >     console.time("videos");
> > 
> >     filterVideo(emboss, 1);
> >     filterVideo(topSobel, 2);
> >     filterVideo(outline, 3);
> >     filterVideo(sharpen, 4);
> > 
> >     image(interfaz, 0, 0);
> > 
> >     console.timeEnd("videos");
> > }
> > 
> > function filterVideo(matrix, nVideo) {
> >     shaderVideo.setUniform('kernelRow1', matrix[0]);
> >     shaderVideo.setUniform('kernelRow2', matrix[1]);
> >     shaderVideo.setUniform('kernelRow3', matrix[2]);
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
> > :Tab title=Vertex shader
> >
> > ```glsl | shader.vert
> > 
> > precision highp float;
> > 
> > attribute vec3 aPosition;
> > attribute vec2 aTexCoord;
> > attribute vec4 aVertexColor;
> > 
> > uniform mat4 uProjectionMatrix;
> > uniform mat4 uModelViewMatrix;
> > 
> > varying vec4 vVertexColor;
> > varying vec2 vTexCoord;
> > 
> > void main() {
> >   vVertexColor = aVertexColor;
> >   vTexCoord = aTexCoord;
> >   gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
> > }
> > 
> > ```
>
> > :Tab title=Fragment shader
> >
> > ```glsl | kernels.frag
> > 
> > 
> > precision mediump float;
> > 
> > uniform sampler2D texture;
> > uniform float verticalOffset;
> > uniform float horizontalOffset;
> > uniform vec3 kernelRow1;
> > uniform vec3 kernelRow2;
> > uniform vec3 kernelRow3;
> > 
> > mat3 kernelMatrix;
> > 
> > varying vec4 vVertexColor;
> > varying vec2 vTexCoord;
> > 
> > float constrain(in float value, in float constraint1, in float constraint2);
> > vec4 convolution();
> > 
> > void main() {
> >     kernelMatrix = mat3(kernelRow1, kernelRow2, kernelRow3);
> >     gl_FragColor = convolution() * vVertexColor;
> > }
> > 
> > float constrain(in float value, in float constraint1, in float constraint2) {
> >     return  (value>=constraint1) ? (value<=constraint2) ? value : constraint2 : constraint1;
> > }
> > 
> > vec4 convolution() {
> >     float rtotal = 0.0;
> >     float gtotal = 0.0;
> >     float btotal = 0.0;
> > 
> >     for (float kx = -1.0; kx <= 1.0; kx++) {
> >         for (float ky = -1.0; ky <= 1.0; ky++) {
> >             vec2 coords = vec2(vTexCoord.x + (kx*horizontalOffset), vTexCoord.y + (ky*verticalOffset));
> >             float r = 0.0;
> >             float g = 0.0;
> >             float b = 0.0;
> > 
> >             if ((coords.x >= 0.0 && coords.x <= 1.0) && (coords.y >= 0.0 || coords.y <= 1.0)) {
> >                 vec4 actualPixel = texture2D(texture, coords);
> >                 r = actualPixel.r;
> >                 g = actualPixel.g;
> >                 b = actualPixel.b;
> >             }
> > 
> >             rtotal += kernelMatrix[int(kx) + 1][int(ky) + 1] * r;
> >             gtotal += kernelMatrix[int(kx) + 1][int(ky) + 1] * g;
> >             btotal += kernelMatrix[int(kx) + 1][int(ky) + 1] * b;
> >         }
> >     }
> > 
> >     rtotal = constrain(rtotal, 0.0, 255.0);
> >     gtotal = constrain(gtotal, 0.0, 255.0);
> >     btotal = constrain(btotal, 0.0, 255.0);
> > 
> >     return vec4(rtotal, gtotal, btotal, 1.0);
> > }
> > 
> > ```

<br/>


> :ToCPrevNext