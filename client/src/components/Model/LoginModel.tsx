import  {useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginModelIcom } from "./LoginModelIcon";



const LoginModel = () => {
    const navugate = useNavigate()

    useEffect(() => {
    const timer = setTimeout(() => {
        navugate("/3D-degine/degine");
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timeout on component unmount
  }, []);



  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center p-8 font-montserrat bg-black/50"
    >
      <div
        className="p-4 bg-white rounded-md shadow-black/40 max-w-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div className="flex items-center justify-between gap-4">
          <h3 className=" text-[18px] mb-6  md:text-xl  font-montserrat tracking-[0.6px]">
          </h3>
       
        </div>
        <p className="mb-6 text-sm font-medium tracking-[0.6px] text-gray-600">
        </p> */}

        <LoginModelIcom width="400px"/>
        <p className="flex text-lg justify-center w-ful h-8">

        <svg className="animate-spin border-2 border-blue-400 rounded h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
<span>Authenticating.....</span>
        </p>
 
      </div>
    </div>
  );
};

export default LoginModel;
