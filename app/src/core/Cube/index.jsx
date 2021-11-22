/* eslint-disable consistent-return */
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
      name="CUBE"
      ref={ref}
      onPointerMove={(e) => {
        e.stopPropagation();
        // setHover(floor(e.faceIndex / 2)); // 所有的矩形由兩個三角形產生，故 2 個 index 算一個面
      }}
      onPointerOut={() => setHover(null)}
      onClick={(e) => {
        e.stopPropagation();

        // const clickedFace = floor(e.faceIndex / 2);
        // const { x, y, z } = ref.current.position;

        // switch (clickedFace) {
        //   case 0:
        //     return e.altKey ? removeCube(x, y, z) : addCube(x + 1, y, z, activeTexture);
        //   case 1:
        //     return e.altKey ? removeCube(x, y, z) : addCube(x - 1, y, z, activeTexture);
        //   case 2:
        //     return e.altKey ? removeCube(x, y, z) : addCube(x, y + 1, z, activeTexture);
        //   case 3:
        //     return e.altKey ? removeCube(x, y, z) : addCube(x, y - 1, z, activeTexture);
        //   case 4:
        //     return e.altKey ? removeCube(x, y, z) : addCube(x, y, z + 1, activeTexture);
        //   case 5:
        //     return e.altKey ? removeCube(x, y, z) : addCube(x, y, z - 1, activeTexture);

        //   default:
        //     break;
        // }
      }}>
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial
          key={index}
          transparent
          name="CUBE_MATERIAL"
          attachArray="material"
          map={textures[type]}
          color={hover === index ? 'gray' : 'white'}
          opacity={type === 'glass' ? 0.7 : 1} />
      ))}
      <boxBufferGeometry
        name="CUBE_GEOMETRY"
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
