import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, Target, Award, Gamepad2, Volleyball, Activity } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';

const Vibgyor = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 mb-4">
              <span className="text-xs font-medium text-orange-500">INTERCOLLEGE EVENT</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              <span className="text-violet-500">V</span>
              <span className="text-indigo-500">I</span>
              <span className="text-blue-500">B</span>
              <span className="text-green-500">G</span>
              <span className="text-yellow-500">Y</span>
              <span className="text-orange-500">O</span>
              <span className="text-red-500">R</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Play. Bond. Celebrate
            </p>
          </div>

          {/* Main Description */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-orange-500/10 rounded-full">
                    <Trophy className="w-6 h-6 text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-bold">The Spirit of Unity</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  VIBGYOR, a vibrant celebration of sports, lights up our campus each year, attracting the largest student gathering in the City of Joy. Students from colleges not just in Kolkata, but from far and wide, come together to compete in a diverse range of sporting events. From Football and Cricket to Badminton and Tug-O-War, the spirit of competition is alive and thriving.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  But VIBGYOR is more than just a competition; it serves as a cultural bridge, creating lasting bonds and sparking unforgettable memories, all under the banner of sportsmanship and shared passion.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Events Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 mb-4">
                <span className="text-xs font-medium text-orange-500">EVENTS</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Featured Competitions</h2>
              <p className="text-lg text-gray-600 mb-8">
                Each event brings its own unique excitement to the fest, making VIBGYOR a truly diverse and thrilling experience for all participants and spectators.
              </p>
              <CustomButton to="/events" className="bg-orange-500 hover:bg-orange-600">
                Check Out Events!
              </CustomButton>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                    Football
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Experience the thrill of competitive football as teams battle for supremacy on the field.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                    Cricket
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Witness intense cricket matches where strategy meets skill in every delivery.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                    Badminton
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Fast-paced badminton action that keeps spectators on the edge of their seats.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gamepad2 className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                    Chess
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Strategic battles of the mind in this classic game of chess.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                    Table Tennis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Quick reflexes and precise shots define this exciting table tennis tournament.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Volleyball className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                    Volleyball
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Team coordination and athleticism shine in this dynamic volleyball competition.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
                    Kabaddi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Traditional Indian sport showcasing strength, strategy, and teamwork.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vibgyor;
