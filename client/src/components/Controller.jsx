import React, { useState } from 'react'
import ColorPicker from './picker/ColorPicker'
import PaintBrush from '../canvas/PaintBrush'
import Texture from '../canvas/Texture'
import Mockup from '../canvas/Mockup'
import TextMockup from '../canvas/TextMockup'
// import Design from '../canvas/Design'

const Controller = () => {
  const [activeNav,setActiveNav] = useState(1)
  return (
    <div className=' w-[810px] '>
      <nav className='w-100% flex'>
         <button onClick={()=>setActiveNav(1)} 
         className={`border p-3 flex-1 text-[0.8rem]  ${activeNav===1?"bg-blue-50 border-blue-400":""} `}>
          Brush Paint</button>
         <button onClick={()=>setActiveNav(2)} className={`border text-[0.8rem] p-3 flex-1 ${activeNav===2?"bg-blue-50 border-blue-400":""}`}> Texture</button>
         <button onClick={()=>setActiveNav(3)} className={`border text-[0.8rem] p-3 flex-1 ${activeNav===3?"bg-blue-50 border-blue-400":""}`}>Mockup</button>
         <button onClick={()=>setActiveNav(4)} className={`border text-[0.8rem] p-3 flex-1 ${activeNav===4?"bg-blue-50 border-blue-400":""}`}>Text Mockup</button>

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
