precision mediump float;
uniform sampler2D texture;
uniform int grayType;

// B. varying variables are defined by the shader programmer:
// vertex color
varying vec4 vVertexColor;

vec4 textureColor;

float luma;
float average;
// interpolated texcoord (same name as in vertex shader)
varying vec2 vTexCoord;

float sRGBtoLin(in float colorChannel) {
    if ( colorChannel <= 0.04045 ) {
        return colorChannel / 12.92;
    } else {
        return pow((( colorChannel + 0.055)/1.055),2.2);
    }
}

float gam_sRGB(in float v) {
    if(v <= 0.0031308){
        v *= 12.92;
    } else {
        v = (1.055 * (pow(v,1.0/2.4))) - 0.055;
    }
    return v*255.0;
}

float lumaFunc(in float r, in float g, in float b) {
    float rY = 0.212655;
    float gY = 0.715158;
    float bY = 0.072187;
    //Convert all sRGB 8 bit integer values to decimal 0.0-1.0
    float vR = r / 255.0;
    float vG = g / 255.0;
    float vB = b / 255.0;
    //Convert a gamma encoded RGB to a linear value.
    float rLin = sRGBtoLin(vR);
    float gLin = sRGBtoLin(vG);
    float bLin = sRGBtoLin(vB);
    //Find Luminance (Y)
    float Y = ((rY * rLin) + (gY * gLin) + (bY * bLin));
    //float Y = ((rY) + (gY) + (bY)) * 255.0;
    return gam_sRGB(Y) ;
}

void main() {
    textureColor = texture2D(texture, vTexCoord);
    if(grayType == 1){}
    if(grayType == 2){
        textureColor.r = 1.0-textureColor.r;
        textureColor.g = 1.0-textureColor.g;
        textureColor.b = 1.0-textureColor.b;
        textureColor.a = 1.0;
    }
    if(grayType == 3){
        luma = lumaFunc(textureColor.r, textureColor.g, textureColor.b);
        textureColor.r = luma;
        textureColor.g = luma;
        textureColor.b = luma;
        textureColor.a = 1.0;
    }
    if(grayType == 4){
        average = (textureColor.r + textureColor.g + textureColor.b) / 3.0;
        textureColor.r = average;
        textureColor.g = average;
        textureColor.b = average;
        textureColor.a = 1.0;
    }
    gl_FragColor = textureColor * vVertexColor;
}




