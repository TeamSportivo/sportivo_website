
import React from 'react';
import { Check, Zap, Trophy, Award, Star } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';

const Sponsors = () => {
  const sponsors = [
    {
      id: 1,
      name: 'SportTech',
      category: 'Technology',
      logo: 'https://via.placeholder.com/300x150/f5f5f5/555555?text=SportTech',
      level: 'Platinum',
      description: 'Our main technology provider enhancing athlete performance with cutting-edge devices.'
    },
    {
      id: 2,
      name: 'AthleteGear',
      category: 'Equipment',
      logo: 'https://via.placeholder.com/300x150/f5f5f5/555555?text=AthleteGear',
      level: 'Gold',
      description: 'Supplying high-quality sports equipment for all our team members.'
    },
    {
      id: 3,
      name: 'FitnessPlus',
      category: 'Nutrition',
      logo: 'https://via.placeholder.com/300x150/f5f5f5/555555?text=FitnessPlus',
      level: 'Silver',
      description: 'Providing nutritional support and dietary planning for peak performance.'
    },
    {
      id: 4,
      name: 'PerformancePro',
      category: 'Training',
      logo: 'https://via.placeholder.com/300x150/f5f5f5/555555?text=PerformancePro',
      level: 'Gold',
      description: 'Supporting our training programs with specialized coaching methodologies.'
    }
  ];
  
  const plans = [
    {
      name: 'Bronze Partner',
      price: '1,000',
      features: [
        'Logo on website',
        'Social media mention',
        'Brand visibility at events',
      ],
      icon: <Star className="h-5 w-5" />,
      color: 'bg-amber-600/90'
    },
    {
      name: 'Silver Partner',
      price: '5,000',
      features: [
        'Logo on website',
        'Social media campaigns',
        'Brand visibility at events',
        'Logo on team gear',
        'Event participation'
      ],
      icon: <Award className="h-5 w-5" />,
      color: 'bg-gray-400/90'
    },
    {
      name: 'Gold Partner',
      price: '10,000',
      popular: true,
      features: [
        'Premium logo placement',
        'Dedicated social media campaigns',
        'VIP access to all events',
        'Logo on team gear',
        'Event participation',
        'Team member meet & greet',
        'Co-branded merchandise'
      ],
      icon: <Trophy className="h-5 w-5" />,
      color: 'bg-amber-400/90'
    },
    {
      name: 'Platinum Partner',
      price: '25,000',
      features: [
        'Exclusive logo placement',
        'Full marketing integration',
        'VIP access to all events',
        'Custom branded team gear',
        'Named sponsorship of events',
        'Exclusive team access',
        'Co-branded merchandise',
        'Custom promotion opportunities'
      ],
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-slate-800/90'
    }
  ];

  return (
    <div className="pt-20">
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Our Sponsors</h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
            We're proud to partner with these organizations who support our mission of athletic excellence.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {sponsors.map((sponsor) => (
              <div 
                key={sponsor.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover-scale group p-6 flex flex-col md:flex-row items-center gap-6"
              >
                <div className="w-full md:w-1/3 flex justify-center">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="h-16 md:h-20 object-contain filter grayscale group-hover:filter-none transition-all duration-300"
                  />
                </div>
                
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 mb-2">
                    <span className="text-xs font-medium text-primary">{sponsor.level} SPONSOR</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{sponsor.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{sponsor.category}</p>
                  <p className="text-gray-600">{sponsor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Become a Sponsor</h2>
            <p className="text-gray-600">
              Partner with Team Sportivo and align your brand with excellence, dedication, and success.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`rounded-xl overflow-hidden transition-transform duration-300 hover:-translate-y-2 ${
                  plan.popular ? 'ring-2 ring-primary shadow-lg' : 'shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white py-2 text-center text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className="bg-white p-6">
                  <div className={`w-12 h-12 rounded-full ${plan.color} text-white flex items-center justify-center mb-4`}>
                    {plan.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">₹{plan.price}</span>
                    <span className="text-gray-600">/year</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <CustomButton 
                    to="/contact"
                    variant={plan.popular ? 'primary' : 'outline'}
                    className="w-full"
                  >
                    Become a {plan.name}
                  </CustomButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">Custom Sponsorship Packages</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Looking for a unique partnership opportunity? Contact us to discuss a custom sponsorship package tailored to your brand's goals.
          </p>
          <CustomButton 
            to="/contact"
            variant="ghost"
            className="bg-white text-primary hover:bg-white/90 hover:text-primary"
          >
            Contact Us
          </CustomButton>
        </div>
      </section>
    </div>
  );
};

export default Sponsors;
