import React, { useEffect, useRef } from 'react';

const AIM_WIDTH = 4;
const AIM_LENGTH = 18;
const AIM_COLOR = 'rgba(128, 128, 128, 0.63)';

export const AimRaycaster = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;

    const ctx = canvas.getContext('2d');

    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = AIM_WIDTH;

      ctx.strokeStyle = AIM_COLOR;

      const middleX = canvas.width / 2;
      const middleY = canvas.height / 2;

      ctx.beginPath();

      ctx.moveTo(middleX - AIM_LENGTH, middleY);

      ctx.lineTo(middleX, middleY);

      ctx.moveTo(middleX + AIM_LENGTH, middleY);

      ctx.lineTo(middleX, middleY);

      ctx.moveTo(middleX, middleY + AIM_LENGTH);

      ctx.lineTo(middleX, middleY);

      ctx.moveTo(middleX, middleY - AIM_LENGTH);

      ctx.lineTo(middleX, middleY);

      ctx.stroke();

      // ctx.fillRect(
      //   (canvas.width / 2) - 2.5,
      //   (canvas.height / 2) - 2.5,
      //   5,
      //   5,
      // );

      // ctx.strokeRect(
      //   (canvas.width / 2) - 2.5,
      //   (canvas.height / 2) - 2.5,
      //   5,
      //   5,
      // );
    }

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window?.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: 'auto',
      }}>
      <canvas ref={ref} id="ui" />
    </div>
  );
};
