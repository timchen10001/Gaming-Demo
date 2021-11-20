/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-indent-props */
import React from 'react';
import T from 'prop-types';
import { useBox } from 'use-cannon';
import * as textures from '@@constants/textures';

export const Cube = ({
  position,
  type,
  ...props
}) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    ...props,
  }));

  return (
    <mesh
      castShadow
      ref={ref}>
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          key={index}
          attachArray="material"
          map={textures[type]} />
      ))}
      <boxBufferGeometry
        attach="geometry" />
    </mesh>
  );
};

Cube.propTypes = {
  position: T.arrayOf(T.shape({
    x: T.number.isRequired,
    y: T.number.isRequired,
    z: T.number.isRequired,
  }).isRequired).isRequired,
  type: T.string.isRequired,
};

export default Cube;
