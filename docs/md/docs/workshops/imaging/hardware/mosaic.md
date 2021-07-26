# Mosaic - Images

Previamente se realizó la implementación de un mosaico usando las herramientas de P5.JS, si bien a nivel visual los resultados fueron bastantes sorprendentes, a nivel de eficiencia fueron bastantes deficientes, uno de los principales problemas fue el cambio de resolución lo cual resulto ineficiente y molesto para el usuario. Además, la implementación que usó un video fue realmente decepcionante y se decidió eliminar ya que afectaba el proyecto en general. 

<br/>
En este punto se tienen tres retos principales, primero la implementación del mosaico usando el concepto de Shaders, segundo una mejora en la eficiencia del programa, y tercero la implementación del video. Los resultados de estos retos fueron los siguientes:
<br/>
<br/>





### Code
A continuacion no se muestran algunos fragmentos de codigo que permitiran comprender los detalles de la solucion planteada.
> :Tabs
> > :Tab title=Distancia Delta
> >
> >  El siguiente fragmento de código permite obtener la distancia delta entre 2 colores, 
> >  maneja el mismo concepto implemento anteriormente en JS
> >
> > > ``` js | photomosaic.frag
> > > float calculateDeltaE(float r1, float g1, float b1, 
> > >                       float r2, float g2, float b2) {
> > >   float delta = (((r2-r1)*(r2-r1)) + ((g2-g1)*(g2-g1)) + ((b2-b1)*(b2-b1)));
> > >   return delta;
> > > }
> > > ```
>
> > :Tab title=Codigo P5.JS
> >
> > El codigo de P5.JS es el siguiente:
> >
> > > ``` js | photomosaic.frag
> > > let image;
> > > let video;
> > > let om;
> > > let mosaic;
> > > let resolution;
> > > let video_on;
> > > let om_on;
> > > 
> > > function preload() {
> > >     
> > >     image = loadImage('mosaic/duck.png');
> > >     video = createVideo(['mosaic/duck.webm']);
> > >     om = loadImage('mosaic/html_colors.png');
> > >     mosaic = loadShader('mosaic/shader.vert','photomosaic.frag');
> > >     video.hide();
> > > }
> > > 
> > > function setup() {
> > >     console.time("Mosaic: Hardware")
> > >     createCanvas(900, 506, WEBGL);
> > >     textureMode(NORMAL);
> > >     noStroke();
> > >     shader(mosaic);
> > > 
> > >     mosaic.setUniform('om', om);
> > >     
> > > 
> > >     om_on = createCheckbox('Mosaico', false);
> > >     om_on.changed(() => mosaic.setUniform('om_on', om_on.checked()));
> > >     om_on.position(10, 10);
> > > 
> > >     video_on = createCheckbox('Video', false);
> > >     video_on.changed(() => {
> > >         if (video_on.checked()) {
> > >             mosaic.setUniform('img', video);
> > >             video.loop();
> > >         } else {
> > >             mosaic.setUniform('img', image);
> > >         }
> > >     });
> > >     video_on.position(10, 30);
> > > 
> > > 
> > >     mosaic.setUniform('img', image);
> > >     resolution = createSlider(1, 200, 30, 1);
> > >     resolution.position(10, 50);
> > >     resolution.style('width', '80px');
> > >     resolution.input(() 
> > >               => mosaic.setUniform('resolution', resolution.value()));
> > >     mosaic.setUniform('resolution', resolution.value());
> > > 
> > >     console.log({ resolution })
> > >     console.timeEnd("Mosaic: Hardware")
> > > }
> > > 
> > > 
> > > 
> > > function draw() {
> > >     
> > >     background(33);
> > >     cover(true);
> > >     
> > > }
> > > 
> > > 
> > > 
> > > function cover(texture = false) {
> > >     beginShape();
> > >     if (texture) {
> > >         vertex(-width / 2, -height / 2, 0, 0, 0);
> > >         vertex(width / 2, -height / 2, 0, 1, 0);
> > >         vertex(width / 2, height / 2, 0, 1, 1);
> > >         vertex(-width / 2, height / 2, 0, 0, 1);
> > >     }
> > >     else {
> > >         vertex(-width / 2, -height / 2, 0);
> > >         vertex(width / 2, -height / 2, 0);
> > >         vertex(width / 2, height / 2, 0);
> > >         vertex(-width / 2, height / 2, 0);
> > >     }
> > >     endShape(CLOSE);
> > > }
> > > 
> > > ```
>
> > :Tab title=Fragment Shader
> >
> > El siguiente fragmento de código es el fragment diseñado para la implementacion del mosaico
> >
> > > ``` cpp | photomosaic.frag
> > > precision mediump float;
> > > 
> > >  
> > >  uniform sampler2D img;
> > >  
> > >  uniform sampler2D om;
> > >  
> > >  
> > >  
> > >  uniform bool om_on;
> > >  uniform float resolution;
> > >  
> > >  
> > >  varying vec4 vVertexColor;
> > >  varying vec2 vTexCoord;
> > >  
> > >  float calculateDeltaE(float r1, float g1, float b1, 
> > >                        float r2, float g2, float b2);
> > >  
> > >  void main() {
> > >  
> > >      vec2 omCoord = vTexCoord * resolution;
> > >      vec2 texCoord = floor(omCoord);
> > >      
> > >      omCoord = omCoord - texCoord;
> > >      texCoord = texCoord * (vec2(1.0) / vec2(resolution));
> > >  
> > >      
> > >      vec4 imgTexel = texture2D(img, texCoord);
> > >      
> > >    if(om_on) {
> > >      vec2 coords = vec2(texCoord.x, texCoord.y);
> > >      vec4 actualPixel = texture2D(img, coords);
> > >      float r = actualPixel.r;
> > >      float g = actualPixel.g;
> > >      float b = actualPixel.b;
> > >      
> > >      float min = calculateDeltaE(0.0,0.0,0.0,r,g,b);
> > >      vec4 omTexel = texture2D(om, 
> > >                       (omCoord*(vec2(0.04, 0.1666)))+ vec2(0.0, 0.0) );
> > >      
> > >      if(min > calculateDeltaE( 0.0, 0.0, 0.0, r, g, b)){
> > >          min = calculateDeltaE( 0.0, 0.0, 0.0, r, g, b);
> > >          omTexel = texture2D(om, 
> > >                       (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.0, 0) );
> > >      } 
> > >  
> > >  
> > >      if(min > calculateDeltaE( 0.0, 0.0, 0.5019607843137255, r, g, b)){
> > >          min = calculateDeltaE( 0.0, 0.0, 0.5019607843137255, r, g, b);
> > >          omTexel = texture2D(om, 
> > >                       (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.04, 0) );
> > >      } 
> > >  
> > >  
> > >      if(min > calculateDeltaE( 0.0, 0.0, 0.5450980392156862, r, g, b)){
> > >          min = calculateDeltaE( 0.0, 0.0, 0.5450980392156862, r, g, b);
> > >          omTexel = texture2D(om, 
> > >                       (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.08, 0) );
> > >      } 
> > >  
> > >  
> > >       ...
> > >       ...
> > >       ...
> > >       ...
> > >       ...
> > >  
> > >  
> > >      if(min > calculateDeltaE( 1.0, 1.0, 0.9411764705882353, r, g, b)){
> > >          min = calculateDeltaE( 1.0, 1.0, 0.9411764705882353, r, g, b);
> > >          omTexel = texture2D(om, 
> > >                       (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.44, 0.8333) );
> > >      } 
> > >  
> > >  
> > >      if(min > calculateDeltaE( 1.0, 1.0, 1.0, r, g, b)){
> > >          min = calculateDeltaE( 1.0, 1.0, 1.0, r, g, b);
> > >          omTexel = texture2D(om, 
> > >                       (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.48, 0.8333) );
> > >      } 
> > >  
> > >  
> > >      
> > >      gl_FragColor = omTexel;
> > >      
> > >      
> > >    }
> > >    else {
> > >      gl_FragColor = imgTexel;
> > >    }
> > >  }
> > >  
> > >  
> > >  float calculateDeltaE(float r1, float g1, float b1, 
> > >                       float r2, float g2, float b2) {
> > >    float delta = (((r2-r1)*(r2-r1)) + ((g2-g1)*(g2-g1)) + ((b2-b1)*(b2-b1)));
> > >    return delta;
> > >  }
> > > }
> > > ```
>
> > :Tab title=Banco de Imagenes
> >
> > El banco de imagenes que permitio realizar el mosaico es el siguiente:
> >
> > >
> > > 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FFFF.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F0F8FF.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FAEBD7.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/000000.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/0000FF.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FFFF.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00008B.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/008B8B.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/006400.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00CED1.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00BFFF.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/008000.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FF00.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/0000CD.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FA9A.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/000080.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/00FF7F.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/008080.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/191970.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/1E90FF.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/20B2AA.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/228B22.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/2E8B57.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/2F4F4F.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/2F4F4F.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/32CD32.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/3CB371.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/40E0D0.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/4169E1.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/4682B4.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/483D8B.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/48D1CC.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/4B0082.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/556B2F.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/5F9EA0.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/6495ED.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/66CDAA.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/696969.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/696969.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/6A5ACD.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/6B8E23.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/708090.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/708090.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/778899.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/778899.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/7B68EE.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/7CFC00.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/7FFFD4.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/7FFF00.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/808080.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/808080.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/800000.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/808000.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/800080.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/87CEFA.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/87CEEB.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8A2BE2.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8B008B.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8B0000.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8B4513.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/8FBC8F.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/90EE90.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/9370DB.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/9400D3.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/98FB98.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/9932CC.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/9ACD32.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/A0522D.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/A52A2A.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/A9A9A9.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/A9A9A9.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/ADFF2F.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/ADD8E6.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/AFEEEE.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/B0C4DE.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/B0E0E6.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/B22222.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/B8860B.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/BA55D3.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/BC8F8F.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/BDB76B.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/C0C0C0.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/C71585.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/CD5C5C.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/CD853F.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D2691E.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D2B48C.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D3D3D3.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D3D3D3.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/D8BFD8.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DAA520.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DA70D6.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DB7093.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DC143C.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DCDCDC.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DDA0DD.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/DEB887.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/E0FFFF.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/E6E6FA.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/E9967A.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/EEE8AA.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/EE82EE.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F0FFFF.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F0FFF0.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F0E68C.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F08080.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F4A460.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F5F5DC.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F5FFFA.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F5DEB3.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F5F5F5.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/F8F8FF.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FAFAD2.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FAF0E6.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FA8072.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FDF5E6.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFE4C4.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFEBCD.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF7F50.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFF8DC.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF8C00.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF1493.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFAF0.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF00FF.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFD700.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF69B4.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFFF0.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFF0F5.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFACD.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFB6C1.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFA07A.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFFE0.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF00FF.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFE4E1.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFE4B5.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFDEAD.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFA500.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF4500.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFEFD5.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFDAB9.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFC0CB.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF0000.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFF5EE.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFAFA.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FF6347.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFFFF.jpg" width="9%"></img> 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/mosaic/html_colors/FFFF00.jpg" width="9%"></img>
>
> > :Tab title=Textura
> >
> > Por fines practicos el banco de imagenes fue unido en una simple imagen, la cual fue usada como textura.
> >
> > >
> > > 
> > > <img src="../../../../../vc/docs/sketches/workshops/imaging/hardware/mosaic/html_colors.png" width="100%"></img> 

<br/>
<br/>




## Result 
El resultado de todo el proceso es el siguiente

> :P5 sketch=/docs/sketches/workshops/imaging/hardware/mosaic/index.js, width=800, height=450


> :ToCPrevNext


