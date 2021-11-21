import React, { useMemo } from 'react';
import { usePlane } from 'use-cannon';
import { useStore } from '@@hooks/useStore';
import grass from '@@static/images/grass.jpg';
import {
  LinearMipMapLinearFilter,
  NearestFilter,
  RepeatWrapping,
  TextureLoader,
} from 'three';

export const Ground = (props) => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props,
  }));

  const [addCube, activeTexture] = useStore(state => [
    state.addCube,
    state.texture,
  ]);

  const texture = useMemo(() => {
    const grassTexture = new TextureLoader().load(grass);

    grassTexture.magFilter = NearestFilter;
    grassTexture.minFilter = LinearMipMapLinearFilter;
    grassTexture.wrapS = RepeatWrapping;
    grassTexture.wrapT = RepeatWrapping;
    grassTexture.repeat.set(100, 100);

    return grassTexture;
  }, []);

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
        map={texture}
        attach="material" />
    </mesh>
  );
};

export default Ground;
