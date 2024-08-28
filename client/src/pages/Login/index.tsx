import {useState} from 'react'
import Login from './Login'
import Otp from './Otp'

import Email from './Email'
import CreateNewPassword from './CreateNewPassword'
import { ToastContainer } from 'react-toastify'
import LoginModel from '../../components/Model/LoginModel'
// import Canvas from "../../canvas3d/index.jsx";
import backgroundImage from '../../assets/pexels-kaip-996329.jpg'
import LoginImage from '../../assets/LoginShirtImage.png'

const Signin = () => {

 const [steps,setSteps] = useState(0)
 const [email,setEmail] = useState('')
 const [token,setToken] = useState('')

 const handaleSteps = (num:number,email:string)=>{
    setSteps(num)
    setEmail(email)
 }
 const handaleConfirmEmailSteps = (num:number,email:string,token:string)=>{
  setSteps(num)
  setEmail(email)
  setToken(token)
}




  return (
    <div 
    style={{backgroundImage:`url(${backgroundImage})`,backgroundSize:"cover"}}
    className='w-full  h-screen
     flex justify-center items-center bg-white '>
      <div className='flex rounded overflow-hidden bg-white/90 border shadow'>

        <div  
         className='w-[23rem] h-[30rem] text-gray-500 font-[400] '>
          <img src={LoginImage} className='ml-12' width={'350px'}/>
          {/* <p className='text-end p-4 text-xl'>Professional Sevice for a home environment</p> */}

          {/* <Canvas/> */}
      </div>
      <div  className='relative overflow-x-hidden w-[40rem] duration-200  '>
        <h2 className='font-[700] text-2xl mt-8 text-start text-orange-500 px-2'>3D T-SHIRT</h2>
      <div style={{left:steps===1?'-100%':steps===2?'-200%':steps===3?'-300%':steps===4?'-400%':'0'}} className='w-[200rem] relative flex  duration-200'>
        
         <div className='w-[40rem]'>
         <Login handaleSteps={handaleSteps}/>
         </div>
         <div className='w-[40rem]'>
         <Otp email={email} isEmailCheck={false}  handaleConfirmEmailSteps={handaleConfirmEmailSteps} />
         </div>
         <div className='w-[40rem]'>
         <Email  handaleSteps={handaleSteps} email={email} />
         </div>
         <div className='w-[40rem]'>
         <Otp email={email} isEmailCheck ={true} handaleConfirmEmailSteps={handaleConfirmEmailSteps} />
         </div>
         <div className='w-[40rem]'>
         <CreateNewPassword email={email}   handaleSteps={handaleSteps} token={token} />
         </div>
      </div>
      </div>
     </div>
      <ToastContainer hideProgressBar position='top-right'/>
      {!!JSON.parse(localStorage.getItem("user-auth")||"{}")?.token&&<LoginModel/>}
    </div>
  )
}

export default Signin
