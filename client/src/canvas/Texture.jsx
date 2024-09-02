import React, { useRef,useState } from 'react'
import { PhotoshopPicker,MaterialPicker } from 'react-color';
import texture1 from '../assets/Texture/3px-tile.png'
import texture2 from '../assets/Texture/45-degree-fabric-dark.png'
import texture3 from '../assets/Texture/45-degree-fabric-light.png'
import texture4 from '../assets/Texture/60-lines.png'
import texture5 from '../assets/Texture/absurdity.png'

import { useSnapshot } from 'valtio'
import state from '../store';
import { UploadFileIcon } from '../icon/icon';


const Texture = () => {
    const snap = useSnapshot(state);
    const [file, setFile] = useState("");
    const inputRef = useRef(null)

    const imageArr = [
        texture1,
        texture2,
        texture3,
        texture4,
        texture5,
      
    ]


    const handleChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const arrayBuffer = e.target.result;
          state.fullDecal = arrayBuffer
        };
        reader.readAsDataURL(file);     
       }
    };
  

  return (
    <div className='m-2'>
        <h2 className='text-lg font-bold'>Background Color</h2>
        <div className='flex '>
         <PhotoshopPicker 
                 onChange={(color) => state.color = color.hex}
                 color={snap.color}
                 size='80%'

         />
        </div>
    
        <h2 className='text-lg font-bold'>Thread Texture </h2>
        <div className='grid grid-cols-6 gap-1 p-2 '>
            {imageArr.map((el)=>
            <img src={el} className='w-full h-24 bg-gray-300 rounded cursor-pointer shadow border-4 border-white '
             onClick={()=>{
                state.fullDecal =el
                state.fullDecal =el
             }}
             />
            )}

          <div onClick={()=>inputRef.current.click()}  className='w-24 h-24 pt-4 cursor-pointer
               text-black  text  rounded'
            >
              <input hidden  ref={inputRef} type='file' onChange={handleChange} />
              <UploadFileIcon width='60px'/>
          </div>

        </div>
   
    </div>
  )
}

export default Texture
