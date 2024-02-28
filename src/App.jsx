import React, { useState, useRef } from "react";
import { MathUtils, ShapeGeometry } from "three";
import "./App.css";
import { Canvas, useLoader, useThree, useFrame } from "@react-three/fiber";
import { Physics, useSphere, Debug } from "@react-three/cannon";

import {
  useGLTF,
  PerspectiveCamera,
  PointerLockControls,
  FlyControls,
  Stars,
  FirstPersonControls,
} from "@react-three/drei";
import { TextureLoader } from "three";
import { Background } from "./componets/Backround";
function ModelWithPhysics(props) {
  const { scene: gltfScene } = useGLTF("models/SpaceShip.glb");
  //hitbox
  const [ref] = useSphere(() => ({
    isTrigger: true,
    onCollide: (e) => console.log("Collided!", e),
    mass: 1,
    type: "Kinematic",
    collisionFilterGroup: 1,
    collisionFilterMask: 1,
    position: [0, 0, 0],
    size: [1, 1, 1],
    args: [1],
  }));

  return <primitive ref={ref} object={gltfScene} {...props} />;
}
function Model(props) {
  // const position = [0, -2, -4];
  // const { camera, scene: threeScene } = useThree();
  // console.log("camera: ", camera);
  // const { scene: gltfScene } = useGLTF("models/SpaceShip.glb");
  // // scene.scale.setScalar(1 / 25);
  // gltfScene.rotation.y = MathUtils.degToRad(180);
  // gltfScene.scale.set(0.5, 0.5, 0.5);
  // camera.add(gltfScene);
  // gltfScene.position.set(...position);

  // threeScene.add(camera);
  const [ref, api] = useSphere(() => ({
    isTrigger: true,
    onCollide: (e) => console.log("Collision detected", e),
    collisionFilterGroup: 1,
    collisionFilterMask: 1,
    args: [1],
    position: [0, 0, 0],
  }));
  return (
    <mesh ref={ref} {...props}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshLambertMaterial color="white" />
    </mesh>
  );
}
function Gasballs({ onCollide }) {
  const position = [0, 0, 0];
  const [ref, api] = useSphere(() => ({
    mass: 0,
    type: "Dynamic",
    collisionFilterGroup: 1,
    collisionFilterMask: 1,
    isTrigger: true,
    onCollide: (e) => console.log("Collision detected", e),
  }));
  useFrame(({ clock }) =>
    api.position.set(
      Math.cos(clock.getElapsedTime()) * 5,
      Math.cos(clock.getElapsedTime()) * 5,
      Math.cos(clock.getElapsedTime()) * 10
    )
  );
  return (
    <mesh
      ref={ref}
      visible
      userData={{ hello: "world" }}
      position={position}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="cyan" transparent />
    </mesh>
  );
}

function App() {
  return (
    <Canvas style={{ background: "black" }}>
      <Physics tolerance={0.0001}>
        <Debug color="black" scale={1.1}>
          <ModelWithPhysics></ModelWithPhysics>
          {/* <Model></Model> */}
          <Gasballs
            onCollide={(e) => {
              console.log("Collision event on BoxTrigger", e);
              // setbg("#fe4365");
            }}
          />
        </Debug>
      </Physics>

      <Stars
        radius={100}
        depth={50}
        count={10000}
        factor={10}
        saturation={0}
        fade={true}
        speed={1}
      />

      {/* <FirstPersonControls lookSpeed={.5}
      movementSpeed={5}
      autoForward={false}
      ></FirstPersonControls> */}
      <FlyControls
        autoForward={false}
        dragToLook={true}
        movementSpeed={3}
        rollSpeed={0.015}
      />
      <PointerLockControls />
      <ambientLight></ambientLight>
      <pointLight positon={[10, 10, 10]} />
      {/* <PerspectiveCamera makeDefault positon={[0, 0, 0]}>
      </PerspectiveCamera> */}
    </Canvas>
  );
}

export default App;
