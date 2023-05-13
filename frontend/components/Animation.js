import { useEffect, useRef, forwardRef } from 'react';
import { chakra, useTheme } from '@chakra-ui/react';

import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Animation = forwardRef(function Animation(
  { setLoading, calcDimensions },
  ref
) {
  const clockRef = useRef(new THREE.Clock());
  const mixerRef = useRef(null);
  const frameRef = useRef(null);

  const theme = useTheme();
  const themeColor = theme.colors.jaggedIce[300];

  useEffect(() => {
    const { current: container } = ref;

    const createRenderer = async () => {
      const { width, height } = calcDimensions();
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.outputEncoding = THREE.sRGBEncoding;
      container.appendChild(renderer.domElement);
      window.renderer = renderer;

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(themeColor);
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
      controls.enablePan = false;
      controls.enableDamping = true;
      controls.enableZoom = false;
      controls.minPolarAngle = 0.5;
      controls.maxPolarAngle = 1.5;
      controls.update();

      const dracoLoader = new DRACOLoader().setDecoderPath(
        'https://www.gstatic.com/draco/v1/decoders/'
      );
      const loader = new GLTFLoader().setDRACOLoader(dracoLoader);

      try {
        const gltf = await loader.loadAsync('/LittlestTokyo.glb');
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        scene.add(model);

        mixerRef.current = new THREE.AnimationMixer(model);
        mixerRef.current.clipAction(gltf.animations[0]).play();

        const animate = () => {
          frameRef.current = requestAnimationFrame(animate);
          const delta = clockRef.current.getDelta();
          mixerRef.current.update(delta);
          controls.update();
          renderer.render(scene, camera);
        };

        animate();
        setLoading(false);
      } catch (err) {
        console.log(`Error loading the model: ${err}`);
      }

      window.onresize = () => {
        const { width, height } = calcDimensions();
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };
    };

    if (!window.renderer) {
      createRenderer();
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        window.renderer = null;
      }
      window.onresize = null;
    };
  }, []);

  return (
    <chakra.div
      h='100%'
      w='100%'
      pos='relative'
      ref={ref}></chakra.div>
  );
});

export default Animation;
