uniform float uTimerProgress;

varying vec2 vUv;

void main() {
    // Parameters
    vec2 center = vec2(0.5, 0.5);
    vec2 vertPosition = vUv - center;
    
    // Ring
    float radius = 0.5;
    float thickness = 0.03;
    float dist = length(vertPosition); // Length between current point and center
    float ringBase = step(radius - thickness, dist); // Making a border (from thickness) which value is 1.0, and the rest 0.0.
    
    // Angle
    // Atan should have Y as first argument.
    // Inverting X and Y values rotate by 90 degrees
    // Negating y allows for the loader to go clockwise
    float angle = atan(vertPosition.x, -vertPosition.y);
        
    // Atan result is from -PI to PI,
    // adding PI allows to have a 0 to 2PI range before normalizing.
    float normalizedAngle = ((angle + PI) / (2.0 * PI));

    // Subtracting normalized angle to show the progress clockwise, and applying the ring.
    float loadingRing = step(1.0 - normalizedAngle, uTimerProgress) * ringBase;

    // Background
    vec3 backgroundColor = vec3(0,0,0);

    csm_DiffuseColor += vec4(loadingRing + backgroundColor, 1.0);
}