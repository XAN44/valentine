import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Calendar, ChevronDown, ArrowRight } from 'lucide-react';
import { Memory } from '../types';

const MEMORIES: Memory[] = [
  {
    id: 1,
    date: 'จุดเริ่มต้น',
    title: 'วันแรกที่เจอกัน',
    description: 'จำได้ไหมว่าวันนั้นท้องฟ้าสดใสแค่ไหน? วินาทีที่สายตาเราประสานกัน โลกทั้งใบก็เปลี่ยนไปตลอดกาล',
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: 2,
    date: 'เดทแรก',
    title: 'กาแฟแก้วโปรดกับคนโปรด',
    description: 'ความเขินอายในวันนั้น เปลี่ยนเป็นความอบอุ่นในวันนี้ ขอบคุณที่ยอมมาเจอกันนะ',
    image: 'https://picsum.photos/400/300?random=2'
  },
  {
    id: 3,
    date: 'วันเกิดเธอ',
    title: 'รอยยิ้มที่มีความสุขที่สุด',
    description: 'ปีนี้และปีต่อๆ ไป เค้าอยากเป็นคนถือเค้กให้เธอเป่าเทียนแบบนี้ตลอดไปเลย',
    image: 'https://picsum.photos/400/300?random=3'
  },
  {
    id: 4,
    date: 'การเดินทาง',
    title: 'ทุกที่คือที่พิเศษ',
    description: 'ไม่ว่าจะไปทะเลหรือภูเขา แค่มีเธอไปด้วย ทุกที่ก็กลายเป็นสถานที่ที่สวยงามที่สุด',
    image: 'https://picsum.photos/400/300?random=4'
  },
];

interface MemoryCardProps {
  memory: Memory;
  index: number;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className={`flex items-center mb-16 w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {/* Date Marker */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-rose-500 rounded-full border-4 border-pink-100 shadow-lg z-10 flex items-center justify-center">
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>

      {/* Content */}
      <div className={`w-[45%] ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow border border-white/50">
          <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-2">
            <Calendar className="w-3 h-3 inline mr-1" />
            {memory.date}
          </span>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{memory.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{memory.description}</p>
          <div className="overflow-hidden rounded-xl h-40 w-full relative group">
             <img 
              src={memory.image} 
              alt={memory.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface TimelineSceneProps {
  onNext: () => void;
}

export const TimelineScene: React.FC<TimelineSceneProps> = ({ onNext }) => {
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
        <h2 className="text-3xl font-serif-header text-rose-900">Timeline of Love</h2>
        <p className="text-rose-700/60 text-sm animate-pulse flex items-center justify-center gap-1 mt-2">
          Scroll Down <ChevronDown className="w-4 h-4" />
        </p>
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

          {/* End of Timeline Action */}
          <div className="flex justify-center mt-20 mb-32 relative z-20">
             <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onNext}
              className="bg-white text-rose-500 px-8 py-4 rounded-full shadow-xl font-bold text-lg flex items-center gap-2 border-2 border-rose-100 hover:bg-rose-50"
             >
               ไปเล่นเกมเก็บหัวใจกัน <ArrowRight className="w-5 h-5" />
             </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};