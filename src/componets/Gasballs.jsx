import { useRef, useState } from "react";
import { Color, MeshBasicMaterial, SphereGeometry } from "three";
import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useScore } from "../data/storage.js";
import { Scrap } from "./Scrap.jsx";

export function Gasballs({ data, range, setCursor }) {
  return (
    <Instances
      range={range}
      limit={range}
      material={new MeshBasicMaterial({ color: "blue" })}
      geometry={new SphereGeometry(0, 0, 0)}
    >
      {data.map((props, i) => (
        <Gasball key={i} {...props} setCursor={setCursor} />
      ))}
    </Instances>
  );
}

function Gasball({
  random,
  color = new Color(),
  setCursor,
  onCollide,
  ...props
}) {
  const ref = useRef();
  const increaseScore = useScore((state) => state.increaseScore);

  const handleClick = (e, ref) => {
    if (ref.current.claimed) {
      return;
    }
    ref.current["claimed"] = true;
    setCursor("url('/assets/cursor.svg'), auto");
    console.log(ref.current.uuid);
    increaseScore();
    ref.current.visible = false;
  };

  const handlePointerOver = (e, ref) => {
    e.stopPropagation();
    if (ref.current.claimed) return;
    setCursor("url('/assets/cursor-hovered.svg'), pointer");
    ref.current.scale.set(1.5, 1.5, 1.5);
  };

  const handlePointerOut = (ref) => {
    if (ref.current.claimed) return;
    setCursor("url('/assets/cursor.svg'), auto");
    ref.current.scale.set(1, 1, 1);
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 10000;
    if (ref.current.claimed) {
      return;
    } else {
      // ref.current.scale.x =
      //   ref.current.scale.y =
      //   ref.current.scale.z =
      // MathUtils.lerp(ref.current.scale.z, hovered ? 1 : 1, 0.1);
      // ref.current.color.lerp(
      //   color.set(hovered ? "red" : "yellow"),
      //   hovered ? 1 : 1
      // );
    }
  });

  return (
    <Instance
      ref={ref}
      onPointerOver={(e) => handlePointerOver(e, ref)}
      onPointerOut={(e) => handlePointerOut(ref)}
      onClick={(e) => handleClick(e, ref)}
    >
      <Scrap id={props.key} key={props.key} {...props} />
    </Instance>
  );
}
