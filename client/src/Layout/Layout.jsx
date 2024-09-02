import { Outlet } from "react-router-dom"
import logo from "../assets/3D_LOG_TYPE_IMG.svg"

const Layout = ()=>{

return <main className="h-full flex w-full" >
  <nav className="h-full p-2 bg-white" >
    <h2 className="text-center py-2 font-bold text-3xl mb-2">3D T-Shirt</h2>
    <div className="p-2 bg-white  rounded mb-2">
    <img src={logo}/>
    </div>
        <ul className="h-full w-56  text-center" >
            <li className="hover:bg-blue-100 p-3 bg-gray-100 rounded-md mb-2 text-black  cursor-pointer">Login User</li>
            <li className="hover:bg-blue-100 p-3 bg-gray-100 rounded-md mb-2 text-black  cursor-pointer">Login Admin</li>
            <li className="hover:bg-blue-100 p-3  bg-gray-100 rounded-md mb-2 text-black  cursor-pointer">degine</li>
            <li className="bg-black p-2  rounded-md mb-2 text-white cursor-pointer">Log Out</li>
        </ul>
  </nav>

<div className="w-full">
  <header className="h-16 bg-white shadow w-full">

  </header>
 <Outlet/>    
</div>    

</main>


}

export default Layout