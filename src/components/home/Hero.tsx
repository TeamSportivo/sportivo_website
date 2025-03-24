
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import CustomButton from '../ui/CustomButton';

const Hero = () => {
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const heroText = heroTextRef.current;
    if (heroText) {
      const text = heroText.innerText;
      heroText.innerHTML = '';
      
      // Add each letter wrapped in a span for animation
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.innerText = char;
        span.style.animationDelay = `${0.06 * index}s`;
        heroText.appendChild(span);
      });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 bg-gray-900">
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=2000&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay"
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10 py-20 mt-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 max-w-xl animate-reveal">
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-1 inline-flex items-center space-x-1 animate-reveal-delay-1">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-medium tracking-wider text-white">Play Fair. Win with Honor.</span>
            </div>
            
            <h1
              className="text-4xl md:text-6xl font-bold text-white "
            >
              Welcome to Team Sportivo
            </h1>
            
            <p className="text-lg text-white/90 animate-reveal-delay-2">
              The official sports club of FIEM, Kolkata.
              We nurture talent, forge champions, and create unforgettable sporting experiences.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-reveal-delay-3">
              <CustomButton 
                size="lg" 
                to="/contact"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                Join Our Team
              </CustomButton>
              
              <CustomButton 
                size="lg" 
                variant="outline" 
                to="/events"
                className="border-white text-white hover:bg-white/10 hover:border-white hover:text-white"
              >
                Upcoming Events
              </CustomButton>
            </div>
          </div>
          
          <div className="relative animate-reveal-delay-4 hidden md:block">
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-3xl transform rotate-3 scale-95 blur-2xl animate-pulse" style={{ animationDuration: '4s' }}></div>
              <img 
                src="https://images.unsplash.com/photo-1485395037613-e83d5c1f5290?auto=format&fit=crop&w=800&q=80" 
                alt="Athlete in action" 
                className="rounded-3xl object-cover h-full w-full hover-scale shadow-xl"
              />
              
              <div className="absolute -bottom-6 -left-6 glass rounded-xl p-4 shadow-lg animate-slide-up">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white">
                    <span className="font-bold">09</span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Years of Excellence</p>
                    <p className="text-white/70 text-xs">Since 2016</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 glass rounded-xl p-4 shadow-lg animate-slide-down">
                <div className="text-right">
                  <p className="text-white text-sm font-medium">College Champions</p>
                  <p className="text-white/70 text-xs">Multiple Sports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="/events" className="text-white opacity-50 hover:opacity-100 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M12 19L19 12M12 19L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
