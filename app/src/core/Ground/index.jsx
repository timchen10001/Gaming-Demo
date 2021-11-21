import React from 'react';
import { usePlane } from 'use-cannon';
import { useStore } from '@@hooks/useStore';
import * as textures from '@@constants/textures';
// import { useStore } from '@@hooks/useStore';

export const Ground = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  const [addCube, activeTexture] = useStore(state => [
    state.addCube,
    state.texture,
  ]);

  return (
    <mesh
      ref={ref}
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();

        const [x, y, z] = Object.values(e.point).map(coord => Math.ceil(coord));

        addCube(x, y, z, activeTexture);
      }}>
      <planeBufferGeometry
        attach="geometry"
        args={[100, 100]} />
      <meshStandardMaterial
        map={textures.grass}
        attach="material" />
    </mesh>
  );
};

export default Ground;
