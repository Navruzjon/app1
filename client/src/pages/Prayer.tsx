import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prayerTimes } from "@/lib/mockData";
import { Compass, Clock, Calendar as CalendarIcon, MapPin, Moon } from "lucide-react";
import { format } from "date-fns";

export default function Prayer() {
  const today = new Date();
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-heading font-bold">Prayer Times</h1>
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" /> London, United Kingdom
          </p>
          <p className="font-medium text-primary">{format(today, "EEEE, d MMMM yyyy")} • 14 Rajab 1446</p>
        </div>

        {/* Main Countdown Card */}
        <Card className="bg-primary text-primary-foreground border-none shadow-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('/attached_assets/generated_images/subtle_islamic_geometric_pattern_background_in_soft_emerald_and_white.png')] opacity-10 bg-cover bg-center" />
          <CardContent className="p-8 md:p-12 text-center relative z-10">
            <p className="text-primary-foreground/80 font-medium mb-2">Next Prayer: Asr</p>
            <div className="text-6xl md:text-8xl font-bold font-mono tracking-tight mb-4">
              02:14:32
            </div>
            <p className="text-lg opacity-90">Begins at {prayerTimes.asr}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Timetable */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {Object.entries(prayerTimes).map(([name, time]) => (
                  <div key={name} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                    <span className="capitalize font-medium flex items-center gap-3">
                      {name === 'fajr' || name === 'isha' || name === 'maghrib' ? <Moon className="w-4 h-4 text-muted-foreground" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                      {name}
                    </span>
                    <span className="font-mono font-semibold bg-muted px-3 py-1 rounded-md">{time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Qibla */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary" /> Qibla Direction
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="w-48 h-48 rounded-full border-8 border-muted relative flex items-center justify-center shadow-inner bg-muted/20">
                {/* Compass Needles */}
                <div className="absolute inset-0 flex items-center justify-center rotate-[119deg]">
                   <div className="w-1 h-20 bg-red-500 absolute -top-6 rounded-full shadow-sm" />
                   <div className="w-3 h-3 bg-foreground rounded-full z-10" />
                </div>
                <div className="text-center">
                   <span className="text-3xl font-bold block">119°</span>
                   <span className="text-xs text-muted-foreground uppercase tracking-widest">South East</span>
                </div>
                
                {/* Cardinal Points */}
                <span className="absolute top-2 font-bold text-muted-foreground text-xs">N</span>
                <span className="absolute bottom-2 font-bold text-muted-foreground text-xs">S</span>
                <span className="absolute left-2 font-bold text-muted-foreground text-xs">W</span>
                <span className="absolute right-2 font-bold text-muted-foreground text-xs">E</span>
              </div>
              <p className="mt-6 text-sm text-center text-muted-foreground">
                Align the arrow with the Kaaba icon to find Qibla.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
