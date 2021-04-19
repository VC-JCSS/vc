# Image and video processing

## Load, Deploy image and negative of an image
> :Tabs
> > :Tab title=Deploy image result
> >
> > > :P5 sketch=/docs/sketches/workshops/imaging/loadImage.js, width=800, height=550
>
> > :Tab title=Deploy an Image
> > 
> > Es necesario saber cómo se muestra una imagen, para ello realizamos el siguiente código:
> > 
> > En donde la función preload, carga la imagen seleccionada.
> > En el setup creamos el canvas y el botón para poner el canvas en pantalla completa.
> > La función draw nos permite cargar la imagen.
> > La función fullScreen no habilita la opción de la pantalla completa.
> > La función windowResized, nos permite modifica el tamaño del canvas para que la imagen se adapte al tamaño de la ventana.
> >
> > ``` js
> > let img;
> > let button;
> > 
> > function preload() {
> >     img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
> > }
> > 
> > function setup() {
> > createCanvas(windowWidth-15, windowHeight-21);
> > noLoop();
> >     button = createButton('FullScreen');
> >     button.attribute('style','box-shadow:inset 0px 1px 0px 0px #000000;\n' +
> >         '\tborder-radius:6px;\n' +
> >         '\tborder:1px solid #000000;\n' +
> >         '\tdisplay:inline-block;\n' +
> >         '\tcursor:pointer;\n' +
> >         '\tcolor:#000000;\n' +
> >         '\tfont-family:Arial;\n' +
> >         '\tfont-size:15px;\n' +
> >         '\tfont-weight:bold;\n' +
> >         '\tpadding:6px 24px;\n' +
> >         '\ttext-decoration:none;\n' );
> >     button.position(3, 3);
> >     button.mousePressed(fullScreen);
> > }
> > 
> > function draw() {
> >     img.resize(windowWidth, windowHeight);
> >     image(img, 0, 0);
> > }
> > 
> > function fullScreen() {
> >     let fs = fullscreen();
> >     fullscreen(!fs);
> > }
> > 
> > function windowResized() {
> >     resizeCanvas(windowWidth-15, windowHeight-21);
> > }
> > ```
>
> > :Tab title=Negative of an Image result
> > 
> > > :P5 sketch=/docs/sketches/workshops/imaging/negativeImage.js, width=800, height=550
>
> > :Tab title=Negative of an Image
> >
> > La única diferencia respecto a mostrar una imagen, es que sólo se modifica la función draw, en donde recorremos pixel por pixel de la imagen, y le restamos a cada valor rgb del pixel 255, con el fin de obtener el negativo.
> > 
> > Código:
> > ``` js
> > function draw() {
> >     img.resize(windowWidth, windowHeight);
> >     image(img, 0, 0);
> >     let d = pixelDensity();
> >     let npixels = 4 * (width * d) * (height * d);
> >     loadPixels();
> >     for (let i = 0; i < npixels; i += 4) {
> >         pixels[i] = 255 - pixels[i];
> >         pixels[i + 1] = 255 - pixels[i + 1];
> >         pixels[i + 2] = 255 - pixels[i + 2];
> >     }
> >     updatePixels();
> > }
> > ```
>


## Escala de grises

### Background


En fotografía digital e imágenes generadas por computadora, una escala de grises o imagen es aquella en la que el valor de cada píxel es una sola muestra que representa solo una cantidad de luz; es decir, lleva solo información de intensidad. Las imágenes en escala de grises, una especie de monocromo en blanco y negro o gris, se componen exclusivamente de tonos de gris. El contraste varía desde el negro en la intensidad más débil hasta el blanco en la más fuerte.


Las imágenes en escala de grises son distintas de las imágenes en blanco y negro de dos tonos de un bit, que, en el contexto de las imágenes por computadora, son imágenes con solo dos colores: blanco y negro (también llamadas imágenes de dos niveles o binarias). Las imágenes en escala de grises tienen muchos tonos de gris en el medio.

### Code & Results

A continuación se realiza la descripción de 2 filtros y se muestra el resultado con una imagen.

