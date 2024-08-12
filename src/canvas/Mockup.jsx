import { useState,useRef } from 'react'
import Mokeup from '../assets/Mockup/3D_Cartoon_preview.png'
import Mokeup2 from '../assets/Mockup/364-removebg-preview.png'
import Mokeup3 from '../assets/Mockup/MockeUpSunday.png'
import Mokeup4 from '../assets/Mockup/MockFollow.png'
import Mokeup5 from '../assets/Mockup/MockUpGlitter.png'




import state from '../store'
import { useSnapshot } from 'valtio'
import transparent from '../assets/transparent_rectangle.svg.png';

const Mockup = () => {
  const snap = useSnapshot(state)

    const tshirArr = [
        Mokeup,
        Mokeup2,
        Mokeup3,  
        Mokeup4,
        Mokeup5
    ]
    

    const inputRef = useRef(null)
    const [mockupAtr,setMocupAtr] = useState({
      size:30,
      mockupYposition:40,
      mockupXposition:0,
    })
  

    const handleChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
          reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          state.logoDecal = arrayBuffer
        };
        reader.readAsDataURL(file);     
       }
    };


    const handaleApplyMockeUp = ()=>{
      state.size = mockupAtr.size
      state.mockupXposition = mockupAtr.mockupXposition
      state.mockupYposition = mockupAtr.mockupYposition

    }

  return (
    <div>
    <div className='flex w-full h-fit'>
      <div className='relative overflow-hidden bg-white h-80 w-80'>
          <img className='absolute' style={{left:mockupAtr.mockupXposition+"%",top:mockupAtr.mockupYposition+"%"}} src={snap.logoDecal} alt="" width={`${mockupAtr.size}%`}    /> 
      </div>

      <div className='flex-1 w-full p-2 '>
      <label className='text-[0.9rem]'><strong>Mockup Size</strong></label>
      <input type={'range'} min='10' max='100' className="mb-8 slider " id='size-slider'  
      value={mockupAtr.size} style={{width:"100%"}} onChange={(e)=>setMocupAtr(prev=>({...prev,size:e.target.value}))} />
        <label className='text-[0.9rem]'><strong>Mockup X Position </strong></label>
      <input type={'range'} min='10' max='100' className="mb-8 slider " id='size-slider'  
      value={mockupAtr.mockupXposition} style={{width:"100%"}} onChange={(e)=>setMocupAtr(prev=>({...prev,mockupXposition:e.target.value}))} />
        <label className='text-[0.9rem]'><strong>Mockup Y Position </strong></label>
      <input type={'range'} min='10' max='100' className="mb-8 slider " id='size-slider'  
      value={mockupAtr.mockupYposition} style={{width:"100%"}} onChange={(e)=>setMocupAtr(prev=>({...prev,mockupYposition:e.target.value}))} />
      <button className='w-full px-6 py-1 mt-4 text-[0.9rem] text-white bg-blue-400 rounded' onClick={()=>handaleApplyMockeUp()}> Apply Mockup </button>
      <button  onClick={()=>{state.logoDecal=transparent}} className='w-full px-6 py-1 mt-3 text-[0.9rem] text-red-400 border border-red-400 rounded'>Remove Mockup </button>
      </div>

    </div>
     <h2 className='font-[600] text-[1.2rem] m-1'>Mockup</h2>

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
            <input hidden  ref={inputRef} type='file' onChange={handleChange} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM13 13V17H11V13H8L12 9L16 13H13Z"></path></svg>           </div>
    </div>
    </div>
  )
}

export default Mockup
