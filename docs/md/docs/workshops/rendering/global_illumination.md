# Oclusión ambiental (AO -Ambient Occlusion)

Es un efecto que se produce cuando los rayos de luz que se propagan por una estancia y que rebotan de unas superficies a otras, quedan atrapados y pierden intensidad en las geometrías angulosas, por ejemplo, en las esquinas creadas entre dos paredes.

![AO_explanation](/docs/sketches/workshops/rendering/global_illumination/ao.png "AO_explanation")

Como se aprecia en la primera imagen, una leve oclusión ambiental genera cierta definición en los bordes, pero conforme se aumenta el nivel de oclusión, como en el caso de la imagen de la derecha, esta se percibe más contrastada, mejor definida y, fundamentalmente, más realista.


### Historia 

Los inicios de la oclusión ambiental en tiempo real fueron desarrollados por el departamento de desarrollo e investigación de Crytek, y fue implementada de forma global por el videojuego Crysis en el año 2007, siendo pionero en el uso de esta tecnología. A pesar de esta innovación, los efectos generados en este juego no se consideran oclusión ambiental real, ya que tiene en cuenta únicamente los pixeles que lo rodean. 

![SSAO Crysis](/docs/sketches/workshops/rendering/global_illumination/ssao_example.png "SSAO Crysis")

Además de esto, la oclusión ambiental fue utilizada en la película Pearl Harbol de Ben Affleck. Esta sentó el precedente en el uso de esta tecnología en cine.

### Teoría

La oclusión ambiental está relacionada con la accesibilidad de una superficie, ya que evalúa la capacidad de esta a ser "tocada" por distintos elementos, pero fundamentalmente fuentes luminicas. Esta técnica ofrece una mejor percepción de la forma tridimensional de los objetos generados.

La oclusión [A_{\overline{p}}](:Formula) en un punto [\overline{p}](:Formula) en una superficie con normal [\hat{n}](:Formula) puede ser calculada integrando la función de visibilidad sobre el hemisferio [\Omega](:Formula) con respecto al ángulo sólido proyectado.

