import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Diamond, ShieldAlert, Trophy } from 'lucide-react';
import { GameItem } from '../types';

interface GameSceneProps {
  onWin: () => void;
}

const GAME_DURATION = 30; // seconds
const WIN_SCORE = 1500;

export const GameScene: React.FC<GameSceneProps> = ({ onWin }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [items, setItems] = useState<GameItem[]>([]);
  const [playerX, setPlayerX] = useState(50); // percentage
  
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);
  const lastSpawnRef = useRef<number>(0);

  // Handle Player Movement
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (gameState !== 'playing' || !containerRef.current) return;
    
    let clientX;
    if ('touches' in e) {
        clientX = e.touches[0].clientX;
    } else {
        clientX = (e as React.MouseEvent).clientX;
    }

    const { left, width } = containerRef.current.getBoundingClientRect();
    const newX = ((clientX - left) / width) * 100;
    setPlayerX(Math.max(5, Math.min(95, newX)));
  };

  // Game Loop
  const updateGame = useCallback((time: number) => {
    if (gameState !== 'playing') return;

    // Spawn Items
    if (time - lastSpawnRef.current > 600) { // Spawn every 600ms
      const typeRand = Math.random();
      let type: 'heart' | 'gem' | 'bomb' = 'heart';
      if (typeRand > 0.8) type = 'bomb';
      else if (typeRand > 0.6) type = 'gem';

      const newItem: GameItem = {
        id: time,
        x: Math.random() * 90 + 5,
        y: -10,
        type,
        speed: type === 'gem' ? 0.8 : type === 'bomb' ? 0.9 : 0.6
      };
      setItems(prev => [...prev, newItem]);
      lastSpawnRef.current = time;
    }

    // Move Items & Check Collision
    setItems(prevItems => {
        return prevItems.map(item => ({
            ...item,
            y: item.y + item.speed
        })).filter(item => {
            // Collision Detection
            const playerY = 85; // Fixed player Y position (%)
            const hitY = item.y > 80 && item.y < 92;
            const hitX = Math.abs(item.x - playerX) < 10; // Simple horizontal range

            if (hitY && hitX) {
                if (item.type === 'heart') setScore(s => s + 100);
                if (item.type === 'gem') setScore(s => s + 300);
                if (item.type === 'bomb') setScore(s => Math.max(0, s - 200));
                return false; // Remove item
            }
            return item.y < 110; // Remove if off screen
        });
    });

    requestRef.current = requestAnimationFrame(updateGame);
  }, [gameState, playerX]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(requestRef.current);
  }, [updateGame]);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameState(score >= WIN_SCORE ? 'won' : 'lost');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState, score]);

  // Auto-win transition
  useEffect(() => {
      if (gameState === 'won') {
          setTimeout(onWin, 2000); // Wait 2s then go to next scene
      }
  }, [gameState, onWin]);

  return (
    <motion.div 
      className="h-full w-full relative overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-900 cursor-none touch-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {/* UI HUD */}
      <div className="absolute top-4 left-4 right-4 flex justify-between z-20 text-white font-bold text-xl font-mono">
        <div className="bg-black/30 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md">
            Score: {score} / {WIN_SCORE}
        </div>
        <div className="bg-black/30 px-4 py-2 rounded-full border border-white/20 backdrop-blur-md flex items-center gap-2">
            Time: {timeLeft}s
        </div>
      </div>

      {/* Background Aesthetic */}
      <div className="absolute inset-0 z-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-[80px] opacity-40"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-500 rounded-full blur-[80px] opacity-40"></div>
      </div>

      {/* Game Items */}
      <AnimatePresence>
        {items.map(item => (
            <motion.div
                key={item.id}
                className="absolute"
                style={{ 
                    left: `${item.x}%`, 
                    top: `${item.y}%`,
                    x: '-50%'
                }}
            >
                {item.type === 'heart' && <Heart className="w-8 h-8 text-pink-400 fill-pink-400 drop-shadow-lg" />}
                {item.type === 'gem' && <Diamond className="w-8 h-8 text-cyan-300 fill-cyan-300 drop-shadow-[0_0_10px_cyan]" />}
                {item.type === 'bomb' && <ShieldAlert className="w-8 h-8 text-gray-800 fill-red-500" />}
            </motion.div>
        ))}
      </AnimatePresence>

      {/* Player Character (Basket/Avatar) */}
      <motion.div
        className="absolute bottom-[10%] z-10 flex flex-col items-center"
        style={{ left: `${playerX}%` }}
        animate={{ x: '-50%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="relative">
            {/* Simple styling for 'character' feeling */}
            <div className="w-16 h-16 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.6)] flex items-center justify-center border-4 border-pink-300">
                <Heart className="w-8 h-8 text-rose-500" />
            </div>
            <div className="absolute -top-6 -right-2 rotate-12">
                <div className="w-6 h-6 bg-yellow-300 rounded-full blur-sm opacity-80" />
            </div>
        </div>
        <div className="w-12 h-2 bg-black/20 rounded-full blur-sm mt-4" />
      </motion.div>

      {/* Game Over / Win Screens */}
      {gameState !== 'playing' && (
        <motion.div 
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="text-center bg-white p-8 rounded-3xl shadow-2xl max-w-sm mx-4">
                {gameState === 'won' ? (
                    <>
                        <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-rose-600 mb-2">You Win!</h2>
                        <p className="text-gray-600">เก็บความรักได้ครบถ้วนเลย!</p>
                        <p className="text-sm text-gray-400 mt-4">กำลังไปหน้าถัดไป...</p>
                    </>
                ) : (
                    <>
                        <ShieldAlert className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-600 mb-2">Try Again</h2>
                        <p className="text-gray-500 mb-6">ยังเก็บความรักไม่พอ ลองใหม่นะ</p>
                        <button 
                            onClick={() => {
                                setScore(0);
                                setTimeLeft(GAME_DURATION);
                                setItems([]);
                                setGameState('playing');
                            }}
                            className="bg-rose-500 text-white px-6 py-2 rounded-full font-bold hover:bg-rose-600"
                        >
                            เริ่มใหม่
                        </button>
                    </>
                )}
            </div>
        </motion.div>
      )}

      {/* Start Overlay Hint */}
      {gameState === 'playing' && timeLeft > GAME_DURATION - 2 && (
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold drop-shadow-lg whitespace-nowrap z-50 pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0], scale: 1.5 }}
            transition={{ duration: 1.5 }}
          >
              Collect Hearts & Gems!
          </motion.div>
      )}
    </motion.div>
  );
};