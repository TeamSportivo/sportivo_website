import React, { useState, useEffect } from 'react';
import { Tablet, Trophy, Zap, Star, Clock, Users, Target, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchImagesFromFolder } from '@/utils/storageUtils';
import { toast } from 'sonner';

interface Leader {
  imageSrc: string;
  name: string;
  position: string;
}

const About = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLeaderImages = async () => {
      setLoading(true);
      try {
        // Fetch images from the teams/leader folder in Firebase Storage
        const fetchedImages = await fetchImagesFromFolder('images/teams/leader');
        
        // Sort the fetched images by their numeric names
        const sortedImages = fetchedImages.sort((a, b) => {
          const numA = parseInt(a.alt.split('.')[0]);
          const numB = parseInt(b.alt.split('.')[0]);
          return numA - numB;
        });
        
        // Map the sorted images to leaders with their details
        const leadersList: Leader[] = [
          { 
            name: "Mr. Ratul Kayal",
            position: "Head Mentor",
            imageSrc: sortedImages[0]?.src || `https://randomuser.me/api/portraits/men/41.jpg`
          },
          { 
            name: "Mr. Niladri Banerjee",
            position: "President",
            imageSrc: sortedImages[1]?.src || `https://randomuser.me/api/portraits/men/42.jpg`
          }
        ];
        
        setLeaders(leadersList);
      } catch (error) {
        console.error("Failed to load leader images:", error);
        toast.error("Failed to load leader images. Using placeholder images.");
        
        // Fallback to placeholder images
        const fallbackLeaders = [
          { 
            name: "Mr. Ratul Kayal",
            position: "Head Mentor",
            imageSrc: `https://randomuser.me/api/portraits/men/41.jpg`
          },
          { 
            name: "Mr. Niladri Banerjee",
            position: "President",
            imageSrc: `https://randomuser.me/api/portraits/men/42.jpg`
          }
        ];
        
        setLeaders(fallbackLeaders);
      } finally {
        setLoading(false);
      }
    };
    
    loadLeaderImages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 mb-6">
              <span className="text-sm font-medium text-primary">SPORTIVO</span>
            </div>
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              About SPORTIVO
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The official sports club of Future Institute of Engineering and Management (FIEM)
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-24">
            {/* Introduction */}
            <div className="flex justify-center">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    A Few Words About Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    SPORTIVO, the official sports club of Future Institute of Engineering and Management (FIEM), 
                    is a vibrant community united by passion and sportsmanship. It's a platform where every student 
                    gets a chance to shine.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* FIEM Section */}
            <div className="flex justify-center">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    About FIEM
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    FIEM, one of Kolkata's top private engineering colleges, is dedicated to the pursuit of 
                    excellence in teaching and providing knowledge. It offers unmatched learning experiences 
                    for students across a broad spectrum of academics. FIEM aims to create highly trained 
                    technical manpower in different disciplines of Engineering and Technology, and professional 
                    managers in the fields of General Management.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Events Section */}
            <div className="flex justify-center">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Trophy className="h-8 w-8 text-primary" />
                    </div>
                    Our Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-12">
                  {/* Xaplotes */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-1 w-12 bg-primary rounded-full"></div>
                      <h3 className="text-2xl font-semibold">Xaplotes - Intra-College Event</h3>
                    </div>
                    <p className="text-gray-700 text-lg">
                      Twice a year, SPORTIVO's spirit comes alive in grand spectacles. Xaplotes, our intra-college 
                      event, sees students from various departments compete in:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="secondary" className="px-4 py-1 text-base">Football</Badge>
                      <Badge variant="secondary" className="px-4 py-1 text-base">Cricket</Badge>
                      <Badge variant="secondary" className="px-4 py-1 text-base">Shuttle Cup</Badge>
                      <Badge variant="secondary" className="px-4 py-1 text-base">Chess</Badge>
                      <Badge variant="secondary" className="px-4 py-1 text-base">Table Tennis</Badge>
                    </div>
                    <p className="text-gray-700 text-lg">
                      It's a platform for talents to emerge, friendships to solidify, and the college spirit to soar.
                    </p>
                  </div>

                  {/* VIBGYOR */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="h-1 w-12 bg-primary rounded-full"></div>
                      <h3 className="text-2xl font-semibold">VIBGYOR - Inter-College Extravaganza</h3>
                    </div>
                    <p className="text-gray-700 text-lg">
                      Our crown jewel, VIBGYOR, is an inter-college extravaganza that bursts with color, 
                      competition, and camaraderie. It's not just about traditional sports but offers a spectrum 
                      of sporting and recreational activities:
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="secondary" className="px-4 py-1 text-base">Football</Badge>
                      <Badge variant="secondary" className="px-4 py-1 text-base">Cricket</Badge>
                      <Badge variant="secondary" className="px-4 py-1 text-base">Chess</Badge>
                      <Badge variant="secondary" className="px-4 py-1 text-base">Table Tennis</Badge>
                      <Badge variant="secondary" className="px-4 py-1 text-base">Badminton</Badge>
                      <Badge variant="secondary" className="px-4 py-1 text-base">Tug-O-War</Badge>
                      <Badge variant="secondary" className="px-4 py-1 text-base">Volleyball</Badge>
                      <Badge variant="secondary" className="px-4 py-1 text-base">Carrom</Badge>
                      <Badge variant="secondary" className="px-4 py-1 text-base">Dart Throwing</Badge>
                    </div>
                    <p className="text-gray-700 text-lg">
                      It's a stage where FIEM opens its doors and welcomes the best athletic talent from 
                      neighboring colleges, celebrating sportsmanship and forging lasting bonds across institutions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Leadership Section */}
            <div className="flex justify-center">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    Leadership
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {leaders.map((leader, index) => (
                      <div key={index} className="text-center space-y-4">
                        <div className="relative inline-block">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                          <img
                            src={leader.imageSrc}
                            alt={leader.name}
                            className="w-40 h-40 rounded-full mx-auto mb-4 object-cover relative z-10 border-4 border-white shadow-lg"
                          />
                        </div>
                        <h3 className="text-2xl font-semibold">{leader.name}</h3>
                        <p className="text-gray-600 text-lg">{leader.position}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
