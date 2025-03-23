
import React from 'react';
import CustomButton from '@/components/ui/CustomButton';

const Xaplotes = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600/10 mb-2">
                <span className="text-xs font-medium text-blue-600">EVENT</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Xaplotes
              </h1>
              <p className="text-lg text-gray-600">
                Our premier sports event featuring high-intensity tactical competitions, showcasing precision and teamwork.
              </p>
              <div className="pt-4">
                <CustomButton to="/events/xaplotes">
                  View Event Details
                </CustomButton>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-600/10 rounded-full -z-10" />
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1526232686172-8ac86591661f?auto=format&fit=crop&w=800&q=80" 
                  alt="Xaplotes event showcase"
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
              <h3 className="text-xl font-bold mb-3">Competitive Tournaments</h3>
              <p className="text-gray-600">Multi-level tournaments featuring teams from various colleges and universities.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl hover-scale">
              <h3 className="text-xl font-bold mb-3">Interactive Sessions</h3>
              <p className="text-gray-600">Workshops and interactive sessions with sports professionals and industry experts.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl hover-scale">
              <h3 className="text-xl font-bold mb-3">Networking Opportunities</h3>
              <p className="text-gray-600">Connect with sports enthusiasts, professionals, and scouts from across the region.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Xaplotes;
