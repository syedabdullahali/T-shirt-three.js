import { Canvas} from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import state from '../store';
import { useSnapshot } from "valtio";


const CanvasModel = () => {

  const [zoom,setZoom] = useState(50)
  const snap = useSnapshot(state);
  const canvasRef = useRef();

  const HnadaleButtonClick= (e)=>{
    console.log(e.target)
    if(e.target.id==='parent'||!e.target.textContent){
      return 
    }
    state.position = e.target.textContent
  }

  const handleDownload = () => {
    const canvas = canvasRef.current;
    console.log(canvas)
    
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'canvas.png';
    link.click();
  };


  return (
    <div className="relative flex flex-1 w-full h-fit">
    <Canvas
      ref={canvasRef}
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }} // fov = field of view
      gl={{ preserveDrawingBuffer: true }}
      className="w-[80%]  transition-all ease-in bg-white border cursor-pointer"
      style={{ width: '90%', height: '100vh', display: 'block' }}

        
    >
   <ambientLight intensity={1}   />

{/* <Environment preset="city" background /> */}

      <CameraRig >
        <Backdrop />
        <Center>
          <Shirt zoom={zoom}/>
        </Center>
      </CameraRig>
    </Canvas>
   
    <div id='parent' className="flex flex-col h-full p-2 border " onClick={HnadaleButtonClick}>
      <button className={`${snap.position==='Front'?"bg-blue-100 border-blue-400":""} w-full p-4 mb-4 text-xl border`}>Front</button>
      <button className={`${snap.position==='Back'?"bg-blue-100 border-blue-400":""} w-full p-4 mb-4 text-xl border`}>Back</button>
      <button className={`${snap.position==='360'?"bg-blue-100 border-blue-400":""} w-full p-4 mb-4 text-xl border`}>360</button>
      <button className={`${snap.position==='Left'?"bg-blue-100 border-blue-400":""} w-full p-4 mb-4 text-xl border`}>Left</button>
      <button className={`${snap.position==='Right'?"bg-blue-100 border-blue-400":""} w-full p-4 mb-4 text-xl border`}>Right</button>
      <button id='parent' className="mb-4 text-sm border rounded ottom-8 left-12"
     onClick={()=>setZoom(prev=>prev===100?prev:prev+10)}
    >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748ZM10 10V7H12V10H15V12H12V15H10V12H7V10H10Z"></path></svg>    </button>
  <button id='parent' className="mb-4 text-sm border rounded ottom-8 left-24"
     onClick={()=>setZoom(prev=>prev===0?prev:prev-10)}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748ZM7 10H15V12H7V10Z"></path></svg>
    </button>
    <button onClick={handleDownload} id='parent' className="flex self-center justify-center mt-6 text-sm text-white bg-blue-400 rounded w-fit ottom-8 left-24"
  >
      <svg width={60} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 12H16L12 16L8 12H11V8H13V12ZM15 4H5V20H19V8H15V4ZM3 2.9918C3 2.44405 3.44749 2 3.9985 2H16L20.9997 7L21 20.9925C21 21.5489 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918Z"></path></svg>    
      </button>


    </div>
    </div>
  );
};

export default CanvasModel;
