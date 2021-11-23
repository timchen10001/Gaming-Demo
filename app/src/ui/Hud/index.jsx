/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { Texture } from 'three';
import T from 'prop-types';
import { useFrame, useThree, ReactThreeFiber } from 'react-three-fiber';

import * as textures from '@@constants/textures';
import { useStore } from '@@hooks/useStore';

const Material = ({
  args,
  color,
  texture,
  isActive,
  ...props
}) => (
  <mesh {...props}>
    <boxBufferGeometry
      attach="geometry"
      args={args} />
    {[...Array(6)].map((_, index) => (
      <meshStandardMaterial
        key={index}
        transparent
        attachArray="material"
        map={texture}
        opacity={isActive ? 1 : 0.3} />
    ))}
  </mesh>
);

Material.propTypes = {
  args: T.arrayOf(T.shape({
    width: T.number,
    height: T.number,
    depth: T.number,
    widthSegments: T.number,
    heightSegments: T.number,
    depthSegments: T.number,
  })),
  color: T.shape(ReactThreeFiber.Color),
  texture: T.shape(Texture).isRequired,
  isActive: T.bool.isRequired,
  ...T.shape(ReactThreeFiber.Object3DNode),
};

const MaterialContainer = ({
  args,
  color,
  activeTexture,
  ...props
}) => {
  const activeTextureIndex = Object.keys(textures).indexOf(activeTexture);

  return (
    <mesh {...props}>
      {Object.keys(textures).map((key, index) => (
        <Material
          key={key}
          isActive={activeTextureIndex === index}
          texture={textures[key]}
          args={[0.2, 0.2, 0.05]}
          position={[-0.5 + index / 4, 0, 0.01]} />
      ))}
      <boxBufferGeometry
        attach="geometry"
        args={args} />

      <meshStandardMaterial
        transparent
        attach="material"
        color={color} />
    </mesh>
  );
};

MaterialContainer.propTypes = {
  args: T.arrayOf(T.shape({
    width: T.number,
    height: T.number,
    depth: T.number,
    widthSegments: T.number,
    heightSegments: T.number,
    depthSegments: T.number,
  })),
  color: T.shape(ReactThreeFiber.Color).isRequired,
  activeTexture: T.string.isRequired,
};

export const Hud = ({ position }) => {
  const { camera } = useThree();
  const [hudState, setHudState] = useState(() => ({
    position: camera.position,
    rotation: [0, 0, 0],
    opacity: 0,
  }));

  const [hudVisible, setHudVisible] = useState(false);
  const [activeTexture] = useStore(state => [state.texture]);

  useFrame(() => {
    const { x, y, z } = camera.position;
    const { x: rotX, y: rotY, z: rotZ } = camera.rotation;

    setHudState({
      position: [x, y, z],
      rotation: [rotX, rotY, rotZ],
      opacity: hudVisible ? 1 : 0,
    });
  });

  useEffect(() => {
    setHudVisible(true);
    const hudVisibilityTimeout = setTimeout(() => {
      setHudVisible(false);
    }, 2000);

    return () => {
      clearTimeout(hudVisibilityTimeout);
    };
  }, [setHudVisible, activeTexture]);

  return (
    hudVisible && (
      <group
        name="HUD"
        position={hudState.position}
        rotation={hudState.rotation}>
        <group position={position}>
          <MaterialContainer
            args={[1.3, 0.3, 0.01]}
            color="#222"
            activeTexture={activeTexture}
            hudVisible={hudVisible} />
        </group>
      </group>
    )
  );
};

Hud.propTypes = {
  position: T.arrayOf(
    T.shape(ReactThreeFiber.Vector3)
  ).isRequired,
};
