"use client";

import React, { useEffect, useRef } from "react";

export const DarkMeshBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawBackground();
    };

    const drawBackground = () => {
      if (!context) return;

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Set background to black
      context.fillStyle = "black";
      context.fillRect(0, 0, canvas.width, canvas.height);

      const spacing = 100; // Spacing between lines
      const fadeMargin = 150; // Distance from edges where lines fade
      const dashLength = 4; // Shorter dashes

      // Draw dashed grid
      context.setLineDash([dashLength, dashLength]); // Dashed pattern
      context.lineWidth = 0.5; // Thinner lines

      // Draw vertical lines
      for (let x = spacing; x < canvas.width; x += spacing) {
        const opacity = Math.min(
          1,
          Math.max(0, (x - fadeMargin) / (canvas.width - 2 * fadeMargin))
        );
        context.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
        context.beginPath();
        context.moveTo(x, fadeMargin);
        context.lineTo(x, canvas.height - fadeMargin);
        context.stroke();
      }

      // Draw horizontal lines
      for (let y = spacing; y < canvas.height; y += spacing) {
        const opacity = Math.min(
          1,
          Math.max(0, (y - fadeMargin) / (canvas.height - 2 * fadeMargin))
        );
        context.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
        context.beginPath();
        context.moveTo(fadeMargin, y);
        context.lineTo(canvas.width - fadeMargin, y);
        context.stroke();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0" />;
};
