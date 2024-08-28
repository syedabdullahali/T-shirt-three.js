import {motion, AnimatePresence} from 'framer-motion';
import {useSnapshot} from 'valtio';
import tshirtImg  from '../assets/pexels-paggiarofrancesco-2294342.jpg'
import tshirtImage from '../assets/png-transparent-printed-t-shirt-screen-printing-wholesale-tshirt-logo-active-shirt__1_-removebg-preview.png'
import state from '../store';
import { CustomButton } from '../components';
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate(state)

  return (
    // <AnimatePresence>
    //   {snap.intro && (
    //     <motion.section className="home " {...slideAnimation('left')}>
    //       <motion.header {...slideAnimation("down")}>
    //         <img 
    //         src="./threejs.png" 
    //         alt="logo" 
    //         className="object-contain w-8 h-8"
    //         />
    //       </motion.header>

    //     <motion.div className="bg-white home-content" {...headContainerAnimation}>
    //       <motion.div {...headTextAnimation}>
    //         <h1 className="head-text">
    //           LET'S <br className="hidden xl:block" /> DO IT!
    //         </h1>
    //       </motion.div>
    //       <motion.div
    //         {...headContentAnimation}
    //         className="flex flex-col gap-5"
    //       >
    //         <p className="max-w-md text-base font-normal text-gray-600">
    //         Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
    //         </p>

    //       <CustomButton 
    //         type="filled"
    //         title="Customize It"
    //         handleClick={() => state.intro = false}
    //         customStyles="w-fit px-4 py-2.5 font-bold text-sm"
    //       />

    //       </motion.div>

    //     </motion.div>

    //     </motion.section>
    //   )}
    // </AnimatePresence>
    <div style={{backgroundImage:`url(${tshirtImg})`}} className='relative w-screen h-screen bg-red-300 bg-no-repeat bg-cover'>
      <div className='absolute top-0 left-0 flex items-center justify-center w-full h-full bg-white/20 '>

       <div className='bg-white/90 w-[90%] h-[90%] rounded-lg overflow-hidden flex'>

       {/* <motion.div className="bg-white home-content" {...headContainerAnimation}>
           <motion.div {...headTextAnimation}>
             <h1 className="head-text">
               LET'S <br className="hidden xl:block" /> DO IT!
             </h1>
           </motion.div>
           <motion.div
            {...headContentAnimation}
            className="flex flex-col gap-5"
          >
            <p className="max-w-md text-base font-normal text-gray-600">
            Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong>{" "} and define your own style.
            </p>

          <CustomButton 
            type="filled"
            title="Customize It"
            handleClick={() => state.intro = false}
            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
          />

          </motion.div>

        </motion.div> */}
        <div className='flex flex-col items-start justify-start w-1/2 h-full p-4 '>
        <h1 className='font-black text-7xl '>
                <br className="hidden xl:block" /> UNLEASH YOUR STYLE

        </h1>
        
            <p className="px-1 my-8 text-xl font-normal text-gray-600 max-w-3/4">
            Create your own unique shirt with our <strong>cutting-edge 3D</strong>  customization tool. Express your creativity and make a statement with a design that's all you.
            </p>
            <button
            onClick={() => navigate('/Login')}
            className='px-6 py-3 mt-4 text-xl text-white bg-black rounded-lg'> Start Creating </button>

           

          
        </div>

        <div className='flex items-center w-1/2 h-full'>
        <img src={tshirtImage} className='w-full'/>
          
        </div>
        
        
       </div>
        
      </div>
      
    </div>
  )
}

export default Home