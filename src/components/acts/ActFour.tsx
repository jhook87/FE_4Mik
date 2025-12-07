'use client';

export default function ActFour() {
  const team = [
    {
      name: 'Yazan',
      title: 'Co-Founder & CTO',
      description: 'Deep-tech infrastructure expert. Built scalable systems from concept to deployment.',
    },
    {
      name: 'John',
      title: 'Co-Founder & CEO',
      description: 'Silicon Valley veteran. Brings frontier technology to market at scale.',
    },
    {
      name: 'Justin',
      title: 'Co-Founder & Chief Security Officer',
      description: 'JSOC / CIA background. Architecting solutions for high-stakes environments.',
    },
    {
      name: 'Zach',
      title: 'Co-Founder & VP Engineering',
      description: 'Navy SWCC. Field-tested networking and communications systems.',
    },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-6xl mx-auto z-10 w-full">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-hud font-bold mb-6 text-tungsten">
            OUR TEAM
          </h2>
          <p className="text-xl md:text-2xl font-body text-tungsten/80 max-w-3xl mx-auto">
            Founded by veterans and technologists with deep expertise in defense, 
            intelligence, and distributed systems.
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
          <button 
            className="group relative px-8 py-4 bg-overmatch text-carbon-900 font-hud font-bold text-xl rounded hover:bg-verified transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              // This would typically link to a contact form or scheduling system
              window.location.href = 'mailto:contact@4mik.com?subject=Partnership%20Inquiry';
            }}
            aria-label="Contact 4MIK team for partnership opportunities"
          >
            <span className="relative z-10">GET IN TOUCH</span>
            <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-overmatch to-verified blur-xl"></div>
          </button>
          <p className="mt-4 text-sm font-mono text-tungsten/60">
            PARTNERING WITH DEFENSE, GOVERNMENT, AND ENTERPRISE ORGANIZATIONS
          </p>
        </div>
      </div>
    </section>
  );
}
