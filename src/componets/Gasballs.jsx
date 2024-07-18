import { Instance, Instances } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useUpdate } from "react-use";
import { Scrap } from "./Scrap.jsx";

import {
  Matrix4,
  Quaternion,
  Vector3,
  Object3D,
  DynamicDrawUsage,
  Color,
  MathUtils,
  MeshBasicMaterial,
  SphereGeometry,
  BufferGeometry,
} from "three";
import { useScore } from "../data/storage.js";

("USE GLTF FOR THE MODEL OF THE GASBALLS");
export function Gasballs({ data, range }) {
  return (
    <Instances
      range={range}
      limit={range}
      material={new MeshBasicMaterial({ color: "blue" })}
      geometry={new SphereGeometry(0, 0, 0)}
    >
      {data.map((props, i) => (
        <Gasball key={i} {...props} />
      ))}
    </Instances>
  );
}

function Gasball({ random, color = new Color(), onCollide, ...props }) {
  const ref = useRef();
  const [hovered, setHover] = useState(false);
  const increaseScore = useScore((state) => state.increaseScore);

  const handleClick = (e, ref) => {
    if (ref.current.claimed) {
      return;
    }
    ref.current["claimed"] = true;
    ref.current.color.lerp(color.set("green"), 1);
    console.log(ref.current);
    increaseScore();
    ref.current.visible = false;
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 10000;
    if (ref.current.claimed) {
      return;
    } else {
      ref.current.scale.x =
        ref.current.scale.y =
        ref.current.scale.z =
          MathUtils.lerp(ref.current.scale.z, hovered ? 1 : 1, 0.1);
      ref.current.color.lerp(
        color.set(hovered ? "red" : "yellow"),

        hovered ? 1 : 1
      );
    }
  });
  return (
    <Instance
      ref={ref}
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={(e) => setHover(false)}
      onClick={(e) => handleClick(e, ref)}
    >
      <Scrap id={props.key} key={props.key} {...props} />
    </Instance>
  );
}
