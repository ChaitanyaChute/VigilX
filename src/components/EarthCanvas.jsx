import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Earth = () => {
  const earth = useGLTF("/models/earth.glb"); // place an Earth model in public/models/
  return <primitive object={earth.scene} scale={2} position={[0, -2, 0]} />;
};

const EarthCanvas = () => (
  <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
    <ambientLight intensity={0.5} />
    <directionalLight position={[2, 2, 3]} intensity={1.2} />
    <Suspense fallback={null}>
      <Earth />
    </Suspense>
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
  </Canvas>
);

export default EarthCanvas;
