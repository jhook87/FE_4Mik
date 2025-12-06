'use client';

export default function ActFour() {
  const team = [
    {
      name: 'Yazan',
      title: 'Infrastructure Guru',
      description: 'Scaled deep-tech from zero to deployment.',
    },
    {
      name: 'John',
      title: 'Silicon Valley Builder',
      description: 'Shipping frontier systems at scale.',
    },
    {
      name: 'Justin',
      title: 'JSOC / CIA Veteran',
      description: 'Built for contested truth.',
    },
    {
      name: 'Zach',
      title: 'Navy SWCC',
      description: 'Implemented mesh networks under fire.',
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto z-10 w-full">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-hud font-bold mb-6 text-tungsten">
            THE OPERATORS
          </h2>
          <p className="text-xl md:text-2xl font-body text-tungsten/80 max-w-3xl mx-auto">
            Built by veterans and technologists who understand what&apos;s at stake.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {team.map((member, index) => (
            <div
              key={index}
              className="glass-panel rounded-lg p-8 hover:border-overmatch/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-overmatch to-verified flex items-center justify-center text-carbon-900 font-hud font-bold text-xl flex-shrink-0">
                  {member.name[0]}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-hud font-semibold mb-1 group-hover:text-overmatch transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-mono text-verified mb-3">
                    {member.title}
                  </p>
                  <p className="text-base text-tungsten/80 font-body">
                    {member.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button className="group relative px-8 py-4 bg-overmatch text-carbon-900 font-hud font-bold text-xl rounded hover:bg-verified transition-all duration-300 transform hover:scale-105">
            <span className="relative z-10">ESTABLISH CONTACT</span>
            <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-overmatch to-verified blur-xl"></div>
          </button>
          <p className="mt-4 text-sm font-mono text-tungsten/60">
            CLASSIFIED BRIEFINGS AVAILABLE FOR QUALIFIED OPERATORS
          </p>
        </div>
      </div>
    </section>
  );
}
