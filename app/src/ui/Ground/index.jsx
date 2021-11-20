import React from 'react';
import { usePlane } from 'use-cannon';
import {
  // TextureLoader,
  RepeatWrapping,
  NearestFilter,
  LinearFilter,
} from 'three';
import * as textures from '@@constants/textures';
// import { useStore } from '@@hooks/useStore';

export const Ground = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  // const [addCube, activeTexture] = useStore(state => [state.addCube, state.texture]);

  const texture = textures.grass;

  texture.magFilter = NearestFilter;
  texture.minFilter = LinearFilter;
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(100, 100);

  return (
    <mesh
      ref={ref}
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();

        // const { x, y, z } = Object.values(e.point).map(coord => Math.ceil(coord));

        // addCube(x, y, z, activeTexture);
      }}>
      <planeBufferGeometry
        attach="geometry"
        args={[100, 100]} />
      <meshStandardMaterial
        map={texture}
        attach="material" />
    </mesh>
  );
};

export default Ground;
