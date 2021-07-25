# Problem Statement

<!-- <br/> -->

En el transcurso de los laboratorios realizados en la clase de Computación Visual se han abordado e implementado algunos de los algoritmos de procesamiento de imágenes más imporantes, como los distintos algoritmos para la conversión de una imagen a blanco y negro, o el uso de kernels para el análisis de imágenes. Sin embargo, hasta ahora solo se ha utilizado el poder computaciónal de la CPU para la visualización de dichas implementaciones.

Hoy en día, para el procesamiento de gráficos de computador se utilizan Tarjetas Gráficas o Unidades de Procesamiento Gráfico (GPU por sus siglas en inglés). Estas tienen un funcionamiento muy diferente al de una CPU, pues basan su método de procesamiento en el paradigma de la computación paralela, el cual convenientemente, es perfecto para producir rápidamente imágenes y videos de alta calidad en un computador. Todo computador actualmente tiene tanto una CPU como una GPU, pues ambas tienen una funcionalidad específica.

De esta forma, con el propósito de conocer cómo se procesan gráficos de computador con una GPU y de observar la diferencia de eficiencia computacional de procesamiento de gráficos entre una CPU y una GPU, en este laboratorio se van a desarrollar las mismas implementaciones realizadas anteriormente, [renderizando con la GPU en lugar de la CPU](/docs/workshops/imaging/hardware/background):

1. [Aplicar la escala de grises a una imagen](/docs/workshops/imaging/basic_gray).
2. [Uso de Kernels con imágenes](/docs/workshops/imaging/hardware/kernels)
3. [Representación de imágenes con caracteres ASCII](/docs/workshops/imaging/ascii)
4. [Mosaico de una imagen](/docs/workshops/imaging/mosaic)

Así, los ejercicios planteados representan un acercamiento importante al trabajo con una GPU, lo que permitirá adquirir destrezas y conocimientos para realizar trabajos futuros.

> :ToCPrevNext