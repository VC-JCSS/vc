# Rasterisation 

La rasterización es el proceso mediante el cual una primitiva o figura geométrica simple se convierte en una imagen bidimensional. Cada punto de esta imagen contiene información como el color y la profundidad. Por tanto, la rasterización de una figura geométrica consta de dos partes. El primero es determinar qué pixeles (cuadrado del menor tamaño posible) de una cuadrícula están ocupados por la figura geométrica y cuáles no. El segundo es asignar un color y un valor de profundidad a cada uno de esos cuadrados. El proceso de rasterización es esencial en los procesos de rendering (ver figura 1).

<p align="center">
  <img width="420" src="/docs/sketches/workshops/rendering/rasterisation/01.png">
    <p align="center">
    Imagen 1: Proceso de rasterización básico.    
    </p>
</p>



A continuación, se mostrarán algunos conceptos y formulas que permiten realizar un proceso de rasterización básico (conocido como el método de Pineda):

## The Edge Function
EL objetivo de los procesos básicos de rasterización consiste en determinar si un pixel pertenece a un triángulo o no, para lograr esto surge el primer concepto que permite desarrollar una técnica de rasterización, este se conoce como la función borde, el borde de un triángulo puede verse como una línea que divide el plano 2D (el plano de la imagen) en dos (como se muestra en la figura 1). El principio del método de Pineda es encontrar una función de borde, de modo que permita determinar lado del borde se encuentra un punto dado (el punto P en la figura 1), la función devuelve un número negativo cuando es a la izquierda de la línea, un número positivo cuando está a la derecha de esta línea, y cero, cuando el punto está exactamente en la línea.

<p align="center">
  <img width="420" src="/docs/sketches/workshops/rendering/rasterisation/02.png">
  <p align="center">
    Imagen 2: Edge Function Graphical Representation.
  </p>
</p>

*Imagen 2*: Edge Function Graphical Representation.

En la figura 2, se aplica el método al primer borde del triángulo (definido por los vértices v0-v1). Si ahora se aplica el mismo método a las otras dos aristas (v1-v2 y v2-v0), entonces se puede ver claramente que hay un área (el triángulo blanco) dentro de la cual todos los puntos son positivos (figura 3). 


<p align="center">
  <img width="420" src="/docs/sketches/workshops/rendering/rasterisation/03.png">
  <p align="center">
  Imagen 3: Edge Function for all borders.
  </p>
</p>

Si se toma un punto dentro de esta área, se encontrará que este punto está a la derecha de los tres bordes del triángulo. Si P es de hecho un punto en el centro de un píxel, entonces se puede usar este método para encontrar si el píxel se encuentra dentro al triángulo. Si para este punto, se encuentra que la función de borde devuelve un número positivo para los tres bordes, entonces el píxel está contenido en el triángulo (o puede estar en uno de sus bordes). 

Ahora que se entiende el principio, la función de borde se define como (para el borde definido por los vértices V0 y V1):

> :Formula align=center
> ```
> E_{01}(P)=(P_{x}-V_{0x})*(V_{1y}-V_{0y})-(P_y-V{0y})*(V_{1x}-V_{0x}) 
> ```

Esta función tiene la propiedad útil de que su valor está relacionado con la posición del punto (x, y) con respecto al borde definido por los puntos V0 y V1: 
- E(P) > 0 si P está al lado "derecho" 
- E(P) = 0 si P está exactamente en la línea 
- E(P) < 0 si P está al lado "izquierdo"


## The Barycentric Coordinates

Usualmente no es necesario calcular coordenadas baricéntricas para que el algoritmo de rasterización funcione. Para una implementación realmente ingenua de la técnica de renderizado, todo lo que necesita es proyectar los vértices y usar una técnica como la función de borde, para encontrar si los píxeles están dentro de triángulos. Pero las coordenadas baricéntricas permiten agregar información extra que puede ser asociada a cada uno de los vértices y brindar interpretaciones interesantes. 

Para definir las coordenadas baricéntricas, primero se tiene un conjunto de tres números de coma flotante λ_{0}, λ_{1} y λ_{2}, estas coordenadas se pueden utilizar para definir cualquier punto del triángulo de la siguiente manera: 

> :Formula align=center
> ```
> P = λ_0 * V_0 + λ_1 * V_1 + λ_2 * V_2
> ```

Donde, como de costumbre, V0, V1 y V2 son los vértices de un triángulo. Estas coordenadas pueden tomar cualquier valor, pero para los puntos que están dentro del triángulo (o que se encuentran en uno de sus bordes) solo pueden estar en el rango [0,1] y la suma de las tres coordenadas es igual a 1. Es decir:

> :Formula align=center
> ```
> 1 = λ_0 + λ_1+ λ_2 
> ```

## Implementation

