uniform vec3 uColor;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;
varying float vRandom;

void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.rgb *= vElevation * 2.0 + 0.65;
    gl_FragColor = textureColor;
    // gl_FragColor = vec4(uColor, 1.0);
    // gl_FragColor = vec4(vUv, 1.0, 1.0);
    // gl_FragColor = vec4(vRandom, 0.5, 0.8, 1.0);
}