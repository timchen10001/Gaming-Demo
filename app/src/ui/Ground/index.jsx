import React from 'react';
import { usePlane } from 'use-cannon';
import {
  TextureLoader,
  RepeatWrapping,
  NearestFilter,
  LinearFilter,
} from 'three';
import grass from '@@static/images/grass.jpg';
import { useStore } from '@@hooks/useStore';

export function Ground(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  const [addCube, activeTexture] = useStore(state => [state.addCube, state.texture]);

  const texture = new TextureLoader().load(grass);

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

        const { x, y, z } = Object.values(e.point).map(coord => Math.ceil(coord));

        addCube(x, y, z, activeTexture);
      }}>

      <planeBufferGeometry
        attach="geometry"
        args={[100, 100]} />

      <meshStandardMaterial
        attach="material"
        map={texture} />
    </mesh>
  );
}

export default Ground;
