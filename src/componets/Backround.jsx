import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three";

export function Background(){
    const { scene,THREE } = useThree();
    const texture = useLoader(TextureLoader, "images/Space image.jpeg");
    // texture.encoding = THREE.sRGBEncoding;
    scene.background = texture;
    return(<></>)
}