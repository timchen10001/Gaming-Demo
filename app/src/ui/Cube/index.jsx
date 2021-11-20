/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-indent-props */
import React, { useState } from 'react';
import T from 'prop-types';
import { useBox } from 'use-cannon';
import * as textures from '@@constants/textures';

export const Cube = ({
  position,
  type,
  ...props
}) => {
  const [hover, setHover] = useState();

  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    ...props,
  }));

  return (
    <mesh
      castShadow
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation();
        setHover(Math.floor(e.faceIndex / 2)); // 所有的矩形由兩個三角形產生，故 2 個 index 算一個面
      }}>
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          key={index}
          attachArray="material"
          map={textures[type]}
          color={hover === index ? 'gray' : 'white'} />
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
