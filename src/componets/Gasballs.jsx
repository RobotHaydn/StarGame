import { useRef, useState } from "react";
import { Color, MeshBasicMaterial, SphereGeometry } from "three";
import clsx from "clsx";
import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useScore } from "../data/storage.js";
import { Scrap } from "./Scrap.jsx";

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
  const [hovered, setHovered] = useState(false);
  const increaseScore = useScore((state) => state.increaseScore);

  const handleClick = (e, ref) => {
    if (ref.current.claimed) {
      return;
    }
    ref.current["claimed"] = true;
    ref.current.color.lerp(color.set("green"), 1);
    console.log(ref.current.uuid);
    increaseScore();
    ref.current.visible = false;
  };

  const handlePointerOver = (e, ref) => {
    e.stopPropagation();
    if (ref.current.claimed) {
      return;
    }
    setHovered(true);
    document.body.style.cursor = `url("./assets/cursor.svg") 16 16, pointer`;
    console.log("body cursor: ", document.body.style.cursor);
    ref.current.scale.set(1.5, 1.5, 1.5);
  };
  const handlePointerOut = (ref) => {
    if (ref.current.claimed) {
      return;
    }
    setHovered(false);
    document.body.style.cursor = `url("./assets/cursor-red.svg") 16 16, pointer`;
    console.log("unhover body cursor: ", document.body.style.cursor);
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
