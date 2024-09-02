import Canvas from "./canvas3d/index.jsx";
import Home from "./pages/Home.jsx";
import Controller from "./components/Controller.jsx";
import Login from './pages/Login'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import Admin from "./pages/Admin"
import AdminForm from "./pages/Admin/Form.jsx"




function App() {
  return (
    <main className="flex transition-all ease-in bg-gray-50 app ">
      <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/3D-degine" element={<Layout/>} >

        <Route path="degine" element={<div className="flex">
             <Controller/> 
             <Canvas />  
          </div>} /> 

          <Route path="Admin" element={<Admin/>} />
          <Route path='Admin/Form/:role/:status/:id' element={< AdminForm/>}/>


        </Route>

        <Route path="/Login" element={<><Login/> </>} /> 
      </Routes>
    </BrowserRouter>
    </main>
  );
}

export default App;
