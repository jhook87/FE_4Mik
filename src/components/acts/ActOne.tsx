'use client';

export default function ActOne() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center z-10">
        <h1 
          className="text-6xl md:text-8xl font-hud font-bold mb-8 glitch-text glow-cyan"
          data-text="TRUST IN CONTESTED ENVIRONMENTS."
        >
          TRUST IN CONTESTED ENVIRONMENTS.
        </h1>
        
        <p className="text-xl md:text-2xl font-body text-tungsten/80 mb-4">
          4MIK delivers cryptographic verification at the edge.
        </p>
        
        <p className="text-lg md:text-xl font-body text-tungsten/60 max-w-2xl mx-auto">
          We build firmware and software solutions that establish unbreakable chains 
          of custody for mission-critical data—from capture to command.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm font-mono text-overmatch">SCROLL</span>
          <svg 
            className="w-6 h-6 text-overmatch" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
