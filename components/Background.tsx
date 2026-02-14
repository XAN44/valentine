import React from 'react';
import { motion } from 'framer-motion';

const FloatingParticle = ({ delay, x, size }: { delay: number; x: number; size: number }) => (
  <motion.div
    className="absolute bg-white rounded-full opacity-60 blur-sm pointer-events-none"
    style={{ 
      width: size, 
      height: size, 
      left: `${x}%`,
      top: '110%' 
    }}
    animate={{
      y: '-120vh',
      opacity: [0, 0.8, 0],
      rotate: [0, 360],
    }}
    transition={{
      duration: 10 + Math.random() * 10,
      repeat: Infinity,
      delay: delay,
      ease: "linear",
    }}
  />
);

export const Background: React.FC = () => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 20,
    x: Math.random() * 100,
    size: 4 + Math.random() * 10,
  }));

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-gradient-to-br from-pink-200 via-rose-300 to-pink-400">
      {/* Soft Gradients */}
      <motion.div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-pink-400 rounded-full blur-[100px] opacity-40"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-400 rounded-full blur-[100px] opacity-30"
        animate={{ scale: [1, 1.3, 1], y: [0, -50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating Sparkles/Particles */}
      {particles.map((p) => (
        <FloatingParticle key={p.id} delay={p.delay} x={p.x} size={p.size} />
      ))}

      {/* Grid Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />
    </div>
  );
};