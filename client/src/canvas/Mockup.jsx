import { SketchPicker  } from "react-color";
import fontFamilies from "../config/font"
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



const TextMockup = () => {


  const [textMokeUps,setMokeUpes] = useState([])
  const [inputVal,setInputVal] = useState('')
  const [selectedItemIndex,setSelectedItemIndex] = useState(-1) 
  const [color,setColor] = useState('black')
  const [fontSize,setFontSize] = useState(15)
  const [selectedFontFamiliy,setFontFamily] = useState("sen-serif")
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
         className='w-full overflow-x-hidden overflow-b-hidden shrink-1 border ml-1 h-[28rem] relative'>
           {
            textMokeUps.map((el,index)=> <MoveMokup 
             color={el.color} content={el.content}
             onClick={()=>{
              if(selectedItemIndex===index){
                setSelectedItemIndex(-1)
                setInputVal('')
                setFontSize(15)
              }else{
                setSelectedItemIndex(index)
                setInputVal(el.content)  
                setFontSize(el.fontSize)
              }
            }}
             isSelected={index===selectedItemIndex}
             fontSize={el.fontSize}
             fontFamily={el.fontFamily}
             onDelete={()=>{HandaleRemoveEl(index)}}
             />)
           }
        </div>
{/*      
        <div className='w-fit bg-white '>

        <SketchPicker color={color}  onChange={(e)=>{setColor(e)}} />

           <div className="w-[130px]">

            
          <label className="mt-2">Font Size</label>
          <input type="range" min={10} max={100} value={fontSize} onChange={(el)=>{setFontSize(el.target.value)}} 
          className="w-[170px] m-1 ml-[10px] cursor-pointer"/>

           </div>

        <div className="w-[190px] h-[11.8rem] overflow-y-scroll border flex flex-wrap">
        {fontFamilies.map((el)=><p onClick={()=>{setFontFamily(el)}} className="border p-2 break-words m-1 cursor-pointer rounded-md" style={{fontFamily:el}}>{el}</p>)}
        </div>
        </div> */}

        {/* <canvas ref={canvasRef} width={200} style={{ marginTop: '20px', border: '1px solid black' }}></canvas> */}

    </div>
    <div >
    <input type="range" min={10} max={100} value={fontSize} onChange={(el)=>{setFontSize(el.target.value)}} 
          className="w-[170px] m-1 ml-[10px] cursor-pointer"/>

    <div>
    <button className='w-full px-6 py-1 mt-4 text-[0.9rem] text-white bg-blue-400 rounded' onClick={()=>handaleApplyMockeUp()}> Apply Mockup </button>
    <button  onClick={()=>{state.logoDecal=transparent}} className='w-full px-6 py-1 mt-3 text-[0.9rem] text-red-400 border border-red-400 rounded'>Remove Mockup </button>    
    </div>      
    </div>

    
    <div className='grid grid-cols-6 gap-2 p-2 '>
      
        {tshirArr.map((el)=>
        <img src={el} 
        className=' h-24 border rounded cursor-pointer'
         onClick={()=>{
            state.logoDecal =el
         }}
         />
        )}
          <div onClick={()=>inputRef.current.click()}  className='w-24 h-24 text-white bg-gray-300 border-2 hover:text-blue-400 er-2 text hover:border-blue-400 rounded cursor-pointer'
           
           >
            <input hidden  ref={inputRef} type='file' />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM13 13V17H11V13H8L12 9L16 13H13Z"></path></svg>           </div>
    </div>
   
 
    </>
  )
}

export default TextMockup


const MoveMokup = ({content,color,fontFamily,onClick,isSelected,fontSize,onDelete}) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
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
    <h2
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        left: `${position.left}px`,
        top: `${position.top}px`,
        position: 'absolute',
        cursor: isDragging ? 'grabbing' : 'grab',
        color:color,
        fontFamily:fontFamily,
        fontSize:fontSize+"px"
      }}
      onClick={()=>{
        onClick()
      }}
      className={`movable-div break-word group  hover:bg-blue-50 rounded p-2 ${isSelected?"border-blue-400 rounded  border-2 ":" border-transparent"}`}
    >
     {content}

     <button onClick={()=>{
              onDelete()
     }} className="group-hover:block hidden  absolute -right-6 -top-6 p-2 z-[200] rounded-full bg-red-500 text-white" >
     <svg width={'20px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
     <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637
      16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855
       12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> 
     </button>

    </h2>
  );
};

