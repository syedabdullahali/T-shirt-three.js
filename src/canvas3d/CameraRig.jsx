import React, { useRef,useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import state from "../store";



/**
 * The CameraRig component is a React component that handles the positioning and rotation of a 3D model
 * based on the state and user input.
 * @returns The CameraRig component is returning a group element with a ref attribute set to the group
 * useRef() reference. The children of the CameraRig component are rendered inside this group element.
 */
const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  function handleView(position) {
    switch (position) {
      case "Front":
        return 0;
      case "Back":
        return 3;
      case "Left":
        return 1.7;
      case "Right":
        return 4.7;
      default:
        return -1; // Return a default value if the view is not recognized
    }
  }



  /* Using the `useFrame` hook from the `@react-three/fiber` library to update the
position and rotation of a 3D model in a React component. */
  useFrame((state, delta) => {
    // console.log(state.camera.position);
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) {
        targetPosition = [0, 0, 2.5];
      } else {
        targetPosition = [0, 0, 2];
      }
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // set the model rotation smoothly
    easing.dampE(
      group.current.rotation,
      [0,snap.position==='360'?(state.pointer.x *6):handleView(snap.position), 0],
      0.20,
      delta
    );

    // easing.dampE(
    //   group.current.rotation,
    //   [0, (state.pointer.x), 0],
    //   0.20,
    //   delta
    // );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;