> :Formula align=center
> ```
> A_{\overline{p}} = \frac{1}{\pi} (\int_{\Omega} V_{\overline{p},\hat{\omega}} (\hat{n}\cdot \hat{\omega}) d\omega )
> 

donde [V_{\overline{p},\hat{\omega}}](:Formula) es la función de visibilidad en el punto [\overline{p}](:Formula) definida en 0 si [\overline{p}](:Formula) está ocluido en la dirección [\hat{\omega}](:Formula), y uno en otro caso. Por otro lado, [d\omega](:Formula) es el paso del ángulo sólido de la integración de la variable [\omega](:Formula). Para solucionar esta integral en la práctica se utiliza comúnmente el método de Monte-Carlo.

### Implementaciones

Las implementaciones más conocidas de este concepto son SSAO(Screen space ambient occlusion), SSDO (Screen space directional occlusion) y actualmente RTAO (Ray-Traced ambient occlusion)

## Screen Space Ambient Occlusion (SSAO)

Esta aproximación a a oclusión ambiental fue desarrollada por Vladimir Kajalin mientras trabajaba en Crytek, y fue utilizada por primera vez en el videojuego Crysis, desarrollado igualmente por Crytek.

### Implementacion 

Este algoritmo es implementado como un pixel shader, analizando los valores de profundidad de los pixeles circundantes y trata de computar la cantidad de oclusión para cada punto dado. En su implementación más simple, la oclusión depende únicamente de la diferencia en profundidad de un punto de referencia y el punto a calcular. Esto se logra haciendo uso de un muestreo relativamente aleatorio.

![SSAO](/docs/sketches/workshops/rendering/global_illumination/ssao.jpg "SSAO")

La Oclusión de ambiente en el espacio de pantalla tiene distintas ventajas con respecto a otras soluciones de Oclusión ambiental:

- Es independiente de la complejidad de una escena
- No requiere tiempo de carga y no requiere espacio de memoria.
- No hace uso de la CPU, puede ser ejecutado únicamente haciendo uso de la GPU.

Como principal desventaja se tiene la generación de ruido por parte del algoritmo, el cual debe ser suavizado sin interferir con los bordes de objetos u otras discontinuidades.  

## Screen Space Directional Occlusion (SSDO)

La oclusión direccional en el espacio de la pantalla, es sucesora de la SSAO, explicada anteriormente. Esta técnica de oclusión ambiental, en lugar de tomar únicamente pixeles tiene en cuenta tanto la luz que llega directamente a un objeto, como la luz que se refleja en el objeto que está directamente detrás de este. Lo que ayuda a tener mayor profundidad y añade mayor realismo a los videojuegos.

A pesar de que SSDO genera una iluminación y un sombreado más preciso, continúa siendo propenso a los mismos problemas potenciales que presenta SSAO, como por ejemplo los bordes irregulares o sombreados imprecisos de un objeto a otro objeto.

![SSDO_comparative](/docs/sketches/workshops/rendering/global_illumination/SSDO_1.png "SSDO_comparative1")

*Imagen 2.1*: La fila superior muestra la diferencia entre sin oclusión ambiental, Oclusión ambiental en el espacio de la pantalla estándar, la fila inferior muestra la oclusión direccional en el espacio de la pantalla y oclusión direccional en el espacio de la pantalla con un rebote.

![SSDO_comparative2](/docs/sketches/workshops/rendering/global_illumination/SSDO_2.PNG "SSDO_comparative2")

*Imagen 2.2*: Los recuadros de la fila muestran las diferencias de detalle. Con SSDO, las sombras rojas y azules son visibles, mientras que las sombras AO son completamente grises (abajo a la izquierda).

![SSDO_comparative3](/docs/sketches/workshops/rendering/global_illumination/SSDO_3.PNG "SSDO_comparative3")

*Imagen 2.3*: Estas imágenes muestran el rebote indirecto. Nótese la luz amarilla, que rebota de la caja al suelo.

### Teoría

*Iluminación directa mediante DO:* El SSAO estándar ilumina un píxel calculando primero un valor medio de visibilidad de un conjunto de píxeles vecinos. Este valor de oclusión se multiplica entonces por la iluminación no ocluida de todas las direcciones entrantes. Se propone eliminar este desacoplamiento de la oclusión y la iluminación de la siguiente manera:

Para cada píxel en la posición 3D [P](:Formula) con normalidad [n](:Formula), la radiancia directa [L_{dir}](:Formula) se calcula a partir de [N](:Formula) direcciones de muestreo [ω_i](:Formula), distribuidas uniformemente por la semiesfera, cada una de las cuales cubre un ángulo sólido de [Δω=2π/N](:Formula) :

> :Formula align=center
> ```
> L_{dir}(P)=\sum_{i=1}^{N} \frac{\rho}{\pi}L_{in}(\omega_i)V(\omega_i)cos\theta_i\Delta\omega.
> ```

La Imagen 2.4 (izquierda) muestra un ejemplo con [N=4](:Formula) puntos de muestreo A,B,C y D: Los puntos A, B y D están por debajo de la superficie, por lo que se clasifican como oclusores para P, mientras que la muestra C está por encima de la superficie y se clasifica como visible.

![SSDO_comparative4](/docs/sketches/workshops/rendering/global_illumination/SSDO_4.PNG "SSDO_comparative4")

*Imagen 2.4*: Izquierda: Para la iluminación directa con oclusión direccional, cada muestra se prueba como un oclusor. En el ejemplo, el punto P sólo está iluminado desde la dirección C. Derecha: Para la luz indirecta, se coloca un pequeño parche en la superficie para cada oclusor y la luz directa almacenada en el framebuffer se utiliza como radiancia del emisor.

*Rebote indirecto*: Para incluir un rebote indirecto de luz, la luz directa almacenada en el framebuffer de la pasada anterior puede ser utilizar: Para cada punto de muestreo que se trata como un oclusor (A, B, D), el color del píxel correspondiente [L_{pixel}](:Formula) se utiliza como la radiancia emisora de un pequeño parche, orientado en la superficie (Imagen 2 derecha). Se considera que el emisor es normal para evitar el sangrado de color de los parches emisores orientados hacia atrás. La radiación adicional de la geometría circundante puede aproximarse como:

> :Formula align=center
> ```
> L_{dir}(P)=\sum_{i=1}^{N} \frac{\rho}{\pi}L_{pixel}(1-V(\omega_i))\frac{cos\theta_{s_i} cos\theta_{r_i}}{d_i^{2}}.
> ```

> :ToCPrevNext

## Ray-traced ambient occlusion (RTAO)