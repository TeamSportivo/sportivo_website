import React, { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/ui/CustomButton";
import eventsData from "../../data/events.json";
import { fetchImagesFromFolder } from "@/utils/firebase";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  featured: boolean;
  price: string;
  registration: {
    open: boolean;
    formLink: string;
  };
}

const UpcomingEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventImages = async () => {
      try {
        // Get the next 3 upcoming events
        const upcomingEvents = eventsData.events
          .filter((event) => event?.registration?.open === true)
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .slice(0, 3);

        // Fetch images from Firebase
        const images = await fetchImagesFromFolder("/images/Events");

        // Update events with Firebase images
        const updatedEvents = upcomingEvents.map((event) => ({
          ...event,
          image: images[event.id] || event.image,
        }));

        setEvents(updatedEvents);
      } catch (error) {
        console.error("Error fetching event images:", error);
        // Fallback to original events data
        const upcomingEvents = eventsData.events
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .slice(0, 3);
        setEvents(upcomingEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEventImages();
  }, []);

  const handleRegister = (formLink: string) => {
    window.open(formLink, "_blank");
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us for exciting sports events, competitions, and tournaments
              throughout the year.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us for exciting sports events, competitions, and tournaments
            throughout the year.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover-scale group"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/800x400?text=Event+Image";
                  }}
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
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {event.description}
                </p>

                {/*<div className="flex flex-wrap gap-3 mb-4 text-sm">*/}
                {/*  <div className="flex items-center gap-1">*/}
                {/*    <Calendar className="h-4 w-4 text-primary" />*/}
                {/*    <span className="text-gray-700">{event.date}</span>*/}
                {/*  </div>*/}
                {/*  <div className="flex items-center gap-1">*/}
                {/*    <Clock className="h-4 w-4 text-primary" />*/}
                {/*    <span className="text-gray-700">{event.time}</span>*/}
                {/*  </div>*/}
                {/*  <div className="flex items-center gap-1">*/}
                {/*    <MapPin className="h-4 w-4 text-primary" />*/}
                {/*    <span className="text-gray-700">{event.location}</span>*/}
                {/*  </div>*/}
                {/*</div>*/}

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {event.registration.open ? (
                      <Button
                        size="sm"
                        onClick={() =>
                          handleRegister(event.registration.formLink)
                        }
                      >
                        Register
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" disabled>
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
