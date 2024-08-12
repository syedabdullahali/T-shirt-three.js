import {proxy} from 'valtio';
import transparent from '../assets/transparent_rectangle.svg.png';
import tShirt from '../../public/shirt_baked.glb';
import logo from '../assets/Mockup/3D_Cartoon_preview.png'

// console.log(tShirt)

const state = proxy({
  intro: false,
  color: '#5B0D1F',
  isLogoTexture: true,
  isFullTexture: true,
  position:'360',
  logoDecal:logo,
  fullDecal: transparent,
  fullPaintDecal:transparent,
  leftFullDecal:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Red_Color.jpg/1536px-Red_Color.jpg",
  size:40,
  mockupXposition:0,
  mockupYposition:10, 
  mockupRotationFront:true,
  designType:tShirt,
  fullTextTexture:transparent,
});

export default state;