import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Sky } from 'drei';
import { Physics } from 'use-cannon';
import { Ground } from '@@ui/Ground';
// import Cube from '@@ui/Cube';
// import { StorageKeys } from '@@hooks/useStore';

function App() {
  return (
    <Canvas shadowMap sRGB>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={0.25} />
      <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
      {/* <Hud position={[0, 0, -2]} /> */}
      <Physics gravity={[0, -30, 0]}>
        <Ground position={[0, 0.5, 0]} />
        {/* <Player position={[0, 3, 10]} /> */}
      </Physics>
    </Canvas>
  );
}

export default App;
