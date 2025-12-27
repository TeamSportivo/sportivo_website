import React, { useState, useEffect } from 'react';
import { fetchImagesFromFolder } from '@/utils/storageUtils';
import { toast } from 'sonner';

interface TeamMember {
  imageSrc: string;
  name: string;
}

const WC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeamImages = async () => {
      setLoading(true);
      try {
        // Fetch images from the teams/wc folder in Firebase Storage
        const fetchedImages = await fetchImagesFromFolder('images/teams/VC');
        
        // Sort the fetched images by their numeric names
        const sortedImages = fetchedImages.sort((a, b) => {
          const numA = parseInt(a.alt.split('.')[0]);
          const numB = parseInt(b.alt.split('.')[0]);
          return numA - numB;
        });
        
        // Map the sorted images to team members with actual names
        const membersList: TeamMember[] = [
            { name: "Aahona Bose", imageSrc: sortedImages[0]?.src || `https://randomuser.me/api/portraits/women/41.jpg` },
            { name: "Sayan Das", imageSrc: sortedImages[25]?.src || `https://randomuser.me/api/portraits/women/41.jpg` },
            { name: "Soumadip Das", imageSrc: sortedImages[3]?.src || `https://randomuser.me/api/portraits/men/44.jpg` },
            { name: "Aditya Sarkar", imageSrc: sortedImages[4]?.src || `https://randomuser.me/api/portraits/men/45.jpg` },
            { name: "TUHIN KUMAR DUYA", imageSrc: sortedImages[7]?.src || `https://randomuser.me/api/portraits/men/48.jpg` },
            { name: "Sinjini Das", imageSrc: sortedImages[29]?.src || `https://randomuser.me/api/portraits/men/48.jpg` },
            { name: "SOUMAJIT NASKAR", imageSrc: sortedImages[8]?.src || `https://randomuser.me/api/portraits/men/49.jpg` },
            { name: "Abhishek Das", imageSrc: sortedImages[28]?.src || `https://randomuser.me/api/portraits/men/50.jpg` },
            { name: "Sanhita Halder", imageSrc: sortedImages[10]?.src || `https://randomuser.me/api/portraits/women/51.jpg` },
            { name: "Sneha Biswas", imageSrc: sortedImages[11]?.src || `https://randomuser.me/api/portraits/women/52.jpg` },
            { name: "Joy Biswas", imageSrc: sortedImages[36]?.src || `https://randomuser.me/api/portraits/women/52.jpg` },
            { name: "Sreyankar Dutta", imageSrc: sortedImages[35]?.src || `https://randomuser.me/api/portraits/women/52.jpg` },
            { name: "Sayandeep Paul", imageSrc: sortedImages[26]?.src || `https://randomuser.me/api/portraits/women/52.jpg` },
            { name: "Saptarshi Chakraborty", imageSrc: sortedImages[12]?.src || `https://randomuser.me/api/portraits/men/53.jpg` },
            { name: "Atreyee Roy", imageSrc: sortedImages[13]?.src || `https://randomuser.me/api/portraits/women/54.jpg` },
            { name: "Nisha Mahajan", imageSrc: sortedImages[14]?.src || `https://randomuser.me/api/portraits/women/55.jpg` },
            { name: "Debnil Saha", imageSrc: sortedImages[27]?.src || `https://randomuser.me/api/portraits/women/55.jpg` },
            { name: "Swarnanka Biswas", imageSrc: sortedImages[34]?.src || `https://randomuser.me/api/portraits/women/56.jpg` },
            { name: "Rahuldeb Maity", imageSrc: sortedImages[33]?.src || `https://randomuser.me/api/portraits/women/56.jpg` },
            { name: "Aayushmita Das", imageSrc: sortedImages[16]?.src || `https://randomuser.me/api/portraits/women/57.jpg` },
            { name: "Pratap Chatterjee", imageSrc: sortedImages[30]?.src || `https://randomuser.me/api/portraits/women/57.jpg` },
            { name: "Rupsha Chowdhury", imageSrc: sortedImages[17]?.src || `https://randomuser.me/api/portraits/women/58.jpg` },
            { name: "Abhishek sharma", imageSrc: sortedImages[19]?.src || `https://randomuser.me/api/portraits/men/60.jpg` },
            { name: "Babita Roy", imageSrc: sortedImages[20]?.src || `https://randomuser.me/api/portraits/women/61.jpg` },
            { name: "Mohar Bardhan", imageSrc: sortedImages[31]?.src || `https://randomuser.me/api/portraits/women/61.jpg` },
            { name: "Shreya Das", imageSrc: sortedImages[21]?.src || `https://randomuser.me/api/portraits/women/62.jpg` },
            { name: "Ranodeep Das", imageSrc: sortedImages[22]?.src || `https://randomuser.me/api/portraits/men/63.jpg` },
            { name: "SUBHAJIT MONDAL", imageSrc: sortedImages[23]?.src || `https://randomuser.me/api/portraits/men/64.jpg` },
            { name: "Sourin Bose", imageSrc: sortedImages[24]?.src || `https://randomuser.me/api/portraits/men/65.jpg` }
        ];
        
        setTeamMembers(membersList);
      } catch (error) {
        console.error("Failed to load team images:", error);
        toast.error("Failed to load team images. Using placeholder images.");
        
        // Fallback to placeholder images with actual names
        const fallbackMembers = [
          { name: "Annesha Kunda", imageSrc: `https://randomuser.me/api/portraits/men/41.jpg` },
          { name: "Subhadeep Gorain", imageSrc: `https://randomuser.me/api/portraits/women/42.jpg` },
          { name: "Pramit Nandy", imageSrc: `https://randomuser.me/api/portraits/men/43.jpg` },
          { name: "Snehasish Karmakar", imageSrc: `https://randomuser.me/api/portraits/men/44.jpg` },
          { name: "Sahitya Majumdar", imageSrc: `https://randomuser.me/api/portraits/men/45.jpg` },
          { name: "Arunava Pradhan", imageSrc: `https://randomuser.me/api/portraits/men/46.jpg` },
          { name: "Rohit Yadav", imageSrc: `https://randomuser.me/api/portraits/men/47.jpg` },
          { name: "Suprova Samanta", imageSrc: `https://randomuser.me/api/portraits/men/48.jpg` },
          { name: "Subhajit Naskar", imageSrc: `https://randomuser.me/api/portraits/men/49.jpg` },
          { name: "Priyanka Ghosh", imageSrc: `https://randomuser.me/api/portraits/men/50.jpg` },
          { name: "Himanish Das", imageSrc: `https://randomuser.me/api/portraits/women/51.jpg` },
          { name: "Md. Shadan Hossain", imageSrc: `https://randomuser.me/api/portraits/women/52.jpg` },
          { name: "Aman Agastya", imageSrc: `https://randomuser.me/api/portraits/men/53.jpg` },
          { name: "Pratyush Kumar Jha", imageSrc: `https://randomuser.me/api/portraits/men/54.jpg` },
          { name: "Aniruddha Dey", imageSrc: `https://randomuser.me/api/portraits/men/55.jpg` },
          { name: "Chhavinav Verma", imageSrc: `https://randomuser.me/api/portraits/men/56.jpg` },
          { name: "Sneha Kataruka", imageSrc: `https://randomuser.me/api/portraits/men/57.jpg` },
          { name: "Anwesha Nath", imageSrc: `https://randomuser.me/api/portraits/men/58.jpg` },
          { name: "Rahul Kumar", imageSrc: `https://randomuser.me/api/portraits/men/59.jpg` },
          { name: "Priya Sharma", imageSrc: `https://randomuser.me/api/portraits/women/60.jpg` },
          { name: "Amit Patel", imageSrc: `https://randomuser.me/api/portraits/men/61.jpg` },
          { name: "Neha Singh", imageSrc: `https://randomuser.me/api/portraits/women/62.jpg` }
        ];
        
        setTeamMembers(fallbackMembers);
      } finally {
        setLoading(false);
      }
    };
    
    loadTeamImages();
  }, []);

  return (
    <div className="pt-20">
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Working Committee
            </h1>
            <p className="text-lg text-gray-600">
              Meet our dedicated working committee members who work tirelessly to bring excellence to Team Sportivo.
            </p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center group"
                >
                  <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4 rounded-full overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img 
                      src={member.imageSrc}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 text-center group-hover:text-primary transition-colors duration-200">
                    {member.name}
                  </h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default WC;
