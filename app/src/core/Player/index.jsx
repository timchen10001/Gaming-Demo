/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { useSphere } from 'use-cannon';
import { Vector3 } from 'three';
import { useKeyBoardControls } from '@@hooks/useKeyboardControls';
import { FPVControls } from '../FPVControls';

const PLAYER_MOVEMENT_SPEED = 6;

export const Player = (props) => {
  const {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    jump,
  } = useKeyBoardControls();

  const { camera } = useThree();

  const [ref, sphere] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    ...props,
  }));

  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    sphere.velocity
      .subscribe((newVelocity) => {
        velocity.current = newVelocity;
      });
  }, [sphere.velocity]);

  useFrame(() => {
    camera.position.copy(ref.current.position);

    // 當下起點座標
    const direction = new Vector3();

    // 前後向量
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0),
    );

    // 左右向量
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0,
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(PLAYER_MOVEMENT_SPEED)
      .applyEuler(camera.rotation);

    sphere.velocity.set(
      direction.x,
      velocity.current[1],
      direction.z,
    );

    // 垂直向量
    if (jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      sphere.velocity.set(
        velocity.current[0],
        8,
        velocity.current[2],
      );
    }
  });

  return (
    <>
      <FPVControls />
      <mesh
        ref={ref} />
    </>
  );
};
