import create from 'zustand';
import { nanoid } from 'nanoid';

export const StorageKeys = {
  TEXTURE: 'dirt',
  CUBES: 'world',
  WOOD: 'wood',
};

const getLocalStorage = key => JSON.parse(window.localStorage.getItem(key));

const setLocalStorage = (key, value) => window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create(set => ({
  cubes: getLocalStorage(StorageKeys.CUBES) || [],
  addCube: (x, y, z, type) => set(state => ({
    cubes: [
      ...state.cubes,
      {
        type,
        key: nanoid(),
        pos: [x, y, z],
        texture: state.texture,
      },
    ],
  })),
  removeCube: (x, y, z) => {
    set(state => ({
      cubes: state.cubes.filter((cube) => {
        const [_x, _y, _z] = cube.pos;

        return _x !== x || _y !== y || _z !== z;
      }),
    }));
  },

  texture: StorageKeys.TEXTURE,
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: () => set((state) => {
    setLocalStorage(StorageKeys.CUBES, state.cubes);
  }),
}));

