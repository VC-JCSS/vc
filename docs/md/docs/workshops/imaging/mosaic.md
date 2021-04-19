# Mosaic - Images

## Background

Se debe implementar un mecanismo que genere un mosaico el cual consiste en recrear una imagen a partir de pequeñas imágenes, para crear una mayor concordancia las pequeñas imágenes deben pertenece a la misma temática de la imagen original, por ejemplo, aves. 

**Ideas Primarias:** Las primeras ideas que se plantearon para la creación del mosaico fueron 2 principalmente:

* Primero se determino que la mejor manera para crear el mosaico consistía en dividir la imagen en pequeñas cuadriculas cuyo tamaño fuera una potencia de 2 (por ejemplo, 8x8 o 16x16), una vez se tienen estas cuadriculas se haya el color dominante de cada cuadricula, para esto basto con hallar el promedio de cada uno los canales (trabajando en modo rgb) de los colores de cada uno de los pixeles de la cuadricula, esto permitió obtener un color domínate de cada uno de las cuadriculas. 

* Como segunda idea ya teniendo el color predominante de cada una de las cuadriculas, se planteo el uso de una API que se encargara de proveer imágenes para cada una de las cuadriculas con su respectivo color predominante, este proceso funciono en pequeña escala, pero cuando se intentó realizar el proceso con una imagen de tamaño real, se superaron fácilmente el limite de las API, esto conllevo a descartar esta segunda idea y buscar otras alternativas. 


**HTML Colores y Distancia Delta:** Dado que era imposible conseguir una imagen para cada uno de los colores, se busco alguna manera de estandarizar la paleta, en esta búsqueda se encontró la lista de colores estándares proveídos por **HTML**, dicha lista esta conformada por 140 colores y representan una abstracción bastante completa de la paleta, con esta lista de colores mucho más reducida se busco una imagen para cada uno de los colores. 

En este punto se tenía 140 imágenes para cada uno los colores estandarizados por HTML, pero los colores predominantes de cada uno de las cuadriculas aún no habían sido estandarizado, para esto se hizo uso del concepto de **distancia delta**, dicha distancia expresa de manera numérica la diferencia entre 2 colores,  es decir si x y z son el mismo color su distancia será cero, con este concepto en mente se tomo un cuadricula cuyo color predomínate es el color **c** y se halló la distancia delta del color c con cada uno de los 140 colores y se selecciono el color con la mejor distancia, se tomó la imagen correspondiente a ese color y se construyó el mosaico.
<br/>
<br/>

























































