import React, { useEffect, useRef } from 'react';

const AIM_WIDTH = 3;
const AIM_LENGTH = 18;
const AIM_CENTER_DOT = 3;
const AIM_COLOR = 'rgba(107, 107, 107, 0.45)';
const AIM_CENTER_DOT_COLOR = 'rgba(107, 107, 107, 0.8)';

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

      ctx.strokeStyle = AIM_CENTER_DOT_COLOR;

      ctx.fillRect(
        middleX - AIM_CENTER_DOT / 2,
        middleY - AIM_CENTER_DOT / 2,
        AIM_CENTER_DOT,
        AIM_CENTER_DOT,
      );

      ctx.strokeRect(
        middleX - AIM_CENTER_DOT / 2,
        middleY - AIM_CENTER_DOT / 2,
        AIM_CENTER_DOT,
        AIM_CENTER_DOT,
      );
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
