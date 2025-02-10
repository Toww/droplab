#include ../includes/wobble.glsl

uniform float uTime;
uniform float uWobbleFactor;

varying vec2 vUv;

void main() {
  // -- Position --
  csm_Position = csm_Position * wobble(csm_Position, uTime, uWobbleFactor);

  // -- Varyings
  vUv = uv;
}
