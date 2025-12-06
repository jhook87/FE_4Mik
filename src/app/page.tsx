'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { useScroll } from 'framer-motion';
import dynamic from 'next/dynamic';
import ActOne from '@/components/acts/ActOne';
import ActTwo from '@/components/acts/ActTwo';
import ActThree from '@/components/acts/ActThree';
import ActFour from '@/components/acts/ActFour';

// Dynamically import MainScene to avoid SSR issues
const MainScene = dynamic(() => import('@/components/scene/MainScene'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-carbon-900 z-0" />,
});

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Calculate initial low power mode setting
  const initialLowPowerMode = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const nav = navigator as Navigator & { deviceMemory?: number };
    const hasLowMemory = !!(nav.deviceMemory && nav.deviceMemory < 4);
    return isMobile || hasLowMemory;
  }, []);
  
  const [lowPowerMode, setLowPowerMode] = useState(initialLowPowerMode);

  useEffect(() => {
    // Subscribe to scroll progress
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollProgress(latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <main className="relative">
      {/* Fixed 3D Background Scene */}
      <Suspense fallback={<div className="fixed inset-0 bg-carbon-900 z-0" />}>
        <MainScene scrollProgress={scrollProgress} lowPowerMode={lowPowerMode} />
      </Suspense>

      {/* Power Mode Toggle */}
      <button
        onClick={() => setLowPowerMode(!lowPowerMode)}
        className="fixed top-4 right-4 z-50 glass-panel rounded px-4 py-2 text-xs font-mono text-tungsten hover:text-overmatch transition-colors"
        title="Toggle graphics quality"
      >
        {lowPowerMode ? '⚡ LOW POWER' : '🎨 HIGH QUALITY'}
      </button>

      {/* Scrollable Content */}
      <div className="relative z-10">
        <ActOne />
        <ActTwo />
        <ActThree />
        <ActFour />
      </div>
    </main>
  );
}



