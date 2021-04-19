
## Image Kernels

### Background

El kernel de una imagen es una pequeña matriz cuadrada de tamaño impar que, por medio de la convolución entre el kernel y la imagen, se utiliza para aplicar distintos efectos en la imagen. La convolución es el proceso en el cual se suma cada píxel de la imagen con sus vecinos locales, teniendo en cuenta los pesos indicados por el kernel. De esta forma, si tenemos la matriz de píxeles y el kernel

> :Formula align=center
> ```
> p=\begin{bmatrix}
> 149 & 191 & 190 \\
> 164 & 195 & 200 \\
> 150 & 185 & 194 
> \end{bmatrix}
> 
>    k=\begin{bmatrix}
> 0 & -1 & 0 \\
> -1 & 5 & -1 \\
> 0 & -1 & 0 
> \end{bmatrix}
> ```

y deseamos obtener la convolución del píxel central (195), obtenemos el resultado: 

> :Formula align=center
> ```
> (191\ast -1) + (164\ast -1) + (195\ast 5) + (200\ast -1) + (185\ast -1) = 235
> ```

Así, para aplicar el filtro deseado, se toma cada uno de los píxeles de la imagen original y se reemplazan por el píxel obtenido al realizar su respectiva convolución con el kernel.

### Code & Results

#### Filters

A continuación se realiza la descripción de 4 kernels y se muestra el resultado de su convolución con una imagen.

