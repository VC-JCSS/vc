precision mediump float;


uniform sampler2D img;

uniform sampler2D om;



uniform bool om_on;
uniform float resolution;


varying vec4 vVertexColor;
varying vec2 vTexCoord;

float calculateDeltaE(float r1, float g1, float b1, float r2, float g2, float b2);

void main() {

    vec2 omCoord = vTexCoord * resolution;
    vec2 texCoord = floor(omCoord);
    
    omCoord = omCoord - texCoord;
    texCoord = texCoord * (vec2(1.0) / vec2(resolution));

    
    vec4 imgTexel = texture2D(img, texCoord);
    
  if(om_on) {
    // vec4 omTexel = texture2D(om_1, omCoord);
    // vec4 omTexel = texture2D(om, (omCoord*(vec2(0.04, 1.0)))+vec2(0.0, 0.0) );
    
  
    
    
    
    vec2 coords = vec2(texCoord.x, texCoord.y);
    vec4 actualPixel = texture2D(img, coords);
    float r = actualPixel.r;
    float g = actualPixel.g;
    float b = actualPixel.b;
    
    
    //om_1 = 000000
    float min = calculateDeltaE(0.0,0.0,0.0,r,g,b);
    vec4 omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.1666)))+ vec2(0.0, 0.0) );
    
    if(min > calculateDeltaE( 0.0, 0.0, 0.0, r, g, b)){
        min = calculateDeltaE( 0.0, 0.0, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.0, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 0.0, 0.5019607843137255, r, g, b)){
        min = calculateDeltaE( 0.0, 0.0, 0.5019607843137255, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.04, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 0.0, 0.5450980392156862, r, g, b)){
        min = calculateDeltaE( 0.0, 0.0, 0.5450980392156862, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.08, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 0.0, 0.803921568627451, r, g, b)){
        min = calculateDeltaE( 0.0, 0.0, 0.803921568627451, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.12, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 0.0, 1.0, r, g, b)){
        min = calculateDeltaE( 0.0, 0.0, 1.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.16, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 0.39215686274509803, 0.0, r, g, b)){
        min = calculateDeltaE( 0.0, 0.39215686274509803, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.2, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 0.5019607843137255, 0.0, r, g, b)){
        min = calculateDeltaE( 0.0, 0.5019607843137255, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.24, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 0.5019607843137255, 0.5019607843137255, r, g, b)){
        min = calculateDeltaE( 0.0, 0.5019607843137255, 0.5019607843137255, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.28, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 0.5450980392156862, 0.5450980392156862, r, g, b)){
        min = calculateDeltaE( 0.0, 0.5450980392156862, 0.5450980392156862, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.32, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 0.7490196078431373, 1.0, r, g, b)){
        min = calculateDeltaE( 0.0, 0.7490196078431373, 1.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.36, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 0.807843137254902, 0.8196078431372549, r, g, b)){
        min = calculateDeltaE( 0.0, 0.807843137254902, 0.8196078431372549, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.4, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 0.9803921568627451, 0.6039215686274509, r, g, b)){
        min = calculateDeltaE( 0.0, 0.9803921568627451, 0.6039215686274509, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.44, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 1.0, 0.0, r, g, b)){
        min = calculateDeltaE( 0.0, 1.0, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.48, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 1.0, 0.4980392156862745, r, g, b)){
        min = calculateDeltaE( 0.0, 1.0, 0.4980392156862745, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.52, 0) );
    } 


    if(min > calculateDeltaE( 0.0, 1.0, 1.0, r, g, b)){
        min = calculateDeltaE( 0.0, 1.0, 1.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.56, 0) );
    } 


    if(min > calculateDeltaE( 0.09803921568627451, 0.09803921568627451, 0.4392156862745098, r, g, b)){
        min = calculateDeltaE( 0.09803921568627451, 0.09803921568627451, 0.4392156862745098, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.6, 0) );
    } 


    if(min > calculateDeltaE( 0.11764705882352941, 0.5647058823529412, 1.0, r, g, b)){
        min = calculateDeltaE( 0.11764705882352941, 0.5647058823529412, 1.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.64, 0) );
    } 


    if(min > calculateDeltaE( 0.12549019607843137, 0.6980392156862745, 0.6666666666666666, r, g, b)){
        min = calculateDeltaE( 0.12549019607843137, 0.6980392156862745, 0.6666666666666666, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.68, 0) );
    } 


    if(min > calculateDeltaE( 0.13333333333333333, 0.5450980392156862, 0.13333333333333333, r, g, b)){
        min = calculateDeltaE( 0.13333333333333333, 0.5450980392156862, 0.13333333333333333, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.72, 0) );
    } 


    if(min > calculateDeltaE( 0.1803921568627451, 0.5450980392156862, 0.3411764705882353, r, g, b)){
        min = calculateDeltaE( 0.1803921568627451, 0.5450980392156862, 0.3411764705882353, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.76, 0) );
    } 


    if(min > calculateDeltaE( 0.1843137254901961, 0.30980392156862746, 0.30980392156862746, r, g, b)){
        min = calculateDeltaE( 0.1843137254901961, 0.30980392156862746, 0.30980392156862746, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.8, 0) );
    } 


    if(min > calculateDeltaE( 0.19607843137254902, 0.803921568627451, 0.19607843137254902, r, g, b)){
        min = calculateDeltaE( 0.19607843137254902, 0.803921568627451, 0.19607843137254902, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.84, 0) );
    } 


    if(min > calculateDeltaE( 0.23529411764705882, 0.7019607843137254, 0.44313725490196076, r, g, b)){
        min = calculateDeltaE( 0.23529411764705882, 0.7019607843137254, 0.44313725490196076, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.88, 0) );
    } 


    if(min > calculateDeltaE( 0.25098039215686274, 0.8784313725490196, 0.8156862745098039, r, g, b)){
        min = calculateDeltaE( 0.25098039215686274, 0.8784313725490196, 0.8156862745098039, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.92, 0) );
    } 


    if(min > calculateDeltaE( 0.2549019607843137, 0.4117647058823529, 0.8823529411764706, r, g, b)){
        min = calculateDeltaE( 0.2549019607843137, 0.4117647058823529, 0.8823529411764706, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.96, 0) );
    } 


    if(min > calculateDeltaE( 0.27450980392156865, 0.5098039215686274, 0.7058823529411765, r, g, b)){
        min = calculateDeltaE( 0.27450980392156865, 0.5098039215686274, 0.7058823529411765, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.0, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.2823529411764706, 0.23921568627450981, 0.5450980392156862, r, g, b)){
        min = calculateDeltaE( 0.2823529411764706, 0.23921568627450981, 0.5450980392156862, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.04, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.2823529411764706, 0.8196078431372549, 0.8, r, g, b)){
        min = calculateDeltaE( 0.2823529411764706, 0.8196078431372549, 0.8, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.08, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.29411764705882354, 0.0, 0.5098039215686274, r, g, b)){
        min = calculateDeltaE( 0.29411764705882354, 0.0, 0.5098039215686274, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.12, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.3333333333333333, 0.4196078431372549, 0.1843137254901961, r, g, b)){
        min = calculateDeltaE( 0.3333333333333333, 0.4196078431372549, 0.1843137254901961, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.16, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.37254901960784315, 0.6196078431372549, 0.6274509803921569, r, g, b)){
        min = calculateDeltaE( 0.37254901960784315, 0.6196078431372549, 0.6274509803921569, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.2, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.39215686274509803, 0.5843137254901961, 0.9294117647058824, r, g, b)){
        min = calculateDeltaE( 0.39215686274509803, 0.5843137254901961, 0.9294117647058824, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.24, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.4, 0.803921568627451, 0.6666666666666666, r, g, b)){
        min = calculateDeltaE( 0.4, 0.803921568627451, 0.6666666666666666, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.28, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.4117647058823529, 0.4117647058823529, 0.4117647058823529, r, g, b)){
        min = calculateDeltaE( 0.4117647058823529, 0.4117647058823529, 0.4117647058823529, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.32, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.41568627450980394, 0.35294117647058826, 0.803921568627451, r, g, b)){
        min = calculateDeltaE( 0.41568627450980394, 0.35294117647058826, 0.803921568627451, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.36, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.4196078431372549, 0.5568627450980392, 0.13725490196078433, r, g, b)){
        min = calculateDeltaE( 0.4196078431372549, 0.5568627450980392, 0.13725490196078433, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.4, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.4392156862745098, 0.5019607843137255, 0.5647058823529412, r, g, b)){
        min = calculateDeltaE( 0.4392156862745098, 0.5019607843137255, 0.5647058823529412, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.44, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.4666666666666667, 0.5333333333333333, 0.6, r, g, b)){
        min = calculateDeltaE( 0.4666666666666667, 0.5333333333333333, 0.6, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.48, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.4823529411764706, 0.40784313725490196, 0.9333333333333333, r, g, b)){
        min = calculateDeltaE( 0.4823529411764706, 0.40784313725490196, 0.9333333333333333, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.52, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.48627450980392156, 0.9882352941176471, 0.0, r, g, b)){
        min = calculateDeltaE( 0.48627450980392156, 0.9882352941176471, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.56, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.4980392156862745, 1.0, 0.0, r, g, b)){
        min = calculateDeltaE( 0.4980392156862745, 1.0, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.6, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.4980392156862745, 1.0, 0.8313725490196079, r, g, b)){
        min = calculateDeltaE( 0.4980392156862745, 1.0, 0.8313725490196079, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.64, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.5019607843137255, 0.0, 0.0, r, g, b)){
        min = calculateDeltaE( 0.5019607843137255, 0.0, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.68, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.5019607843137255, 0.0, 0.5019607843137255, r, g, b)){
        min = calculateDeltaE( 0.5019607843137255, 0.0, 0.5019607843137255, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.72, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.5019607843137255, 0.5019607843137255, 0.0, r, g, b)){
        min = calculateDeltaE( 0.5019607843137255, 0.5019607843137255, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.76, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.5019607843137255, 0.5019607843137255, 0.5019607843137255, r, g, b)){
        min = calculateDeltaE( 0.5019607843137255, 0.5019607843137255, 0.5019607843137255, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.8, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.5294117647058824, 0.807843137254902, 0.9215686274509803, r, g, b)){
        min = calculateDeltaE( 0.5294117647058824, 0.807843137254902, 0.9215686274509803, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.84, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.5294117647058824, 0.807843137254902, 0.9803921568627451, r, g, b)){
        min = calculateDeltaE( 0.5294117647058824, 0.807843137254902, 0.9803921568627451, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.88, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.5411764705882353, 0.16862745098039217, 0.8862745098039215, r, g, b)){
        min = calculateDeltaE( 0.5411764705882353, 0.16862745098039217, 0.8862745098039215, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.92, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.5450980392156862, 0.0, 0.0, r, g, b)){
        min = calculateDeltaE( 0.5450980392156862, 0.0, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.96, 0.16666) );
    } 


    if(min > calculateDeltaE( 0.5450980392156862, 0.0, 0.5450980392156862, r, g, b)){
        min = calculateDeltaE( 0.5450980392156862, 0.0, 0.5450980392156862, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.0, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.5450980392156862, 0.27058823529411763, 0.07450980392156863, r, g, b)){
        min = calculateDeltaE( 0.5450980392156862, 0.27058823529411763, 0.07450980392156863, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.04, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.5607843137254902, 0.7372549019607844, 0.5607843137254902, r, g, b)){
        min = calculateDeltaE( 0.5607843137254902, 0.7372549019607844, 0.5607843137254902, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.08, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.5647058823529412, 0.9333333333333333, 0.5647058823529412, r, g, b)){
        min = calculateDeltaE( 0.5647058823529412, 0.9333333333333333, 0.5647058823529412, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.12, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.5764705882352941, 0.4392156862745098, 0.8588235294117647, r, g, b)){
        min = calculateDeltaE( 0.5764705882352941, 0.4392156862745098, 0.8588235294117647, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.16, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.5803921568627451, 0.0, 0.8274509803921568, r, g, b)){
        min = calculateDeltaE( 0.5803921568627451, 0.0, 0.8274509803921568, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.2, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.596078431372549, 0.984313725490196, 0.596078431372549, r, g, b)){
        min = calculateDeltaE( 0.596078431372549, 0.984313725490196, 0.596078431372549, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.24, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.6, 0.19607843137254902, 0.8, r, g, b)){
        min = calculateDeltaE( 0.6, 0.19607843137254902, 0.8, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.28, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.6039215686274509, 0.803921568627451, 0.19607843137254902, r, g, b)){
        min = calculateDeltaE( 0.6039215686274509, 0.803921568627451, 0.19607843137254902, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.32, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.6274509803921569, 0.3215686274509804, 0.17647058823529413, r, g, b)){
        min = calculateDeltaE( 0.6274509803921569, 0.3215686274509804, 0.17647058823529413, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.36, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.6470588235294118, 0.16470588235294117, 0.16470588235294117, r, g, b)){
        min = calculateDeltaE( 0.6470588235294118, 0.16470588235294117, 0.16470588235294117, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.4, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.6627450980392157, 0.6627450980392157, 0.6627450980392157, r, g, b)){
        min = calculateDeltaE( 0.6627450980392157, 0.6627450980392157, 0.6627450980392157, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.44, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.6784313725490196, 0.8470588235294118, 0.9019607843137255, r, g, b)){
        min = calculateDeltaE( 0.6784313725490196, 0.8470588235294118, 0.9019607843137255, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.48, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.6784313725490196, 1.0, 0.1843137254901961, r, g, b)){
        min = calculateDeltaE( 0.6784313725490196, 1.0, 0.1843137254901961, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.52, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.6862745098039216, 0.9333333333333333, 0.9333333333333333, r, g, b)){
        min = calculateDeltaE( 0.6862745098039216, 0.9333333333333333, 0.9333333333333333, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.56, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.6901960784313725, 0.7686274509803922, 0.8705882352941177, r, g, b)){
        min = calculateDeltaE( 0.6901960784313725, 0.7686274509803922, 0.8705882352941177, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.6, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.6901960784313725, 0.8784313725490196, 0.9019607843137255, r, g, b)){
        min = calculateDeltaE( 0.6901960784313725, 0.8784313725490196, 0.9019607843137255, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.64, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.6980392156862745, 0.13333333333333333, 0.13333333333333333, r, g, b)){
        min = calculateDeltaE( 0.6980392156862745, 0.13333333333333333, 0.13333333333333333, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.68, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.7215686274509804, 0.5254901960784314, 0.043137254901960784, r, g, b)){
        min = calculateDeltaE( 0.7215686274509804, 0.5254901960784314, 0.043137254901960784, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.72, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.7294117647058823, 0.3333333333333333, 0.8274509803921568, r, g, b)){
        min = calculateDeltaE( 0.7294117647058823, 0.3333333333333333, 0.8274509803921568, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.76, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.7372549019607844, 0.5607843137254902, 0.5607843137254902, r, g, b)){
        min = calculateDeltaE( 0.7372549019607844, 0.5607843137254902, 0.5607843137254902, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.8, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.7411764705882353, 0.7176470588235294, 0.4196078431372549, r, g, b)){
        min = calculateDeltaE( 0.7411764705882353, 0.7176470588235294, 0.4196078431372549, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.84, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.7529411764705882, 0.7529411764705882, 0.7529411764705882, r, g, b)){
        min = calculateDeltaE( 0.7529411764705882, 0.7529411764705882, 0.7529411764705882, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.88, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.7803921568627451, 0.08235294117647059, 0.5215686274509804, r, g, b)){
        min = calculateDeltaE( 0.7803921568627451, 0.08235294117647059, 0.5215686274509804, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.92, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.803921568627451, 0.3607843137254902, 0.3607843137254902, r, g, b)){
        min = calculateDeltaE( 0.803921568627451, 0.3607843137254902, 0.3607843137254902, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.96, 0.33332) );
    } 


    if(min > calculateDeltaE( 0.803921568627451, 0.5215686274509804, 0.24705882352941178, r, g, b)){
        min = calculateDeltaE( 0.803921568627451, 0.5215686274509804, 0.24705882352941178, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.0, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.8235294117647058, 0.4117647058823529, 0.11764705882352941, r, g, b)){
        min = calculateDeltaE( 0.8235294117647058, 0.4117647058823529, 0.11764705882352941, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.04, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.8235294117647058, 0.7058823529411765, 0.5490196078431373, r, g, b)){
        min = calculateDeltaE( 0.8235294117647058, 0.7058823529411765, 0.5490196078431373, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.08, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.8274509803921568, 0.8274509803921568, 0.8274509803921568, r, g, b)){
        min = calculateDeltaE( 0.8274509803921568, 0.8274509803921568, 0.8274509803921568, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.12, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.8470588235294118, 0.7490196078431373, 0.8470588235294118, r, g, b)){
        min = calculateDeltaE( 0.8470588235294118, 0.7490196078431373, 0.8470588235294118, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.16, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.8549019607843137, 0.4392156862745098, 0.8392156862745098, r, g, b)){
        min = calculateDeltaE( 0.8549019607843137, 0.4392156862745098, 0.8392156862745098, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.2, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.8549019607843137, 0.6470588235294118, 0.12549019607843137, r, g, b)){
        min = calculateDeltaE( 0.8549019607843137, 0.6470588235294118, 0.12549019607843137, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.24, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.8588235294117647, 0.4392156862745098, 0.5764705882352941, r, g, b)){
        min = calculateDeltaE( 0.8588235294117647, 0.4392156862745098, 0.5764705882352941, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.28, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.8627450980392157, 0.0784313725490196, 0.23529411764705882, r, g, b)){
        min = calculateDeltaE( 0.8627450980392157, 0.0784313725490196, 0.23529411764705882, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.32, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.8627450980392157, 0.8627450980392157, 0.8627450980392157, r, g, b)){
        min = calculateDeltaE( 0.8627450980392157, 0.8627450980392157, 0.8627450980392157, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.36, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.8666666666666667, 0.6274509803921569, 0.8666666666666667, r, g, b)){
        min = calculateDeltaE( 0.8666666666666667, 0.6274509803921569, 0.8666666666666667, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.4, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.8705882352941177, 0.7215686274509804, 0.5294117647058824, r, g, b)){
        min = calculateDeltaE( 0.8705882352941177, 0.7215686274509804, 0.5294117647058824, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.44, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.8784313725490196, 1.0, 1.0, r, g, b)){
        min = calculateDeltaE( 0.8784313725490196, 1.0, 1.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.48, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9019607843137255, 0.9019607843137255, 0.9803921568627451, r, g, b)){
        min = calculateDeltaE( 0.9019607843137255, 0.9019607843137255, 0.9803921568627451, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.52, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9137254901960784, 0.5882352941176471, 0.47843137254901963, r, g, b)){
        min = calculateDeltaE( 0.9137254901960784, 0.5882352941176471, 0.47843137254901963, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.56, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9333333333333333, 0.5098039215686274, 0.9333333333333333, r, g, b)){
        min = calculateDeltaE( 0.9333333333333333, 0.5098039215686274, 0.9333333333333333, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.6, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9333333333333333, 0.9098039215686274, 0.6666666666666666, r, g, b)){
        min = calculateDeltaE( 0.9333333333333333, 0.9098039215686274, 0.6666666666666666, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.64, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9411764705882353, 0.5019607843137255, 0.5019607843137255, r, g, b)){
        min = calculateDeltaE( 0.9411764705882353, 0.5019607843137255, 0.5019607843137255, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.68, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9411764705882353, 0.9019607843137255, 0.5490196078431373, r, g, b)){
        min = calculateDeltaE( 0.9411764705882353, 0.9019607843137255, 0.5490196078431373, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.72, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9411764705882353, 0.9725490196078431, 1.0, r, g, b)){
        min = calculateDeltaE( 0.9411764705882353, 0.9725490196078431, 1.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.76, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9411764705882353, 1.0, 0.9411764705882353, r, g, b)){
        min = calculateDeltaE( 0.9411764705882353, 1.0, 0.9411764705882353, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.8, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9411764705882353, 1.0, 1.0, r, g, b)){
        min = calculateDeltaE( 0.9411764705882353, 1.0, 1.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.84, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9568627450980393, 0.6431372549019608, 0.3764705882352941, r, g, b)){
        min = calculateDeltaE( 0.9568627450980393, 0.6431372549019608, 0.3764705882352941, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.88, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9607843137254902, 0.8705882352941177, 0.7019607843137254, r, g, b)){
        min = calculateDeltaE( 0.9607843137254902, 0.8705882352941177, 0.7019607843137254, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.92, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9607843137254902, 0.9607843137254902, 0.8627450980392157, r, g, b)){
        min = calculateDeltaE( 0.9607843137254902, 0.9607843137254902, 0.8627450980392157, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.96, 0.49998) );
    } 


    if(min > calculateDeltaE( 0.9607843137254902, 0.9607843137254902, 0.9607843137254902, r, g, b)){
        min = calculateDeltaE( 0.9607843137254902, 0.9607843137254902, 0.9607843137254902, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.0, 0.66664) );
    } 


    if(min > calculateDeltaE( 0.9607843137254902, 1.0, 0.9803921568627451, r, g, b)){
        min = calculateDeltaE( 0.9607843137254902, 1.0, 0.9803921568627451, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.04, 0.66664) );
    } 


    if(min > calculateDeltaE( 0.9725490196078431, 0.9725490196078431, 1.0, r, g, b)){
        min = calculateDeltaE( 0.9725490196078431, 0.9725490196078431, 1.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.08, 0.66664) );
    } 


    if(min > calculateDeltaE( 0.9803921568627451, 0.5019607843137255, 0.4470588235294118, r, g, b)){
        min = calculateDeltaE( 0.9803921568627451, 0.5019607843137255, 0.4470588235294118, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.12, 0.66664) );
    } 


    if(min > calculateDeltaE( 0.9803921568627451, 0.9215686274509803, 0.8431372549019608, r, g, b)){
        min = calculateDeltaE( 0.9803921568627451, 0.9215686274509803, 0.8431372549019608, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.16, 0.66664) );
    } 


    if(min > calculateDeltaE( 0.9803921568627451, 0.9411764705882353, 0.9019607843137255, r, g, b)){
        min = calculateDeltaE( 0.9803921568627451, 0.9411764705882353, 0.9019607843137255, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.2, 0.66664) );
    } 


    if(min > calculateDeltaE( 0.9803921568627451, 0.9803921568627451, 0.8235294117647058, r, g, b)){
        min = calculateDeltaE( 0.9803921568627451, 0.9803921568627451, 0.8235294117647058, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.24, 0.66664) );
    } 


    if(min > calculateDeltaE( 0.9921568627450981, 0.9607843137254902, 0.9019607843137255, r, g, b)){
        min = calculateDeltaE( 0.9921568627450981, 0.9607843137254902, 0.9019607843137255, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.28, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.0, 0.0, r, g, b)){
        min = calculateDeltaE( 1.0, 0.0, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.32, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.0, 1.0, r, g, b)){
        min = calculateDeltaE( 1.0, 0.0, 1.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.36, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.0784313725490196, 0.5764705882352941, r, g, b)){
        min = calculateDeltaE( 1.0, 0.0784313725490196, 0.5764705882352941, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.4, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.27058823529411763, 0.0, r, g, b)){
        min = calculateDeltaE( 1.0, 0.27058823529411763, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.44, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.38823529411764707, 0.2784313725490196, r, g, b)){
        min = calculateDeltaE( 1.0, 0.38823529411764707, 0.2784313725490196, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.48, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.4117647058823529, 0.7058823529411765, r, g, b)){
        min = calculateDeltaE( 1.0, 0.4117647058823529, 0.7058823529411765, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.52, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.4980392156862745, 0.3137254901960784, r, g, b)){
        min = calculateDeltaE( 1.0, 0.4980392156862745, 0.3137254901960784, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.56, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.5490196078431373, 0.0, r, g, b)){
        min = calculateDeltaE( 1.0, 0.5490196078431373, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.6, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.6274509803921569, 0.47843137254901963, r, g, b)){
        min = calculateDeltaE( 1.0, 0.6274509803921569, 0.47843137254901963, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.64, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.6470588235294118, 0.0, r, g, b)){
        min = calculateDeltaE( 1.0, 0.6470588235294118, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.68, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.7137254901960784, 0.7568627450980392, r, g, b)){
        min = calculateDeltaE( 1.0, 0.7137254901960784, 0.7568627450980392, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.72, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.7529411764705882, 0.796078431372549, r, g, b)){
        min = calculateDeltaE( 1.0, 0.7529411764705882, 0.796078431372549, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.76, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.8431372549019608, 0.0, r, g, b)){
        min = calculateDeltaE( 1.0, 0.8431372549019608, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.8, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.8549019607843137, 0.7254901960784313, r, g, b)){
        min = calculateDeltaE( 1.0, 0.8549019607843137, 0.7254901960784313, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.84, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.8705882352941177, 0.6784313725490196, r, g, b)){
        min = calculateDeltaE( 1.0, 0.8705882352941177, 0.6784313725490196, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.88, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.8941176470588236, 0.7098039215686275, r, g, b)){
        min = calculateDeltaE( 1.0, 0.8941176470588236, 0.7098039215686275, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.92, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.8941176470588236, 0.7686274509803922, r, g, b)){
        min = calculateDeltaE( 1.0, 0.8941176470588236, 0.7686274509803922, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.96, 0.66664) );
    } 


    if(min > calculateDeltaE( 1.0, 0.8941176470588236, 0.8823529411764706, r, g, b)){
        min = calculateDeltaE( 1.0, 0.8941176470588236, 0.8823529411764706, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.0, 0.8333) );
    } 


    if(min > calculateDeltaE( 1.0, 0.9215686274509803, 0.803921568627451, r, g, b)){
        min = calculateDeltaE( 1.0, 0.9215686274509803, 0.803921568627451, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.04, 0.8333) );
    } 


    if(min > calculateDeltaE( 1.0, 0.9372549019607843, 0.8352941176470589, r, g, b)){
        min = calculateDeltaE( 1.0, 0.9372549019607843, 0.8352941176470589, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.08, 0.8333) );
    } 


    if(min > calculateDeltaE( 1.0, 0.9411764705882353, 0.9607843137254902, r, g, b)){
        min = calculateDeltaE( 1.0, 0.9411764705882353, 0.9607843137254902, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.12, 0.8333) );
    } 


    if(min > calculateDeltaE( 1.0, 0.9607843137254902, 0.9333333333333333, r, g, b)){
        min = calculateDeltaE( 1.0, 0.9607843137254902, 0.9333333333333333, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.16, 0.8333) );
    } 


    if(min > calculateDeltaE( 1.0, 0.9725490196078431, 0.8627450980392157, r, g, b)){
        min = calculateDeltaE( 1.0, 0.9725490196078431, 0.8627450980392157, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.2, 0.8333) );
    } 


    if(min > calculateDeltaE( 1.0, 0.9803921568627451, 0.803921568627451, r, g, b)){
        min = calculateDeltaE( 1.0, 0.9803921568627451, 0.803921568627451, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.24, 0.8333) );
    } 


    if(min > calculateDeltaE( 1.0, 0.9803921568627451, 0.9411764705882353, r, g, b)){
        min = calculateDeltaE( 1.0, 0.9803921568627451, 0.9411764705882353, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.28, 0.8333) );
    } 


    if(min > calculateDeltaE( 1.0, 0.9803921568627451, 0.9803921568627451, r, g, b)){
        min = calculateDeltaE( 1.0, 0.9803921568627451, 0.9803921568627451, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.32, 0.8333) );
    } 


    if(min > calculateDeltaE( 1.0, 1.0, 0.0, r, g, b)){
        min = calculateDeltaE( 1.0, 1.0, 0.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.36, 0.8333) );
    } 


    if(min > calculateDeltaE( 1.0, 1.0, 0.8784313725490196, r, g, b)){
        min = calculateDeltaE( 1.0, 1.0, 0.8784313725490196, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.4, 0.8333) );
    } 


    if(min > calculateDeltaE( 1.0, 1.0, 0.9411764705882353, r, g, b)){
        min = calculateDeltaE( 1.0, 1.0, 0.9411764705882353, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.44, 0.8333) );
    } 


    if(min > calculateDeltaE( 1.0, 1.0, 1.0, r, g, b)){
        min = calculateDeltaE( 1.0, 1.0, 1.0, r, g, b);
        omTexel = texture2D(om, (omCoord*(vec2(0.04, 0.16666))) + vec2( 0.48, 0.8333) );
    } 


    
    gl_FragColor = omTexel;
    
    
  }
  else {
    gl_FragColor = imgTexel;
  }
}


float calculateDeltaE(float r1, float g1, float b1, float r2, float g2, float b2) {
  float delta = (((r2-r1)*(r2-r1)) + ((g2-g1)*(g2-g1)) + ((b2-b1)*(b2-b1)));
  return delta;
}

