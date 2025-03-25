import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, IndianRupee } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import eventsData from '@/data/events.json';
import { fetchImagesFromFolder } from '@/utils/firebase';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  fullDescription: string;
  image: string;
  teams: string[];
  featured: boolean;
  category: string;
  capacity: string;
  organizer: string;
  price: string;
  registration: {
    open: boolean;
    deadline: string;
    formLink: string;
  };
}

export default function Events() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventImages = async () => {
      try {
        const images = await fetchImagesFromFolder('/images/Events');
        const updatedEvents = eventsData.events.map(event => ({
          ...event,
          image: images[event.id] || event.image // Fallback to original image if not found in Firebase
        }));
        setEvents(updatedEvents);
      } catch (error) {
        console.error('Error fetching event images:', error);
        setEvents(eventsData.events); // Fallback to original events data
      } finally {
        setLoading(false);
      }
    };

    fetchEventImages();
  }, []);

  const handleRegister = (event: Event) => {
    if (event.registration.open && event.registration.formLink) {
      window.open(event.registration.formLink, '_blank');
    } else {
      toast({
        title: "Registration Closed",
        description: "Registration for this event is currently closed.",
        variant: "destructive",
      });
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(events.map(event => event.category)));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">All Events</h1>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 border rounded-md"
          />
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="p-2 border rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <Card key={event.id} className="flex flex-col">
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover rounded-t-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x400?text=Event+Image';
                  }}
                />
                {event.featured && (
                  <Badge className="absolute top-2 right-2">Featured</Badge>
                )}
              </div>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {event.capacity}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <IndianRupee className="h-4 w-4 mr-2" />
                    {event.price}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="secondary">{event.category}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleRegister(event)}
                    disabled={!event.registration.open}
                    className="flex-1"
                  >
                    {event.registration.open ? 'Register Now' : 'Registration Closed'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/events/${event.id}`)}
                    className="flex-1"
                  >
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
