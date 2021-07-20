## Ray traced ambient occlusion (RTAO)

Debido a que SSAO funciona únicamente con datos en su fotograma actual es decir, su búfer de fotogramas esto puede conducir a inexactitudes, al igual que con la mayoría de los efectos de postprocesamiento del espacio de la pantalla, como los reflejos. Después de todo, falta información sobre el resto de la escena.

La gran ventaja de Ray-Traced ambient occlusion (RTAO) sobre Screen-Space Ambient Occlusion (SSAO) es que funciona con información de toda la escena (datos fuera de la pantalla).

El problema principal es que el AO solo funciona con objetos estáticos y se necesita gran cantidad de tiempo, tanto de personas como de procesado para que funcione bien.

Por ello, últimamente se ha considerado más la AO con trazado de rayos en tiempo real para los proyectos, debido a que esta trae lo mejor: RTAO se ve mucho mejor que SSAO (ya que funciona con información completa) y a diferencia de AO, RTAO funciona tanto con objetos dinámicos como estáticos. Pero no todo es bueno, pues con RTAO se necesitará de mayor rendimiento.

> :P5 sketch=/docs/sketches/workshops/rendering/SSAOvsRTAO.js, width=800, height=640

Como se puede observar en la imagen, muchas de las inexactitudes de SSAO han desaparecido. Y las sombras suaves que faltan que se esperaría en la vida real ahora están ahí. Esa es una de las ventajas de trabajar con datos fuera de la pantalla en tiempo real. Pero esto no es lo único, en algunos proyectos se requiere que las imágenes coincidan con el estilo artístico, por lo que a continuación se explicarán algunos parámetros de RTAO que pueden ser  modificados.

### RTAO Intensity

La intensidad hace referencia la oscurecimiento, en Unity, se usa una escala entre 0 y 4, valor que determina qué tan fuerte es el efecto de oclusión ambiental es decir.

> :P5 sketch=/docs/sketches/workshops/rendering/RTAOIntensity.js, width=800, height=640

### RTAO Direct Lighting Strength

La intensidad de la iluminación directa controla cuánto afecta la oclusión a la iluminación difusa directa. Para entenderse mejor se dará un ejemplo:
Piense en la brecha entre los ladrillos, estos espacios son áreas ligeramente ocluidas, que reciben menos luz de lo habitual, pero si una luz apunta directamente hacia los ladrillos ¿este punto se debería de oscurecer? A eso hace referencia este parámetro.

En Unity un valor de 1 seguirá oscureciendo su superficie incluso bajo iluminación directa. Eso podría jugar en contra del realismo, por lo que se sugiere tener un valor bajo aquí en este apartado (entre 0 y 1).

> :P5 sketch=/docs/sketches/workshops/rendering/RTAOStrength.js, width=800, height=640

### RTAO Ray Length

Cada rayo que se proyecta tiene una duración antes de que "muera". Cuanto más largos sean los rayos, mayores serán las posibilidades de que lleguen a una superficie cercana y decidan que el píxel está "más ocluido que antes". Los rayos más cortos conducirán a una oclusión ambiental local y de menor escala. Si se aumenta la longitud de los rayos, pasa de la oclusión ambiental local a la visibilidad del cielo.

En Unity el valor predeterminado de 0.5 se ve bien, pero tener acceso a este parámetro ayudará a lograr un estilo artístico objetivo mejor.

> :P5 sketch=/docs/sketches/workshops/rendering/RTAOLength.js, width=800, height=640

### RTAO Denoise

Cuando utiliza el trazado de rayos, es fácil ver cómo genera ruido visual en sus superficies. Después de todo, solo se puede lanzar tantos rayos antes de matar rápidamente el rendimiento. Es por eso que a menudo se agrega un filtro de eliminación de ruido después de calcular el AO con trazado de rayos. Esto suavizará estos molestos artefactos visuales.

> :P5 sketch=/docs/sketches/workshops/rendering/RTAODenoise.js, width=800, height=640


### Conclusión

El trazado de rayos en tiempo real ahora es asequible, especialmente con efectos de bajo impacto (rendimiento) como la oclusión ambiental. A pesar de ser costoso en todos los aspectos, lo más probable es que el AO con trazado de rayos sea asequible en la mayoría de los proyectos,

Tomado de: https://thegamedev.guru/unity-ray-tracing/ambient-occlusion-rtao/#the-ray-traced-ao-parameters-you-can-play-with

> :ToCPrevNext