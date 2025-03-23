import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, User, IndianRupee, CalendarCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import eventsData from '@/data/events.json';

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

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  // console.log('id', id)
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundEvent = eventsData.events.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      toast({
        title: "Event not found",
        description: "The requested event could not be found.",
        variant: "destructive",
      });
      navigate('/events');
    }
    setLoading(false);
  }, [id, navigate, toast]);

  const handleRegister = () => {
    if (event?.registration.open && event?.registration.formLink) {
      window.open(event.registration.formLink, '_blank');
    } else {
      toast({
        title: "Registration Closed",
        description: "Registration for this event is currently closed.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            {event.featured && (
              <Badge variant="default" className="mb-4">Featured Event</Badge>
            )}
          </div>
          <Button
            onClick={handleRegister}
            disabled={!event.registration.open}
            className="w-full md:w-auto"
          >
            {event.registration.open ? 'Register Now' : 'Registration Closed'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>{event.capacity}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>{event.organizer}</span>
              </div>
              <div className="flex items-center space-x-2">
                <IndianRupee className="h-5 w-5 text-primary" />
                <span>{event.price}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarCheck className="h-5 w-5 text-primary" />
                <span>Registration Deadline: {event.registration.deadline}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line">{event.fullDescription}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{event.category}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {event.teams.map((team, index) => (
                  <Badge key={index} variant="secondary">{team}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
