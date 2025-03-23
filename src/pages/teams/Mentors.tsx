
import React, { useState, useEffect } from 'react';
import { fetchImagesFromFolder } from '@/utils/storageUtils';
import { toast } from 'sonner';

interface Mentor {
  imageSrc: string;
  name: string;
  specialization: string;
  description: string;
}

const Mentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMentorImages = async () => {
      setLoading(true);
      try {
        // Fetch images from the teams/mentors folder in Firebase Storage
        const fetchedImages = await fetchImagesFromFolder('teams/mentors');
        
        // Map the images to mentors with default data
        const mentorsList: Mentor[] = fetchedImages.map((img, index) => ({
          imageSrc: img.src,
          name: img.alt || `Dr. Mentor ${index + 1}`,
          specialization: "Sports Management",
          description: "Over 15 years of experience in sports management and coaching elite athletes."
        }));
        
        setMentors(mentorsList);
      } catch (error) {
        console.error("Failed to load mentor images:", error);
        toast.error("Failed to load mentor data. Please try again later.");
        // Set some fallback data
        setMentors([1, 2, 3, 4].map(item => ({
          imageSrc: `https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 40}.jpg`,
          name: `Dr. Mentor ${item}`,
          specialization: "Sports Management",
          description: "Over 15 years of experience in sports management and coaching elite athletes."
        })));
      } finally {
        setLoading(false);
      }
    };
    
    loadMentorImages();
  }, []);

  return (
    <div className="pt-20">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 mb-2">
              <span className="text-xs font-medium text-green-500">GUIDANCE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Our Mentors
            </h1>
            <p className="text-lg text-gray-600">
              Meet the experienced professionals who guide and inspire our team with their expertise and wisdom.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-12">
              {mentors.map((mentor, index) => (
                <div key={index} className="flex bg-white p-6 rounded-xl shadow-sm hover-scale">
                  <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 mr-6">
                    <img 
                      src={mentor.imageSrc}
                      alt={mentor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{mentor.name}</h3>
                    <p className="text-green-500 font-medium mb-3">{mentor.specialization}</p>
                    <p className="text-gray-600 mb-3">{mentor.description}</p>
                    <div className="flex gap-3">
                      <a href="#" className="text-primary hover:text-primary/80">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z"/>
                        </svg>
                      </a>
                      <a href="#" className="text-blue-600 hover:text-blue-700">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Mentors;
