import React, { useState ,useRef} from 'react';
import html2canvas from 'html2canvas';
import state from '../store';
import { useEffect } from "react";
import transparent from '../assets/transparent_rectangle.svg.png';
import { useSnapshot } from 'valtio'
import Mokeup from '../assets/Mockup/3D_Cartoon_preview.png'
import Mokeup2 from '../assets/Mockup/364-removebg-preview.png'
import Mokeup3 from '../assets/Mockup/MockeUpSunday.png'
import Mokeup4 from '../assets/Mockup/MockFollow.png'
import Mokeup5 from '../assets/Mockup/MockUpGlitter.png'
import { UploadFileIcon } from '../icon/icon';



const TextMockup = () => {


  const [textMokeUps,setMokeUpes] = useState([])
  const [inputVal,setInputVal] = useState('')
  const [selectedItemIndex,setSelectedItemIndex] = useState(-1) 
  const [color,setColor] = useState('black')
  const [fontSize,setFontSize] = useState(15)
  const [selectedFontFamiliy,setFontFamily] = useState("sen-serif")
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const snap = useSnapshot(state)

  const divRef = useRef(null)
  const canvasRef = useRef(null);
  const inputRef = useRef(null)


  const HandaleAdd  = ()=>{
    setMokeUpes(prev=>(
      [...prev,{
      content:inputVal,
      left:0,
      right:0,
      color:color.hex,
      fontFamily:"sen-serif",
      fontSize:15
    }]))
  }

  const updateColorByIndex = (indexToUpdate, newColor,inputVal,fontSize,selectedFontFamiliy) => {
    setMokeUpes(prev => (
      prev.map((item, index) =>
        index === indexToUpdate
          ? { ...item, color: newColor,content:inputVal,
            fontSize,fontFamily:selectedFontFamiliy}
          : item
      )
    ));
  };

  const HandaleRemoveEl = (index)=>{
    setInputVal('')
    setMokeUpes(prev => prev.filter((el,i)=>i!==index)); 
  }

  const handleConvertToCanvas = () => {
    setSelectedItemIndex(-1)

    if (divRef.current) {
      html2canvas(divRef.current,  { backgroundColor: null }).then((canvas) => {
        const imgSrc = canvas.toDataURL('image/png');
        state.fullTextTexture  = imgSrc
        if (canvasRef.current) {
          // Clear the existing canvas content
          const ctx = canvasRef.current.getContext('2d');
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

          // Set the canvas size to match the HTML element
          canvasRef.current.width = canvas.width;
          canvasRef.current.height = canvas.height;

          // Draw the captured image on the canvas
          ctx.drawImage(canvas, 0, 0);
        }
      });
    }


  };

  useEffect(()=>{
    updateColorByIndex(selectedItemIndex,color.hex,inputVal,fontSize,selectedFontFamiliy)
  },[color,inputVal,fontSize,selectedFontFamiliy])

    // console.log(fontSize)

    const tshirArr = [
        Mokeup,
        Mokeup2,
        Mokeup3,  
        Mokeup4,
        Mokeup5
    ]
    

  return (
    <>
    <div className='flex'>
        <div ref={divRef}   style={{ padding: '20px', backgroundColor: 'transparent', color: 'black' }}
         className='w-full  overflow-x-hidden overflow-b-hidden shrink-1 border ml-1 h-[22rem] relative'> 
           <MoveMokup imageUrl={snap.logoDecal} setPosition={setPosition} position={position} size={snap.size+"%"}/>     
        </div>


    </div>
    <div className="flex p-2" >
    <input type="range" min={10} max={100} value={snap.size} 
    onChange={(el)=>{state.size = el.target.value}} 
          className="w-full  mx-4 ml-[10px] cursor-pointer"/>

    <div>
    <button className='w-full px-6 py-1 mt-4 text-[0.9rem] text-white bg-blue-400 rounded' onClick={()=>{
      state.mockupXposition = position.left
      state.mockupYposition = position.top
    }}> Apply Mockup </button>
    <button  onClick={()=>{state.logoDecal=transparent}} className='w-full px-6 py-1 mt-3 text-[0.9rem] text-red-400 border border-red-400 rounded'>Remove Mockup </button>    
    </div>      
    </div>

    
    <div className='grid grid-cols-6 gap-2 p-2 '>
      
        {tshirArr.map((el)=>
        <img src={el} 
        className=' h-24  rounded cursor-pointer shadow border-4 border-white'
         onClick={()=>{
            state.logoDecal =el
         }}
         />
        )}
        
          <div onClick={()=>inputRef.current.click()}  className='w-24 h-24 pt-4 rounded cursor-pointer'
           
           >
            <input hidden  ref={inputRef} type='file' />
            <UploadFileIcon  width='60px'/>
                 
          </div>
    </div>
   
 
    </>
  )
}

export default TextMockup


const MoveMokup = ({imageUrl,size,position,setPosition}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.left,
      y: e.clientY - position.top,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const parent = e.currentTarget.parentElement;
      const parentRect = parent.getBoundingClientRect();
      const elementRect = e.currentTarget.getBoundingClientRect();

      const newLeft = e.clientX - offset.x;
      const newTop = e.clientY - offset.y;

      // Constrain within parent boundaries
      const constrainedLeft = Math.max(0, Math.min(newLeft, parentRect.width - elementRect.width));
      const constrainedTop = Math.max(0, Math.min(newTop, parentRect.height - elementRect.height));

      setPosition({
        left: constrainedLeft,
        top: constrainedTop,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <img
      src={imageUrl} 
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        position: 'absolute',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onClick={()=>{
        onClick()
      }}
      width={size+"%"}
    />   
  );
};

