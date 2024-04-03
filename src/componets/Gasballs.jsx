import { useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";

export function Gasballs({ onCollide }) {
  const position = [0, 0, 0];
  const [ref, api] = useSphere(() => ({
    mass: 0,
    type: "Dynamic",
    collisionFilterGroup: 1,
    collisionFilterMask: 1,
    isTrigger: true,
    onCollide: (e) => console.log("Collision detected", e),
  }));
  // useFrame(({ clock }) =>
  //   api.position.set(
  //     Math.cos(clock.getElapsedTime()) * 5,
  //     Math.cos(clock.getElapsedTime()) * 5,
  //     Math.cos(clock.getElapsedTime()) * 10
  //   )
  // );
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
