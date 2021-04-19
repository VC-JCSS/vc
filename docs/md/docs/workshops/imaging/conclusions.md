# Conclusions & Future Work

Se pueden apreciar varias caracteristicas comunes a las aplicaciones planteadas. La versatilidad de las aplicaciones es una caracteristica fundamental identificada. Inicialmente, el método de procesamiento del Kernel tiene distintas utilidades en sí mismo, ya que nos permite, además de aplicar filtros a las imágenes, obtener información fundamental de una imagen, facilitando así su estudio y análisis en otras ramas del análsis de estas. 
<br/>
<br/>
Por otro lado, el análisis de imagenes por medio de bloques de información, teniendo incluso en cuenta su brillo, puede ser de útilidad para la obtención de información de una imagen, pero además, nos brinda distintas posibilidades de aplicación, como lo son la representación de imagenes a través de caractéres ASCII (ASCII Art), o su representación mediante mosaicos de imagenes.
En este caso, como mejora a la implementación se propone la automatización de la función selectCharacter, de modo que analice todos los caracteres ASCII posibles, y seleccione cual simbolo representa mejor un bloque de información.
<br/>
<br/>
Esta última aplicación, que analiza una imagen y genera un mosaico de la misma a partir de otras imagenes, hace uso de un mecanismo de obtención del color denomínate que resulta resulta simple, efectivo y elegante. Se destaca en este caso particular el reto de la obtención de las imagenes, ya que el color dominante de una zona puede variar ampliamente. Dentro de la experimentación de esta aplicación se realizaron pruebas haciendo uso de una API de obtención de imagenes, pero dada la cantidad de solicitudes realizadas, se convirtió en una opción inviable a la hora de escalar a imagenes de un tamaño más grande. Sin embargo, la alternativa de estandarizar los colores en el formato HTML y el uso de la distancia delta para discretizar resulta altamente efectivo. Como futuro trabajo se proponen las siguientes ideas.

* Si bien la distancia delta es una medida efectiva no deja de ser una simple distancia euclidiana, una mejora en el trabajo podría ser trabajar una medida más precisa de acuerdo con el contexto. 

* Hacer uso de una API de pago mejoraría considerablemente la aplicación implementada, ya que permitiría personalizar un mosaico con una mayor gama de posibilidades. La implementación de una API que pueda proveer las imagenes solicitadas lograría el mismo resultado, según las pruebas realizadas. 

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
