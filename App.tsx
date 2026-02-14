import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Background } from './components/Background';
import { IntroScene } from './components/IntroScene';
import { TimelineScene } from './components/TimelineScene';
import { GameScene } from './components/GameScene';
import { LetterScene } from './components/LetterScene';
import { AppScene } from './types';

const App: React.FC = () => {
  const [scene, setScene] = useState<AppScene>(AppScene.INTRO);

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden text-gray-800">
      {/* Global Background */}
      <Background />

      {/* Scene Manager */}
      <AnimatePresence mode="wait">
        {scene === AppScene.INTRO && (
          <IntroScene key="intro" onStart={() => setScene(AppScene.TIMELINE)} />
        )}
        
        {scene === AppScene.TIMELINE && (
          <TimelineScene key="timeline" onNext={() => setScene(AppScene.GAME)} />
        )}

        {scene === AppScene.GAME && (
          <GameScene key="game" onWin={() => setScene(AppScene.LETTER)} />
        )}

        {scene === AppScene.LETTER && (
          <LetterScene key="letter" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;