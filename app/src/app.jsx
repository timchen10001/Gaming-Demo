/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
import React from 'react';
import moment from 'moment';
import { Canvas } from 'react-three-fiber';
import { Sky } from 'drei';
import { Physics } from 'use-cannon';
import { Ground } from '@@core/Ground';
import { Cube } from '@@core/Cube';
import { Player } from '@@core/Player';
import { AimRaycaster } from '@@core/AimRaycaster';
import { useStore } from '@@hooks/useStore';
import { useInterval } from '@@hooks/useInterval';
import { Hud } from '@@ui/Hud';

function App() {
  const [cubes, saveWorld] = useStore(state => [
    state.cubes,
    state.saveWorld,
  ]);

  /** @INFO 每十秒自動存擋 */
  useInterval(() => {
    saveWorld(cubes);

    console.log(
      moment().locale('zh-tw').format('YYYY-MM-DD HH:mm'),
      '世界已自動存擋',
    );
  }, 10000);

  return (
    <>
      <Canvas
        shadowMap
        sRGB>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.25} />
        <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
        <Hud position={[0, 0, -2]} />
        <Physics gravity={[0, -30, 0]}>
          <Ground position={[0, 0.5, 0]} />
          <Player position={[0, 3, 10]} />
          {cubes.map(cube => (
            <Cube
              key={cube.key}
              position={cube.pos}
              type={cube.type} />
          ))}
        </Physics>
      </Canvas>

      <AimRaycaster />
    </>
  );
}

export default App;