### Code
A continuacion no se muestran algunos fragmentos de codigo que permitiran comprender los detalles de la solucion planteada.
> :Tabs
> > :Tab title=Color Predominante
> > 
> > El siguiente fragmento de código permite obtener el color predominante de cada una de las cuadriculas de la imagen original.
> > 
> > > ```js | getColor.js
> > > let d = pixelDensity();
> > >     
> > >     let mosaic_part_x =8;
> > >     let mosaic_part_y =8;
> > > 
> > >     loadPixels();
> > > 
> > >     for(let i=0; i< Math.floor(width/mosaic_part_x); i++ ){
> > >         for(let j=0; j< Math.floor(height/mosaic_part_y); j++ ){
> > >             let r = 0; 
> > >             let g = 0; 
> > >             let b = 0;
> > > 
> > >             for(let k=0; k<mosaic_part_x; k++){
> > >                 for(let l=0; l<mosaic_part_y; l++){
> > >                     
> > >                     let x = i*mosaic_part_x + k;
> > >                     let y = j*mosaic_part_y + l;
> > > 
> > >                     let off = (y * width + x) * d * 4;
> > >                     r+= pixels[off];
> > >                     g+= pixels[off + 1];
> > >                     b+= pixels[off + 2];
> > >                 }
> > >             }
> > > 
> > >             r = Math.floor(r / (mosaic_part_x*mosaic_part_y));
> > >             g = Math.floor(g / (mosaic_part_x*mosaic_part_y));
> > >             b = Math.floor(b / (mosaic_part_x*mosaic_part_y));
> > > 
> > >         }
> > >     }
> > > ```
>
> > :Tab title=Distancia Delta
> >
> > El siguiente fragmento de código permite obtener la distancia delta entre 2 colores
> >
> > > ``` js | distanceDelta.js
> > > function calculateDeltaE(color1, color2){
> > >     let c1 = hexToRgb(color1);
> > >     let c2 = hexToRgb(color2);
> > >     return Math.sqrt( ((c2.r-c1.r)*(c2.r-c1.r)) + 
> > >                       ((c2.g-c1.g)*(c2.g-c1.g)) + 
> > >                       ((c2.b-c1.b)*(c2.b-c1.b)));
> > > }
> > > ```
>
> > :Tab title=Asociar Imagen
> >
> > El siguiente fragmento de código permite obtener una imagen dado un color, para esto primero estandariza el color con ayuda de la distancia delta y luego selecciona la imagen de las imágenes disponibles. 
> >
> > > ```  js | searchImage.js
> > > function searchImage(color, x, y, w, h){
> > >     let min =  100000000;
> > >     let color_min = "#FFFFFF";
> > >     
> > >     for(let i=0; i<html_colors.length; i++){
> > >         let deltaE = calculateDeltaE(color, html_colors[i]);
> > >         if(deltaE<=min){
> > >             min = deltaE;
> > >             color_min = html_colors[i];
> > >         }
> > >     }
> > > 
> > >     let img_color = images_html_colors[color_min];
> > >     img_color.resize(w, h);
> > >     image(img_color, x, y);
> > > }
> > > ```
>
> > :Tab title=Banco de Imagenes
> >
> > Se ha hablando bastante de las imágenes disponibles, este pequeño banco de imágenes esta conformado por las siguientes imágenes:
> >
> > >
> > > 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FFFF.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F0F8FF.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FAEBD7.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/000000.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/0000FF.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FFFF.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00008B.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/008B8B.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/006400.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00CED1.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00BFFF.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/008000.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FF00.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/0000CD.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FA9A.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/000080.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FF7F.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/008080.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/191970.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/1E90FF.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/20B2AA.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/228B22.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/2E8B57.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/2F4F4F.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/2F4F4F.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/32CD32.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/3CB371.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/40E0D0.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/4169E1.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/4682B4.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/483D8B.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/48D1CC.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/4B0082.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/556B2F.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/5F9EA0.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/6495ED.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/66CDAA.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/696969.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/696969.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/6A5ACD.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/6B8E23.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/708090.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/708090.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/778899.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/778899.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/7B68EE.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/7CFC00.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/7FFFD4.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/7FFF00.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/808080.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/808080.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/800000.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/808000.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/800080.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/87CEFA.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/87CEEB.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8A2BE2.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8B008B.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8B0000.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8B4513.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8FBC8F.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/90EE90.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/9370DB.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/9400D3.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/98FB98.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/9932CC.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/9ACD32.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/A0522D.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/A52A2A.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/A9A9A9.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/A9A9A9.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/ADFF2F.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/ADD8E6.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/AFEEEE.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/B0C4DE.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/B0E0E6.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/B22222.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/B8860B.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/BA55D3.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/BC8F8F.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/BDB76B.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/C0C0C0.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/C71585.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/CD5C5C.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/CD853F.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D2691E.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D2B48C.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D3D3D3.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D3D3D3.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D8BFD8.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DAA520.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DA70D6.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DB7093.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DC143C.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DCDCDC.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DDA0DD.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DEB887.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/E0FFFF.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/E6E6FA.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/E9967A.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/EEE8AA.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/EE82EE.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F0FFFF.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F0FFF0.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F0E68C.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F08080.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F4A460.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F5F5DC.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F5FFFA.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F5DEB3.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F5F5F5.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F8F8FF.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FAFAD2.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FAF0E6.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FA8072.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FDF5E6.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFE4C4.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFEBCD.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF7F50.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFF8DC.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF8C00.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF1493.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFAF0.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF00FF.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFD700.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF69B4.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFFF0.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFF0F5.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFACD.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFB6C1.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFA07A.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFFE0.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF00FF.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFE4E1.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFE4B5.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFDEAD.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFA500.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF4500.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFEFD5.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFDAB9.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFC0CB.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF0000.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFF5EE.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFAFA.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF6347.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFFFF.jpg" width="9%"></img> 
> > > <img src="../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFF00.jpg" width="9%"></img>

<br/>
<br/>















## Result 
A continuación se muestra una imagen y el resultado al aplicar el algoritmo para generar su mosaico.
40

> :P5 sketch=/docs/sketches/workshops/imaging/mosaic/main.js, width=800, height=640


> :ToCPrevNext
