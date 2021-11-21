import { useEffect, useState } from 'react';
import { useStore } from './useStore';

const ActionKeyInterface = {
  KeyW: 'moveForward',
  KeyS: 'moveBackward',
  KeyA: 'moveLeft',
  KeyD: 'moveRight',
  Space: 'jump',
};

const TextureKeyInterface = {
  Digit1: 'dirt',
  Digit2: 'grass',
  Digit3: 'glass',
  Digit4: 'wood',
  Digit5: 'log',
};

function actionByKey(key) {
  return ActionKeyInterface[key];
}

function textureByKey(key) {
  return TextureKeyInterface[key];
}

export function useKeyBoardControls() {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
  });

  const setTexture = useStore(state => state.setTexture);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Movement Key
      if (actionByKey(e.code)) {
        setMovement(state => ({
          ...state,
          [actionByKey(e.code)]: true,
        }));
      }

      // Texture Key
      if (textureByKey(e.code)) {
        setTexture(textureByKey(e.code));
      }
    };

    const handleKeyUp = (e) => {
      // Movement Key
      if (actionByKey(e.code)) {
        setMovement(state => ({
          ...state,
          [actionByKey(e.code)]: false,
        }));
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document?.removeEventListener('keydown', handleKeyDown);
      document?.removeEventListener('keyup', handleKeyUp);
    };
  });

  return movement;
}
