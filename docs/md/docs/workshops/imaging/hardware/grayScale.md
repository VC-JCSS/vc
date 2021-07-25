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
> > :Tab title=Negative
> >
> > Hola
> 
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

Adicionalmente se realizó el mismo procedimiento para video, se muestra a continuación:

> :Tabs
> > :Tab title=Resultado video
> >
> > Adicionalmente se realizó el mismo procedimiento para video, se muestra a continuación:
> >
> >
> > > :P5 sketch=/docs/sketches/workshops/imaging/hardware/grayScale/videos.js, width=800, height=550
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