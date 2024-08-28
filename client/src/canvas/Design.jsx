import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

// Import your GLB files
import Joket from '../assets/3D Model Collection/agc_jacket.glb';
import leatherBike from '../assets/3D Model Collection/leather_jacket.glb';
import hoodedJacket from '../assets/3D Model Collection/hooded_jacket.glb';
import LatherJacket from '../assets/3D Model Collection/leather_jacket.glb';
import tShirt from '../assets/3D Model Collection/t-shirt.glb';

const models = [
  { name: 'Joket', path: Joket },
  { name: 'Leather Bike', path: leatherBike },
  { name: 'Hooded Jacket', path: hoodedJacket },
  { name: 'Leather Jacket', path: LatherJacket },
  { name: 'T-Shirt', path: tShirt },
];

const Model = ({ path }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} />;
};

const Design = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <OrbitControls />
      {models.map((model, index) => (
        <group key={index} position={[index * 2, 0, 0]}>
          <Model path={model.path} />
        </group>
      ))}
    </Canvas>
  );
};

export default Design;
