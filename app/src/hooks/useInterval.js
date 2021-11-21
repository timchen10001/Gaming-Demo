import { useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // 記住最新的 callback
  useEffect(() => {
    savedCallback.current = callback;
  });

  // 建立 Interval
  useEffect(() => {
    function tick() {
      if (typeof savedCallback?.current !== 'undefined') {
        savedCallback.current();
      }
    }

    if (delay !== 0 && !!delay) {
      const timerId = setInterval(tick, delay);

      return () => clearInterval(timerId);
    }

    return () => {};
  }, [delay]);
}
