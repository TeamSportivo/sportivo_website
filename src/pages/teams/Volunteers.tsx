
import React from 'react';
import CustomButton from '@/components/ui/CustomButton';

const Volunteers = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 mb-2">
                <span className="text-xs font-medium text-purple-500">TEAM</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Our Volunteers
              </h1>
              <p className="text-lg text-gray-600">
                The dedicated individuals who generously give their time and energy to make our events and activities successful.
              </p>
              <div className="pt-4">
                <CustomButton to="/contact">
                  Become a Volunteer
                </CustomButton>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-500/10 rounded-full -z-10" />
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80" 
                  alt="Volunteers team"
                  className="w-full hover-scale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Volunteer With Us?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
            Volunteering with Team Sportivo offers numerous benefits and opportunities for personal and professional growth.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl hover-scale">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Skill Development</h3>
              <p className="text-gray-600">Gain valuable experience and develop new skills in event management, leadership, and teamwork.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover-scale">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Networking</h3>
              <p className="text-gray-600">Connect with like-minded individuals, sports professionals, and industry experts.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl hover-scale">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Make a Difference</h3>
              <p className="text-gray-600">Contribute to the success of meaningful events and initiatives that impact the community.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <CustomButton to="/contact" variant="outline">
              Apply Today
            </CustomButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Volunteers;
