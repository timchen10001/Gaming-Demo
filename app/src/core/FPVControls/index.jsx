import React, { useEffect, useRef } from 'react';
import { extend, useThree } from 'react-three-fiber';
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls';

extend({ PointerLockControlsImpl });

export const FPVControls = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    /** @INFO 鎖定第一人稱視角 */
    document.addEventListener('click', () => {
      controlsRef.current.lock();
    });
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
