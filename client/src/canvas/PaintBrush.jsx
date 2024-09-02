import React, { useRef, useEffect,useState } from "react";
import { SketchPicker  } from "react-color";
import transparent from '../assets/transparent_rectangle.svg.png';
import state from "../store";
import { BrushIcon, CircleIcon, CircleOutlineIcon, EraserIcon, RectangleIcon, RectangleOutline, TriangleIcon, TriangleOutlineIcon } from "../icon/icon";
// import ReactDOM from "react-dom";
// import { Canvas, extend, useThree } from "react-three-fiber";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// // import { SphereBufferGeometry } from "three";

// extend({ OrbitControls });

// const Controls = () => {
//   const orbitControlsRef = useRef();
//   const { camera, gl } = useThree();

//   return (
//     <orbitControls
//       ref={orbitControlsRef}
//       args={[camera, gl.domElement]}
//       minDistance={1.25}
//     />
//   );
// };

// const Texture = () => {
//   const [allowControls, setAllowControls] = useState(true);

//   const canvasRef = useRef(document.createElement("canvas"));
//   const textureRef = useRef();

//   useLayoutEffect(() => {
//     const canvas = canvasRef.current;

//     canvas.width = 1024;
//     canvas.height = 1024;

//     const context = canvas.getContext("2d");
//     if (context) {
//       context.rect(0, 0, canvas.width, canvas.height);
//       context.fillStyle = "white";
//       context.fill();
//     }
//   }, []);

//   function handleBrushPointerMove({ uv }) {
//     if (allowControls) {
//       return;
//     }
//     if (uv) {
//       const canvas = canvasRef.current;

//       const x = uv.x * canvas.width;
//       const y = (1 - uv.y) * canvas.height;

//       const context = canvas.getContext("2d");
//       if (context) {
//         context.beginPath();
//         context.arc(x - 2, y - 2, 4, 0, 2 * Math.PI);
//         context.fillStyle = "black";
//         context.fill();
//         // textureRef?.current?.needsUpdate = true;
//       }
//     }
//   }

//   return (
//     <>
//       <Canvas
//         onCreated={({ gl }) => {
//           gl.physicallyCorrectLights = true;
//           gl.gammaOutput = true;
//           gl.setClearColor(0xcccccc);
//         }}
//         camera={{ position: [0, 0, 2] }}
//       >
//         {allowControls && <Controls />}
//         <mesh
//           onPointerDown={() => setAllowControls(false)}
//           onPointerUp={() => setAllowControls(true)}
//           onPointerMove={handleBrushPointerMove}
//         >
//           {/* <SphereBufferGeometry attach="geometry" args={[1, 16, 12]} /> */}
//           <meshStandardMaterial attach="material" metalness={0} roughness={1}>
//             <canvasTexture
//               ref={textureRef}
//               attach="map"
//               image={canvasRef.current}
//             />
//           </meshStandardMaterial>
//         </mesh>
//         <ambientLight intensity={0.5} />
//         <spotLight position={[0, 0, 10]} intensity={10} />
//         <spotLight position={[-10, 0, -5]} intensity={10} />
//         <spotLight position={[10, 0, -5]} intensity={10} />
//       </Canvas>
//     </>
//   );
// };

// export default Texture;

// import { createRoot } from 'react-dom/client'
// import React, { useRef, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'

// function Box(props) {
//   // This reference will give us direct access to the mesh
//   const meshRef = useRef()
//   // Set up state for the hovered and active state
//   const [hovered, setHover] = useState(false)
//   const [active, setActive] = useState(false)
//   // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (meshRef.current.rotation.x += delta))
//   // Return view, these are regular three.js elements expressed in JSX
//   return (
//     <mesh
//       {...props}
//       ref={meshRef}
//       scale={active ? 1.5 : 1}
//       onClick={() => setActive(!active)}
//       onPointerOver={() => setHover(true)}
//       onPointerOut={() => setHover(false)}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
//     </mesh>
//   )
// }



