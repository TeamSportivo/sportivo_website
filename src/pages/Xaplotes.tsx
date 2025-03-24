import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Users, Target, Award, Sparkles } from 'lucide-react';
import CustomButton from '@/components/ui/CustomButton';

const Xaplotes = () => {
  return (
    <div className="pt-20">
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 mb-4">
              <span className="text-xs font-medium text-blue-500">INTRACOLLEGE EVENT</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Xaplotes
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Where Sparks Fly and Friendships Soar!
            </p>
          </div>

          {/* Main Description */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-blue-500/10 rounded-full">
                    <Sparkles className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="text-2xl font-bold">The Spirit of Competition</h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Xaplotes, our electrifying intra-college event, ignites the campus with friendly rivalries as students from across departments battle it out in Football, Cricket, Shuttle Cup, and Table Tennis. This event is a platform where hidden talents bloom and friendships forge in the heat of competition.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  The spirit of the college soars as Xaplotes transforms the ordinary into an unforgettable spectacle of sportsmanship and camaraderie.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Events Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 mb-4">
                <span className="text-xs font-medium text-blue-500">EVENTS</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Featured Competitions</h2>
              <p className="text-lg text-gray-600 mb-6">
                Each event brings its own unique flavor to the competition, making Xaplotes a diverse and exciting experience for all participants and spectators alike.
              </p>
              <CustomButton to="/events" className="bg-blue-500 hover:bg-blue-600">
                Check Out Events!
              </CustomButton>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-lg hover:shadow-xl transition-shadow group">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                    Xaplotes Football
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
                    <Award className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                    Xaplotes Cricket
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
                    <Users className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                    Xaplotes Shuttle Cup
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
                    <Trophy className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" />
                    Xaplotes Table Tennis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Quick reflexes and precise shots define this exciting table tennis tournament.
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

export default Xaplotes; 