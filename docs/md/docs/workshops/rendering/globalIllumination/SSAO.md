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

> :ToCPrevNext