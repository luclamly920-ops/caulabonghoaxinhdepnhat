import React, { useEffect, useRef } from 'react';

interface SakuraCanvasProps {
  enabled: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  opacity: number;
}

export const SakuraCanvas: React.FC<SakuraCanvasProps> = ({ enabled }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Color palette for sakura petals (summer soft pinks & white-pinks)
    const colors = [
      '#ffd1dc',
      '#fecdd3',
      '#fda4af',
      '#ffe4e6',
      '#fff1f2',
      '#fbcfe8',
    ];

    const petalCount = Math.min(36, Math.floor(width / 35));
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 11 + 9,
        speedX: Math.random() * 1.6 + 0.6,
        speedY: Math.random() * 1.5 + 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.01,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.45 + 0.5,
      });
    }

    const drawPetal = (p: Petal) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.scale(1, Math.cos(p.flip));
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      // Draw organic sakura petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size / 2, -p.size, 0, -p.size * 1.2);
      ctx.bezierCurveTo(p.size / 2, -p.size, p.size / 2, -p.size / 2, 0, 0);

      ctx.fillStyle = p.color;
      ctx.fill();

      // Delicate center vein
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.1);
      ctx.lineTo(0, -p.size * 0.7);
      ctx.strokeStyle = 'rgba(244, 114, 182, 0.4)';
      ctx.lineWidth = 0.75;
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // Gentle breeze oscillation
        p.x += Math.sin(p.y * 0.01) * 0.5;

        // Reset if off-screen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) {
          p.x = -20;
        }

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
};
