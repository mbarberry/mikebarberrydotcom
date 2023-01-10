import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let mixer;

export default function Home() {
  const refContainer = useRef();
  const [loading, setLoading] = useState(true);
  const [renderer, setRenderer] = useState(null);
  useEffect(() => {
    const { current: container } = refContainer;

    const createRenderer = async () => {
      const clock = new THREE.Clock();

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);
      setRenderer(renderer);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xbfe3dd);
      scene.environment = new THREE.PMREMGenerator(renderer).fromScene(
        new RoomEnvironment(),
        0.04
      ).texture;

      const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        100
      );
      camera.position.set(5, 2, 8);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0.5, 0);
      controls.update();
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.minPolarAngle = 0.5;
      controls.maxPolarAngle = 1.5;

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

      let req = null;

      const animate = () => {
        req = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        mixer.update(delta - delta * 0.3);
        controls.update();
        renderer.render(scene, camera);
      };

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      try {
        const gltf = await loader.loadAsync('/LittlestTokyo.glb');
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play().setEffectiveTimeScale(0.7);

        animate();
      } catch (err) {
        console.error(`Error loading the model: ${err}`);
      }

      window.onresize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };

      setLoading(false);

      return () => {
        cancelAnimationFrame(req);
        renderer.dispose();
      };
    };
    if (container && !renderer) {
      createRenderer();
    }
  }, []);

  return (
    <div
      style={{ height: '100vh', width: '100vw', position: 'relative' }}
      ref={refContainer}>
      {loading && (
        <span style={{ position: 'absolute', left: '50%', top: '50%' }}>
          Loading...
        </span>
      )}
      <h1>Hello, Three.js!</h1>
    </div>
  );
}
