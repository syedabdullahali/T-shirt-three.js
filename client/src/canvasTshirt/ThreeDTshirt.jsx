// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TextureLoader } from 'three';
import * as THREE from 'three';

 const ThreeDTshirt = ({ customization }) => {
  const tShirtRef = useRef();

  // Load T-shirt model
  const gltf = useLoader(GLTFLoader, '/shirt_baked.glb');

  useEffect(() => {
    if (tShirtRef.current) {
      tShirtRef.current.traverse((child) => {
        if (child.isMesh) {
          // Apply color
          if (customization.color) {
            child.material.color.set(customization.color);
          }

          // Apply pattern texture
          if (customization.pattern) {
            const patternTexture = new TextureLoader().load(customization.pattern);
            child.material.map = patternTexture;
            child.material.needsUpdate = true;
          }
        }
      });

      // Apply logo texture
      if (customization.logo) {
        const logoTexture = new TextureLoader().load(customization.logo);
        const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true });
        const logoGeometry = new THREE.PlaneGeometry(1, 1);
        const logoMesh = new THREE.Mesh(logoGeometry, logoMaterial);
        logoMesh.position.set(0, 1, 0.1); // Adjust position as needed
        tShirtRef.current.add(logoMesh);
      }
    }
  }, [customization]);

  return <primitive object={gltf.scene} ref={tShirtRef} />;
};


export default ThreeDTshirt