
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CustomButton from '../ui/CustomButton';

const FeaturedTeams = () => {
  const teams = [
    {
      id: 'xaplotes',
      name: 'Xaplotes',
      description: 'Our premier team specializing in high-intensity tactical sports, known for their precision and teamwork.',
      stats: [
        { label: 'Championships', value: '7' },
        { label: 'Team Members', value: '25' },
        { label: 'Founded', value: '2010' },
      ],
      image: 'https://images.unsplash.com/photo-1526232686172-8ac86591661f?auto=format&fit=crop&w=800&q=80',
      color: 'from-blue-600 to-indigo-800',
      path: '/xaplotes'
    },
    {
      id: 'vibgyor',
      name: 'Vibgyor',
      description: 'A dynamic team bringing creative strategies and innovative techniques to competitive sports.',
      stats: [
        { label: 'Championships', value: '5' },
        { label: 'Team Members', value: '22' },
        { label: 'Founded', value: '2012' },
      ],
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80',
      color: 'from-orange-500 to-red-600',
      path: '/vibgyor'
    }
  ];

  return (
    <section id="featured-teams" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Elite Teams</h2>
          <p className="text-gray-600">
            Meet the exceptional teams that represent Team Sportivo in competitions around the world.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {teams.map((team, index) => (
            <div 
              key={team.id}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover-scale transition-all duration-500"
            >
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${team.color} opacity-90 group-hover:opacity-95 transition-opacity`}
              />
              
              <div className="absolute inset-0">
                <img 
                  src={team.image} 
                  alt={team.name}
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
              </div>
              
              <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{team.name}</h3>
                <p className="text-white/90 mb-6">{team.description}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {team.stats.map((stat, idx) => (
                    <div key={idx} className="glass rounded-lg px-3 py-4 text-center">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-white/80">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <Link 
                  to={team.path}
                  className="mt-auto inline-flex items-center gap-2 text-white group/link"
                >
                  <span className="font-medium">Learn more</span>
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <CustomButton 
            to="/about"
            variant="outline"
            className="mx-auto"
          >
            Discover All Our Teams
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTeams;
