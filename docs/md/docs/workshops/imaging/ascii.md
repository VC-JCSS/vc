
## ASCII Art

> :Tabs
> > :Tab title=Result
> >
> > El resultado se muestra a continuación:
> >
> > > :P5 width = 800, height = 550, sketch = /docs/sketches/workshops/imaging/hardware/asciiArt/asciiArt.js
>
> > :Tab title=Background
> >
> > El arte ASCII se ha utilizado cuando no es posible la transmisión o la impresión de imágenes en las configuraciones de equipos computarizados, tales como maquinillas, teletipos y equipos de visualización (consolas y terminales) que no cuentan con tarjetas de proceso gráfico. El arte ASCII ha servido como lenguaje fuente para representar logos de compañías y productos, para crear diagramas procedimentales de flujo de operaciones y también en el diseño de los primeros videojuegos.
> >
> > Para analizar de manera satisfactoria una imagen y convertirla a ASCII art, se debe analizar la imagen por regiones. El bloque a analizar puede ser de longitud variable, pero deben tenerse en cuenta distintos factores, como el tamaño de los simbolos ASCII o la densidad de la imagen.
> 
> > :Tab title=Code
> >
> > Se tienen variables globales importantes como blockSize, que define el tamaño del bloque a analizar.
> > 
> > ``` js
> > let img;
> > let v = 1.0 / 9.0;
> > let blockSize = 3;
> > let count = 500;
> > 
> > function preload() {
> >     img = loadImage("/vc/docs/sketches/workshops/imaging/BabyYoda.jpg");
> > }
> > 
> > function setup() {
> >     createCanvas(800, 550);
> >     img.resize(800, 550);
> >     noLoop();
> > }
> > 
> > function draw() {
> >     background(255);
> >     //image(img, 0, 0);
> > 
> >     img.loadPixels();
> > 
> >     let d = pixelDensity();
> >     let npixels = 4 * (width * d) * (height * d);
> >     //text(pixels.length, 200, 200);
> >     for (let x = 0; x < width; x += blockSize) {
> >         for (let y = 0; y < height; y += blockSize) {
> >             scanBlock(x, y);
> >         }
> >     }
> > }
> > ```
> > 
> > La función scanBlock toma un bloque individual de datos y lo envía a la función patternDef, para definir su nivel de brillo y así, asignar un ASCII correspondiente.
> >
> > ``` js
> > function scanBlock(x, y) {
> >     let sizeDef = 4 * blockSize;
> >     let blockInformation = new Array(4 * blockSize);
> >     let index = 0;
> >     while (index < blockSize) {
> >         let startPosition = (x + y * width) * 4;
> >         blockInformation[index * 4] = img.pixels[startPosition];
> >         blockInformation[index * 4 + 1] = img.pixels[startPosition + 1];
> >         blockInformation[index * 4 + 2] = img.pixels[startPosition + 2];
> >         blockInformation[index * 4 + 3] = img.pixels[startPosition + 3];
> >         index++;
> >     }
> >     let res = patternDef(blockInformation);
> >     textSize(10);
> >     text(res, x, y);
> > 
> > }
> > ```
> > 
> > La función patternDef toma un bloque de información y lo analiza. Encuentra el brillo promedio del bloque y envía el resultado estandarizado (un valor entre 0 y 1) a la funcion selectCharacter, que se encargará de asignar un caracter a cada bloque analizado.
> > 
> > ``` js
> > function patternDef(blockInformation) {
> >     let brillos = [];
> >     let suma = 0;
> >     for (let i = 0; i < blockInformation.length; i += 4) {
> >         let br =
> >             blockInformation[i] * 0.2126 +
> >             blockInformation[i + 1] * 0.7152 +
> >             blockInformation[i + 2] * 0.0722;
> >         brillos.push(br);
> >     }
> > 
> >     brillos.forEach((element) => {
> >         suma += element;
> >     });
> >     let promedio = suma / brillos.length;
> >     let result = promedio / 255;
> >     return selectCharacter(result);
> > 
> > }
> > ```
> > 
> > La función selectCharacter recibe la intensidad de un bloque previamente analizado, y selecciona un ASCII adecuado para el ASCII art. Esta función es de mucha utilidad, ya que sin ella los caracteres no podrían representar la opacidad o profundidad de la imagen procesada.
> > 
> > ``` js 
> > function selectCharacter(result) {
> >     if (result > 0 && result <= 0.1) {
> >         return "▓";
> >     } else if (result > 0.1 && result <= 0.2) {
> >         return "▒";
> >     } else if (result > 0.2 && result <= 0.3) {
> >         return "#";
> >     } else if (result > 0.3 && result <= 0.4) {
> >         return "@";
> >     } else if (result > 0.4 && result <= 0.5) {
> >         return "%";
> >     } else if (result > 0.5 && result <= 0.6) {
> >         return "E";
> >     } else if (result > 0.6 && result <= 0.7) {
> >         return "=";
> >     } else if (result > 0.7 && result <= 0.8) {
> >         return "0";
> >     } else if (result > 0.8 && result <= 0.9) {
> >         return "/";
> >     } else if (result > 0.9 && result <= 1) {
> >         return ".";
> >     }
> > }
> > ```
> 

> :ToCPrevNext


