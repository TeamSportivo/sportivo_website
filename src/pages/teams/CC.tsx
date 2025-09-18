import React, { useState, useEffect } from 'react';
import { fetchImagesFromFolder } from '@/utils/storageUtils';
import { toast } from 'sonner';

interface TeamMember {
  imageSrc: string;
  name: string;
}

const CC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeamImages = async () => {
      setLoading(true);
      try {
        // Fetch images from the teams/cc folder in Firebase Storage
        const fetchedImages = await fetchImagesFromFolder('images/teams/WC');
        
        // Sort the fetched images by their numeric names
        const sortedImages = fetchedImages.sort((a, b) => {
          const numA = parseInt(a.alt.split('.')[0]);
          const numB = parseInt(b.alt.split('.')[0]);
          return numA - numB;
        });
        
        // Map the sorted images to team members with actual names
        const membersList: TeamMember[] = [
            { name: "Sandip Dutta", imageSrc: sortedImages[0]?.src || `https://randomuser.me/api/portraits/men/41.jpg` },
            { name: "Mriganka Chowdhury", imageSrc: sortedImages[1]?.src || `https://randomuser.me/api/portraits/women/42.jpg` },
            { name: "Mainak Nandi", imageSrc: sortedImages[2]?.src || `https://randomuser.me/api/portraits/men/43.jpg` },
            { name: "Spandan Saha", imageSrc: sortedImages[3]?.src || `https://randomuser.me/api/portraits/men/44.jpg` },
            { name: "Trishan Chowdhury", imageSrc: sortedImages[4]?.src || `https://randomuser.me/api/portraits/men/45.jpg` },
            { name: "Manisha Choudhury", imageSrc: sortedImages[5]?.src || `https://randomuser.me/api/portraits/men/46.jpg` },
            { name: "Swetam Kumar", imageSrc: sortedImages[6]?.src || `https://randomuser.me/api/portraits/men/47.jpg` },
            { name: "Megha Bhattacharjee", imageSrc: sortedImages[7]?.src || `https://randomuser.me/api/portraits/men/48.jpg` },
            { name: "Nigel Savio Benjamin", imageSrc: sortedImages[8]?.src || `https://randomuser.me/api/portraits/men/49.jpg` },
            { name: "Adrija Dey", imageSrc: sortedImages[9]?.src || `https://randomuser.me/api/portraits/men/50.jpg` },
            { name: "Suhit Ghosh", imageSrc: sortedImages[10]?.src || `https://randomuser.me/api/portraits/women/51.jpg` },
            { name: "Rahul Das", imageSrc: sortedImages[11]?.src || `https://randomuser.me/api/portraits/women/52.jpg` },
            { name: "Arman Khan", imageSrc: sortedImages[12]?.src || `https://randomuser.me/api/portraits/men/53.jpg` },
            { name: "Diganta Nath", imageSrc: sortedImages[13]?.src || `https://randomuser.me/api/portraits/men/54.jpg` },
            { name: "Anan Mitra", imageSrc: sortedImages[14]?.src || `https://randomuser.me/api/portraits/men/55.jpg` },
            { name: "Debadrita Kundu", imageSrc: sortedImages[15]?.src || `https://randomuser.me/api/portraits/men/56.jpg` },
            { name: "Tathagata Das", imageSrc: sortedImages[16]?.src || `https://randomuser.me/api/portraits/men/57.jpg` },
            { name: "Sharmistha Ghosh", imageSrc: sortedImages[17]?.src || `https://randomuser.me/api/portraits/men/58.jpg` },
            { name: "Swagatam Sarkar", imageSrc: sortedImages[18]?.src || `https://randomuser.me/api/portraits/men/59.jpg` },
            { name: "Chetan Saha", imageSrc: sortedImages[19]?.src || `https://randomuser.me/api/portraits/women/60.jpg` },
            { name: "Kranti Sadhukhan", imageSrc: sortedImages[20]?.src || `https://randomuser.me/api/portraits/men/61.jpg` },
            { name: "Srijon Nandy", imageSrc: sortedImages[21]?.src || `https://randomuser.me/api/portraits/women/62.jpg` }
        ];
        
        setTeamMembers(membersList);
      } catch (error) {
        console.error("Failed to load team images:", error);
        toast.error("Failed to load team images. Using placeholder images.");
        
        // Fallback to placeholder images with actual names
        const fallbackMembers = [
          { name: "Satwik Dey", imageSrc: `https://randomuser.me/api/portraits/men/41.jpg` },
          { name: "Debarati Bose", imageSrc: `https://randomuser.me/api/portraits/women/42.jpg` },
          { name: "Tuhin Subhra Nath", imageSrc: `https://randomuser.me/api/portraits/men/43.jpg` },
          { name: "Akash Halder", imageSrc: `https://randomuser.me/api/portraits/men/44.jpg` },
          { name: "Moulik Mitra", imageSrc: `https://randomuser.me/api/portraits/men/45.jpg` },
          { name: "Souvik Das", imageSrc: `https://randomuser.me/api/portraits/men/46.jpg` },
          { name: "Debkiran Banerjee", imageSrc: `https://randomuser.me/api/portraits/men/47.jpg` },
          { name: "Arittra Chatterjee", imageSrc: `https://randomuser.me/api/portraits/men/48.jpg` },
          { name: "Dipro Chowdhury", imageSrc: `https://randomuser.me/api/portraits/men/49.jpg` },
          { name: "Kaustav Bhattacharjee", imageSrc: `https://randomuser.me/api/portraits/men/50.jpg` },
          { name: "Anwesha Neogi", imageSrc: `https://randomuser.me/api/portraits/women/51.jpg` },
          { name: "Shreya Bhattacharya", imageSrc: `https://randomuser.me/api/portraits/women/52.jpg` },
          { name: "Saibesh Dutta", imageSrc: `https://randomuser.me/api/portraits/men/53.jpg` },
          { name: "Rohit Chattopadhyay", imageSrc: `https://randomuser.me/api/portraits/men/54.jpg` },
          { name: "Agniswar Banerjee", imageSrc: `https://randomuser.me/api/portraits/men/55.jpg` },
          { name: "Kallan Chowdhury", imageSrc: `https://randomuser.me/api/portraits/men/56.jpg` },
          { name: "Akash Hazra", imageSrc: `https://randomuser.me/api/portraits/men/57.jpg` },
          { name: "Shreyan Dey", imageSrc: `https://randomuser.me/api/portraits/men/58.jpg` },
          { name: "Utsav Roy", imageSrc: `https://randomuser.me/api/portraits/men/59.jpg` }
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
              Core Committee
            </h1>
            <p className="text-lg text-gray-600">
              Meet our dedicated core committee members who work tirelessly to bring excellence to Team Sportivo.
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

export default CC;
