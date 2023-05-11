import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import GLTFLoader from "three-gltf-loader";
import { Scene } from "three";
import axios from "axios";

function DogModel() {
    const [dogModel, setDogModel] = useState<Scene | null>(null);

    useEffect(() => {
        async function fetchDogModel() {
            const response = await axios.get(
                "https://api.sketchfab.com/v3/models/c7f4ef5856834bf7849dfdac0b329659"
            );
            const loader = new GLTFLoader();
            loader.load(response.data, (gltf) => {
                setDogModel(gltf.scene);
            });
        }
        fetchDogModel();
    }, []);

    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {dogModel && <primitive object={dogModel} />}
        </Canvas>
    );
}

export default DogModel;
