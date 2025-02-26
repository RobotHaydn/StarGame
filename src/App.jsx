import React, { useMemo, useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";

import {
  PerspectiveCamera,
  Stars,
  useKeyboardControls,
  KeyboardControls,
} from "@react-three/drei";

import { Gasballs } from "./componets/Gasballs";
import { CameraRig } from "./componets/CameraRig";
import { data } from "./data/config";
import { useScore } from "./data/storage";

const range = 2;
const Controls = {
  forward: "forward",
  back: "back",
  left: "left",
  right: "right",
  jump: "jump",
};

function App() {
  const [cursor, setCursor] = useState("url('./assets/cursor-red.svg'), auto");

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
  const score = useScore((state) => state.score);
  return (
    <KeyboardControls map={map}>
      <div
        style={{
          width: "100%",
          height: "100vh",
          cursor: cursor,
        }}
      >
        <Canvas
          style={{
            background: "black",
          }}
          onPointerMissed={() => setCursor("url('/assets/cursor.svg'), auto")}
        >
          <CameraRig />
          <Gasballs data={data} range={200000} setCursor={setCursor} />

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
      </div>
      <div className="container score-container">$: {500}</div>
      <div className="container payout-container">payout:${score * 5}</div>
      <div className="container cargo-capacity-container">cargo:{score}</div>
      <div className="container inventory-container">BackPack</div>
      <div className="container compass-container">compass</div>
    </KeyboardControls>
  );
}

export default App;
