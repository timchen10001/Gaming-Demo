import { floor } from 'lodash';
import React, { useEffect, useRef } from 'react';
import { extend, useThree } from 'react-three-fiber';
import { Vector2 } from 'three';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';

extend({ PointerLockControlsImpl });

export const FPVControls = () => {
  const controlsRef = useRef();

  const {
    camera,
    gl,
    raycaster,
    scene,
  } = useThree();

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

    /** @INFO 鎖定第一人稱視角 */
    document.addEventListener('click', () => {
      controlsRef.current.lock();
    });

    window.onresize = () => {
      gl.setSize(window.innerWidth, window.innerHeight);
    };

    document.onmousemove = trackingFPV;
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
