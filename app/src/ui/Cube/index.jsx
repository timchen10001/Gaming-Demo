import React from 'react';
import T from 'prop-types';
import { useBox } from 'use-cannon';

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
      <boxBufferGeometry
        attach="geometry" />
    </mesh>
  );
};

Cube.propTypes = {
  position: T.arrayOf().isRequired,
  type: T.string.isRequired,
};

export default Cube;
