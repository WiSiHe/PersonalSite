/* eslint-disable react/jsx-no-target-blank */
import Link from "next/link";
import React, { useRef, useState, Suspense } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  Text,
  softShadows,
  Html,
  MeshWobbleMaterial,
  Environment,
} from "@react-three/drei";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { useSpring, a } from "@react-spring/three";

import Main from "../../components/Main";

softShadows();

function Model({ url }) {
  const gltf = useGLTFLoader(url, true);
  return <primitive object={gltf.scene} dispose={null} />;
}

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function Torus(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.04));
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      castShadow
    >
      <torusKnotGeometry />
      <MeshWobbleMaterial
        color="lightblue"
        speed={6}
        attach="material"
        factor={0.6}
      />
      {/* <meshStandardMaterial color="royalblue" /> */}
    </mesh>
  );
}

const SpinningMesh = ({ position, color, speed, args }) => {
  //ref to target the mesh
  const mesh = useRef();

  //useFrame allows us to re-render/update rotation on each frame
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  //Basic expand state
  const [expand, setExpand] = useState(false);
  // React spring expand animation
  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return (
    <a.mesh
      position={position}
      ref={mesh}
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        color={color}
        speed={speed}
        attach="material"
        factor={0.6}
      />
    </a.mesh>
  );
};

function Test() {
  return (
    <>
      <div className="fixed z-10 transition-all ease-in-out top-4 left-4">
        <Link href="/">
          <a className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white rounded-lg hover:shadow-lg dark:bg-primary dark:text-white ">
            <IoArrowBackSharp />
          </a>
        </Link>
      </div>
      <div className="w-full h-screen">
        <Canvas
          shadows
          concurrent
          colorManagement
          // camera={{ position: [0, 0, 120], fov: 70 }}
          camera={{ position: [-5, 2, 10], fov: 60 }}
        >
          <Suspense fallback={null}>
            <directionalLight
              castShadow
              position={[0, 10, 0]}
              intensity={1.5}
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />

            <ambientLight intensity={0.3} />
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 1, 0]}
              receiveShadow
            >
              <planeBufferGeometry attach="geometry" args={[200, 200]} />
              <shadowMaterial attach="material" opacity={0.1} />
            </mesh>

            <group>
              <Box position={[-10, 3, 0]} />
              <Box position={[-8, 3, 0]} />
              <Box position={[-6, 3, 0]} />
              <Box position={[-4, 3, 0]} />
            </group>
            {/* <group>
            <mesh position={[0, -35, 0]}>
              <Model url="/3D/scene.gltf" />
            </mesh>
          </group> */}
            <Torus position={[0, 3, 0]} />
            <Text
              position={[0, 5, 0]}
              scale={[2, 2, 2]}
              color="red" // default
              anchorX="center" // default
              anchorY="middle" //
              receiveShadow
              default
            >
              Halla Frontend
            </Text>

            <group>
              <SpinningMesh
                position={[4, 3, 0]}
                color="lightblue"
                args={[1, 1, 1]}
                speed={2}
              />
              <SpinningMesh
                position={[6, 3, 0]}
                color="red"
                args={[1, 1, 1]}
                speed={2}
              />
              <SpinningMesh
                position={[8, 3, 0]}
                color="lightgreen"
                args={[1, 1, 1]}
                speed={2}
              />
              <SpinningMesh
                position={[10, 3, 0]}
                color="lightorange"
                args={[1, 1, 1]}
                speed={2}
              />
            </group>

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
            <Environment preset="sunset" background />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}

export default Test;
