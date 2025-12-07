'use client';

export default function ActTwo() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto z-10">
        <div className="glass-panel rounded-lg p-8 md:p-12">
          <h2 className="text-5xl md:text-7xl font-hud font-bold mb-6 text-overmatch glow-cyan">
            OUR TECHNOLOGY
          </h2>
          
          <p className="text-xl md:text-2xl font-body text-tungsten mb-8 leading-relaxed">
            MerkleVining™ is our proprietary cryptographic protocol that creates an 
            <span className="text-verified font-semibold"> unbreakable chain of custody</span> from 
            the moment data is captured—with zero latency and no cloud dependency.
          </p>

          <div className="space-y-6">
            <p className="text-lg text-tungsten/80 font-body">
              We enable defense, government, and commercial organizations to verify the authenticity 
              of sensor data, communications, and digital intelligence in real-time—even in 
              denied, degraded, or contested environments.
            </p>

            {/* Process steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
              <div className="glass-panel rounded p-6 border-l-4 border-verified">
                <div className="text-sm font-mono text-verified mb-2">STEP 01</div>
                <h3 className="text-xl font-hud font-semibold mb-2">CAPTURE</h3>
                <p className="text-sm text-tungsten/70">
                  Data captured at sensor level with hardware-backed attestation
                </p>
              </div>

              <div className="glass-panel rounded p-6 border-l-4 border-overmatch">
                <div className="text-sm font-mono text-overmatch mb-2">STEP 02</div>
                <h3 className="text-xl font-hud font-semibold mb-2">VERIFY</h3>
                <p className="text-sm text-tungsten/70">
                  Cryptographic proof generated instantly at the edge
                </p>
              </div>

              <div className="glass-panel rounded p-6 border-l-4 border-tungsten">
                <div className="text-sm font-mono text-tungsten mb-2">STEP 03</div>
                <h3 className="text-xl font-hud font-semibold mb-2">ANCHOR</h3>
                <p className="text-sm text-tungsten/70">
                  Immutable record persists across the mesh network
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
