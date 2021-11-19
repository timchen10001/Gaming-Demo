import React from 'react';
import { ceil } from 'lodash';
import { usePlane } from 'use-cannon';
import {
  TextureLoader,
  RepeatWrapping,
  PlaneBufferGeometry,
  Mesh,
  MeshStandardMaterial
} from 'three';
import grass from '@@static/images/grass.jpeg';
import { useStore } from '@@hooks/useStore';

export default function Ground(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  const [addCube, type] = useStore(state => [state.addCube, state.type]);

  const texture = new TextureLoader().load(grass);

  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(100, 100);

  return (
    <Mesh
      receiveShadow
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();

        const { x, y, z } = e.point;

        addCube(ceil(x), ceil(y), ceil(z), type);
      }}>

      <PlaneBufferGeometry
        attach="geometry"
        args={[100, 100]} />

      <MeshStandardMaterial
        attach="material"
        map={texture} />
    </Mesh>
  );
}
