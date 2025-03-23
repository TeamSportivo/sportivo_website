
import React, { useState, useEffect } from 'react';
import CustomButton from '@/components/ui/CustomButton';
import { fetchImagesFromFolder } from '@/utils/storageUtils';
import { toast } from 'sonner';

interface TeamMember {
  imageSrc: string;
  name: string;
  role: string;
  description: string;
}

const CC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeamImages = async () => {
      setLoading(true);
      try {
        // Fetch images from the teams/cc folder in Firebase Storage
        const fetchedImages = await fetchImagesFromFolder('teams/cc');
        
        // Map the images to team members with default data
        const members: TeamMember[] = fetchedImages.map((img, index) => ({
          imageSrc: img.src,
          name: img.alt || `Team Member ${index + 1}`,
          role: "Leadership Role",
          description: "Passionate team leader with expertise in sports management and event coordination."
        }));
        
        setTeamMembers(members);
      } catch (error) {
        console.error("Failed to load team images:", error);
        toast.error("Failed to load team data. Please try again later.");
        // Set some fallback data
        setTeamMembers([1, 2, 3, 4].map(item => ({
          imageSrc: `https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item + 10}.jpg`,
          name: `Team Member ${item}`,
          role: "Leadership Role",
          description: "Passionate team leader with expertise in sports management and event coordination."
        })));
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
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 mb-2">
                <span className="text-xs font-medium text-primary">TEAM</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Core Committee
              </h1>
              <p className="text-lg text-gray-600">
                The leadership team driving the vision and strategic direction of Team Sportivo.
              </p>
              <div className="pt-4">
                <CustomButton to="/contact">
                  Join Our Team
                </CustomButton>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full -z-10" />
              <div className="relative overflow-hidden rounded-xl shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" 
                  alt="Core Committee team"
                  className="w-full hover-scale"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl text-center hover-scale">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <img 
                      src={member.imageSrc}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
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
