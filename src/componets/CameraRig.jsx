import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { StarShip } from "./StarShip";
import { FlyControls, PointerLockControls } from "@react-three/drei";
import { Debug, useSphere } from "@react-three/cannon";
export function CameraRig() {
  const camRigRef = useRef();
  const camera = useThree((state) => state.camera);
  const controls = useRef();

  const [sphereRef, sphereApi] = useSphere(() => ({
    isTrigger: true,
    onCollide: (e) => console.log("Collided!", e),
    mass: 1,
    type: "Kinematic",
    collisionFilterGroup: 1,
    collisionFilterMask: 1,
    position: [0, 0, 0],
    args: [2.3],
  }));

  useEffect(() => {
    controls.current.addEventListener("change", (e) => {
      // console.log("Cam move", e);
      camRigRef.current.position.copy(camera.position);
      camRigRef.current.rotation.copy(camera.rotation);
      sphereApi.position.set(...camera.position);
      sphereApi.rotation.set(...camera.rotation);
      // handleKeyPress;
    });
  }, [camera]);

  return (
    <>
      <FlyControls
        makeDefault
        autoForward={false}
        dragToLook={true}
        movementSpeed={3}
        rollSpeed={0.5}
        ref={controls}
      />
      {/* <PointerLockControls ref={controls} /> */}
      <Debug color="skyblue" scale={1.1}>
        <group ref={camRigRef}>
          <StarShip boundingSphereRef={camRigRef}></StarShip>
        </group>
      </Debug>
    </>
  );
}
