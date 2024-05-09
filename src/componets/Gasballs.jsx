import { Debug, useSphere } from "@react-three/cannon";
import { Instance, Instances } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { useUpdate } from "react-use";
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
} from "three";

export function Gasballs({ data, range }) {
  return (
    <Instances
      range={range}
      material={new MeshBasicMaterial({ color: "white" })}
      geometry={new SphereGeometry(1, 16, 16)}
    >
      {data.map((props, i) => (
        <Gasball key={i} {...props} />
      ))}
    </Instances>
  );
}

function Gasball({ random, color = new Color(), onCollide, ...props }) {
  // const [ref, api] = useSphere(() => ({
  //   mass: 0,
  //   type: "Dynamic",
  //   collisionFilterGroup: 1,
  //   collisionFilterMask: 1,
  //   isTrigger: true,
  //   onCollide: (e) => console.log("Collision detected", e),
  // }));
  const ref = useRef();
  const [hovered, setHover] = useState(false);

  const handleClick = (e, ref) => {
    console.log("event", e);
    ref.current["claimed"] = true;
    ref.current.color.lerp(color.set("green"), 1);
  };

  useFrame((state) => {
    const t = state.clock.getElapsedTime() + random * 10000;
    if (ref.current.claimed) {
      return;
    } else {
      ref.current.scale.x =
        ref.current.scale.y =
        ref.current.scale.z =
          MathUtils.lerp(ref.current.scale.z, hovered ? 1.4 : 1, 0.1);
      ref.current.color.lerp(
        color.set(hovered ? "red" : "yellow"),

        hovered ? 1 : 0.1
      );
    }
  });
  return (
    <group {...props}>
      <Debug color="red" scale={1.1}>
        <Instance
          ref={ref}
          onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
          onPointerOut={(e) => setHover(false)}
          onClick={(e) => handleClick(e, ref)}
        />
      </Debug>
    </group>
  );
}

// function Gasballnot({ onCollide }) {
//   console.log("HIIIII");
//   const [ref, api] = useSphere(() => ({
//     mass: 0,
//     type: "Dynamic",
//     collisionFilterGroup: 1,
//     collisionFilterMask: 1,
//     isTrigger: true,
//     onCollide: (e) => console.log("Collision detected", e),
//   }));
//   // useFrame(({ clock }) =>
//   //   api.position.set(
//   //     Math.cos(clock.getElapsedTime()) * 5,
//   //     Math.cos(clock.getElapsedTime()) * 5,
//   //     Math.cos(clock.getElapsedTime()) * 10
//   //   )
//   // );
//   return (
//     <mesh
//       ref={ref}
//       visible
//       userData={{ hello: "world" }}
//       // position={position}
//       // rotation={rotation}
//       // scale={scale}
//     >
//       <sphereGeometry args={[1, 16, 16]} />
//       {/* <meshStandardMaterial color={color} transparent /> */}
//     </mesh>
//   );
// }
// export function Gasballsnot({ count = 2, temp = new Object3D() }) {
//   const instancedMeshRef = useRef();

//   useEffect(() => {
//     // Set positions
//     for (let i = 0; i < count; i++) {
//       temp.position.set(Math.random(), Math.random(), Math.random());
//       temp.updateMatrix();
//       instancedMeshRef.current.setMatrixAt(i, temp.matrix);
//     }
//     // Update the instance
//     instancedMeshRef.current.instanceMatrix.needsUpdate = true;
//     console.log("in:", instancedMeshRef.current);
//   }, []);
//   return (
//     <instancedMesh ref={instancedMeshRef} args={[null, null, count]}>
//       <instancedBufferAttribute
//         attach="instanceId"
//         count={temp.length / 16}
//         array={temp}
//         itemSize={16}
//         usage={DynamicDrawUsage}
//       />

//       <Gasball></Gasball>
//     </instancedMesh>
//   );
// }
