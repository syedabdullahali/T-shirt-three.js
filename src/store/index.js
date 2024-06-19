import {proxy} from 'valtio';

const state = proxy({
  intro: false,
  color: '#353934',
  isLogoTexture: true,
  isFullTexture: true,
  position:'360',
  logoDecal: './threejs.png',
  fullDecal: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Solid_white_bordered.svg/2048px-Solid_white_bordered.svg.png',
  leftFullDecal:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Red_Color.jpg/1536px-Red_Color.jpg",
  size:30,
  mockupXposition:0,
  mockupYposition:40, 
});

export default state;