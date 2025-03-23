import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/CustomButton";
import eventsData from '../../data/events.json';

const UpcomingEvents = () => {
  // Get the next 3 upcoming events
  const upcomingEvents = eventsData.events
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const handleRegister = (formLink: string) => {
    window.open(formLink, '_blank');
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for exciting sports events, competitions, and tournaments throughout the year.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => (
            <div 
              key={event.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover-scale group"
            >
              <div className="relative h-48">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                {event.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                
                <div className="flex flex-wrap gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-gray-700">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-gray-700">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-gray-700">{event.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{event.price}</span>
                  <div className="flex gap-2">
                    {event.registration.open ? (
                      <Button 
                        size="sm"
                        onClick={() => handleRegister(event.registration.formLink)}
                      >
                        Register
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        variant="outline"
                        disabled
                      >
                        Closed
                      </Button>
                    )}
                    <CustomButton 
                      to={`/events/${event.id}`}
                      size="sm"
                      variant="outline"
                    >
                      Details
                    </CustomButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <CustomButton 
            to="/events"
            size="lg"
            className="bg-primary text-white hover:bg-primary/90"
          >
            View All Events
          </CustomButton>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