function useCanvas(callback) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Get canvas dimensions
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);
    ctx.moveTo(200, 100); // Start point
ctx.lineTo(400, 100); // Right shoulder
ctx.lineTo(400, 300); // Right side
ctx.lineTo(300, 400); // Bottom
ctx.lineTo(200, 300); // Left side
ctx.closePath(); // 

    // Call the provided callback function with the canvas context
    callback(ctx, canvas);

    // Cleanup function
    return () => {
      // Perform any cleanup (if needed)
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return canvasRef;
}

export default function PaintBrush() {
  const [ctx, setCtx] = useState({});
  const [isDraw,setDraw] = useState(false)
  const [brushWidth,setBrushWidth] = useState(5)
  const [selectedToll,setSelectedTool] = useState('Brush')
  const [prevMouse,setPrevMouse] = useState({ x:0,y:0})
  const [snapshot,setSnapeShot] = useState({})
  const [isColorFill,setIsColorFill] = useState(false)
  const [color,setColor] = useState('black')

  const canvasRef = useCanvas((ctx, canvas) => {
    // Use ctx to draw on the canvas
    // ctx.getContext('2d')
    setCtx(ctx);
  });


  const drawrect = (e)=>{
    // console.log(e)
    if(!isColorFill){
        ctx.strokeRect(e.offsetX, e.offsetY,prevMouse.x-e.offsetX,prevMouse.y-e.offsetY)
    }else{
        ctx.fillRect(e.offsetX, e.offsetY,prevMouse.x-e.offsetX,prevMouse.y-e.offsetY)
    }
  }

  const drawCircle = (e) => {
    ctx.beginPath();    
    let radius = Math.sqrt(Math.pow((prevMouse.x - e.offsetX), 2) + Math.pow((prevMouse.y - e.offsetY), 2));
    ctx.arc(prevMouse.x, prevMouse.y, radius, 0, 2 * Math.PI); // Corrected the angle range
    isColorFill?ctx.fill():ctx.stroke();
  };

  const drawTriangle  =(e)=>{
    ctx.beginPath()
    ctx.moveTo(prevMouse.x,prevMouse.y)
    ctx.lineTo(e.offsetX,e.offsetY)
    ctx.lineTo(prevMouse.x*2 - e.offsetX,e.offsetY)
    ctx.closePath()
    isColorFill?ctx.fill():ctx.stroke();
  }

  const drawing = (e) => {
    if(!isDraw)return
    ctx.putImageData(snapshot,0,0)// adding copaying canvas data on this canvas
    if(selectedToll==='Brush'||selectedToll==='Eraser'){
        ctx.strokeStyle = selectedToll === 'Eraser'?"#fff":color
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); // Fix typo and use lowercase 'offsetX' and 'offsetY'
        ctx.stroke();
    } else if(selectedToll==="Rectangle"){
           drawrect(e.nativeEvent) 
    } else if(selectedToll==="Circle"){
        drawCircle(e.nativeEvent) 
    } else if(selectedToll==="Triangle"){
        drawTriangle(e.nativeEvent) 
    }  


    // console.log(e.nativeEvent, ctx);
  };

  const startDraw = (e)=>{
    // console.log(e.nativeEvent)
    setPrevMouse({x:e.nativeEvent.offsetX,y:e.nativeEvent.offsetY})
    ctx.lineWidth = brushWidth
    ctx.strokeStyle = color.hex
    ctx.fillStyle = color.hex

    ctx.beginPath();    
    setSnapeShot(ctx.getImageData(0,0,canvasRef.current.width,canvasRef.current.height))
    setDraw(true)
  }

  const stopDraw = ()=>{
    ctx.closePath()
    setDraw(false)
  }

  const handaleTool = (e)=>{
    console.log(e.target.textContent)
    setSelectedTool(e.target.textContent)
  }


