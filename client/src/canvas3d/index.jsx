import { Canvas} from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import Shirt from "./Shirt";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import state from '../store';
import { useSnapshot } from "valtio";
import transparent from '../assets/transparent_rectangle.svg.png';
import { BackIcon, DownloadFileIcon, FrontIcon, LeftIcon, RightIcon, Rotate360Icon, ZoomINIcon, ZoomOutIcon } from "../icon/icon";


const CanvasModel = () => {

  const [zoom,setZoom] = useState(50)
  const snap = useSnapshot(state);
  const canvasRef = useRef();

  const HnadaleButtonClick= (e)=>{
    console.log(e.target)
    if(e.target.id==='parent'||!e.target.textContent){
      return 
    }else if(e.target.textContent==='Reset'){
      return 
    }
    state.position = e.target.textContent
  }
  const HandaleButtonClick  = (content) =>{
    state.position= content
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

  const HandaleReset = ()=>{
   state.logoDecal = transparent
   state.fullDecal = transparent
   state.fullTextTexture = transparent
   state.fullPaintDecal = transparent
   state.color = 'gray'
  }

  const HandaleShare =async ()=>{
    const shareData = {
      title: "MDN",
      text: "Learn web development on MDN!",
      url: "https://developer.mozilla.org",
    };  
    await navigator.share(shareData);
   }

  return (
    <div className="relative flex flex-1 w-full h-fit">
    <Canvas
      ref={canvasRef}
      shadows
      camera={{ position: [ 0, 0, 0], fov: 25 }} // fov = field of view
      gl={{ preserveDrawingBuffer: true }}
      className="w-[80%]  transition-all ease-in  border cursor-pointer"
      style={{ width: '100%', height: '100vh', display: 'block' }}

        
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
   
    <div id='parent' className="flex flex-col h-full p-2 border bg-white  " 
    // onClick={HnadaleButtonClick}
    >
      <button onClick={()=>{HandaleButtonClick('Front')}} className={`${snap.position==='Front'?" border-blue-400":""} flex w-full p-3 mb-3 text-[0.9rem] border`}>
      <FrontIcon width='25px' className='mx-auto'/>  
         Front 
      </button>

      <button onClick={()=>{HandaleButtonClick('Back')}} className={`${snap.position==='Back'?" border-blue-400":""} flex w-full p-3 mb-3 text-[0.9rem] border`}>
      <BackIcon width='25px' className='mx-auto' />
        Back</button>
      <button  onClick={()=>{HandaleButtonClick('360')}} className={`${snap.position==='360'?" border-blue-400":""} flex w-full p-3 mb-3 text-[0.9rem] border`}>
      <Rotate360Icon width='25px' className='mx-auto' />
        360</button>
      <button  onClick={()=>{HandaleButtonClick('Left')}} className={`${snap.position==='Left'?" border-blue-400":""} flex w-full p-3 mb-3 text-[0.9rem] border`}>
      <LeftIcon width='25px' className='mx-auto' />
        Left</button>
      <button onClick={()=>{HandaleButtonClick('Right')}} className={`${snap.position==='Right'?" border-blue-400":""} flex w-full p-3 mb-3 text-[0.9rem] border`}>
      <RightIcon  width='25px' className='mx-auto'/>
        Right</button>
      <button id='parent' className="mb-4  text-[0.9rem] border rounded ottom-8 left-12"
     onClick={()=>setZoom(prev=>prev===100?prev:prev+10)}
    >
     <ZoomINIcon width='45px' className='mx-auto'/>  
    
    </button>
 
  <button id='parent' className="mb-4  text-[0.9rem] border rounded ottom-8 left-24"
     onClick={()=>setZoom(prev=>prev===0?prev:prev-10)}
  >
    <ZoomOutIcon width='45px' className='mx-auto' />
    
    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748ZM7 10H15V12H7V10Z"></path></svg> */}
    </button>
    <button onClick={HandaleReset} className={`text-white bg-red-500 rounded w-full p-3 mb-3 text-[0.9rem] border shadow-xl`}>Reset</button>
    <button onClick={HandaleShare} className={`text-white bg-blue-500 rounded w-full p-3 mb-3 text-[0.9rem] border shadow-xl`}>Share</button>

    <button onClick={handleDownload} id='parent' className="flex self-center justify-center   text-[0.9rem] text-white bg-blue-400 rounded w-fit ottom-8 left-24"
  >
         <DownloadFileIcon  width='45px' className='mx-auto' />
      </button>


    </div>
    </div>
  );
};

export default CanvasModel;
