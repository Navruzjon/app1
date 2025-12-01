import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share2, MapPin, Clock, MoreHorizontal } from "lucide-react";
import { posts, prayerTimes, currentUser } from "@/lib/mockData";
import { motion } from "framer-motion";
import patternBg from "@assets/generated_images/subtle_islamic_geometric_pattern_background_in_soft_emerald_and_white.png";

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed Section */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Welcome Hero */}
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 shadow-xl shadow-primary/20">
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: `url(${patternBg})`, backgroundSize: 'cover' }}
            />
            <div className="relative z-10">
              <h1 className="text-3xl font-heading font-bold mb-2">As-salamu alaykum, {currentUser.name.split(' ')[0]}</h1>
              <p className="text-primary-foreground/80 mb-6">May your day be filled with barakah and peace.</p>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="font-serif text-lg italic mb-3">"Verily, with hardship comes ease."</p>
                <p className="text-sm opacity-75 font-medium">— Surah Ash-Sharh (94:6)</p>
              </div>
            </div>
          </div>

          {/* Composer */}
          <Card className="border-none shadow-sm">
            <CardContent className="p-4 flex gap-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <input 
                  type="text" 
                  placeholder="Share a reflection, prayer request, or update..." 
                  className="w-full bg-muted/50 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                <div className="flex justify-end mt-3 gap-2">
                   <Button size="sm" variant="ghost" className="text-xs">
                    📷 Photo
                   </Button>
                   <Button size="sm" className="rounded-full px-6">Post</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feed Items */}
          <div className="space-y-6">
            <h2 className="text-xl font-heading font-semibold text-foreground">Community Feed</h2>
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="flex flex-row items-start justify-between p-4 pb-0">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-sm">{post.author.name}</h3>
                        <p className="text-xs text-muted-foreground">{post.author.handle} • {post.time}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    {post.type === 'prayer_request' && (
                      <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100">
                        🤲 Prayer Request
                      </Badge>
                    )}
                    {post.type === 'announcement' && (
                      <Badge variant="default" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                        📢 Announcement
                      </Badge>
                    )}
                    
                    <p className="text-sm leading-relaxed text-foreground/90">{post.content}</p>
                    
                    {post.image && (
                      <div className="rounded-xl overflow-hidden mt-3">
                        <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[300px]" />
                      </div>
                    )}

                    <div className="flex items-center gap-6 pt-2 text-muted-foreground">
                      <button className="flex items-center gap-1.5 text-sm hover:text-pink-500 transition-colors group">
                        <Heart className="w-4 h-4 group-hover:fill-current" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1.5 text-sm hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="ml-auto text-sm hover:text-foreground transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          {/* Prayer Times Widget */}
          <Card className="bg-card border-none shadow-md overflow-hidden relative">
             <div 
              className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"
            />
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="w-5 h-5 text-primary" />
                Prayer Times
              </CardTitle>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" /> London, UK
              </p>
            </CardHeader>
            <CardContent className="space-y-1">
              {Object.entries(prayerTimes).map(([name, time], idx) => (
                <div 
                  key={name} 
                  className={`flex justify-between items-center p-2.5 rounded-lg ${name === 'asr' ? 'bg-primary text-primary-foreground shadow-sm font-medium' : 'hover:bg-muted/50'}`}
                >
                  <span className="capitalize text-sm">{name}</span>
                  <span className="text-sm font-mono">{time}</span>
                </div>
              ))}
              <div className="pt-4">
                <Button className="w-full" variant="outline">Full Timetable</Button>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Groups */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Suggested Groups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Tech Muslims", members: "1.2k" },
                { name: "Halal Foodies", members: "5.4k" },
                { name: "Charity Run 2025", members: "340" }
              ].map((group) => (
                <div key={group.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold">
                      {group.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{group.name}</p>
                      <p className="text-xs text-muted-foreground">{group.members} members</p>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs text-primary hover:text-primary hover:bg-primary/10">Join</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
