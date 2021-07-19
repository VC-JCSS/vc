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

> :ToCPrevNext