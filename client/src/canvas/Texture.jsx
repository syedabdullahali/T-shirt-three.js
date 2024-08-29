import React, { useRef,useState } from 'react'
import { PhotoshopPicker,MaterialPicker } from 'react-color';
import texture1 from '../assets/Texture/3px-tile.png'
import texture2 from '../assets/Texture/45-degree-fabric-dark.png'
import texture3 from '../assets/Texture/45-degree-fabric-light.png'
import texture4 from '../assets/Texture/60-lines.png'
import texture5 from '../assets/Texture/absurdity.png'

import { useSnapshot } from 'valtio'
import state from '../store';


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
    <div>
        <h2 className='text-lg font-bold'>Background Color</h2>
        <div className='flex'>
         <PhotoshopPicker 
                 onChange={(color) => state.color = color.hex}
                 color={snap.color}
                 size='80%'

         />
         <MaterialPicker styles={{width:"200px"}} className='flex-1'
         
         />

        </div>
    
        <h2 className='text-lg font-bold'>Thread Texture </h2>
        <div className='grid grid-cols-6 gap-1 p-2 '>
            {imageArr.map((el)=>
            <img src={el} className='w-full h-24 bg-gray-300 rounded cursor-pointer  '
             onClick={()=>{
                state.fullDecal =el
                state.fullDecal =el
             }}
             />
            )}

          <div onClick={()=>inputRef.current.click()}  className='w-24 h-24 text-white cursor-pointer
              bg-gray-300 border-2 hover:text-blue-400 er-2 text hover:border-blue-400 rounded'
            >
              <input hidden  ref={inputRef} type='file' onChange={handleChange} />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM4 5V19H20V7H11.5858L9.58579 5H4ZM13 13V17H11V13H8L12 9L16 13H13Z"></path></svg>             </div>
        </div>
   
    </div>
  )
}

export default Texture