> :Tabs
> > :Tab title=Emboss
> > 
> > Filtro que da la ilusión de profundidad y enfatiza la diferencia entre pixeles.
> > 
> > > :Formula align=center
> > > ```
> > > \begin{bmatrix}
> > > -2 & -1 & 0 \\
> > > -1 & 1 & 1 \\
> > > 0 & 1 & 2 
> > > \end{bmatrix}
> > > ```
> 
> > :Tab title=Blur
> > 
> > Filtro que desenfatiza las diferencias entre los pixeles, logrando un efecto borroso en la imagen.
> > 
> > > :Formula align=center
> > > ```
> > > \begin{bmatrix}
> > > 0.11 & 0.11 & 0.11 \\
> > > 0.11 & 0.11 & 0.11 \\
> > > 0.11 & 0.11 & 0.11 
> > > \end{bmatrix}
> > > ```
> 
> > :Tab title=Outline
> > 
> > Filtro que resalta diferencias de intensidad importantes entre los pixeles. De esta forma, un píxel cuyos píxeles vecinos tengan una intensidad similar, se verá negro al aplicar el filtro; mientras que un un píxel cuyos vecinos tengan una intensidad bastante diferente, se verá blanco.
> > 
> > > :Formula align=center
> > > ```
> > > \begin{bmatrix}
> > > -1 & -1 & -1 \\
> > > -1 & 8 & -1 \\
> > > -1 & -1 & -1 
> > > \end{bmatrix}
> > > ```
> 
> > :Tab title=Sharpen
> >
> > Filtro que enfatiza las diferencias entre los píxeles adyacentes. Con esto, se obtiene una imagen más vívida.
> >
> > > :Formula align=center
> > > ```
> > > \begin{bmatrix}
> > > 0 & -1 & 0 \\
> > > -1 & 5 & -1 \\
> > > 0 & -1 & 0 
> > > \end{bmatrix}
> > > ```
> 
> > :Tab title=Resultado
> > 
> > > :P5 sketch=/docs/sketches/workshops/imaging/kernel/convolution.js, width=800, height=550
>
> > :Tab title=Código
> >
> > ```js | convolution.js
> > let img;
> > let v = 1.0 / 9.0;
> > 
> > let emboss = [
> >     [-2, -1, 0],
> >     [-1, 1, 1],
> >     [0, 1, 2]
> > ];
> > 
> > let blurM = [
> >     [v, v, v],
> >     [v, v, v],
> >     [v, v, v]
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
> > function preload() {
> >     img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
> > }
> > 
> > function setup() {
> >     createCanvas(800, 550);
> >     img.resize(400, 275);
> >     noLoop();
> > }
> > 
> > function draw() {
> > 
> > 
> >     img.loadPixels();
> > 
> >     eImg = createImage(img.width, img.height);
> >     bImg = createImage(img.width, img.height);
> >     oImg = createImage(img.width, img.height);
> >     sImg = createImage(img.width, img.height);
> > 
> >     eImg.loadPixels();
> >     for (let x = 1; x < img.width; x++) {
> >         for (let y = 1; y < img.height; y++) {
> >             let c = convolution(x, y, emboss);
> >             let index = 4 * (x + img.width * y);
> > 
> >             eImg.pixels[index] = red(c);
> >             eImg.pixels[index + 1] = green(c);
> >             eImg.pixels[index + 2] = blue(c);
> >             eImg.pixels[index + 3] = alpha(c);
> >         }
> >     }
> >     eImg.updatePixels();
> >     image(eImg, 0, 0);
> > 
> >     bImg.loadPixels();
> >     for (let x = 1; x < img.width; x++) {
> >         for (let y = 1; y < img.height; y++) {
> >             let c = convolution(x, y, blurM);
> >             let index = 4 * (x + img.width * y);
> > 
> >             bImg.pixels[index] = red(c);
> >             bImg.pixels[index + 1] = green(c);
> >             bImg.pixels[index + 2] = blue(c);
> >             bImg.pixels[index + 3] = alpha(c);
> >         }
> >     }
> >     bImg.updatePixels();
> >     image(bImg, 400, 0);
> > 
> > 
> >     oImg.loadPixels();
> >     for (let x = 1; x < img.width; x++) {
> >         for (let y = 1; y < img.height; y++) {
> >             let c = convolution(x, y, outline);
> >             let index = 4 * (x + img.width * y);
> > 
> >             oImg.pixels[index] = red(c);
> >             oImg.pixels[index + 1] = green(c);
> >             oImg.pixels[index + 2] = blue(c);
> >             oImg.pixels[index + 3] = alpha(c);
> >         }
> >     }
> >     oImg.updatePixels();
> >     image(oImg, 0, 275);
> > 
> >     sImg.loadPixels();
> >     for (let x = 1; x < img.width; x++) {
> >         for (let y = 1; y < img.height; y++) {
> >             let c = convolution(x, y, sharpen);
> >             let index = 4 * (x + img.width * y);
> > 
> >             sImg.pixels[index] = red(c);
> >             sImg.pixels[index + 1] = green(c);
> >             sImg.pixels[index + 2] = blue(c);
> >             sImg.pixels[index + 3] = alpha(c);
> >         }
> >     }
> >     sImg.updatePixels();
> >     image(sImg, 400, 275);
> > 
> >     fill(255, 255, 255);
> >     textSize(32);
> >     text('Emboss', 270, 30);
> >     text('Outline', 280, 310);
> >     text('Blur', 730, 30);
> >     text('Sharpen', 665, 310);
> > 
> > }
> > 
> > function convolution(x, y, matrix) {
> >     let rtotal = 0;
> >     let gtotal = 0;
> >     let btotal = 0;
> > 
> >     for (kx = -1; kx <= 1; kx++) {
> >         for (ky = -1; ky <= 1; ky++) {
> >             let xpos = x + kx;
> >             let ypos = y + ky;
> >             let r = 0;
> >             let g = 0;
> >             let b = 0;
> > 
> >             if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> >                 let index = 4 * (xpos + img.width * ypos);
> >                 r = img.pixels[index];
> >                 g = img.pixels[index + 1];
> >                 b = img.pixels[index + 2];
> >             }
> > 
> >             rtotal += matrix[kx + 1][ky + 1] * r;
> >             gtotal += matrix[kx + 1][ky + 1] * g;
> >             btotal += matrix[kx + 1][ky + 1] * b;
> >         }
> >     }
> > 
> >     rtotal = constrain(rtotal, 0, 255);
> >     gtotal = constrain(gtotal, 0, 255);
> >     btotal = constrain(btotal, 0, 255);
> > 
> >     return color(rtotal, gtotal, btotal);
> > }
> > ```

#### Sobels

