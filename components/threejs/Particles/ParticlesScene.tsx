// import React from "react"
// import { Canvas } from "@react-three/fiber"
// import FloatingParticles from "./FloatingParticles"

import Particles from "./Particles"

// const Scene = () => {
//   return (
//     <Canvas>
//       <ambientLight />
//       <FloatingParticles />
//     </Canvas>
//   )
// }

// export default Scene

const ParticlesScene = () => {
  return (
    <div>
      <h1>Particles Scene</h1>
      <Particles />
    </div>
  )
}

export default ParticlesScene
