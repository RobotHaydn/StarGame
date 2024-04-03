import { useGLTF } from "@react-three/drei";
import { MathUtils } from "three";

export function StarShip(props) {
  const { boundingSphereRef } = props;
  const { scene: gltfScene } = useGLTF("models/SpaceShip.glb");
  //hitbox

  return (
    <primitive
      ref={boundingSphereRef}
      object={gltfScene}
      {...props}
      position={[0, -1.5, -2]}
      rotation={[0, MathUtils.degToRad(180), 0]}
    />
  );
}
