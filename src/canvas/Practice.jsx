import React, { useRef, useEffect } from "react";

function App() {
  const canvasRef = useRef(null);
  const mesh = useRef(null); // Ref for your mesh

  useEffect(() => {
    const onMouseUp = (evt) => {
      const pos = { x: evt.clientX, y: evt.clientY };
      const intersects = getIntersects(pos, mesh.current.children); // Access mesh.current here
      if (intersects.length > 0 && intersects[0].uv) {
        const uv = intersects[0].uv;
        intersects[0].object.material.map.transformUv(uv);
        const selected = getObjectUnderPoint(uv);
        if (selected !== null) {
          // Perform actions with selected object
          console.log("Selected object:", selected);
        }
      }
    };

    const getIntersects = (point, objects) => {
      mouse.set((point.x * 2) - 1, -(point.y * 2) + 1);
      raycaster.setFromCamera(mouse, camera);
      return raycaster.intersectObjects(objects);
    };

    const getObjectUnderPoint = (uv) => {
      const cp = { x: uv.x * zoom, y: uv.y * zoom };
      const objects = canvas.getObjects(); // Assuming canvas is defined elsewhere
      for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        if (!canvas.containsPoint(null, obj, cp)) continue;
        const isIntersecting = canvas.isTargetTransparent(obj, cp.x, cp.y);
        if (isIntersecting) return obj;
      }
      return null;
    };

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas });
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    const scene = new THREE.Scene();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const zoom = 1; // Set your zoom factor here

    // Add your 3D objects to the scene and set up your camera and renderer here

    document.body.addEventListener("mouseup", onMouseUp);

    return () => {
      document.body.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="border bg-white"
      height={600}
      width={600}
    ></canvas>
  );
}

export default App;
