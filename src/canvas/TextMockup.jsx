import { SketchPicker  } from "react-color";
import fontFamilies from "../config/font"
import React, { useState ,useRef} from 'react';
import html2canvas from 'html2canvas';
import state from '../store';
import { useEffect } from "react";
import transparent from '../assets/transparent_rectangle.svg.png';
import { useSnapshot } from 'valtio'

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

    console.log(fontSize)
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
        </div>

        {/* <canvas ref={canvasRef} width={200} style={{ marginTop: '20px', border: '1px solid black' }}></canvas> */}

    </div>
    <div className=" flex bg-white p-1">
        <div className="flex w-full">

         <div className="w-48 px-2  ">
          <button onClick={HandaleAdd} className=" text-white bg-blue-500 mb-1.5 mt-2  p-0.5 rounded-md w-full ">Save Text</button>
          <button className=" border border-red-300 mb-1.5 w-full bg-red-50   p-0.5 rounded-md "
          onClick={()=>{setFontSize(20),setSelectedItemIndex(-1),setInputVal('')}}
          >Clear Text</button>

         </div>
         <textarea value={inputVal} className="w-full shrink-1  p-2 outline-none " 
         placeholder="Enter your text" onChange={(e)=>setInputVal(e.target.value)}></textarea>

        </div>
    <div className="w-[250px] p-1 ">
        <button className="w-full border border-red-300 bg-red-50 mb-1 mt-1  p-0.5 rounded " onClick={()=>{state.fullTextTexture=transparent}}>Remove Mockup</button>
        <button className="w-full bg-blue-500 mb-1 mt-1  p-0.5 rounded text-white shadow-md" onClick={handleConvertToCanvas}>Apply Mockup</button>
        <button className="w-full text-base text-white  bg-red-500 mb-1 mt-1  p-0.5 rounded shadow-md"
        onClick={()=>setMokeUpes([])}
        >Clear Board</button>
    </div>
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

 MoveMokup;
