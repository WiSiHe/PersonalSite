import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import { IoArrowBackSharp } from "react-icons/io5";

import Main from "../../components/Main";

import Meta from "../../components/Meta/Meta";

import Link from "next/link";

// function randomIntFromInterval(min, max) {
//   // min and max included
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

export default function Gallery() {
  // A physical sphere tied to mouse coordinates without visual representation
  function Mouse() {
    const { viewport } = useThree();
    const [, api] = useSphere(() => ({ type: "Kinematic", args: [6] }));
    return useFrame((state) =>
      api.position.set(
        (state.mouse.x * viewport.width) / 2,
        (state.mouse.y * viewport.height) / 2,
        7
      )
    );
  }

  // A physical plane without visual representation
  function Plane({ color, ...props }) {
    usePlane(() => ({ ...props }));
    return null;
  }

  // Creates a crate that catches the spheres
  function Borders() {
    const { viewport } = useThree();
    return (
      <>
        <Plane
          position={[0, -viewport.height / 2, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <Plane
          position={[-viewport.width / 2 - 1, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Plane
          position={[viewport.width / 2 + 1, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        />
        <Plane position={[0, 0, 0]} rotation={[0, 0, 0]} />
        <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
      </>
    );
  }

  // Spheres falling down
  function InstancedSpheres({ count = 200 }) {
    const { viewport } = useThree();
    const [ref] = useSphere((index) => ({
      mass: 100,
      position: [4 - Math.random() * 8, viewport.height, 0, 0],
      args: [1],
    }));
    return (
      <instancedMesh
        ref={ref}
        castShadow
        receiveShadow
        args={[null, null, count]}
      >
        <sphereBufferGeometry args={[1, 32, 32]} />
        <meshLambertMaterial color="#ff7b00" />
      </instancedMesh>
    );
  }

  return (
    <>
      <Meta />
      <div className="fixed z-10 transition-all ease-in-out top-4 left-4">
        <Link href="/">
          <a className="flex items-center justify-center p-2 text-2xl transition-all duration-200 ease-in-out bg-white rounded-lg hover:shadow-lg dark:bg-primary dark:text-white ">
            <IoArrowBackSharp />
          </a>
        </Link>
      </div>

      <Main noTopPadding>
        <section className="border">
          {/* <a href="https://feature.linasmatkasse.se/">test-link</a> */}
          <div className="h-screen">
            <Canvas
              shadows
              gl={{
                stencil: false,
                depth: false,
                alpha: false,
                antialias: false,
              }}
              camera={{ position: [0, 0, 20], fov: 50, near: 17, far: 40 }}
            >
              <fog attach="fog" args={["red", 25, 40]} />
              <color attach="background" args={["#ffdd41"]} />
              <ambientLight intensity={2} />
              <directionalLight
                position={[50, 50, 25]}
                angle={0.3}
                intensity={2}
                castShadow
                shadow-mapSize-width={64}
                shadow-mapSize-height={64}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
              />
              <directionalLight position={[-10, -10, -5]} intensity={0.5} />
              <Physics
                gravity={[0, -50, 0]}
                defaultContactMaterial={{ restitution: 0.5 }}
              >
                <group position={[0, 0, -10]}>
                  <Mouse />
                  <Borders />
                  <InstancedSpheres />
                </group>
              </Physics>
              {/* <Post /> */}
            </Canvas>
          </div>
        </section>
      </Main>
    </>
  );
}

Gallery.propTypes = {};

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 600, // 10 min
  };
}
