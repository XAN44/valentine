import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface IntroSceneProps {
  onStart: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ onStart }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full text-center p-6 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        className="bg-white/30 backdrop-blur-md p-8 rounded-[3rem] border border-white/50 shadow-xl max-w-md w-full"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-4 inline-flex items-center justify-center p-4 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-full shadow-lg"
        >
          <Heart className="w-12 h-12 text-white fill-current" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-serif-header text-rose-900 mb-2 drop-shadow-sm">
          Happy Valentine's
        </h1>
        <h2 className="text-xl md:text-2xl font-script text-rose-700 mb-8">
          Day My Love
        </h2>

   

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgb(244, 63, 94)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-full text-lg shadow-lg overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            เข้าสู่โลกของเรา
          </span>
          <motion.div 
            className="absolute inset-0 bg-white opacity-20"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
