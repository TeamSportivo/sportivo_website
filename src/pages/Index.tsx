
import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedTeams from '@/components/home/FeaturedTeams';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import SponsorShowcase from '@/components/home/SponsorShowcase';
import { Trophy, Users, Calendar, Award } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';

const Index = () => {
  const stats = [
    { 
      icon: <Trophy className="h-8 w-8 text-primary" />,
      value: "25+",
      label: "Championships Won"
    },
    { 
      icon: <Users className="h-8 w-8 text-primary" />,
      value: "500+",
      label: "Active Members"
    },
    { 
      icon: <Calendar className="h-8 w-8 text-primary" />,
      value: "120+",
      label: "Events Per Year"
    },
    { 
      icon: <Award className="h-8 w-8 text-primary" />,
      value: "15+",
      label: "Years of Excellence"
    }
  ];

  return (
    <>
      <Hero />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-6 text-center hover-scale"
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* <FeaturedTeams /> */}
      <UpcomingEvents />

      
      <section className="py-24 bg-primary clip-bottom">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Excellence in Every Movement</h2>
            <p className="text-xl opacity-90 mb-8">
              At Team Sportivo, we're dedicated to fostering talent, building character, and achieving greatness through sport.
            </p>
            <CustomButton 
              to="/about"
              variant="ghost"
              className="bg-white text-primary hover:bg-white/90 hover:text-primary"
              size="lg"
            >
              Discover Our Story
            </CustomButton>
          </div>
        </div>
      </section>
      
      <SponsorShowcase />
      
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-700 mix-blend-multiply" />
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&w=2000&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              mixBlendMode: "overlay"
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Our Team?</h2>
            <p className="text-xl opacity-90 mb-8">
              Whether you're an athlete looking to compete or a fan wanting to support, there's a place for you at Team Sportivo.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CustomButton 
                to="/contact"
                size="lg"
              >
                Join Today
              </CustomButton>
              <CustomButton 
                to="/events"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                size="lg"
              >
                Attend an Event
              </CustomButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
