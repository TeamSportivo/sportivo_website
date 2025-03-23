
import React from 'react';
import { Tablet, Trophy, Zap, Star, Clock, Users } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';

const About = () => {
  const values = [
    {
      icon: <Trophy className="h-6 w-6 text-primary" />,
      title: 'Excellence',
      description: 'Striving for the highest standards in everything we do, from training to competition.'
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: 'Passion',
      description: 'Fueling our efforts with genuine enthusiasm and love for sports.'
    },
    {
      icon: <Star className="h-6 w-6 text-primary" />,
      title: 'Integrity',
      description: 'Upholding the highest ethical standards both on and off the field.'
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: 'Dedication',
      description: 'Committing to consistent effort and improvement through disciplined practice.'
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: 'Teamwork',
      description: 'Collaborating effectively to achieve common goals and support each other.'
    },
    {
      icon: <Tablet className="h-6 w-6 text-primary" />,
      title: 'Innovation',
      description: 'Embracing new techniques and approaches to enhance performance.'
    }
  ];
  
  const leadership = [
    {
      name: 'Alexandra Reynolds',
      position: 'Club President',
      bio: 'Former national champion with 15 years of professional experience. Alexandra brings strategic vision and passionate leadership to Team Sportivo.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Marcus Chen',
      position: 'Athletic Director',
      bio: 'Olympic gold medalist with expertise in athletic development and performance optimization. Marcus oversees all training programs.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Sophia Williams',
      position: 'Head Coach',
      bio: 'International coach with a track record of developing championship teams. Sophia specializes in tactical innovation and team dynamics.',
      image: 'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 mb-2">
                <span className="text-xs font-medium text-primary">OUR STORY</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                About Team Sportivo
              </h1>
              <p className="text-lg text-gray-600">
                Founded in 2009, Team Sportivo has grown from a small local club to a nationally recognized sports organization. 
                We're committed to athletic excellence, community engagement, and the personal development of our members.
              </p>
              <div className="pt-4">
                <CustomButton to="/contact">
                  Join Our Community
                </CustomButton>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full -z-10" />
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1526676037777-05a232554d77?auto=format&fit=crop&w=800&q=80" 
                  alt="Team Sportivo training session"
                  className="w-full hover-scale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* History Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Our Journey</h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute h-full w-0.5 bg-gray-200 left-1/2 transform -translate-x-1/2" />
            
            <div className="relative z-10">
              {/* 2009 */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="md:text-right md:pr-12 py-6">
                  <div className="inline-block md:float-right px-3 py-1 rounded-full bg-primary/10 mb-3">
                    <span className="text-xs font-medium text-primary">2009</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Foundation</h3>
                  <p className="text-gray-600">
                    Team Sportivo was established with just 15 members and a single coach, driven by a shared passion for sport.
                  </p>
                </div>
                <div className="md:hidden w-4 h-4 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-primary" style={{ top: '2.5rem' }} />
                <div className="md:pl-12 py-6">
                  <img 
                    src="https://images.unsplash.com/photo-1627466317303-254b15b96af6?auto=format&fit=crop&w=600&q=80" 
                    alt="Team Sportivo founding"
                    className="rounded-lg shadow-md hover-scale"
                  />
                </div>
              </div>
              
              {/* 2012 */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="md:order-2 md:text-left md:pl-12 py-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 mb-3">
                    <span className="text-xs font-medium text-primary">2012</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">First Championship</h3>
                  <p className="text-gray-600">
                    Our dedication paid off with our first regional championship, putting Team Sportivo on the map.
                  </p>
                </div>
                <div className="md:hidden w-4 h-4 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-primary" style={{ top: '14rem' }} />
                <div className="md:order-1 md:text-right md:pr-12 py-6">
                  <img 
                    src="https://images.unsplash.com/photo-1566936440394-681046e0e75c?auto=format&fit=crop&w=600&q=80" 
                    alt="First championship"
                    className="rounded-lg shadow-md hover-scale ml-auto"
                  />
                </div>
              </div>
              
              {/* 2015 */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <div className="md:text-right md:pr-12 py-6">
                  <div className="inline-block md:float-right px-3 py-1 rounded-full bg-primary/10 mb-3">
                    <span className="text-xs font-medium text-primary">2015</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">National Recognition</h3>
                  <p className="text-gray-600">
                    Team Sportivo became nationally recognized, partnering with elite sponsors and expanding our facilities.
                  </p>
                </div>
                <div className="md:hidden w-4 h-4 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-primary" style={{ top: '26rem' }} />
                <div className="md:pl-12 py-6">
                  <img 
                    src="https://images.unsplash.com/photo-1487466365202-1afdb86c764e?auto=format&fit=crop&w=600&q=80" 
                    alt="National recognition"
                    className="rounded-lg shadow-md hover-scale"
                  />
                </div>
              </div>
              
              {/* Present */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className="md:order-2 md:text-left md:pl-12 py-6">
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 mb-3">
                    <span className="text-xs font-medium text-primary">Present</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Global Presence</h3>
                  <p className="text-gray-600">
                    Today, Team Sportivo has over 500 members, international partnerships, and a commitment to developing the next generation of athletes.
                  </p>
                </div>
                <div className="md:hidden w-4 h-4 absolute left-1/2 transform -translate-x-1/2 rounded-full bg-primary" style={{ top: '38rem' }} />
                <div className="md:order-1 md:text-right md:pr-12 py-6">
                  <img 
                    src="https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=600&q=80" 
                    alt="Global presence"
                    className="rounded-lg shadow-md hover-scale ml-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-600">
              These principles guide every decision and action at Team Sportivo.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover-scale"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-gray-600">
              Meet the individuals who drive our vision forward and inspire excellence.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((person, index) => (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden hover-scale"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={person.image} 
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{person.name}</h3>
                  <p className="text-primary font-medium mb-3">{person.position}</p>
                  <p className="text-gray-600">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <CustomButton to="/contact" variant="outline">
              Contact Our Team
            </CustomButton>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Be Part of Our Story</h2>
            <p className="text-xl opacity-90 mb-8">
              Whether you're an athlete, coach, or supporter, there's a place for you at Team Sportivo.
            </p>
            <CustomButton 
              to="/contact"
              variant="ghost"
              className="bg-white text-primary hover:bg-white/90 hover:text-primary"
              size="lg"
            >
              Join Team Sportivo
            </CustomButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
