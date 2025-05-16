import { useEffect, useState, useRef, useCallback } from 'react';

interface AnimatedBackgroundProps {
  imagePath: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
}

export function AnimatedBackground({ imagePath }: AnimatedBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [mouseSpeed, setMouseSpeed] = useState(0);
  const [clickRipples, setClickRipples] = useState<
    { x: number; y: number; size: number; opacity: number }[]
  >([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>(0);

  const hue = (mousePosition.x + 50) % 30;
  const colorShift = `hsla(${130 + hue}, 100%, 50%, 0.05)`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy) * 0.1;
      setMouseSpeed(Math.min(speed, 10));

      lastMousePos.current = { x: e.clientX, y: e.clientY };

      if (speed > 2) {
        addParticles(e.clientX, e.clientY, 1 + Math.floor(speed / 2));
      }

      setMousePosition({ x, y });
    };

    const handleMouseClick = (e: MouseEvent) => {
      const newRipple = {
        x: e.clientX,
        y: e.clientY,
        size: 0,
        opacity: 0.8,
      };

      setClickRipples(prev => [...prev, newRipple]);
      addParticles(e.clientX, e.clientY, 15);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);

    const timer = setTimeout(() => setIsLoaded(true), 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
      clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    // Skip canvas operations when running in test environment
    if (process.env.NODE_ENV === 'test') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life--;

        const opacity = (particle.life / particle.maxLife) * 0.7;

        ctx.fillStyle = `hsla(${145 + hue}, 100%, 70%, ${opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        if (particle.life <= 0) {
          particlesRef.current.splice(index, 1);
        }
      });

      const glowRadius = 100 + mouseSpeed * 5;
      const gradient = ctx.createRadialGradient(
        lastMousePos.current.x,
        lastMousePos.current.y,
        0,
        lastMousePos.current.x,
        lastMousePos.current.y,
        glowRadius,
      );
      gradient.addColorStop(0, `hsla(${145 + hue}, 100%, 50%, 0.3)`);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(
        lastMousePos.current.x,
        lastMousePos.current.y,
        glowRadius,
        0,
        Math.PI * 2,
      );
      ctx.fill();

      setClickRipples(prev =>
        prev
          .map(ripple => ({
            ...ripple,
            size: ripple.size + 10,
            opacity: ripple.opacity - 0.02,
          }))
          .filter(ripple => ripple.opacity > 0),
      );

      clickRipples.forEach(ripple => {
        ctx.strokeStyle = `hsla(${145 + hue}, 100%, 70%, ${ripple.opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.size, 0, Math.PI * 2);
        ctx.stroke();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [hue, clickRipples]);

  const addParticles = useCallback((x: number, y: number, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;

      particlesRef.current.push({
        x,
        y,
        size: Math.random() * 3 + 1,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        life: Math.random() * 40 + 20,
        maxLife: 60,
      });
    }
  }, []);

  return (
    <>
      <div
        className={`absolute inset-0 z-0 transform-gpu transition-opacity duration-2000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          perspective: '1500px',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${mousePosition.y * 0.08}deg) rotateY(${-mousePosition.x * 0.08}deg) scale(1.05)`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imagePath}
            alt="Animated background"
            className="w-full h-full object-cover animate-zoom-breathe"
            style={{
              transformOrigin: 'center',
              transform: `scale(1.1) translateX(${-mousePosition.x * 0.15}px) translateY(${-mousePosition.y * 0.15}px)`,
              transition: 'transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)',
            }}
            onLoad={() => setIsLoaded(true)}
          />

          <div
            className="absolute inset-0 bg-gradient-radial from-transparent to-black/40 mix-blend-overlay"
            style={{
              transform: `translateX(${mousePosition.x * 3}px) translateY(${mousePosition.y * 3}px)`,
              transition: 'transform 0.2s ease-out',
            }}
          ></div>

          <div
            className="absolute inset-0 backdrop-blur-[1px] animate-pulse-slow"
            style={{
              background: `linear-gradient(${130 + mousePosition.y}deg, rgba(255,255,255,0.03) 0%, ${colorShift} 50%, rgba(255,255,255,0.03) 100%)`,
              transform: `translateX(${-mousePosition.x * 0.5}px) translateY(${-mousePosition.y * 0.5}px)`,
            }}
          ></div>
        </div>
      </div>

      <div
        className="absolute inset-0 bg-[#001a11]/40 backdrop-blur-sm z-0"
        style={{
          transform: `translateZ(${10 + mousePosition.y * 0.2}px)`,
        }}
      ></div>

      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(${180 + mousePosition.y * 0.5}deg, rgba(0,26,17,0.6) 0%, rgba(1,31,20,0.5) 50%, rgba(0,26,17,0.6) 100%)`,
          transform: `translateZ(${5 + mousePosition.x * 0.1}px)`,
        }}
      ></div>

      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-[#00ff9d15] to-transparent"
            style={{
              left: `${(i + 1) * 15 + mousePosition.x * 0.2}%`,
              animation: `verticalLine 3s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              transform: `translateX(${mousePosition.x * (i * 0.05)}px)`,
            }}
          ></div>
        ))}
      </div>      <div className="absolute inset-0">
        <div
          className="absolute inset-0 animate-pulse-slow"
          style={{
            background: `radial-gradient(circle at ${50 + mousePosition.x * 0.5}% ${50 + mousePosition.y * 0.5}%, ${colorShift} 0%, transparent 70%)`,
          }}
        ></div>
      </div>

      {process.env.NODE_ENV !== 'test' && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-10 pointer-events-none"
        />
      )}
    </>
  );
}
