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
        const fetchedImages = await fetchImagesFromFolder('images/teams/CC');

      // Sort the fetched images by their numeric names
      const sortedImages = fetchedImages.sort((a, b) => {
          const numA = parseInt(a.alt.split('.')[0]);
          const numB = parseInt(b.alt.split('.')[0]);
          return numA - numB;
      });
        // Map the images to mentors with placeholder data
        const mentorsList: Mentor[] = [
            { name: "Rohit Yadav", imageSrc: sortedImages[6]?.src || `https://randomuser.me/api/portraits/men/47.jpg`, position: "Vice President" },
            { name: "Chhavinav Verma", imageSrc: sortedImages[16]?.src || `https://randomuser.me/api/portraits/men/57.jpg`, position: "Sports and Table Tennis Head" },
            { name: "Aman Agastya", imageSrc: sortedImages[12]?.src || `https://randomuser.me/api/portraits/men/53.jpg`, position: "Graphics and PR Head" },
            { name: "Kallan Chowdhury", imageSrc: sortedImages[15]?.src || `https://randomuser.me/api/portraits/men/56.jpg`, position: "Badminton Head" },
            { name: "Subhadeep Gorain", imageSrc: sortedImages[1]?.src || `https://randomuser.me/api/portraits/women/42.jpg`, position: "Badminton Head" },
            { name: "Arunava Pradhan", imageSrc: sortedImages[5]?.src || `https://randomuser.me/api/portraits/men/46.jpg`, position: "Cricket Head" },
            { name: "Aniruddha Dey", imageSrc: sortedImages[14]?.src || `https://randomuser.me/api/portraits/men/55.jpg`, position: "Cricket Head" },
            { name: "Subhajit Naskar", imageSrc: sortedImages[8]?.src || `https://randomuser.me/api/portraits/men/49.jpg`, position: "Football Head" },
            { name: "Snehasish Karmakar", imageSrc: sortedImages[3]?.src || `https://randomuser.me/api/portraits/men/44.jpg`, position: "Football Head" },
            { name: "Sahitya Majumdar", imageSrc: sortedImages[4]?.src || `https://randomuser.me/api/portraits/men/45.jpg`, position: "Football Head" },
            { name: "Md. Shadan Hossain", imageSrc: sortedImages[11]?.src || `https://randomuser.me/api/portraits/women/52.jpg`, position: "Football Head" },
            { name: "Pulak Adhikary", imageSrc: sortedImages[7]?.src || `https://randomuser.me/api/portraits/men/48.jpg`, position: "Chess Head" },
            { name: "Suprova Samanta", imageSrc: sortedImages[7]?.src || `https://randomuser.me/api/portraits/men/48.jpg`, position: "Chess Head" },
            { name: "Priyanka Ghosh", imageSrc: sortedImages[9]?.src || `https://randomuser.me/api/portraits/men/50.jpg`, position: "Handball Head" },
            { name: "Pratyush Kumar Jha", imageSrc: sortedImages[13]?.src || `https://randomuser.me/api/portraits/men/54.jpg`, position: "Marketing Head" },
            { name: "Anwesha Nath", imageSrc: sortedImages[18]?.src || `https://randomuser.me/api/portraits/men/59.jpg`, position: "Marketing Head" },
            { name: "Annesha Kunda", imageSrc: sortedImages[0]?.src || `https://randomuser.me/api/portraits/men/41.jpg`, position: "Photography Head" },

            { name: "Pramit Nandy", imageSrc: sortedImages[2]?.src || `https://randomuser.me/api/portraits/men/43.jpg`, position: "Event Head" },
            { name: "Jayesh Mondal", imageSrc: sortedImages[2]?.src || `https://randomuser.me/api/portraits/men/43.jpg`, position: "Event Head" },
            { name: "Abhirup Nath", imageSrc: sortedImages[2]?.src || `https://randomuser.me/api/portraits/men/43.jpg`, position: "Event Head" },
            { name: "Pritam Dolui", imageSrc: sortedImages[2]?.src || `https://randomuser.me/api/portraits/men/43.jpg`, position: "Event Head" },
            // { name: "Himanish Das", imageSrc: sortedImages[10]?.src || `https://randomuser.me/api/portraits/women/51.jpg`, position: "Marketing Head" },
            // { name: "Sneha Kataruka", imageSrc: sortedImages[17]?.src || `https://randomuser.me/api/portraits/men/58.jpg`, position: "Photography Head" },
        ]
        
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
