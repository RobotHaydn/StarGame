import React, { useMemo } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/cannon";

import {
  useGLTF,
  PerspectiveCamera,
  Stars,
  useKeyboardControls,
  KeyboardControls,
} from "@react-three/drei";
import { Gasballs } from "./componets/Gasballs";
import { CameraRig } from "./componets/CameraRig";

const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

function App() {
  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.back, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );
  const forwardPressed =
    useKeyboardControls < Controls > ((state) => state.forward);
  return (
    <KeyboardControls map={map}>
      <Canvas style={{ background: "black" }}>
        <Physics tolerance={0.0001}>
          <Debug color="skyblue" scale={1.1}>
            <CameraRig></CameraRig>

            <Gasballs />
          </Debug>
        </Physics>
        <PerspectiveCamera makeDefault></PerspectiveCamera>

        <Stars
          radius={100}
          depth={50}
          count={10000}
          factor={10}
          saturation={0}
          fade={true}
          speed={1}
        />

        <ambientLight></ambientLight>
        <pointLight positon={[10, 10, 10]} />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
