
precision mediump float;


uniform sampler2D texture;

uniform float verticalOffset;
uniform float horizontalOffset;

uniform vec3 kernelRow1;
uniform vec3 kernelRow2;
uniform vec3 kernelRow3;

mat3 kernelMatrix;

// interpolated color (same name and type as in vertex shader)
varying vec4 vVertexColor;
// interpolated texcoord (same name and type as in vertex shader)
varying vec2 vTexCoord;

float gray(in float r, in float g, in float b);

float constrain(in float value, in float constraint1, in float constraint2);

vec4 convolution();

void main() {

    kernelMatrix = mat3(kernelRow1, kernelRow2, kernelRow3);

    //vec4 image = texture2D(texture, vTexCoord);

    // if(kernelMatrix[1][0] == 3.0){
    //     mediump float mean = gray(image.r, image.g, image.b);
    //     image = vec4(mean,mean,mean, 1.0);
    // }    

    // if(constrain(-5.0, 0.0, 3.0) == 0.0){
    //     mediump float mean = gray(image.r, image.g, image.b);
    //     image = vec4(mean,mean,mean, 1.0);
    // }

    gl_FragColor = convolution() * vVertexColor;
}

float gray(in float r, in float g, in float b) {
    return (r+g+b)/3.0;
}

float constrain(in float value, in float constraint1, in float constraint2) {
    return  (value>=constraint1) ? (value<=constraint2) ? value : constraint2 : constraint1;
}

vec4 convolution() {
    float rtotal = 0.0;
    float gtotal = 0.0;
    float btotal = 0.0;

    for (float kx = -1.0; kx <= 1.0; kx++) {
        for (float ky = -1.0; ky <= 1.0; ky++) {
            vec2 coords = vec2(vTexCoord.x + (kx*horizontalOffset), vTexCoord.y + (ky*horizontalOffset));
            float r = 0.0;
            float g = 0.0;
            float b = 0.0;

            if ((coords.x >= 0.0 && coords.x <= 1.0) && (coords.y >= 0.0 || coords.y <= 1.0)) {
                vec4 actualPixel = texture2D(texture, coords);
                r = actualPixel.r;
                g = actualPixel.g;
                b = actualPixel.b;
            }

            rtotal += kernelMatrix[int(kx) + 1][int(ky) + 1] * r;
            gtotal += kernelMatrix[int(kx) + 1][int(ky) + 1] * g;
            btotal += kernelMatrix[int(kx) + 1][int(ky) + 1] * b;
        }
    }

    rtotal = constrain(rtotal, 0.0, 255.0);
    gtotal = constrain(gtotal, 0.0, 255.0);
    btotal = constrain(btotal, 0.0, 255.0);

    return vec4(rtotal, gtotal, btotal, 1.0);
}