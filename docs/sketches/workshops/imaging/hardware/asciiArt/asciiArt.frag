precision mediump float;
uniform sampler2D texture;
uniform sampler2D symbols;
uniform sampler2D symbols1;
uniform sampler2D symbols2;
uniform sampler2D symbols3;
uniform sampler2D symbols4;
uniform sampler2D symbols5;
uniform sampler2D symbols6;
uniform sampler2D symbols7;
uniform sampler2D symbols8;
uniform sampler2D symbols9;
uniform sampler2D symbols10;
uniform sampler2D symbols11;
uniform sampler2D symbols12;
uniform sampler2D symbols13;
uniform sampler2D symbols14;
//uniform sampler2D symbols15;

uniform float resolution;
vec4 textureColor;
float luma;
varying vec2 vTexCoord;
varying vec4 vVertexColor;

float sRGBtoLin(in float colorChannel) {
    if(colorChannel <= 0.04045) {
        return colorChannel / 12.92;
    } else {
        return pow(((colorChannel + 0.055) / 1.055), 2.2);
    }
}

float gam_sRGB(in float v) {
    if(v <= 0.0031308) {
        v *= 12.92;
    } else {
        v = (1.055 * (pow(v, 1.0 / 2.4))) - 0.055;
    }
    return v * 255.0;
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
    return gam_sRGB(Y);
}

void main() {
    vec2 symbolCoord = vTexCoord * resolution;
    vec2 imageCoord = floor(symbolCoord);
    symbolCoord = symbolCoord - imageCoord;
    imageCoord = imageCoord * vec2(1.0) / vec2(resolution);
    textureColor = texture2D(texture, imageCoord);

    luma = lumaFunc(textureColor.r, textureColor.g, textureColor.b);
    textureColor.r = luma;
    textureColor.g = luma;
    textureColor.b = luma;
    textureColor.a = 1.0;
    float result = luma;
    if(result > 0.0 && result <= 0.0625) {
        textureColor = texture2D(symbols, symbolCoord);
    } else if(result > 0.0625 && result <= 0.125) {
        textureColor = texture2D(symbols1, symbolCoord);
    } else if(result > 0.125 && result <= 0.1875) {
        textureColor = texture2D(symbols2, symbolCoord);
    } else if(result > 0.1875 && result <= 0.25) {
        textureColor = texture2D(symbols3, symbolCoord);
    } else if(result > 0.25 && result <= 0.3125) {
        textureColor = texture2D(symbols4, symbolCoord);
    } else if(result > 0.3125 && result <= 0.375) {
        textureColor = texture2D(symbols5, symbolCoord);
    } else if(result > 0.375 && result <= 0.4375) {
        textureColor = texture2D(symbols6, symbolCoord);
    } else if(result > 0.4375 && result <= 0.5) {
        textureColor = texture2D(symbols7, symbolCoord);
    } else if(result > 0.5 && result <= 0.5625) {
        textureColor = texture2D(symbols8, symbolCoord);
    } else if(result > 0.5625 && result <= 0.625) {
        textureColor = texture2D(symbols9, symbolCoord);
    } else if(result > 0.625 && result <= 0.6875) {
        textureColor = texture2D(symbols10, symbolCoord);
    } else if(result > 0.6875 && result <= 0.75) {
        textureColor = texture2D(symbols11, symbolCoord);
    } else if(result > 0.75 && result <= 0.8125) {
        textureColor = texture2D(symbols12, symbolCoord);
    } else if(result > 0.8125 && result <= 0.875) {
        textureColor = texture2D(symbols13, symbolCoord);
    } else if(result > 0.875 && result <= 0.9375) {
        textureColor = texture2D(symbols14, symbolCoord);
    }/* else if(result > 0.9375 && result <= 1.0) {
        textureColor = texture2D(symbols15, symbolCoord);
    }*/
    gl_FragColor = textureColor * vVertexColor;
}
