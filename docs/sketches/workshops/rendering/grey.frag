
//Tomado de: https://github.com/nakednous/shaders/blob/main/docs/sketches/vc/texture.frag

precision mediump float;

// texture is sent by the sketch
uniform sampler2D texture;

// interpolated color (same name and type as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 vTexCoord;

void main() {
  
  // texture2D(texture, vTexCoord) samples texture at vTexCoord 
  // and returns the normalized texel color
  // texel color times vVertexColor gives the final normalized pixel color
  vec4 bufferTexture = texture2D(texture, vTexCoord);
  // Importante no usar enteros (Poner el .0 luego de un número)
  mediump float mean = (bufferTexture.r + bufferTexture.g + bufferTexture.b) / 3.0;
  bufferTexture = vec4(mean,mean,mean, 1.0);
  // Otra forma de hacerlo sería
  // bufferTexture.r = mean;
  // bufferTexture.g = mean;
  // bufferTexture.b = mean;
  gl_FragColor = bufferTexture * vVertexColor;  
}