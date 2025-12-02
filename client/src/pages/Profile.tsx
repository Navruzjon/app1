import Layout from "@/components/layout/Layout";
import { currentUser } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Calendar, Award, Book, Heart, Star } from "lucide-react";

export default function Profile() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-48 md:h-64 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-500 overflow-hidden">
             <div className="absolute inset-0 bg-black/10" />
          </div>
          
          {/* Profile Info Overlay */}
          <div className="px-6 md:px-10 pb-6">
            <div className="relative -mt-20 flex flex-col md:flex-row items-end md:items-end gap-6">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-background bg-muted overflow-hidden shadow-xl">
                  <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-2 border-background rounded-full" title="Online" />
              </div>
              
              <div className="flex-1 mb-2 text-center md:text-left">
                <h1 className="text-3xl font-heading font-bold">{currentUser.name}</h1>
                <p className="text-muted-foreground font-medium">{currentUser.handle}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {currentUser.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined Dec 2023</span>
                </div>
              </div>
              
              <div className="flex gap-3 mb-2 w-full md:w-auto">
                <Button className="flex-1 md:flex-none">Edit Profile</Button>
                <Button variant="outline" className="flex-1 md:flex-none">Share</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {currentUser.bio}
                </p>
                
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-3">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.interests.map(tag => (
                      <Badge key={tag} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

             <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Impact Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                   <span className="text-sm text-muted-foreground">Prayers on Time</span>
                   <span className="font-mono font-bold text-primary">{currentUser.stats.prayers}%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                   <span className="text-sm text-muted-foreground">Quran Read (Juz)</span>
                   <span className="font-mono font-bold text-primary">{currentUser.stats.quran}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                   <span className="text-sm text-muted-foreground">Charity Given</span>
                   <span className="font-mono font-bold text-primary">£{currentUser.stats.charity}</span>
                </div>
              </CardContent>
            </Card>

             {/* Service Reputation / Client Feedback */}
             <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Service Reputation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="bg-muted/30 p-3 rounded-lg">
                       <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">Dr. Sarah Ahmed</span>
                          <span className="text-xs text-muted-foreground">1 week ago</span>
                       </div>
                       <div className="flex gap-2 mb-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px] h-5">Paid on Time</Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] h-5">Polite</Badge>
                       </div>
                       <p className="text-xs text-muted-foreground">"Ahmed was very respectful and prompt with payment. A pleasure to serve."</p>
                    </div>

                    <div className="bg-muted/30 p-3 rounded-lg">
                       <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-sm">Yusuf Khan (Electrician)</span>
                          <span className="text-xs text-muted-foreground">2 months ago</span>
                       </div>
                       <div className="flex gap-2 mb-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px] h-5">Clear Communication</Badge>
                       </div>
                       <p className="text-xs text-muted-foreground">"Very clear about what needed fixing. Easy to work with."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
          </div>

          {/* Right Column - Feed/Tabs */}
          <div className="md:col-span-2">
            <Tabs defaultValue="journey" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none p-0 h-auto mb-6">
                <TabsTrigger value="journey" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">Faith Journey</TabsTrigger>
                <TabsTrigger value="posts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">Posts</TabsTrigger>
                <TabsTrigger value="groups" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3">Groups</TabsTrigger>
              </TabsList>

              <TabsContent value="journey" className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="relative pl-8 border-l-2 border-muted space-y-10">
                  {/* Timeline Item */}
                  <div className="relative">
                    <div className="absolute -left-[41px] bg-background p-1">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary border-2 border-primary">
                        <Book className="w-4 h-4" />
                      </div>
                    </div>
                    <Card className="border-none shadow-sm">
                      <CardContent className="p-5">
                        <span className="text-xs font-semibold text-primary mb-1 block">2 Days Ago</span>
                        <h3 className="font-bold text-lg mb-2">Completed Juz 28</h3>
                        <p className="text-sm text-muted-foreground">Reflecting on Surah Al-Mujadila. The themes of Allah's omniscience really resonated with me today.</p>
                      </CardContent>
                    </Card>
                  </div>

                   {/* Timeline Item */}
                   <div className="relative">
                    <div className="absolute -left-[41px] bg-background p-1">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 border-2 border-amber-500">
                        <Heart className="w-4 h-4" />
                      </div>
                    </div>
                    <Card className="border-none shadow-sm">
                      <CardContent className="p-5">
                        <span className="text-xs font-semibold text-amber-600 mb-1 block">Last Week</span>
                        <h3 className="font-bold text-lg mb-2">Volunteered at Food Bank</h3>
                        <p className="text-sm text-muted-foreground">Helped distribute 500+ meals with the Local Charity Team. Alhamdulillah for the opportunity to serve.</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline Item */}
                   <div className="relative">
                    <div className="absolute -left-[41px] bg-background p-1">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-blue-500">
                        <MapPin className="w-4 h-4" />
                      </div>
                    </div>
                    <Card className="border-none shadow-sm">
                      <CardContent className="p-5">
                        <span className="text-xs font-semibold text-blue-600 mb-1 block">December 2023</span>
                        <h3 className="font-bold text-lg mb-2">Umrah Trip</h3>
                        <p className="text-sm text-muted-foreground">A life-changing journey to the Holy Lands. May Allah invite us all again.</p>
                         <div className="mt-3 rounded-lg overflow-hidden h-40 w-full">
                            <img src="/attached_assets/artistic_mosque_silhouette_at_sunset.png" className="w-full h-full object-cover" alt="Umrah" />
                         </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="posts">
                <div className="text-center py-10 text-muted-foreground">No posts to show yet.</div>
              </TabsContent>
               <TabsContent value="groups">
                <div className="text-center py-10 text-muted-foreground">Groups content here.</div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
}
