/* eslint-disable react/no-unknown-property */
import PropTypes from "prop-types"

import Navigation from "../components/Navigation"

import Main from "../components/Main"
import Meta from "../components/Meta/Meta"

import * as THREE from "three"
import * as React from "react"
import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import niceColors from "nice-color-palettes"
import { Effects } from "@react-three/drei"
import { SSAOPass, UnrealBloomPass } from "three-stdlib"

const tempObject = new THREE.Object3D()
const tempColor = new THREE.Color()
const data = Array.from({ length: 1000 }, () => ({
  color: niceColors[17][Math.floor(Math.random() * 5)],
  scale: 1
}))

// function getRandomNumber(min, max) {
//   return Math.random() * (max - min) + min
// }

function Post() {
  const { scene, camera } = useThree()
  return (
    <Effects disableGamma>
      <SSAOPass new args={[scene, camera]} kernelRadius={0.5} maxDistance={0.1} />
      <UnrealBloomPass threshold={0.9} strength={0.75} radius={0.5} />
    </Effects>
  )
}

function Boxes() {
  const [hovered, set] = useState()
  const colorArray = React.useMemo(
    () =>
      Float32Array.from(
        new Array(1000).fill().flatMap((_, i) => tempColor.set(data[i].color).toArray())
      ),
    []
  )
  const meshRef = useRef()
  const prevRef = useRef()
  React.useEffect(() => void (prevRef.current = hovered), [hovered])

  useFrame(state => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time / 4)
    meshRef.current.rotation.y = Math.sin(time / 2)
    let i = 0
    for (let x = 0; x < 10; x++)
      for (let y = 0; y < 10; y++)
        for (let z = 0; z < 10; z++) {
          const id = i++
          tempObject.position.set(5 - x, 5 - y, 5 - z)
          tempObject.rotation.y =
            Math.sin(x / 4 + time) + Math.sin(y / 4 + time) + Math.sin(z / 4 + time)
          tempObject.rotation.z = tempObject.rotation.y * 2
          if (hovered !== prevRef.Current) {
            ;(id === hovered
              ? tempColor.setRGB(10, 10, 10)
              : tempColor.set(data[id].color)
            ).toArray(colorArray, id * 3)
            meshRef.current.geometry.attributes.color.needsUpdate = true
          }
          const scale = (data[id].scale = THREE.MathUtils.lerp(
            data[id].scale,
            id === hovered ? 2.5 : 1,
            0.1
          ))
          tempObject.scale.setScalar(scale)
          tempObject.updateMatrix()
          meshRef.current.setMatrixAt(id, tempObject.matrix)
        }
    meshRef.current.instanceMatrix.needsUpdate = true
  })
  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, 1000]}
      onPointerMove={e => (e.stopPropagation(), set(e.instanceId))}
      onPointerOut={e => set(undefined)}>
      <boxGeometry args={[0.4, 0.4, 0.4]}>
        <instancedBufferAttribute attach="attributes-color" args={[colorArray, 3]} />
      </boxGeometry>
      <meshBasicMaterial toneMapped={false} vertexColors />
    </instancedMesh>
  )
}

export default function ProjectsPage() {
  return (
    <>
      <Meta
        title="Projects"
        description="A collection of Henrik Wilhelm Sissener's previous projects"
      />

      <Navigation hideOnDesktop darkMode />

      <Main noTopPadding>
        <div className="absolute inset-0 w-full h-full min-h-screen ring mix-blend-overlay">
          <Canvas gl={{ antialias: false }} camera={{ position: [0, 0, 15], near: 5, far: 20 }}>
            <color attach="background" args={["#f0f0f0"]} />
            <Boxes />
            <Post />
          </Canvas>
        </div>
      </Main>
    </>
  )
}

ProjectsPage.propTypes = {
  paintings: PropTypes.array
}
