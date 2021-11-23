/* eslint-disable consistent-return */
import { useStore } from '@@hooks/useStore';
import { floor } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { extend, useThree } from 'react-three-fiber';
import { Vector2 } from 'three';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';

extend({ PointerLockControlsImpl });

export const FPVControls = () => {
  const controlsRef = useRef();
  const currentViewingMaterial = useRef({
    material: null,
    faceIndex: null,
  });

  const {
    camera,
    gl,
    raycaster,
    scene,
  } = useThree();

  const [
    addCube,
    removeCube,
    activeTexture,
  ] = useStore(state => [
    state.addCube,
    state.removeCube,
    state.texture,
  ]);

  const activeTextureRef = useRef(activeTexture);

  useEffect(() => { activeTextureRef.current = activeTexture; });

  useEffect(() => {
    let hoveredObject = {
      material: null,
      originColor: null,
    };

    function trackingFPV() {
      if (hoveredObject?.material) {
        hoveredObject?.material?.color?.set(JSON.parse(hoveredObject.originColor));
      }

      raycaster.setFromCamera(new Vector2(
        0,
        0,
      ), camera);

      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        const intersect = intersects?.[0];

        if (
          intersect.object.name === 'CUBE'
          && Array.isArray(intersect.object.material)
        ) {
          const faceIndex = floor(intersect.faceIndex / 2);
          const targetMaterial = intersect.object.material?.[faceIndex];

          currentViewingMaterial.current = {
            material: targetMaterial,
            faceIndex,
          };

          const originColor = JSON.stringify(targetMaterial?.color);

          const theSameMaterial = hoveredObject?.material?.uuid === targetMaterial.uuid;

          if (!theSameMaterial) {
            hoveredObject = {
              material: targetMaterial,
              originColor,
            };
          }

          targetMaterial?.color?.set('gray');
        }
      }
    }

    function handleFPVShooting(e) {
      const {
        material: targetMaterial,
        faceIndex,
      } = currentViewingMaterial.current;

      if (targetMaterial.name === 'CUBE_MATERIAL') {
        const { x, y, z } = targetMaterial?.parent?.position;

        switch (faceIndex) {
          case 0:
            return e.altKey ? removeCube(x, y, z) : addCube(x + 1, y, z, activeTextureRef.current);
          case 1:
            return e.altKey ? removeCube(x, y, z) : addCube(x - 1, y, z, activeTextureRef.current);
          case 2:
            return e.altKey ? removeCube(x, y, z) : addCube(x, y + 1, z, activeTextureRef.current);
          case 3:
            return e.altKey ? removeCube(x, y, z) : addCube(x, y - 1, z, activeTextureRef.current);
          case 4:
            return e.altKey ? removeCube(x, y, z) : addCube(x, y, z + 1, activeTextureRef.current);
          case 5:
            return e.altKey ? removeCube(x, y, z) : addCube(x, y, z - 1, activeTextureRef.current);

          default:
            break;
        }
      }
    }

    document.addEventListener('click', handleFPVShooting);

    /** @INFO 鎖定第一人稱視角 */
    document.addEventListener('click', () => {
      controlsRef.current.lock();
    });

    window.onresize = () => {
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    document.onmousemove = trackingFPV;

    return () => {
      document?.removeEventListener('click', handleFPVShooting);
    };
  }, []);

  return (
    <pointerLockControlsImpl
      ref={controlsRef}
      args={[
        camera,
        gl.domElement, // WebGLRenderer
      ]} />
  );
};
