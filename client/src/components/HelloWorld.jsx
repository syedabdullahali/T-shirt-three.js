import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const HelloWorld = ({ msg }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // 创建一个场景
    const scene = new THREE.Scene();
    // 给场景增加背景色
    scene.background = new THREE.Color(0xcccccc);
    // 添加雾化效果
    scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // 渲染整个场景
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // vue logo 纹理
    const canvas = document.createElement('canvas');
    canvas.width = 200;
    canvas.height = 200;
    const ctx = canvas.getContext('2d');
    const img = document.querySelector('#logo');
    ctx.drawImage(img, 0, 0);
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    // 定义一个盒型几何体，然后定义纹理，用 mesh 将纹理覆盖到盒子上，并添加到场景中
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({
      map: texture,
    });
    const cube = new THREE.Mesh(geometry, material);
    // 指定位置
    cube.position.set(0, 1.5, 0);
    scene.add(cube);

    // 增加一个球体，包裹上面的立方体
    const geometry1 = new THREE.SphereGeometry(1, 32, 16);
    const material1 = new THREE.MeshPhongMaterial({
      color: 0x42b983,
    });
    const sphere = new THREE.Mesh(geometry1, material1);
    scene.add(sphere);

    // 灯光，照亮场景
    const light1 = new THREE.AmbientLight(0xffffff);
    scene.add(light1);

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
    light.shadowDarkness = 0.5;
    light.shadowCameraVisible = true;
    scene.add(light);

    // 轨道控制器，允许在指定区域用鼠标 360° 旋转
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 10;
    controls.update();

    // 镜头的位置
    camera.position.set(10, 10, 10);

    const renderScene = () => {
      renderer.render(scene, camera);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      cube.rotation.y += 0.005;
      sphere.rotation.y += 0.005;
      renderScene();
    };

    animate();

    return () => {
      // Clean up the scene and renderer when the component unmounts
      scene.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div>
      <img id="logo" alt="Vue logo" style={{ display: 'none' }} src="./assets/logo.png" />
      <div id="th" ref={containerRef}></div>
    </div>
  );
};

export default HelloWorld;
