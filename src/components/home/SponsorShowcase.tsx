
import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../ui/CustomButton';

const SponsorShowcase = () => {
  const sponsors = [
    {
      id: 1,
      name: 'SportTech',
      category: 'Technology',
      logo: 'https://via.placeholder.com/200x80/f5f5f5/555555?text=SportTech'
    },
    {
      id: 2,
      name: 'AthleteGear',
      category: 'Equipment',
      logo: 'https://via.placeholder.com/200x80/f5f5f5/555555?text=AthleteGear'
    },
    {
      id: 3,
      name: 'FitnessPlus',
      category: 'Nutrition',
      logo: 'https://via.placeholder.com/200x80/f5f5f5/555555?text=FitnessPlus'
    },
    {
      id: 4,
      name: 'PerformancePro',
      category: 'Training',
      logo: 'https://via.placeholder.com/200x80/f5f5f5/555555?text=PerformancePro'
    },
    {
      id: 5,
      name: 'VitalHealth',
      category: 'Healthcare',
      logo: 'https://via.placeholder.com/200x80/f5f5f5/555555?text=VitalHealth'
    },
    {
      id: 6,
      name: 'SportWear',
      category: 'Apparel',
      logo: 'https://via.placeholder.com/200x80/f5f5f5/555555?text=SportWear'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Valued Sponsors</h2>
          <p className="text-gray-600">
            We partner with leading brands who share our vision of excellence and support our athletes.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sponsors.map((sponsor) => (
            <div 
              key={sponsor.id}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover-scale group"
            >
              <img 
                src={sponsor.logo} 
                alt={sponsor.name}
                className="h-12 object-contain mb-3 filter grayscale group-hover:filter-none transition-all duration-300"
              />
              <h3 className="text-sm font-medium text-gray-800">{sponsor.name}</h3>
              <p className="text-xs text-gray-500">{sponsor.category}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold mb-4">Become a Sponsor</h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Join our community of sponsors and support the next generation of athletes. 
            We offer various partnership opportunities for businesses of all sizes.
          </p>
          <CustomButton to="/sponsors">
            Partnership Opportunities
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default SponsorShowcase;
