// import React, { useRef } from "react"
// import { useFrame } from "@react-three/fiber"
// import * as THREE from "three"

// const Particles = ({
//   count = 1000,
//   radius = 10,
//   size = 0.1,
//   color = "#ffffff",
// }) => {
//   const meshRef = useRef()

//   const positions = new Float32Array(count * 3)
//   const scales = new Float32Array(count)
//   const colors = new Float32Array(count * 3)

//   for (let i = 0; i < count; i++) {
//     const x = Math.random() * radius * 2 - radius
//     const y = Math.random() * radius * 2 - radius
//     const z = Math.random() * radius * 2 - radius

//     positions[i * 3] = x
//     positions[i * 3 + 1] = y
//     positions[i * 3 + 2] = z

//     scales[i] = size

//     const colorObj = new THREE.Color(color)
//     colorObj.toArray(colors, i * 3)
//   }

//   useFrame(() => {
//     meshRef.current.rotation.y += 0.002
//   })

//   return (
//     <points ref={meshRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attachObject={["attributes", "position"]}
//           count={count}
//           array={positions}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attachObject={["attributes", "scale"]}
//           count={count}
//           array={scales}
//           itemSize={1}
//         />
//         <bufferAttribute
//           attachObject={["attributes", "color"]}
//           count={count}
//           array={colors}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial size={size} vertexColors={true} />
//     </points>
//   )
// }

// export default Particles

const Particles = () => {
  return <div>particles</div>
}

export default Particles
