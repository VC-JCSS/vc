# Image and video processing





## Load and Deploy image

> :Collapse label=click to display the `image`
>
> > :P5 sketch=/docs/sketches/workshops/imaging/loadImage.js, width=800, height=550




## Negative of an image

> :P5 sketch=/docs/sketches/workshops/imaging/negativeImage.js, width=800, height=550






### Escala de grises

#### Problem Statement


Aplicar la conversión a escala de grises en imágenes y videos utilizando la herramienta p5.js.

#### Background


En fotografía digital e imágenes generadas por computadora, una escala de grises o imagen es aquella en la que el valor de cada píxel es una sola muestra que representa solo una cantidad de luz; es decir, lleva solo información de intensidad. Las imágenes en escala de grises, una especie de monocromo en blanco y negro o gris, se componen exclusivamente de tonos de gris. El contraste varía desde el negro en la intensidad más débil hasta el blanco en la más fuerte.


Las imágenes en escala de grises son distintas de las imágenes en blanco y negro de dos tonos de un bit, que, en el contexto de las imágenes por computadora, son imágenes con solo dos colores: blanco y negro (también llamadas imágenes de dos niveles o binarias). Las imágenes en escala de grises tienen muchos tonos de gris en el medio.

#### Code & Results


**_Filtros_**

**Promedio RGB**

Este es el algoritmo de escala de grises para los programadores novatos. Esta fórmula genera un razonablemente agradable equivalente en escala de grises, su simplicidad hace que sea fácil de implementar y optimizar. Sin embargo, esta fórmula no está exenta de defectos mientras rápido y sencillo, que hace un trabajo pobre de representar tonos de gris en relación con la forma en que los seres humanos perciben la luminosidad (brillo).
[http://ilapep.mx/g1/color_to_gray_scale.pdf]

Para aplicarlo tomamos el RGB de cada pixel y lo dividimos entre 3, como muestra el siguiente código

``` js
sImg.loadPixels();
for (let i = 0; i < npixels; i += 4) {
    let gray = (img.pixels[i] + img.pixels[i + 1] + img.pixels[i + 2]) / 3;
    sImg.pixels[i] = gray;
    sImg.pixels[i + 1] = gray;
    sImg.pixels[i + 2] = gray;
    sImg.pixels[i + 3] = img.pixels[i + 3];
}
sImg.updatePixels();
```

**Luma**

luma representa el brillo de una imagen (la parte "blanco y negro" o acromática de la imagen). Por lo general, la luminancia se empareja con la crominancia. Luma representa la imagen acromática, mientras que los componentes cromáticos representan la información de color. Los sistemas de video pueden almacenar y transmitir información cromática a una resolución más baja, optimizando los detalles percibidos en un ancho de banda particular.

Para encontrar el Luma seguimos una serie de pasos:

*Paso 1*

Convertir el pixel RGB a decimal (0.0 a 1.0)

Para ello usamos el siguiente código:

``` js
let vR = r / 255;
let vG = g / 255;
let vB = b / 255;
```

*Paso 2*

Convertir un RGB codificado (paso 1) con gamma a un valor lineal. RGB (estándar de computadora), por ejemplo, requiere una curva de potencia de aproximadamente V ^ 2.2, aunque la transformación "precisa" es:


> :Formula align=center
>
> ```
> V_{linear} = 
> \begin{cases}
> \frac{V'}{12.92} & \text{\(V' \leq 0.04045\)} \\
> (\frac{V'+0.055}{1.055})^{2.4} & \text{\(V' > 0.04045\)} \\
> \end{cases}
> ```


Donde V´ es el canal R, G o B codificado en gamma de RGB.

Esto se realizó con las siguientes lineas del código:

``` js
function sRGBtoLin(colorChannel) {
    if ( colorChannel <= 0.04045 ) {
        return colorChannel / 12.92;
    } else {
        return Math.pow((( colorChannel + 0.055)/1.055),2.4);
    }
}
```

*Paso 3*

Para encontrar la luminancia aplicamos los coeficientes estándar para sRGB:



> :Formula align=center
>
> ```
> Y = R_{lin} \cdot 0.2126 + G_{lin} \cdot 0.7152 + B_{lin} \cdot 0.0722
> ```


``` js
let Y = ((rY * rLin) + (gY * gLin) + (bY * bLin));
```

Adicionalmente recorremos todos los pixeles y aplicando la formula anteriormente mostrada.

``` js
oImg.loadPixels();
    for (let i = 0; i < npixels; i += 4) {
        let y = luma(img.pixels[i], img.pixels[i+1],img.pixels[i+2])
        oImg.pixels[i] = y;
        oImg.pixels[i + 1] = y;
        oImg.pixels[i + 2] = y;
        oImg.pixels[i + 3] = img.pixels[i+3];
    }
oImg.updatePixels();
```

A continuación se muestran los resultados obtenidos aplicando las funciones anteriormente mencionadas.

### Promedio RGB y Luma en imagen

Arriba izquierda se muestra la imagen original, arriba derecha se muestra con la aplicación de la función predeterminada de funcion p5js, abajo izquierda se muestra aplicando luma, abajo derecha se muestra aplicando el promedio RGB
https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color

> :P5 sketch=/docs/sketches/workshops/imaging/gray/RGB-luma.js, width=800, height=550

### Promedio RGB en video

Se muestra aplicando el promedio RGB en video para un video

https://stackoverflow.com/questions/596216/formula-to-determine-brightness-of-rgb-color

> :P5 sketch=/docs/sketches/workshops/imaging/gray/LumaVid.js, width=320, height=240

### Promedio luma en video

Se muestra aplicando luma en video

> :P5 sketch=/docs/sketches/workshops/imaging/gray/RGB-Vid.js, width=320, height=240

> :ToCPrevNext


