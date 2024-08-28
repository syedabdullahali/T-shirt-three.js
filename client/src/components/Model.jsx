import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader2 } from 'three/examples/jsm/loaders/OBJLoader2';
import useColor from '../hook/colors';
import useFont from '../hook/fonts';

const Model = () => {
  const containerRef = useRef(null);
  const [object, setObject] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const scene = new THREE.Scene();
  const [colors, color, changeColor] = useColor();
  const [fonts, font, changeFont] = useFont();
  const [pathIds, setPathIds] = useState([]);
  const [textIds, setTextIds] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [textVal, setTextVal] = useState('MY TEAM');
  const [textFontSize, setTextFontSize] = useState(60);

  useEffect(() => {
    const container = containerRef.current;

    const camera = new THREE.PerspectiveCamera(30, width / height, 100, 1200);
    camera.position.set(500, 0, 0);
    scene.add(camera);

    const controls = new OrbitControls(camera, container);
    controls.minDistance = 200;
    controls.maxDistance = 700;
    controls.update();

    scene.add(new THREE.AmbientLight(0x666666));

    const light = new THREE.DirectionalLight(0xdfebff, 0.3);
    const d = 300;
    light.position.set(500, 100, 80);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.camera.left = -d;
    light.shadow.camera.right = d;
    light.shadow.camera.top = d;
    light.shadow.camera.bottom = -d;
    light.shadow.camera.far = 100;
    scene.add(light);

    const lights = [
      { color: 0xffffff, intensity: 0.53, position: { x: -500, y: 320, z: 500 }, lookAt: { x: 0, y: 0, z: 0 } },
      { color: 0xffffff, intensity: 0.3, position: { x: 200, y: 50, z: 500 }, lookAt: { x: 0, y: 0, z: 0 } },
      { color: 0xffffff, intensity: 0.4, position: { x: 0, y: 100, z: -500 }, lookAt: { x: 0, y: 0, z: 0 } },
      { color: 0xffffff, intensity: 0.3, position: { x: 1, y: 0, z: 0 }, lookAt: { x: 0, y: 0, z: 0 } },
      { color: 0xffffff, intensity: 0.3, position: { x: -1, y: 0, z: 0 }, lookAt: { x: 0, y: 0, z: 0 } },
    ];

    lights.forEach(light => {
      const dlight = new THREE.DirectionalLight(light.color, light.intensity);
      const { x, y, z } = light.position;
      dlight.position.set(x, y, z);
      const { x: lx, y: ly, z: lz } = light.lookAt;
      dlight.lookAt(lx, ly, lz);
      scene.add(dlight);
    });

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.soft = true;

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      renderer.render(scene, camera);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      render();
    };

    const fetchSVG = async () => {
      const res = await fetch('img/pattern.svg');
      const svg = await res.text();
      document.querySelector('#svgPathContainer').innerHTML = svg;
      document.querySelector('#svgTextContainer').innerHTML = svg;
      document.querySelectorAll('#svgPathContainer text').forEach(t => t.remove());
      document.querySelectorAll('#svgTextContainer path').forEach(p => p.remove());

      const newPathIds = [];
      document.querySelectorAll('#svgPathContainer path').forEach(p => {
        if (p.id && p.attributes.fill) newPathIds.push(p.id);
      });

      const newTextIds = [];
      document.querySelectorAll('#svgTextContainer text').forEach(t => {
        if (t.id) newTextIds.push(t.id);
      });

      setPathIds(newPathIds);
      setTextIds(newTextIds);
      setSelectedMaterial(newPathIds[0]);
      renderModel(newPathIds[0], svg);
    };

    fetchSVG();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (color) {
      document.getElementById(selectedMaterial).setAttribute('fill', color);
      renderModel(selectedMaterial);
    }

    if (/TEXT/.test(selectedMaterial)) {
      const el = document.getElementById(selectedMaterial);
      setTextVal(el.innerHTML);
      setTextFontSize(el.attributes['font-size'].value);
      changeFont(el.attributes['font-family'].value);
    }
  }, [selectedMaterial, color]);

  const renderModel = async (material) => {

    const pathSvg = document.getElementById('svgPathContainer').querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(pathSvg);

    const textSvg = document.getElementById('svgTextContainer').querySelector('svg');
    const svgTextData = new XMLSerializer().serializeToString(textSvg);

    const canvas = document.createElement('canvas');
    canvas.width = pathSvg.width.baseVal.value;
    canvas.height = pathSvg.height.baseVal.value;
    const ctx = canvas.getContext('2d');

    const img = document.createElement('img');
    img.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgData)));

    img.onload = () => {
      ctx.drawImage(img, 0, 0);

      const patternImg = document.createElement('img');
      patternImg.width = 100;
      patternImg.height = 100;
      patternImg.src = 'img/pattern.png';

      patternImg.onload = () => {
        ctx.globalAlpha = 0.4;
        ctx.scale(0.3, 0.3);
        const pattern = ctx.createPattern(patternImg, 'repeat');
        ctx.fillStyle = pattern;
        ctx.fillRect(0, 0, canvas.width * 3.33, canvas.height * 3.33);
        ctx.globalAlpha = 1;
        ctx.scale(3.33, 3.33);

        const textImg = document.createElement('img');
        textImg.src = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgTextData)));
        textImg.onload = () => {
          // ctx.drawImage(textImg, 0, 0);

          // const texture = new THREE.Texture(canvas);
          // texture.needsUpdate = true;
          // const textureMaterial = new THREE.MeshPhongMaterial({ map: texture });       const textureMaterial = new THREE.MeshPhongMaterial();
          const textureMaterial = new THREE.MeshPhongMaterial();


          loadModel(textureMaterial);
        };
      };
    };
  };

  const loadModel = (textureMaterial) => {
    const loader = new OBJLoader2();
    loader.load('model.obj', (data) => {
      if (object) {
        scene.remove(object);
      }
      const newObject = data.detail.loaderRootNode;
      newObject.traverse((node) => {
        if (node.isMesh) {
          node.material = textureMaterial;
          node.geometry.uvsNeedUpdate = true;
        }
      });

      const scale = height / 4;
      newObject.scale.set(scale, scale, scale);
      newObject.position.set(0, -scale * 1.5, 0);
      newObject.rotation.set(0, Math.PI / 2, 0);
      newObject.receiveShadow = true;
      newObject.castShadow = true;
      scene.add(newObject);
      setObject(newObject);
    });
  };

  const applyTextChange = () => {
    const el = document.getElementById(selectedMaterial);
    el.innerHTML = textVal;
    el.style.fontSize = textFontSize;
    el.style.fontFamily = font;
    el.attributes['font-size'].value = textFontSize;
    el.attributes['font-family'].value = font;
    renderModel(selectedMaterial);
  };

  return (
    <div>
      <div id="model" ref={containerRef}></div>
      <div id="svgTextContainer" className="hide"></div>
      <div id="svgPathContainer" className="hide"></div>

      { /ZONE/.test(selectedMaterial) && (
        <div id="colors-picker">
          {colors.map((c) => (
            <div
              key={c}
              className="color"
              title={c}
              style={{ background: c }}
              onClick={() => changeColor(c)}
            ></div>
          ))}
          <p>pick: {color}</p>
        </div>
      )}

      { /TEXT/.test(selectedMaterial) && (
        <div id="text-input">
          <div>
            <label htmlFor="textVal">{selectedMaterial} Text:</label>
            <input
              value={textVal}
              type="text"
              id="textVal"
              onChange={(e) => setTextVal(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="textFontSize">{selectedMaterial} FontSize:</label>
            <input
              value={textFontSize}
              type="number"
              id="textFontSize"
              onChange={(e) => setTextFontSize(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="textFontFamily">{selectedMaterial} FontFamily:</label>
            <select id="textFontFamily" onChange={(e) => changeFont(e.target.value)}>
              {fonts.map((f) => (
                <option key={f} value={f} selected={f === font}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <button onClick={applyTextChange}>apply</button>
        </div>
      )}

      <div id="materials-picker">
        {pathIds.map((m) => (
          <div
            key={m}
            className={`material ${m === selectedMaterial ? 'selected' : ''}`}
            onClick={() => setSelectedMaterial(m)}
          >
            {m}
          </div>
        ))}
      </div>

      <div id="texts-picker">
        {textIds.map((t) => (
          <div
            key={t}
            className={`text ${t === selectedMaterial ? 'selected' : ''}`}
            onClick={() => setSelectedMaterial(t)}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Model;