La aplicación de filtros no es el único uso que se le da a los kernels, pues estos también se utilizan para la "Extracción de características" de una imagen. Sobel, por ejemplo, es un tipo de kernel que se utiliza en el procesamiento de imágenes, especialmente en algoritmos de detección de bordes. En total existen 4 tipos de sobel, que se describen y se muestran a continuación.

> :Tabs
> > :Tab title=Top Sobel
> > 
> > Se utiliza para mostrar únicamente las diferencias entre un píxel con los pixeles superiores adyacentes.
> >
> > > :Formula align=center
> > > ```
> > > \begin{bmatrix}
> > > 1 & 2 & 1 \\
> > > 0 & 0 & 0 \\
> > > -1 & -2 & -1 
> > > \end{bmatrix}
> > > ```
> 
> > :Tab title=Right Sobel
> > 
> > Se utiliza para mostrar únicamente las diferencias entre un píxel con los pixeles posteriores adyacentes.
> >
> > > :Formula align=center
> > > ```
> > > \begin{bmatrix}
> > > -1 & 0 & 1 \\
> > > -2 & 0 & 2 \\
> > > -1 & 0 & 1 
> > > \end{bmatrix}
> > > ```
> 
> > :Tab title=Bottom Sobel
> > 
> > Se utiliza para mostrar únicamente las diferencias entre un píxel con los pixeles inferiores adyacentes.
> >
> > > :Formula align=center
> > > ```
> > > \begin{bmatrix}
> > > -1 & -2 & -1 \\
> > > 0 & 0 & 0 \\
> > > 1 & 2 & 1 
> > > \end{bmatrix}
> > > ```
> 
> > :Tab title=Left Sobel
> >
> > Se utiliza para mostrar únicamente las diferencias entre un píxel con los pixeles anteriores adyacentes.
> >
> > > :Formula align=center
> > > ```
> > > \begin{bmatrix}
> > > 1 & 0 & -1 \\
> > > 2 & 0 & -2 \\
> > > 1 & 0 & -1 
> > > \end{bmatrix}
> > > ```
> 
> > :Tab title=Resultado
> > 
> > > :P5 sketch=/docs/sketches/workshops/imaging/kernel/sobels.js, width=800, height=550
>
> > :Tab title=Código
> >
> > ```js | sobels.js
> > let img;
> > 
> > let topS = [
> >     [1, 2, 1],
> >     [0, 0, 0],
> >     [-1, -2, -1]
> > ];
> > 
> > let rigthS = [
> >     [-1, 0, 1],
> >     [-2, 0, 2],
> >     [-1, 0, 1]
> > ];
> > 
> > let bottomS = [
> >     [-1, -2, -1],
> >     [0, 0, 0],
> >     [1, 2, 1]
> > ];
> > 
> > let leftS = [
> >     [1, 0, -1],
> >     [2, 0, -2],
> >     [1, 0, -1]
> > ];
> > 
> > function preload() {
> >     img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
> > }
> > 
> > function setup() {
> >     createCanvas(800, 550);
> >     img.resize(400, 275);
> >     noLoop();
> > }
> > 
> > function draw() {
> > 
> >     img.loadPixels();
> > 
> >     tImg = createImage(img.width, img.height);
> >     rImg = createImage(img.width, img.height);
> >     bImg = createImage(img.width, img.height);
> >     lImg = createImage(img.width, img.height);
> > 
> >     tImg.loadPixels();
> >     for (let x = 1; x < img.width; x++) {
> >         for (let y = 1; y < img.height; y++) {
> >             let c = convolution(x, y, topS);
> >             let index = 4 * (x + img.width * y);
> > 
> >             tImg.pixels[index] = red(c);
> >             tImg.pixels[index + 1] = green(c);
> >             tImg.pixels[index + 2] = blue(c);
> >             tImg.pixels[index + 3] = alpha(c);
> >         }
> >     }
> >     tImg.updatePixels();
> >     image(tImg, 0, 0);
> > 
> >     rImg.loadPixels();
> >     for (let x = 1; x < img.width; x++) {
> >         for (let y = 1; y < img.height; y++) {
> >             let c = convolution(x, y, rigthS);
> >             let index = 4 * (x + img.width * y);
> > 
> >             rImg.pixels[index] = red(c);
> >             rImg.pixels[index + 1] = green(c);
> >             rImg.pixels[index + 2] = blue(c);
> >             rImg.pixels[index + 3] = alpha(c);
> >         }
> >     }
> >     rImg.updatePixels();
> >     image(rImg, 400, 0);
> > 
> > 
> >     bImg.loadPixels();
> >     for (let x = 1; x < img.width; x++) {
> >         for (let y = 1; y < img.height; y++) {
> >             let c = convolution(x, y, bottomS);
> >             let index = 4 * (x + img.width * y);
> > 
> >             bImg.pixels[index] = red(c);
> >             bImg.pixels[index + 1] = green(c);
> >             bImg.pixels[index + 2] = blue(c);
> >             bImg.pixels[index + 3] = alpha(c);
> >         }
> >     }
> >     bImg.updatePixels();
> >     image(bImg, 0, 275);
> > 
> >     lImg.loadPixels();
> >     for (let x = 1; x < img.width; x++) {
> >         for (let y = 1; y < img.height; y++) {
> >             let c = convolution(x, y, leftS);
> >             let index = 4 * (x + img.width * y);
> > 
> >             lImg.pixels[index] = red(c);
> >             lImg.pixels[index + 1] = green(c);
> >             lImg.pixels[index + 2] = blue(c);
> >             lImg.pixels[index + 3] = alpha(c);
> >         }
> >     }
> >     lImg.updatePixels();
> >     image(lImg, 400, 275);
> > 
> >     fill(255, 255, 255);
> >     textSize(32);
> >     text('Top', 330, 30);
> >     text('Bottom', 280, 310);
> >     text('Right', 710, 30);
> >     text('Left', 730, 310);
> > 
> > }
> > 
> > function convolution(x, y, matrix) {
> >     let rtotal = 0;
> >     let gtotal = 0;
> >     let btotal = 0;
> > 
> >     for (kx = -1; kx <= 1; kx++) {
> >         for (ky = -1; ky <= 1; ky++) {
> >             let xpos = x + kx;
> >             let ypos = y + ky;
> >             let r = 0;
> >             let g = 0;
> >             let b = 0;
> > 
> >             if ((xpos >= 0 && xpos < img.width) && (ypos >= 0 || ypos < img.height)) {
> >                 let index = 4 * (xpos + img.width * ypos);
> >                 r = img.pixels[index];
> >                 g = img.pixels[index + 1];
> >                 b = img.pixels[index + 2];
> >             }
> > 
> >             rtotal += matrix[kx + 1][ky + 1] * r;
> >             gtotal += matrix[kx + 1][ky + 1] * g;
> >             btotal += matrix[kx + 1][ky + 1] * b;
> >         }
> >     }
> > 
> >     rtotal = constrain(rtotal, 0, 255);
> >     gtotal = constrain(gtotal, 0, 255);
> >     btotal = constrain(btotal, 0, 255);
> > 
> >     return color(rtotal, gtotal, btotal);
> > }
> > ```

