import React, { useState } from 'react'
import ColorPicker from './picker/ColorPicker'
import PaintBrush from '../canvas/PaintBrush'
import Texture from '../canvas/Texture'
import Mockup from '../canvas/Mockup'
import TextMockup from '../canvas/TextMockup'
import { BrushPaint, MockupIcon, TextMockupIcon, TextureIcon } from '../icon/icon'
// import Design from '../canvas/Design'


const Controller = () => {
  const [activeNav,setActiveNav] = useState(1)
  return (
    <div className=' w-[710px] '>
      <nav className='w-100% flex bg-white'>
         <button onClick={()=>setActiveNav(1)} 
         className={`border p-3 flex-1 text-[0.8rem] flex text-md font-bold   ${activeNav===1?"border-blue-400":""} `}>
          Brush Paint <BrushPaint width={'25px'}/> </button>
         <button onClick={()=>setActiveNav(2)} className={`flex text-md font-bold border  text-[0.8rem] p-3 flex-1 ${activeNav===2?"border-blue-400":""}`}> 
          Texture <TextureIcon width={'25px'}/></button>
         <button onClick={()=>setActiveNav(3)} className={`flex text-md font-bold border  text-[0.8rem] p-3 flex-1 ${activeNav===3?"border-blue-400":""}`}>
          Mockup <MockupIcon className="ml-1" width={'25px'}/></button>
         <button onClick={()=>setActiveNav(4)} className={`flex text-md font-bold border  text-[0.8rem] p-3 flex-1 ${activeNav===4?"border-blue-400":""}`}>
          Text Mockup <TextMockupIcon width={'25px'} className="ml-1" /></button>

         {/* <button className='p-4 border shrink-1'>DT Print</button>
         <button className='p-4 border '>All Texture</button> */}
      </nav>
      <section className='border'>
       {activeNav===1?<PaintBrush/>: activeNav===2?<Texture/>:activeNav===3?
       <Mockup/>:<TextMockup/>}
   
      </section>
    </div>
  )
}

export default Controller
