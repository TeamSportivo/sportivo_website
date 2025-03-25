import React, { useState, useEffect } from 'react';
import { fetchImagesFromFolder } from '@/utils/storageUtils';
import { toast } from 'sonner';

interface Mentor {
  imageSrc: string;
  name: string;
  position: string;
}

const Mentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMentorImages = async () => {
      setLoading(true);
      try {
        // Fetch images from the teams/mentors folder in Firebase Storage
        const fetchedImages = await fetchImagesFromFolder('images/teams/Mentor');
        
        // Map the images to mentors with placeholder data
        const mentorsList: Mentor[] = [
          { name: "Satwik Dey", position: "Vice President" },
          { name: "Debarati Bose", position: "Vice President" },
          { name: "Tuhin Subhra Nath", position: "Sports Head" },
          { name: "Akash Halder", position: "Cricket Head" },
          { name: "Moulik Mitra", position: "Cricket Head" },
          { name: "Souvik Das", position: "Football Head" },
          { name: "Debkiran Banerjee", position: "Football Head" },
          { name: "Arittra Chatterjee", position: "Football Head" },
          { name: "Dipro Chowdhury", position: "Football Head" },
          { name: "Kaustav Bhattacharjee", position: "Marketing Head" },
          { name: "Anwesha Neogi", position: "Marketing Head" },
          { name: "Shreya Bhattacharya", position: "Chess Head" },
          { name: "Saibesh Dutta", position: "Badminton Head" },
          { name: "Rohit Chattopadhyay", position: "Chess Head" },
          { name: "Agniswar Banerjee", position: "Table Tennis Head" },
          { name: "Akash Hazra", position: "Graphics Head" },
          { name: "Shreyan Dey", position: "Graphics Head" },
          { name: "Utsav Roy", position: "Photography Head" },
          { name: "Pabitra Ray", position: "Graphics Head" },
          { name: "Ankita Mondal", position: "Marketing Head" }
        ].map((mentor, index) => ({
          ...mentor,
          imageSrc: fetchedImages[index]?.src || `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${41 + index}.jpg`
        }));
        
        setMentors(mentorsList);
      } catch (error) {
        console.error("Failed to load mentor images:", error);
        toast.error("Failed to load mentor images. Using placeholder images.");
        
        // Fallback to placeholder images
        const fallbackMentors = [
          { name: "Kaustav Bhattacharjee", position: "Marketing Head" },
          { name: "Dr. Sarah Wilson", position: "Sports Director" },
          { name: "Prof. Michael Chen", position: "Technical Advisor" },
          { name: "Dr. Emily Brown", position: "Sports Psychology" },
          { name: "Dr. James Anderson", position: "Physical Training" },
          { name: "Dr. Maria Rodriguez", position: "Nutrition Expert" },
          { name: "Prof. David Kim", position: "Performance Coach" },
          { name: "Dr. Lisa Thompson", position: "Sports Medicine" },
          { name: "Dr. Robert Taylor", position: "Athletic Director" },
          { name: "Dr. Anna Martinez", position: "Team Coordinator" },
          { name: "Prof. Thomas Clark", position: "Strategy Advisor" },
          { name: "Dr. Rachel Patel", position: "Fitness Specialist" },
          { name: "Dr. William Lee", position: "Sports Therapist" },
          { name: "Prof. Jessica White", position: "Training Coordinator" },
          { name: "Dr. Daniel Garcia", position: "Wellness Coach" },
          { name: "Dr. Sophie Turner", position: "Mental Health Specialist" },
          { name: "Prof. Andrew Wilson", position: "Sports Analytics" },
          { name: "Dr. Michelle Park", position: "Recovery Specialist" },
          { name: "Dr. Nemo", position: "Recovery Specialist" },
          { name: "Dr. Christopher Lee", position: "Team Physician" }
        ].map((mentor, index) => ({
          ...mentor,
          imageSrc: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'men' : 'women'}/${41 + index}.jpg`
        }));
        
        setMentors(fallbackMentors);
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Our Mentors
            </h1>
            <p className="text-lg text-gray-600">
              Meet our experienced mentors who guide and inspire our team with their expertise and dedication.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {mentors.map((mentor, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center group"
                >
                  <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 rounded-full overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img 
                      src={mentor.imageSrc}
                      alt={mentor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 text-center group-hover:text-primary transition-colors duration-200">
                    {mentor.name}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
                    {mentor.position}
                  </p>
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
