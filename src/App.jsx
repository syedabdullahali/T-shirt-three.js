import { useEffect,useState } from "react";
import Canvas from "./canvas3d/index.jsx";
import Customizer from "./pages/Customizer.jsx";
import Home from "./pages/Home.jsx";
import * as THREE from 'three';
import ColorPicker from "./components/picker/ColorPicker.jsx";
import Controller from "./components/Controller.jsx";
import Texture from "./canvas/PaintBrush.jsx";
import Practice from "./canvas/Practice.jsx";
import ThreeDTshirt from "./canvasTshirt/ThreeDTshirt.jsx";
import App2 from './App2.jsx'

import { BrowserRouter,Routes,Route } from "react-router-dom";


function App() {

  const tshirtData  = {
    "collar": {
      "color": "#ff0000",
      "texture": "path/to/collar_texture.png"
    },
    "front": {
      "color": "#00ff00",
      "texture": "path/to/front_texture.png",
      "logo": "path/to/front_logo.png"
    },
    "back": {
      "color": "#0000ff",
      "texture": "path/to/back_texture.png"
    },
    "leftSide": {
      "color": "#ffff00",
      "texture": "path/to/left_side_texture.png"
    },
    "rightSide": {
      "color": "#ff00ff",
      "texture": "path/to/right_side_texture.png"
    },
    "leftHand": {
      "color": "#00ffff",
      "texture": "path/to/left_hand_texture.png"
    },
    "rightHand": {
      "color": "#ffffff",
      "texture": "path/to/right_hand_texture.png"
    }
  }


  return (
    <main className="flex transition-all ease-in bg-gray-100 app ">
      <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/degine" element={<>
             <Controller/> 
             <Canvas />  
          </>} /> 
      </Routes>
    </BrowserRouter>
    </main>
  );
}

export default App;
