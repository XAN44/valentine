import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Calendar, ChevronDown } from "lucide-react";
import { Memory } from "../types";

const MEMORIES: Memory[] = [
  {
    id: 1,
    date: "จุดเริ่มต้น",
    title: "ไม่ได้ชอบกันตั้งแต่แรกเห็น",
    description: "แต่ยิ่งรู้จักนาน ยิ่งเห็นว่าเธอคือคนที่ฉันตามหาตลอด",
    image: "./photo_1.jpg",
  },
  {
    id: 2,
    date: "เดทแรก",
    title: "เธอบอกความคิดตรง ๆ",
    description: "ไม่เสแสร้ง ไม่แกล้งทำตัว ชอบความจริงใจแบบนี้",
    image: "./photo_2.jpg",
  },
  {
    id: 3,
    date: "ช่วงที่มีปัญหา",
    title: "เราเลือกที่จะคุยกัน ไม่หนี",
    description:
      "ความสัมพันธ์ที่ดีไม่ได้มาจากไม่เคยทะเลาะ แต่มาจากการแก้ไขด้วยกัน",
    image: "./photo_3.jpg",
  },
  {
    id: 4,
    date: "ปัจจุบัน",
    title: "เธอยังอ๋องอยู่เหมือนเดิม",
    description: "และฉันก็ยังชอบดูเธอทำเรื่องบ้า ๆ โดยไม่รู้ตัวว่าน่ารักแค่ไหน",
    image: "./photo_4.jpg",
  },
];

interface MemoryCardProps {
  memory: Memory;
  index: number;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleFlipCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <motion.div
        ref={ref}
        className={`flex items-center mb-16 w-full ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, type: "spring" }}
      >
        {/* Date Marker */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-rose-500 rounded-full border-4 border-pink-100 shadow-lg z-10 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>

        {/* Content */}
        <div
          className={`w-[45%] ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}
        >
          <motion.div
            className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-white/50 cursor-pointer"
            onClick={handleFlipCard}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-2">
              <Calendar className="w-3 h-3 inline mr-1" />
              {memory.date}
            </span>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {memory.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {memory.description}
            </p>
            <div className="overflow-hidden rounded-xl h-40 w-full relative group">
              <img
                src={memory.image}
                alt={memory.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <motion.div
                className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-rose-600 font-semibold flex items-center gap-1"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                >
                  👆
                </motion.span>
                คลิกเพื่อดูภาพเต็ม
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleFlipCard}
          >
            <motion.div
              className="relative w-full h-full flex items-center justify-center p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              {/* Full Image */}
              <img
                src={memory.image}
                alt={memory.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />

              {/* Close hint */}
              <motion.div
                className="absolute top-8 right-8 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-lg">✕</span>
                คลิกเพื่อปิด
              </motion.div>

              {/* Decorative hearts */}
              <motion.div
                className="absolute top-20 left-20 text-5xl"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                💕
              </motion.div>
              <motion.div
                className="absolute bottom-20 right-20 text-4xl"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, -10, 10, 0],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                💖
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface TimelineSceneProps {
  // No props needed anymore
}

export const TimelineScene: React.FC<TimelineSceneProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      className="h-full w-full relative flex flex-col items-center bg-white/20 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <div className="pt-10 pb-4 z-20 sticky top-0 bg-gradient-to-b from-pink-100/90 to-transparent w-full text-center">
        <motion.h2
          className="text-3xl font-serif-header text-rose-900"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          ช่วงเวลาที่ผ่านมา
        </motion.h2>
        <motion.p
          className="text-rose-700/60 text-sm animate-pulse flex items-center justify-center gap-1 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          เลื่อนลงไปซิคะอ้วน <ChevronDown className="w-4 h-4" />
        </motion.p>
      </div>

      <div
        ref={containerRef}
        className="w-full h-full overflow-y-auto overflow-x-hidden relative py-10 scroll-smooth px-4 md:px-0"
      >
        <div className="max-w-4xl mx-auto relative min-h-[120vh]">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-pink-200/50 rounded-full" />
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-400 to-pink-600 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.6)]"
          />

          {MEMORIES.map((m, i) => (
            <MemoryCard key={m.id} memory={m} index={i} />
          ))}

          {/* End of Timeline - Love Message */}
          <div className="flex justify-center mt-20 mb-32 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, type: "spring" }}
              className="text-center max-w-2xl"
            >
              {/* Main love message */}
              <motion.div
                className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-rose-200 mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="text-6xl mb-4"
                >
                  💕
                </motion.div>

                <h3 className="text-3xl font-bold text-rose-900 mb-4">
                  ถึงคนที่ฉันรัก
                </h3>

                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-lg">
                    ขอบคุณที่เข้ามาในชีวิต และทำให้ทุกวันมีความหมาย
                  </p>
                  <p className="text-base">
                    ไม่ว่าจะเป็นวันที่ดีหรือวันที่แย่ แค่มีเธออยู่ข้างๆ
                    มันก็ทำให้ทุกอย่างรู้สึกดีขึ้น
                  </p>
                  <p className="text-base">
                    เธออาจจะไม่สมบูรณ์แบบ ฉันก็เหมือนกัน
                    แต่เราสมบูรณ์แบบสำหรับกัน
                  </p>
                  <p className="text-xl font-semibold text-rose-700 mt-6">
                    รักเธอนะน้องอ้วนอีตึ้งผ้าเบรค ❤️
                  </p>
                  <p className="text-sm text-gray-500 italic mt-4">
                    Happy Valentine's Day 2026
                  </p>
                </div>
              </motion.div>

              {/* Floating hearts decoration */}
              <div className="flex justify-center gap-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                  className="text-3xl"
                >
                  💖
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                  className="text-4xl"
                >
                  💕
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                  className="text-3xl"
                >
                  💗
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
