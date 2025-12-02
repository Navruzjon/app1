import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Users, MapPin, Building2, Plus } from "lucide-react";
import { groups } from "@/lib/mockData";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function Groups() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Community Groups</h1>
            <p className="text-muted-foreground mt-1">Find your tribe, learn together, and grow.</p>
          </div>
          <CreateGroupDialog />
        </div>

        {/* Search & Filter */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input 
            placeholder="Search for groups (e.g. Quran, Charity, Sports)..." 
            className="pl-10 py-6 rounded-xl bg-card border-none shadow-sm text-base"
          />
        </div>

        {/* Featured Groups */}
        <div>
          <h2 className="text-xl font-heading font-semibold mb-4">Your Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <Card key={group.id} className="group hover:shadow-md transition-all duration-200 border-none shadow-sm flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <group.icon className="w-6 h-6" />
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                      {group.members} Members
                    </div>
                  </div>
                  <CardTitle className="mt-4 text-lg">{group.name}</CardTitle>
                  <div className="flex flex-col gap-1 mt-1">
                     <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {group.location.town}, {group.location.city}, {group.location.country}
                     </div>
                     <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                        <Building2 className="w-3 h-3" />
                        {group.mosque}
                     </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="line-clamp-2">{group.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                    View Group
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        {/* Discover Categories */}
        <div>
          <h2 className="text-xl font-heading font-semibold mb-4">Discover by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Quran Studies", "Charity & Volunteer", "Youth & Students", "Professionals", "Reverts Support", "Sisters Only", "Sports & Fitness", "Events"].map((cat) => (
              <div key={cat} className="p-6 rounded-xl bg-card border border-transparent hover:border-primary/20 hover:bg-accent/50 cursor-pointer transition-all text-center group">
                <h3 className="font-medium group-hover:text-primary transition-colors">{cat}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function CreateGroupDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Group Created Successfully",
      description: "Your new group has been created and is pending approval.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-lg shadow-primary/20">
          <Plus className="w-4 h-4" /> Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a Community Group</DialogTitle>
          <DialogDescription>
            Start a new group to connect with people in your area.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Group Name</Label>
            <Input id="name" placeholder="e.g. Sunrise Runners, Quran Circle" required />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="What is this group about?" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="country">Country</Label>
              <Select defaultValue="uk">
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="usa">USA</SelectItem>
                  <SelectItem value="canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="e.g. London" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="town">Town/Borough</Label>
              <Input id="town" placeholder="e.g. Whitechapel" required />
            </div>
             <div className="grid gap-2">
              <Label htmlFor="mosque">Affiliated Mosque (Optional)</Label>
              <Input id="mosque" placeholder="e.g. East London Mosque" />
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Create Group</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
