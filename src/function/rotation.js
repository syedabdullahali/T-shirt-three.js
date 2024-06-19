import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { easing } from "maath";

// Custom hook to manage rotation
const useRotation = (targetRotation, damping, delta) => {
  const groupRef = useRef();

  // Function to wrap angle between 0 and 360 degrees
  const wrapAngle = (angle) => (angle + 360) % 360;

  // Function to interpolate rotation
  const interpolateRotation = (currentRotation, targetRotation, delta) => {
    const wrappedCurrentRotation = wrapAngle(THREE.MathUtils.radToDeg(currentRotation));
    const wrappedTargetRotation = wrapAngle(targetRotation);

    // Using the easing function to interpolate rotation
    const newRotation = easing.dampE(
      wrappedCurrentRotation,
      wrappedTargetRotation,
      damping,
      delta
    );

    return THREE.MathUtils.degToRad(newRotation);
  };

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (groupRef.current) {
        const currentRotation = groupRef.current.rotation.y;
        groupRef.current.rotation.y = interpolateRotation(currentRotation, targetRotation, delta);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [targetRotation, delta]);

  return groupRef;
};

export default useRotation;
