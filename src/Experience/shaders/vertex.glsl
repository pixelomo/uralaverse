uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;
attribute float aRandom;

varying float vRandom;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.z = aRandom * 0.2;
    float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.15;
    elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.15;

    modelPosition.z += elevation;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
    // vElevation = elevation;
    // vRandom = aRandom;
}