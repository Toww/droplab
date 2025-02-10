mat3 wobble(vec3 position, float time, float factor) {
// Wobbble code based on Drei's Mesh Wobble Material's rotation matrix : 
  // https://github.com/pmndrs/drei/blob/master/src/core/MeshWobbleMaterial.tsx

  // Angles
  float theta = sin(time + position.y) / 2.0 * factor;
  float thetaCos = cos(theta);
  float thetaSin = sin(theta);
  
  // Rotation matrix
  return mat3(thetaCos, 0, thetaSin, 0, 1, 0, -thetaSin, 0, thetaCos);
}