La implementación consiste en un desarrollar el proceso de rasterización de un triángulo y dotar a cada uno de los vértices con un color y través de las coordenadas baricéntricas llevar a cabo un proceso de interpolación. 

Para llevar a cabo esta implementación se extrapola la función borde para cada uno de los bordes:

> :Formula align=center
> ```
> E_{01}(P)=(P_{x}-V_{0x})*(V_{1y}-V_{0y})-(P_y-V{0y})*(V_{1x}-V_{0x})
> ```
> ```
> E_{02}(P)=(P_{x}-V_{0x})*(V_{2y}-V_{0y})-(P_y-V{0y})*(V_{2x}-V_{0x})
> ```
> ```
> E_{12}(P)=(P_{x}-V_{1x})*(V_{2y}-V_{1y})-(P_y-V{1y})*(V_{2x}-V_{1x}) 
> ```

Y para definir el color se dota cada uno de los vertice con un color y se multiplica su valor con la coordenada baricéntrica es decir el resultado de la función borde. 


## Result and Code
> :Tabs
> > :Tab title=Result
> >
> > Resultado del proceso interactivo de rasterización implementado. 
> >
> >
> > > 
> > > :P5 lib1=https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js, sketch=/docs/sketches/workshops/rendering/sketch.js, width=700, height=700
> > >
>
> > :Tab title=Code
> >
> > La función core del proceso es la siguiente, esta recibe una serie de vertice y un punto y de acuerdo con esto arroja un color que representa una interpolación de los tres vértices, en caso de estar dentro del triángulo, en caso contrario arrojara un color negro.
> >
> >
> > > ``` js
> > > function isInside(px, py) {
> > > 
> > >     let f20 = (sliderV2y.value() - sliderV0y.value()) * px + (sliderV0x.value() - sliderV2x.value()) * py + (sliderV2x.value() * sliderV0y.value() - sliderV2y.value() * sliderV0x.value());
> > >     let f01 = (sliderV0y.value() - sliderV1y.value()) * px + (sliderV1x.value() - sliderV0x.value()) * py + (sliderV0x.value() * sliderV1y.value() - sliderV0y.value() * sliderV1x.value());
> > >     let f12 = (sliderV1y.value() - sliderV2y.value()) * px + (sliderV2x.value() - sliderV1x.value()) * py + (sliderV1x.value() * sliderV2y.value() - sliderV1y.value() * sliderV2x.value());
> > > 
> > >     if ((f01 >= 0 && f12 >= 0 && f20 >= 0) || (f12 <= 0 && f20 <= 0 && f01 <= 0)) {
> > >         let delta = f20 + f01 + f12;
> > >         let l0 = f20 / delta;
> > >         let l1 = f01 / delta;
> > >         let l2 = f12 / delta;
> > > 
> > >         let r = red(c0.color()) * l0 + red(c1.color()) * l1 + red(c2.color()) * l2;
> > >         let g = green(c0.color()) * l0 + green(c1.color()) * l1 + green(c2.color()) * l2;
> > >         let b = blue(c0.color()) * l0 + blue(c1.color()) * l1 + blue(c2.color()) * l2;
> > > 
> > >         return color(r, g, b, 255);
> > >     }
> > > 
> > >     let val = (PixelLength.value() <= 35 && antialiasingCheckbox.checked()) ? 3 * PixelLength.value() - 115 : 0;
> > > 
> > >     if (((f01 < 0 && f01 >= val) && f12 >= 0 && f20 >= 0) || (f01 >= 0 && (f12 < 0 && f12 >= val) && f20 >= 0) || (f01 >= 0 && f12 >= 0 && (f20 < 0 && f20 >= val))) {
> > > 
> > >         let negativeValue = Math.abs(Math.min(f01, f12, f20));
> > >         let delta = f20 + f01 + f12;
> > >         let l0 = (f20 < 0) ? 0 : f20 / delta;
> > >         let l1 = (f01 < 0) ? 0 : f01 / delta;
> > >         let l2 = (f12 < 0) ? 0 : f12 / delta;
> > > 
> > >         let r = red(c0.color()) * l0 + red(c1.color()) * l1 + red(c2.color()) * l2;
> > >         let g = green(c0.color()) * l0 + green(c1.color()) * l1 + green(c2.color()) * l2;
> > >         let b = blue(c0.color()) * l0 + blue(c1.color()) * l1 + blue(c2.color()) * l2;
> > > 
> > >         return color(r, g, b, (255 - ((255 * negativeValue) / -val)));
> > >     }
> > >     return color(0);
> > > }
> > > ```
>

### Result

> :P5 lib1=https://cdn.jsdelivr.net/gh/objetos/p5.quadrille.js/p5.quadrille.min.js, sketch=/docs/sketches/workshops/rendering/sketch.js, width=700, height=700





> :ToCPrevNext