const clearReactFun  = ()=>{
    ctx.clearRect(0,0,canvasRef.current.width,canvasRef.current.height)
}

const downloadPaint = (key)=>{
    // Get a reference to your canvas element

// Create an image from the canvas data
var image = canvasRef.current.toDataURL("image/png");
state[key] = image
}

const checkClassVal = (val)=>{
  return 'flex font-bold rounded text-[0.8rem] '+ (selectedToll.includes(val)?"text-blue-500 p-1 border mt-1 bg-white border-blue-400 " :"p-1 mt-1 cursor-pointer  p-1 border  bg-white ")
}

  return (
    <div className="flex w-[600px]  ">
      <nav className="p-1">
        <h2 className="font-[700] text-[0.8rem]">Shapes</h2>
        <ul className="grid grid-cols-2 gap-1">
          <li className={checkClassVal('Rectangle')} onClick={handaleTool}>Rectangle 
            {isColorFill?<RectangleIcon className='ml-1' width='18px'/>:<RectangleOutline  width='18px' className='ml-1'  />}
            </li>
          <li className={checkClassVal('Circle')} onClick={handaleTool}>Circle
          {isColorFill?<CircleIcon className='ml-1' width='18px'/>:<CircleOutlineIcon  width='18px' className='ml-1'  />}

          </li>
          <li className={checkClassVal('Triangle')} onClick={handaleTool}>Triangle
          {isColorFill?<TriangleIcon className='ml-1' width='18px'/>:<TriangleOutlineIcon  width='18px' className='ml-1'  />}

          </li>
          <li >
          <span className="m-0.5 text-[0.8rem]">Fill Color</span>

          <input type={'checkbox'} onChange={(e)=>setIsColorFill(e.target.checked)} value={isColorFill} id='size-slider' />

            </li>

        </ul>

        <h2 className="font-[700] text-[0.8rem]">Option</h2>
        <ul className="grid grid-cols-2 gap-1 mb-1">
        <li className={checkClassVal('Eraser')} onClick={handaleTool}>Eraser <EraserIcon className='ml-1' width='18px' /></li>
        <li className={checkClassVal('Brush')} onClick={handaleTool}>Brush <BrushIcon className='ml-1' width='18px'  /></li>
        </ul>
        <ul >
         

          <SketchPicker color={color} onChange={(e)=>{
            setColor(e)
          }}  />

          <li>
            <input type={'range'} min='0' max='35' className="mt-2 slider" id='size-slider' value={brushWidth} onChange={(e)=>setBrushWidth(e.target.value)} />
          </li>
        </ul>
        <button className="w-full text-[0.8rem] p-1 mt-1 border border-red-500 rounded bg-red-50 " onClick={clearReactFun}>Clear</button>
        <button className="w-full text-[0.8rem] p-1 mt-1 border border-green-500 rounded bg-green-50 " onClick={()=>downloadPaint('logoDecal')}> Apply Mockup </button>
        <button className="w-full text-[0.8rem] p-1 mt-1 text-black border-red-500 rounded border bg-red-50"  onClick={()=>{state.logoDecal=transparent}} >Remove Mockup</button>
        <button className="w-full text-[0.8rem] p-1 mt-1 text-white bg-blue-500 rounded" onClick={()=>downloadPaint('fullPaintDecal')} >Apply Texture</button>
        <button className="w-full text-[0.8rem] p-1 mt-1 text-black border-red-500 rounded border bg-red-50"  onClick={()=>{state.fullPaintDecal=transparent}} >Remove Texture</button>

      </nav>
      <div >
        <canvas
          ref={canvasRef}
          onMouseMove={(e) => drawing(e)}
          className="bg-white border"
          height={740}
          width={510}
          onMouseDown={startDraw}
          onMouseUp={stopDraw}
        ></canvas>
      </div>
    </div>
  );
}




// Custom hook to handle canvas logic


