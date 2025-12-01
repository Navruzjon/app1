import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PlayCircle, FileText, Download, Search, Clock } from "lucide-react";
import { resources } from "@/lib/mockData";

export default function Resources() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="bg-sidebar-primary text-primary-foreground rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Knowledge is Light</h1>
            <p className="text-primary-foreground/80 text-lg mb-8">Access curated Islamic lectures, articles, and books to deepen your understanding and strengthen your faith.</p>
            <div className="flex gap-2 max-w-md bg-background/10 backdrop-blur-md p-1 rounded-xl border border-white/20">
              <Search className="w-5 h-5 text-primary-foreground ml-3 mt-3" />
              <input 
                type="text" 
                placeholder="Search library..." 
                className="bg-transparent border-none text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none w-full p-2"
              />
            </div>
          </div>
          {/* Abstract decorative circles */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -right-10 -bottom-20 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl" />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-heading font-semibold">Featured Resources</h2>
            <Button variant="link" className="text-primary">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className="group border-none shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={resource.thumbnail} 
                    alt={resource.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-md border-none">
                    {resource.type}
                  </Badge>
                  <div className="absolute bottom-3 right-3">
                     <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                        {resource.type === 'Series' ? <PlayCircle className="w-5 h-5" /> : 
                         resource.type === 'PDF' ? <Download className="w-5 h-5" /> : 
                         <FileText className="w-5 h-5" />}
                     </div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{resource.author}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {resource.duration}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Categories Grid */}
        <div>
            <h2 className="text-xl font-heading font-semibold mb-6">Browse Topics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {['Aqeedah', 'Fiqh', 'History', 'Quran', 'Hadith', 'Spirituality', 'Family', 'Finance', 'Social Issues', 'Dua', 'Arabic', 'New Muslims'].map(topic => (
                    <div key={topic} className="aspect-square rounded-2xl bg-muted/50 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:text-primary cursor-pointer transition-all">
                        <span className="font-medium">{topic}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </Layout>
  );
}
