import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import state from '../store';

const Shirt = ({zoom}) => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF(snap.designType);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);
  const leftFullDecal = useTexture(snap.leftFullDecal);
  const fullTextTexture =useTexture(snap.fullTextTexture);
  const fullPaintTexture = useTexture(snap.fullPaintDecal);
  const bodyMaterial = materials.bodyMaterial;
  // const sleevesMaterial = materials.sleevesMaterial;

  


  useFrame((state, delta) => {  
    easing.dampC(materials.lambert1.emissive,snap.color, 0.25, delta)    
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  });

  const stateString = JSON.stringify(snap);
  

  return (
    <group key={stateString} >
      <mesh
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
       
        material-roughness={1}
        dispose={null}
        scale={(zoom/50)}
      >
        {/* T-shirt full texture */}

        { (
          <Decal 
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
       

      { (
          <Decal 
            position={[0, 0,0.5]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTextTexture}
          />
        )}

        { (
          <Decal 
            position={[0, 0,0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullPaintTexture}
          />
        )}
        

{/* {(
  <Decal 
    position={[0, -0.28, 0]}
    // rotation={[ 0.360, 0,0]} // Rotate 90 degrees around the Z-axis
    scale={[0.34, 0.9, 1]}
    map={fullTexture}          
    // material-roughness={0.2} // Adjust roughness as needed
    // material-metalness={0.2} // Adjust metalness as needed
    // material-normalScale={[0.5, 0.5]} // Adjust normal scale as needed
    material-wrapS={THREE.RepeatWrapping} // Set texture wrapping mode for S axis
    material-wrapT={THREE.RepeatWrapping} // Set texture wrapping mode for T axis
    // material-minFilter={THREE.LinearFilter} // Adjust minification filter
    // material-magFilter={THREE.LinearFilter} // Adjust magnification filter
  />
)} */}

{/* <Decal 
    position={[0, 0.28, 0]}
    scale={[0.14, 0.2, 0.2]}
    map={leftFullDecal}
    // material-roughness={0.2} // Adjust roughness as needed
    // material-metalness={0.2} // Adjust metalness as needed
    // material-normalScale={[0.5, 0.5]} // Adjust normal scale as needed
    material-wrapS={THREE.RepeatWrapping} // Set texture wrapping mode for S axis
    material-wrapT={THREE.RepeatWrapping} // Set texture wrapping mode for T axis
    // material-minFilter={THREE.LinearFilter} // Adjust minification filter
    // material-magFilter={THREE.LinearFilter} // Adjust magnification filter
  /> */}

{/* <Decal 
    position={[0.236, 0.1, 0]}
    rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]} // 90 degrees rotation on all axes
    scale={[1, 0.4, 0.15]}
    map={leftFullDecal}
    // material-roughness={0.2} // Adjust roughness as needed
    // material-metalness={0.2} // Adjust metalness as needed
    // material-normalScale={[0.5, 0.5]} // Adjust normal scale as needed
    material-wrapS={THREE.RepeatWrapping} // Set texture wrapping mode for S axis
    material-wrapT={THREE.RepeatWrapping} // Set texture wrapping mode for T axis
    // material-minFilter={THREE.LinearFilter} // Adjust minification filter
    // material-magFilter={THREE.LinearFilter} // Adjust magnification filter
  /> */}

{/* <Decal 
   position={[-0.235, 0.1, 0]}
   rotation={[Math.PI / 2, Math.PI / 2, Math.PI / 2]} // 90 degrees rotation on all axes
   scale={[1, 0.4, 0.15]}
   map={leftFullDecal}
   material-roughness={0.2} // Adjust roughness as needed
   material-metalness={0.2} // Adjust metalness as needed
   material-normalScale={[0.5, 0.5]} // Adjust normal scale as needed
   material-wrapS={THREE.RepeatWrapping} // Set texture wrapping mode for S axis
   material-wrapT={THREE.RepeatWrapping} // Set texture wrapping mode for T axis
   material-minFilter={THREE.LinearFilter} // Adjust minification filter
  material-magFilter={THREE.LinearFilter} // Adjust magnification filter
  /> */}

{/* {(
  <Decal 
    position={[-0.2, 0.1, 0]}
    rotation={[0, 0, 0]} // Assuming no rotation here
    scale={[0.6, 0.3, 0.5]}
    map={leftFullDecal}          
  />
)} */}

        {/* T-shirt logo*/}
        {snap.isLogoTexture && (
          <Decal 
            position={[snap.mockupXposition/20000, -(snap.mockupYposition/1500), 0.15]}
            rotation={[0, 0, 0]}
            scale={snap.size/200}
            map={logoTexture}
            
            {...{ mapAnisotropy: 10, depthTest: false, depthWrite: true }}
          />
        )}


      </mesh>
    </group>
  )
}

export default Shirt

/* The properties mapAnisotropy, depthTest, and depthWrite were not recognized in the first version of the code because they were not defined as valid props for the Decal component.

In React, components can only receive and recognize props that are explicitly defined and expected by the component. When you pass a prop to a component that is not recognized or expected, React will ignore that prop and it will not have any effect on the component. 

By using the spread syntax in the second version, these properties are properly spread onto the Decal component, allowing it to receive and utilize the additional properties correctly.
*/

// importScripts("https://js.pusher.com/beams/service-worker.js");

//<script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>

{/* <script>
  const beamsClient = new PusherPushNotifications.Client({
    instanceId: '404cadda-40d7-45c3-907c-f60474b0b719',
  });

  beamsClient.start()
    .then(() => beamsClient.addDeviceInterest('hello'))
    .then(() => console.log('Successfully registered and subscribed!'))
    .catch(console.error);
</script> */}

// curl -H "Content-Type: application/json" \
//      -H "Authorization: Bearer AB5FA8A4650EC956C20779CD89526773A9686FE28C208DE78FD7D79F59ED4DB5" \
//      -X POST "https://404cadda-40d7-45c3-907c-f60474b0b719.pushnotifications.pusher.com/publish_api/v1/instances/404cadda-40d7-45c3-907c-f60474b0b719/publishes" \
//      -d '{"interests":["hello"],"web":{"notification":{"title":"Hello","body":"Hello, world!"}}}'