# Comparativa de la eficiencia computacional

Con este ejercicio se notaron 2 ventajas que se tiene al utilizar shaders, la primera es que se pueden utilizar el mismo vertex y fragment shader tanto para imágenes como para videos (en gray scale y kernels), lo cual ahorra bastante tiempo y esfuerzo al programador. Esto gracias a que los shaders procesan las imágenes y los videos de igual forma.

Adicional a ello, notamos que el renderizado utilizando la GPU es mucho más eficiente computacionalmente con respecto al renderizado con la CPU. 
Si bien la velocidad de la renderización con GPU depende completamente del poder de procesamiento que esta tenga, los siguientes valores ayudan a entender la diferencia de la eficiencia entre ambos métodos de renderización para cada uno de los apartados realizados:


> :Tabs
> > :Tab title=Gray Scale
> >
> > * La carga de la imagen con la CPU dura en promedio **160 ms**, mientras que con la GPU dura en promedio **2 ms**. Mejora en un **98.75%**.
> >
> 
> > :Tab title=Kernels
> > 
> > 
> > * La carga de la imagen con la CPU dura en promedio **1621 ms**, mientras que con la GPU dura en promedio **2 ms**. Mejora en un **99.87%**.
> > * La carga inicial del video con la CPU dura en promedio **188 ms**, mientras que con la GPU dura en promedio **35 ms**. Mejora en un **81.4%**.
> > * La carga de cada frame del video con la CPU dura en promedio **120 ms**, mientras que con la GPU dura en promedio **0.6 ms**. Mejora en un **99.5%**.
> > 
> 
> > :Tab title=Ascii Art
> >
> > * La carga de la imagen con la CPU dura en promedio **160 ms**, mientras que con la GPU dura en promedio **3 ms**. Mejora en un **97.32%**.
> 
> > :Tab title=Mosaic
> > 
> > * La carga del mosaico para la resolucion default con la CPU dura en promedio **300ms**, mientras que con la GPU dura en promedio **130ms**. Mejora en un **56.6%**.
> > * La carga del mosaico para la maxima resolucion con la CPU dura en promedio **1300ms**, mientras que con la GPU dura en promedio **400ms**. Mejora en un **69.2%**.
>

# Conclusions & Future Work

Con lo encontrado en este laboratorio se adquirieron los conocimientos para aplicar distintos algoritmos de computación gráfica de manera rápida y eficiente. Por lo tanto, un trabajo futuro puede ser la profundización en las tecnologías ya estandarizadas, ya que tienen un potencial apliamente extendido y una comunidad que soporta estas tecnologías. Además, un entendimiento más profundo en hardware como tal puede ampliar el espectro de posibilidades de investigación. 

> :ToCPrevNext

<!--
El kernel es un método de procesamiento de imágenes muy versátil, pues no solo sirve para aplicar filtros a las imágenes, sino que también permiten la obtención de carácteristicas de una imagen, facilitando así el estudio de las imagenes, y su aplicación en otras áreas que hacen uso de imágenes. Finalmente, para un trabajo futuro este tema se puede profundizar y desarrollar con la investigación y experimentación sobre cada uno de los filtros y la razón por la cual cada uno de ellos genera el debido efecto.



<br/>
<br/>
<br/>
<br/>

# ASCII Art
## Conclusions & future work

Se concluye que el análisis por medio de bloques de información y brillo puede ser de utilidad para la representación fiel de una imagen, pero en algunos casos pueden requerirse distintos algoritmos para medir le intensidad, ya que esta puede verse distorsionada y no ser una medida a representar fiable.
Como trabajo futuro se propone la automatización de la función selectCharacter, de modo que analice todos los caracteres ASCII posibles, y seleccione cual simbolo representa mejor un bloque de información.


<br/>
<br/>
<br/>
<br/>


# Mosaic - Images
## Conclusions & Future Work

Para finalizar se concluye que el mecanismo de obtención del color denomínate resulta simple, sencillo, efectivo y elegante, por otro lado, se destaca que fue inviable hacer uso de una API, pero la alternativa de estandarizar los colores en el formato HTML y el uso de la distancia delta para discretizar resulta altamente efectivo. Como futuro trabajo se proponen las siguientes ideas.

-->
