import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { StarShip } from "./StarShip";
import { FlyControls, PointerLockControls } from "@react-three/drei";

export function CameraRig() {
  const camRigRef = useRef();
  const camera = useThree((state) => state.camera);
  const controls = useRef();

  useEffect(() => {
    controls.current.addEventListener("change", (e) => {
      // console.log("Cam move", e);
      camRigRef.current.position.copy(camera.position);
      camRigRef.current.rotation.copy(camera.rotation);

      // handleKeyPress;
    });
  }, [camera]);

  return (
    <>
      <FlyControls
        makeDefault
        autoForward={false}
        dragToLook={true}
        movementSpeed={30}
        rollSpeed={0.5}
        ref={controls}
      />
      {/* <PointerLockControls ref={controls} /> */}

      <group ref={camRigRef}>
        <StarShip></StarShip>
      </group>
    </>
  );
}