> :Tabs
> > :Tab title=Promedio RGB
> >
> > Este es el algoritmo de escala de grises para los programadores novatos. Esta fórmula genera un razonablemente agradable equivalente en escala de grises, su simplicidad hace que sea fácil de implementar y optimizar. Sin embargo, esta fórmula no está exenta de defectos mientras rápido y sencillo, que hace un trabajo pobre de representar tonos de gris en relación con la forma en que los seres humanos perciben la luminosidad (brillo).
> >
> > Para aplicarlo tomamos el RGB de cada pixel y lo dividimos entre 3, como muestra el siguiente código:
> >
> > > ``` js
> > > sImg.loadPixels();
> > > for (let i = 0; i < npixels; i += 4) {
> > >   let gray = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
> > >   sImg.pixels[i] = gray;
> > >   sImg.pixels[i + 1] = gray;
> > >   sImg.pixels[i + 2] = gray;
> > >   sImg.pixels[i + 3] = img.pixels[i + 3];
> > > }
> > > sImg.updatePixels();
> > > ```
>
> > :Tab title=Luma
> > 
> > luma representa el brillo de una imagen (la parte "blanco y negro" o acromática de la imagen). Por lo general, la luminancia se empareja con la crominancia. Luma representa la imagen acromática, mientras que los componentes cromáticos representan la información de color. Los sistemas de video pueden almacenar y transmitir información cromática a una resolución más baja, optimizando los detalles percibidos en un ancho de banda particular.
> > 
> > Para encontrar el Luma seguimos una serie de pasos:
> >
> > > **Paso 1:**
> > > 
> > > Convertir el pixel RGB a decimal (0.0 a 1.0)
> > > Para ello usamos el siguiente código:
> > > > ``` js
> > > > let vR = r / 255;
> > > > let vG = g / 255;
> > > > let vB = b / 255;
> > > > ```
> > >
> > > **Paso 2:**
> > >
> > > Convertir un RGB codificado (paso 1) con gamma a un valor lineal. RGB (estándar de computadora), por ejemplo, requiere una curva de potencia de aproximadamente V ^ 2.2, aunque la transformación "precisa" es:
> > >
> > > > :Formula align=center
> > > >
> > > > ```
> > > > V_{linear} = 
> > > > \begin{cases}
> > > > \frac{V'}{12.92} & \text{\(V' \leq 0.04045\)} \\
> > > > (\frac{V'+0.055}{1.055})^{2.4} & \text{\(V' > 0.04045\)} \\
> > > > \end{cases}
> > > > ```
> > >
> > > Donde V´ es el canal R, G o B codificado en gamma de RGB.
> > > Esto se realizó con las siguientes lineas del código:
> > >
> > > > 
> > > > ``` js
> > > > function sRGBtoLin(colorChannel) {
> > > >   if ( colorChannel <= 0.04045 ) {
> > > >       return colorChannel / 12.92;
> > > >   } else {
> > > >       return Math.pow((( colorChannel + 0.055)/1.055),2.4);
> > > >   }
> > > > }
> > > > ```
> > >  
> > > **Paso 3:**
> > > 
> > > Para encontrar la luminancia aplicamos los coeficientes estándar para sRGB:
> > > 
> > > > :Formula align=center
> > > >
> > > > ```
> > > > Y = R_{lin} \cdot 0.2126 + G_{lin} \cdot 0.7152 + B_{lin} \cdot 0.0722
> > > > ```
> > > 
> > > Usando el código:
> > >
> > > > ``` js
> > > > let Y = ((rY * rLin) + (gY * gLin) + (bY * bLin));
> > > > ```
> > >
> > > Adicionalmente recorremos todos los pixeles y aplicando la formula anteriormente mostrada.
> > >
> > > > ``` js
> > > > oImg.loadPixels();
> > > >     for (let i = 0; i < npixels; i += 4) {
> > > >         let y = luma(img.pixels[i], img.pixels[i+1],img.pixels[i+2])
> > > >         oImg.pixels[i] = y;
> > > >         oImg.pixels[i + 1] = y;
> > > >         oImg.pixels[i + 2] = y;
> > > >         oImg.pixels[i + 3] = img.pixels[i+3];
> > > >     }
> > > > oImg.updatePixels();
> > > > ```
>
> > :Tab title=Resultado Imagen
> > 
> > A continuación se muestran los resultados obtenidos aplicando las funciones anteriormente mencionadas.
> > Arriba izquierda se muestra la imagen original, arriba derecha se muestra con la aplicación de la función predeterminada de funcion p5js, abajo izquierda se muestra aplicando luma, abajo derecha se muestra aplicando el promedio RGB
> >
> > > :P5 sketch=/docs/sketches/workshops/imaging/gray/RGB-luma.js, width=800, height=550 
>

Adicionalmente se realizó el mismo procedimiento para video, se muestra a continuación:

> :Tabs
> > :Tab title=Resultado video
> > 
> > Adicionalmente se realizó el mismo procedimiento para video, se muestra a continuación:
> > 
> > **Promedio RGB en video:**
> >
> > > :P5 sketch=/docs/sketches/workshops/imaging/gray/LumaVid.js, width=320, height=240
> >
> > **Promedio luma en video:**
> >
> > > :P5 sketch=/docs/sketches/workshops/imaging/gray/RGB-Vid.js, width=320, height=240
> >
> > **Nota:** *Pulsar sobre el canvas para reanudar el video*
> 
> > :Tab title=Código
> > 
> > **Código para promedio RGB:**
> > 
> > ```
> > function draw() {
> >    image(fingers,0,0);
> >    fingers.loadPixels();
> >    loadPixels();
> >
> >    for (let x = 1; x < fingers.width; x++) {
> >        for (let y = 1; y < fingers.height; y++) {
> >            let index = 4 * (x + fingers.width * y);
> >            let average = (fingers.pixels[index] + fingers.pixels[index + 1] + fingers.pixels[index + 2]) / 3;
> >            pixels[index] = average;
> >            pixels[index + 1] = average;
> >            pixels[index + 2] = average;
> >            pixels[index + 3] = fingers.pixels[index + 3];
> >        }
> >    }
> >    updatePixels();   
> > }
> > ```
> > 
> > **Código para Luma:**
> >
> > ```
> > function draw() {
> >     image(fingers,0,0);
> >     fingers.loadPixels();
> >     loadPixels();
> >     for (let x = 1; x < fingers.width; x++) {
> >         for (let y = 1; y < fingers.height; y++) {
> >             let index = 4 * (x + fingers.width * y);
> >             let lum = luma(fingers.pixels[index], fingers.pixels[index + 1],fingers.pixels[index + 2])
> >             pixels[index] = lum;
> >             pixels[index + 1] = lum;
> >             pixels[index + 2] = lum;
> >             pixels[index + 3] = fingers.pixels[index + 3];
> >         }
> >     }
> >     updatePixels();
> > }
> > ```
> 

**Explicación más detallada en:** https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color

> :ToCPrevNext


