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

Tomado de: https://people.mpi-inf.mpg.de/~ritschel/Papers/SSDO.pdf

> :ToCPrevNext