import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Wand2, RefreshCw } from 'lucide-react';
import { generateLovePoem } from '../services/geminiService';

export const LetterScene: React.FC = () => {
  const [poem, setPoem] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleGeneratePoem = async () => {
    setLoading(true);
    const text = await generateLovePoem();
    setPoem(text);
    setLoading(false);
    setRevealed(true);
  };

  return (
    <motion.div 
      className="h-full w-full flex items-center justify-center p-4 md:p-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center relative border border-white/60"
        initial={{ y: 50, rotateX: 10 }}
        animate={{ y: 0, rotateX: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        {/* Decorative Stamps/Stickers */}
        <Heart className="absolute -top-6 -right-6 w-16 h-16 text-rose-400 rotate-12 fill-rose-100 drop-shadow-md" />
        <Sparkles className="absolute -bottom-4 -left-4 w-12 h-12 text-yellow-400 -rotate-12" />

        <h2 className="text-3xl md:text-4xl font-serif-header text-rose-900 mb-6">
          ถึง คนดีของเค้า
        </h2>

        <div className="prose prose-pink mx-auto text-lg text-gray-700 leading-relaxed mb-8 font-light">
          <p>
            ขอบคุณที่อยู่ข้างกันมาตลอดนะ ทุกช่วงเวลาที่มีเธอคือช่วงเวลาที่พิเศษที่สุด 
            เหมือนเกม Infinity Nikki ที่มีชุดสวยๆ ให้เก็บสะสมไม่รู้จบ 
            ความรักของเค้าที่มีให้เธอก็จะเพิ่มขึ้นเรื่อยๆ แบบ Infinity เหมือนกัน
          </p>
          <p>
            สุขสันต์วันวาเลนไทน์นะครับ
          </p>
        </div>

        {/* AI Poem Section */}
        <div className="min-h-[150px] flex flex-col items-center justify-center mb-6 p-6 bg-pink-50/50 rounded-xl border border-pink-100">
          {loading ? (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <RefreshCw className="w-8 h-8 text-rose-400" />
            </motion.div>
          ) : revealed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-rose-800 font-script text-2xl md:text-3xl italic"
            >
              "{poem}"
            </motion.div>
          ) : (
             <p className="text-gray-400 text-sm italic">กดปุ่มด้านล่างเพื่อให้เวทมนตร์แห่งรักทำงาน...</p>
          )}
        </div>

        <motion.button
          onClick={handleGeneratePoem}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 mx-auto disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {revealed ? <RefreshCw className="w-5 h-5" /> : <Wand2 className="w-5 h-5" />}
          {revealed ? "แต่งกลอนใหม่" : "เสกกลอนรักด้วย AI"}
        </motion.button>

        <div className="mt-8 text-xs text-rose-300">
          Made with ❤️ for You
        </div>
      </motion.div>
    </motion.div>
  );
};