// import "./styles.css";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


export const Model = () => {
  const gltf = useLoader(GLTFLoader, "../../public/Poimandres.gltf");
  return (
    <>
      <primitive object={gltf.scene} scale={0.4} />
    </>
  );
};