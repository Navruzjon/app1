import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, ArrowRight, Globe, Lock } from "lucide-react";
import { groups } from "@/lib/mockData";

export default function Groups() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Community Groups</h1>
            <p className="text-muted-foreground mt-1">Find your tribe, learn together, and grow.</p>
          </div>
          <Button className="gap-2 shadow-lg shadow-primary/20">
            <Users className="w-4 h-4" /> Create Group
          </Button>
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
              <Card key={group.id} className="group hover:shadow-md transition-all duration-200 border-none shadow-sm">
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
                  <CardDescription className="line-clamp-2">{group.description}</CardDescription>
                </CardHeader>
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
