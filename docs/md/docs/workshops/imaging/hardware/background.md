# Background

## Pipeline

Para desarrollar gráficos con una GPU, es necesario conocer como funciona esta. En palabras sencillas, una GPU recibe información y la procesa para crear una imagen. Lo complejo de su funcionamiento es entender qué información recibe exactamente y cómo hace la GPU dicho procesamiento. Sin entrar en detalles complejos, la GPU recibe los datos de los vértices (O puntos) que conforman la imagen que se va a renderizar, y con estos realiza 6 procesamientos en el siguiente orden:

<p align="center">
  <img width="700" src="/docs/sketches/workshops/imaging/hardware/pipeline.png">
  <p align="center">
  Imagen 1: GPU Pipeline
  </p>
</p>

Los procesos que se muestran de color azul se conocen como Shaders, y son aquellos que un programador puede modificar según requiera. Por otro lado, los procesos de color gris son funciones fijas preprogramadas en las tarjetas gráficas por las compañias que las construyen. De esta forma, son 3 los procesos que se deben entender para utilizar al máximo las funcionalidades de una GPU. Sin embargo, para facilitar la comprensión de los conceptos básicos, en este laboratorio se entenderán e implementarán únicamente 2 shaders: el Vertex Shader y el Fragment Shader.

## Vertex Shader

Son los mismos en todos los codigos

## Fragment Shader

Son lo que varía para procesar las imágenes

## Application Programming Interfaces

En una implementación real de los shaders, se necesita tener un entorno de desarrollo comunicado con la tarjeta gráfica que se encarga de ejecutarlos. Por esta razón, se utiliza una interfaz de programación de aplicaciones (API por sus siglas en inglés). La cual, en palabras sencillas, se encarga de controlar el envío de instrucciones e información a la tarjeta gráfica, para que esta renderice una imagen utilizando sus funcionalidades básicas (Shape Assembly, Rasterization, y Test and Blending), y los shaders por defecto o implementados, según sea el caso. Algunas APIs para el rederizado de gráficos de computador son [Vulkan](https://www.vulkan.org/), [Direct3D](https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl) y [OpenGL](https://www.opengl.org//).

Los shaders son escritos en el leguaje de programación especificado por la API utilizada, pues esta última se encarga de traducir los shaders implementados a instrucciones que pueda seguir la tarjeta gráfica. Por ejemplo, el lenguaje utilizado en Vulkan es SPIR-V y en Direct3D es HLSL. OpenGL por su lado puede utilizar GLSL o SPIR-V de acuerdo con la preferencia del programador.

Para el desarrollo de este laboratorio, debido a su buena integración con p5.js se utilizará la API WebGL, la cual es una implementación de OpenGL para navegadores web y utiliza el legunaje GLSL.