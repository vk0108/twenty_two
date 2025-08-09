import React, { useEffect, useRef } from 'react';

const StarryBackground = ({ children }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const starsRef = useRef([]);
  const nebulaCloudsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeElements();
    };

    const initializeElements = () => {
      starsRef.current = [];
      nebulaCloudsRef.current = [];

      for (let i = 0; i < 200; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.005
        });
      }

      for (let i = 0; i < 5; i++) {
        nebulaCloudsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 200 + 100,
          color: Math.random() > 0.5 ? 'rgba(138, 43, 226, 0.1)' : 'rgba(75, 0, 130, 0.1)',
          drift: {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5
          }
        });
      }
    };

    const drawBackground = () => {
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, '#16213e');
      gradient.addColorStop(0.4, '#0f1b3c');
      gradient.addColorStop(1, '#0a0e27');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawNebula = () => {
      nebulaCloudsRef.current.forEach(cloud => {
        const gradient = ctx.createRadialGradient(
          cloud.x, cloud.y, 0,
          cloud.x, cloud.y, cloud.radius
        );
        gradient.addColorStop(0, cloud.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(cloud.x - cloud.radius, cloud.y - cloud.radius, 
                   cloud.radius * 2, cloud.radius * 2);
        
        cloud.x += cloud.drift.x;
        cloud.y += cloud.drift.y;
        
        if (cloud.x > canvas.width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.x < -cloud.radius) cloud.x = canvas.width + cloud.radius;
        if (cloud.y > canvas.height + cloud.radius) cloud.y = -cloud.radius;
        if (cloud.y < -cloud.radius) cloud.y = canvas.height + cloud.radius;
      });
    };

    const drawStars = () => {
      starsRef.current.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground();
      drawNebula();
      drawStars();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1
        }}
      />
      {children}
    </div>
  );
};

export default StarryBackground;
