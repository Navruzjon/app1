import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription 
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Building2, Briefcase, Star, DollarSign, Filter, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Mock data for professionals
const professionals = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    profession: "Pediatrician",
    rate: "£120/hr",
    location: { city: "London", town: "Wembley" },
    radius: "10 miles",
    mosque: "Wembley Central Masjid",
    rating: 4.9,
    reviews: 124,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&h=200",
    specialties: ["Child Health", "Vaccinations"]
  },
  {
    id: 2,
    name: "Yusuf Khan",
    profession: "Electrician",
    rate: "£60/hr",
    location: { city: "Birmingham", town: "Sparkhill" },
    radius: "15 miles",
    mosque: "Sparkbrook Masjid",
    rating: 4.8,
    reviews: 89,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200",
    specialties: ["Wiring", "Lighting", "Emergency Repairs"]
  },
  {
    id: 3,
    name: "Aisha Malik",
    profession: "Math Tutor",
    rate: "£35/hr",
    location: { city: "London", town: "Ilford" },
    radius: "5 miles",
    mosque: "Ilford Islamic Centre",
    rating: 5.0,
    reviews: 45,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200",
    specialties: ["GCSE", "A-Level", "Calculus"]
  },
  {
    id: 4,
    name: "Ibrahim Patel",
    profession: "Legal Consultant",
    rate: "£150/hr",
    location: { city: "Manchester", town: "Cheetham Hill" },
    radius: "National (Remote)",
    mosque: "North Manchester Jamia Mosque",
    rating: 4.7,
    reviews: 210,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200",
    specialties: ["Property Law", "Islamic Wills", "Family Law"]
  }
];

export default function Professionals() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Community Professionals</h1>
            <p className="text-muted-foreground mt-1">Find trusted experts within your community.</p>
          </div>
          <RegisterProfessionalDialog />
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              placeholder="Search for doctors, plumbers, tutors..." 
              className="pl-10 py-6 rounded-xl bg-card border-none shadow-sm text-base"
            />
          </div>
          <Button variant="outline" className="h-auto py-3 px-6 gap-2 bg-card border-none shadow-sm">
            <Filter className="w-4 h-4" /> Filters
          </Button>
          <Button variant="outline" className="h-auto py-3 px-6 gap-2 bg-card border-none shadow-sm">
            <MapPin className="w-4 h-4" /> Near Me
          </Button>
        </div>

        {/* Professionals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professionals.map((pro) => (
            <Card key={pro.id} className="group hover:shadow-md transition-all duration-200 border-none shadow-sm flex flex-col">
              <CardHeader className="pb-3 flex flex-row gap-4 items-start">
                <Avatar className="w-14 h-14 border-2 border-background shadow-sm">
                  <AvatarImage src={pro.avatar} />
                  <AvatarFallback>{pro.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg truncate">{pro.name}</CardTitle>
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-200 border-none gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {pro.rating}
                    </Badge>
                  </div>
                  <p className="text-primary font-medium text-sm flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> {pro.profession}
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 space-y-4 text-sm">
                <div className="flex flex-wrap gap-1.5">
                  {pro.specialties.map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 pt-2 border-t border-border/50">
                   <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4" /> Rate
                      </span>
                      <span className="font-medium text-foreground">{pro.rate}</span>
                   </div>
                   <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" /> Location
                      </span>
                      <span className="font-medium text-foreground">{pro.location.town}, {pro.location.city}</span>
                   </div>
                   <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-4 h-4" /> Radius
                      </span>
                      <span className="font-medium text-foreground">{pro.radius}</span>
                   </div>
                   <div className="flex items-center justify-between text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4" /> Masjid
                      </span>
                      <span className="font-medium text-foreground text-right max-w-[150px] truncate" title={pro.mosque}>{pro.mosque}</span>
                   </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-2">
                <Button className="w-full">Contact Professional</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}

function RegisterProfessionalDialog() {
  const [open, setOpen] = useState(false);
  const [radius, setRadius] = useState([5]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Submitted",
      description: "Your professional profile is under review.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-lg shadow-primary/20">
          <Briefcase className="w-4 h-4" /> List Your Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Professional Registration</DialogTitle>
          <DialogDescription>
            Share your expertise with the community.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="profession">Profession/Title</Label>
              <Input id="profession" placeholder="e.g. Plumber, Tutor" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="rate">Rate / Price</Label>
              <Input id="rate" placeholder="e.g. £50/hr or Fixed Price" required />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="specialties">Specialties (comma separated)</Label>
            <Input id="specialties" placeholder="e.g. Emergency repairs, GCSE Math, Commercial Law" />
          </div>

          <div className="space-y-3 border-t border-border pt-4 mt-2">
            <h4 className="font-medium text-sm">Location & Service Area</h4>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="grid gap-2">
                <Label htmlFor="city">Base City</Label>
                <Input id="city" placeholder="e.g. London" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="mosque">Affiliated Masjid</Label>
                <Input id="mosque" placeholder="Closest Masjid to you" />
              </div>
            </div>

            <div className="grid gap-4 pt-2">
              <div className="flex justify-between">
                <Label>Service Radius</Label>
                <span className="text-sm text-muted-foreground">{radius} miles</span>
              </div>
              <Slider 
                defaultValue={[5]} 
                max={50} 
                step={1} 
                value={radius}
                onValueChange={setRadius}
                className="py-4"
              />
              <p className="text-xs text-muted-foreground">How far are you willing to travel to serve the community?</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Create Profile</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
