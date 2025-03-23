
import React from 'react';
import CustomButton from '@/components/ui/CustomButton';

const Vibgyor = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 mb-2">
                <span className="text-xs font-medium text-orange-500">EVENT</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Vibgyor
              </h1>
              <p className="text-lg text-gray-600">
                A dynamic cultural and sports festival bringing together creative strategies and innovative techniques in competitive events.
              </p>
              <div className="pt-4">
                <CustomButton to="/events/vibgyor">
                  View Event Details
                </CustomButton>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-orange-500/10 rounded-full -z-10" />
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80" 
                  alt="Vibgyor event showcase"
                  className="w-full hover-scale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Event Highlights</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl hover-scale">
              <h3 className="text-xl font-bold mb-3">Cultural Showcase</h3>
              <p className="text-gray-600">Performances and exhibitions showcasing talents from across the country.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl hover-scale">
              <h3 className="text-xl font-bold mb-3">Sports Competitions</h3>
              <p className="text-gray-600">Variety of sports events catering to different skill levels and interests.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl hover-scale">
              <h3 className="text-xl font-bold mb-3">Creative Workshops</h3>
              <p className="text-gray-600">Hands-on sessions exploring the intersection of sports, art, and technology.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vibgyor;
