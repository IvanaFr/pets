import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import axios from 'axios';

function DogImage() {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    async function fetchDogImage() {
      const response = await axios.get('https://sketchfab.com/3d-models/high-detailed-dog-c7f4ef5856834bf7849dfdac0b329659');
      setImageData(response.data.message);
    }
    fetchDogImage();
  }, []);

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {imageData && <Box><meshBasicMaterial attach="material" map={new THREE.TextureLoader().load(imageData)} /><boxBufferGeometry /></Box>}
    </Canvas>
  );
}

export default DogImage;
