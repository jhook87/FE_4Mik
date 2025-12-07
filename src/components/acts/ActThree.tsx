'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';
import TheBox from '../scene/TheBox';

interface ActThreeContentProps {
  explodeProgress: MotionValue<number>;
}

function ActThreeContent({ explodeProgress }: ActThreeContentProps) {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-4 py-20 gap-8">
      {/* 3D Box Canvas */}
      <div className="w-full md:w-1/2 h-[400px] md:h-[600px] z-10">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D4FF" />
          <Suspense fallback={null}>
            <TheBox explodeProgress={explodeProgress} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="w-full md:w-1/2 max-w-xl z-10">
        <div className="glass-panel rounded-lg p-8 md:p-10">
          <h2 className="text-4xl md:text-6xl font-hud font-bold mb-6 text-overmatch glow-cyan">
            OUR SOLUTIONS
          </h2>
          
          <p className="text-lg md:text-xl font-body text-tungsten mb-6 leading-relaxed">
            We provide <span className="text-verified font-semibold">drop-in firmware</span> and 
            software integration for existing hardware platforms—no rip-and-replace required.
          </p>

          <p className="text-base text-tungsten/80 font-body mb-8">
            From ISR and reconnaissance systems to maritime navigation, autonomous platforms, 
            and tactical networks—4MIK enables trust and verification at scale across 
            defense, intelligence, and commercial applications.
          </p>

          {/* Spec badges */}
          <div className="flex flex-wrap gap-3">
            <div className="glass-panel rounded px-4 py-2 border border-overmatch/30">
              <span className="text-sm font-mono text-overmatch">NMEA 0183</span>
            </div>
            <div className="glass-panel rounded px-4 py-2 border border-overmatch/30">
              <span className="text-sm font-mono text-overmatch">AIS</span>
            </div>
            <div className="glass-panel rounded px-4 py-2 border border-overmatch/30">
              <span className="text-sm font-mono text-overmatch">TPM 2.0</span>
            </div>
            <div className="glass-panel rounded px-4 py-2 border border-verified/30">
              <span className="text-sm font-mono text-verified">FIPS 140-3</span>
            </div>
            <div className="glass-panel rounded px-4 py-2 border border-verified/30">
              <span className="text-sm font-mono text-verified">ITAR Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ActThree() {
  const { scrollYProgress } = useScroll();
  
  // Map scroll progress to explosion progress (Act 3 is around 0.5-0.75 of total scroll)
  const explodeProgress = useTransform(scrollYProgress, [0.5, 0.75], [0, 1]);

  return <ActThreeContent explodeProgress={explodeProgress} />;
}
