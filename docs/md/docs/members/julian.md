# Julian David Acosta Bello

## Bio

## Interests

## Contributions

papers, blogs, research, free software...

## Hobbies

## Optical Illusions - Ouchi's Illusion

Ilusión creada por el japonés Hajime Ouchi en 1977. En esta se ve un disco central que parece flotar sobre el fondo mientras movemos los ojos alrededor. Este es un ejemplo de ilusión cinética, pues tiene su efecto gracias a la 'vibración retiniana' generada por el temblor impercentible del ojo humano, y a la incapacidad del ojo humano para adecuar simultaneaménte la vista en dos áreas coloreadas con fuerte contraste. Así, el patrón horizontal del fondo elimina el efecto del movimiento horizontal de los ojos, mientras que el patrón vertical del disco elimina el efecto del movimiento vertical de los ojos. De forma que las neuronas estimuladas por el disco y el fondo generan movimientos distintos en los ojos y el cerebro interpreta las regiones como objetos independientes y separados.

Estos movimientos inconscientes eran considerados simplemente como “ruido” motor. Sin embargo, recientemente investigadores han descubierto que estos movimientos en realidad están controlados por el área del cerebro que da órdenes a los ojos para escanear las lineas en un diario o para seguir un objeto en movimiento, el colliculus superior. Esta área del cerebro es determinante para el comportamiento relevante del campo visual humano. Prestar atención a un punto u otro altera la actividad en el colliculus superior, y por ello también se altera el movimiento de nuestros ojos.

> :P5 width=720, height=570
>
> function setup() {
>   createCanvas(720, 570);
>   background('#FFFFFF');
>   rect(0,0,720,570);
>   fill('#000000');
>   noStroke();
>   noLoop();
> }
> 
> function draw() {
>   const width = 40;
>   const heigth = 15;
>
>   const wWidth = windowWidth-20;
>   const wHeigth = windowHeight-20;
>
>   for (let i=0; i < wWidth/width; i++){
>       for(let j=0; j < wHeigth/heigth; j++){
>           if(i%2==j%2){
>               rect(i* width,j* heigth,width,heigth);
>           }
>       }
>   }
>
>   let dim = 320;
>
>   let pg = createGraphics(dim,dim);
>   pg.fill('#FFFFFF');
>   pg.noStroke();
>   pg.circle(dim/2,dim/2,dim);
>   pg.fill('#000000');
>
>   for (let i=0; i < pg.windowWidth/heigth; i++){
>       for(let j=0; j < pg.windowHeight/width; j++){
>           if(i%2==j%2){
>               pg.rect(i* heigth,j* width,heigth,width);
>           }
>       }
>   }
>
>   pg.erase();
>
>   pg.beginShape();
>   pg.vertex(0, 0);
>   pg.vertex(0, 160);
>   pg.vertex(5, 122);
>   pg.vertex(10, 104);
>   pg.vertex(27, 71);
>   pg.vertex(46, 48);
>   pg.vertex(63, 32);
>   pg.vertex(84, 19);
>   pg.vertex(103, 11);
>   pg.vertex(121, 5);
>   pg.vertex(160, 0);
>   pg.endShape(CLOSE);
>
>   pg.beginShape();
>   pg.vertex(0, 320);
>   pg.vertex(0, 160);
>   pg.vertex(5, 198);
>   pg.vertex(10, 216);
>   pg.vertex(27, 249);
>   pg.vertex(46, 272);
>   pg.vertex(63, 288);
>   pg.vertex(84, 301);
>   pg.vertex(103, 309);
>   pg.vertex(121, 315);
>   pg.vertex(160, 320);
>   pg.endShape(CLOSE);
>
>   pg.beginShape();
>   pg.vertex(320, 0);
>   pg.vertex(320, 160);
>   pg.vertex(315, 122);
>   pg.vertex(310, 104);
>   pg.vertex(293, 71);
>   pg.vertex(274, 48);
>   pg.vertex(257, 32);
>   pg.vertex(236, 19);
>   pg.vertex(217, 11);
>   pg.vertex(199, 5);
>   pg.vertex(160, 0);
>   pg.endShape(CLOSE);
>
>   pg.beginShape();
>   pg.vertex(320, 320);
>   pg.vertex(320, 160);
>   pg.vertex(315, 198);
>   pg.vertex(310, 216);
>   pg.vertex(293, 249);
>   pg.vertex(274, 272);
>   pg.vertex(257, 288);
>   pg.vertex(236, 301);
>   pg.vertex(217, 309);
>   pg.vertex(199, 315);
>   pg.vertex(160, 320);
>   pg.endShape(CLOSE);
>
>   pg.noErase();
>
>   image(pg, wWidth/2 - dim/2, wHeigth/2 - dim/2);
>   
> }


> :ToCPrevNext