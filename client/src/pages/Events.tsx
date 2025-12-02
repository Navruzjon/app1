import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Clock, Calendar as CalendarIcon, Users, Share2, Ticket } from "lucide-react";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Annual Community Iftar",
    date: new Date(2025, 2, 15), // March 15, 2025
    time: "17:30 - 20:00",
    location: "Central Park Pavilion",
    attendees: 145,
    category: "Social",
    image: "/attached_assets/generated_images/community_iftar_gathering_outdoors.png",
    price: "Free",
    description: "Join us for our biggest community gathering of the year. Bring a dish to share!"
  },
  {
    id: 2,
    title: "Calligraphy Masterclass",
    date: new Date(2025, 2, 18),
    time: "14:00 - 16:00",
    location: "Art Center, Studio B",
    attendees: 12,
    category: "Workshop",
    image: "/attached_assets/generated_images/islamic_calligraphy_workshop.png",
    price: "£25",
    description: "Learn the basics of Thuluth script with Master Calligrapher Hisham."
  },
  {
    id: 3,
    title: "Youth Soccer Tournament",
    date: new Date(2025, 2, 20),
    time: "09:00 - 14:00",
    location: "City Sports Complex",
    attendees: 60,
    category: "Sports",
    image: "/attached_assets/generated_images/youth_sports_day_soccer.png",
    price: "£5/team",
    description: "Annual 5-a-side tournament for ages 12-16. Prizes for winners!"
  },
  {
    id: 4,
    title: "Fiqh of Finance Seminar",
    date: new Date(2025, 2, 22),
    time: "18:30 - 20:30",
    location: "East London Mosque Hall",
    attendees: 85,
    category: "Education",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=60",
    price: "Free",
    description: "Understanding modern finance through an Islamic perspective."
  }
];

export default function Events() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Community Events</h1>
            <p className="text-muted-foreground mt-1">Gather, learn, and celebrate together.</p>
          </div>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <CalendarIcon className="w-4 h-4" /> Host Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Events Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                placeholder="Search events..." 
                className="pl-10 py-6 rounded-xl bg-card border-none shadow-sm text-base"
              />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="bg-transparent p-0 mb-4">
                <TabsTrigger value="upcoming" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full px-4">Upcoming</TabsTrigger>
                <TabsTrigger value="popular" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full px-4">Popular</TabsTrigger>
                <TabsTrigger value="my-events" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-full px-4">My Events</TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-6">
                {events.map((event) => (
                  <Card key={event.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-48 sm:h-auto relative shrink-0">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-md rounded-lg p-2 text-center min-w-[50px]">
                        <span className="block text-xs font-bold text-primary uppercase">{event.date.toLocaleString('default', { month: 'short' })}</span>
                        <span className="block text-xl font-bold leading-none">{event.date.getDate()}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <Badge variant="secondary" className="mb-2">{event.category}</Badge>
                          <span className="text-sm font-medium text-primary">{event.price}</span>
                        </div>
                        <CardTitle className="text-xl">{event.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="flex-1 pb-2">
                        <div className="space-y-1.5 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" /> {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> {event.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" /> {event.attendees} attending
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="pt-2 gap-2">
                        <Button className="flex-1 gap-2">
                          <Ticket className="w-4 h-4" /> RSVP
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </CardFooter>
                    </div>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="popular">
                 <div className="text-center py-10 text-muted-foreground">Most popular events will appear here.</div>
              </TabsContent>
              <TabsContent value="my-events">
                 <div className="text-center py-10 text-muted-foreground">Events you've RSVP'd to will appear here.</div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Calendar */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border w-full flex justify-center"
                />
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Host an Event</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  Organize a meetup, lecture, or charity drive for the community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full text-primary">
                  Create Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