#### Kernels on Videos

Adicionalmente, estos kernel pueden ser utilizados en el procesamiento de videos.

> :Tabs
> > :Tab title=Resultado
> > 
> > > :P5 sketch=/docs/sketches/workshops/imaging/kernel/videos.js, width=640, height=480
>
> > :Tab title=Código
> >
> > ```js | videos.js
> > let fingers;
> > 
> > let outline = [
> >     [-1, -1, -1],
> >     [-1, 8, -1],
> >     [-1, -1, -1]
> > ];
> > 
> > let topSobel = [
> >     [1, 2, 1],
> >     [0, 0, 0],
> >     [-1, -2, -1]
> > ];
> > 
> > let emboss = [
> >     [-2, -1, 0],
> >     [-1, 1, 1],
> >     [0, 1, 2]
> > ];
> > 
> > let sharpen = [
> >     [0, -1, 0],
> >     [-1, 5, -1],
> >     [0, -1, 0]
> > ];
> > 
> > 
> > function preload() {
> >     fingers = createVideo("/vc/docs/sketches/fingers.webm");
> > }
> > 
> > function mousePressed() {
> >     fingers.loop();
> > }
> > 
> > function setup() {
> >     createCanvas(640, 480);
> >     fingers.hide();
> > }
> > 
> > function draw() {
> > 
> >     fingers.loadPixels();
> >     loadPixels();
> > 
> >     let count = 0;
> > 
> >     for (let y = 1; y < fingers.height; y++) {
> >         count = count + 1;
> >         for (let x = 1; x < fingers.width; x++) {
> > 
> >             let c = convolution(x, y, emboss);
> >             let index = 4 * (x + fingers.width * (y + count));
> > 
> >             pixels[index] = red(c);
> >             pixels[index + 1] = green(c);
> >             pixels[index + 2] = blue(c);
> >             pixels[index + 3] = alpha(c);
> >         }
> >     }
> > 
> >     count = 0;
> > 
> >     for (let y = 1; y < fingers.height; y++) {
> >         count = count + 1;
> >         for (let x = 1; x < fingers.width; x++) {
> > 
> >             let c = convolution(x, y, topSobel);
> >             let index = 4 * ((x + 320) + fingers.width * (y + count));
> > 
> >             pixels[index] = red(c);
> >             pixels[index + 1] = green(c);
> >             pixels[index + 2] = blue(c);
> >             pixels[index + 3] = alpha(c);
> >         }
> >     }
> > 
> >     count = 0;
> > 
> >     for (let y = 1; y < fingers.height; y++) {
> >         count = count + 1;
> >         for (let x = 1; x < fingers.width; x++) {
> > 
> >             let c = convolution(x, y, outline);
> >             let index = 4 * (x + fingers.width * (y + 500 + count));
> > 
> >             pixels[index] = red(c);
> >             pixels[index + 1] = green(c);
> >             pixels[index + 2] = blue(c);
> >             pixels[index + 3] = alpha(c);
> >         }
> >     }
> > 
> >     count = 0;
> > 
> >     for (let y = 1; y < fingers.height; y++) {
> >         count = count + 1;
> >         for (let x = 1; x < fingers.width; x++) {
> > 
> >             let c = convolution(x, y, sharpen);
> >             let index = 4 * ((x + 320) + fingers.width * (y + 500 + count));
> > 
> >             pixels[index] = red(c);
> >             pixels[index + 1] = green(c);
> >             pixels[index + 2] = blue(c);
> >             pixels[index + 3] = alpha(c);
> >         }
> >     }
> >     updatePixels();
> > 
> >     fill(255, 255, 255);
> >     textSize(25);
> >     strokeWeight(0.1);
> >     text('Emboss', 220, 40);
> >     text('Outline', 230, 280);
> >     text('Top Sobel', 520, 40);
> >     text('Sharpen', 535, 280);
> > 
> >     stroke(255, 255, 255);
> >     strokeWeight(11);
> >     line(0, 246, 640, 246);
> >     strokeWeight(5);
> >     line(320, 0, 320, 480);
> > 
> > }
> > 
> > function convolution(x, y, matrix) {
> >     let rtotal = 0;
> >     let gtotal = 0;
> >     let btotal = 0;
> > 
> >     for (kx = -1; kx <= 1; kx++) {
> >         for (ky = -1; ky <= 1; ky++) {
> >             let xpos = x + kx;
> >             let ypos = y + ky;
> >             let r = 0;
> >             let g = 0;
> >             let b = 0;
> > 
> >             if ((xpos >= 0 && xpos < fingers.width) && (ypos >= 0 || ypos < fingers.height)) {
> >                 let index = 4 * (xpos + fingers.width * ypos);
> >                 r = fingers.pixels[index];
> >                 g = fingers.pixels[index + 1];
> >                 b = fingers.pixels[index + 2];
> >             }
> > 
> >             rtotal += matrix[kx + 1][ky + 1] * r;
> >             gtotal += matrix[kx + 1][ky + 1] * g;
> >             btotal += matrix[kx + 1][ky + 1] * b;
> >         }
> >     }
> > 
> >     rtotal = constrain(rtotal, 0, 255);
> >     gtotal = constrain(gtotal, 0, 255);
> >     btotal = constrain(btotal, 0, 255);
> > 
> >     return color(rtotal, gtotal, btotal);
> > }
> > ```

> :ToCPrevNext