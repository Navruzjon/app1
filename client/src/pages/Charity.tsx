import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { charityCauses } from "@/lib/mockData";
import { Heart, TrendingUp, Users, ShieldCheck, CreditCard, ExternalLink, Info, FileText, AlertCircle, CheckCircle2, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Charity() {
  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Charity & Sadaqah</h1>
            <p className="text-muted-foreground mt-1">Make a lasting impact. "Charity does not decrease wealth."</p>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="gap-2">
               <TrendingUp className="w-4 h-4" /> My Impact
             </Button>
          </div>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-primary text-primary-foreground border-none shadow-lg">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-sm">Total Donated</p>
                <p className="text-2xl font-bold font-mono">£1,250.00</p>
              </div>
            </CardContent>
          </Card>
           <Card className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Lives Impacted</p>
                <p className="text-2xl font-bold font-mono text-foreground">45</p>
              </div>
            </CardContent>
          </Card>
           <Card className="border-none shadow-sm">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Projects Supported</p>
                <p className="text-2xl font-bold font-mono text-foreground">8</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Projects */}
        <div>
          <h2 className="text-xl font-heading font-semibold mb-6">Active Campaigns</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {charityCauses.map((cause) => (
              <Card key={cause.id} className="group overflow-hidden border-none shadow-sm hover:shadow-md transition-all duration-200 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={cause.image} 
                    alt={cause.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                   <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-md border-none">
                    {cause.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        {cause.organization}
                        {/* @ts-ignore */}
                        {cause.verificationStatus === 'verified' && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <CheckCircle2 className="w-3 h-3 text-blue-500 fill-blue-100" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Verified 501(c)(3) Organization</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </p>
                      {/* @ts-ignore */}
                      <span className="text-[10px] text-muted-foreground/70 mt-0.5">Reg: {cause.registrationNumber}</span>
                    </div>
                    
                    {/* Rating Badge */}
                    {/* @ts-ignore */}
                    {cause.rating && (
                      <Badge variant="secondary" className={`gap-1 ${/* @ts-ignore */ cause.transparencyScore > 90 ? "bg-green-50 text-green-700 border-green-100" : "bg-amber-50 text-amber-700 border-amber-100"}`}>
                        <Star className="w-3 h-3 fill-current" />
                        {/* @ts-ignore */}
                        {cause.rating}
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{cause.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-2 space-y-4">
                  <p className="text-sm text-muted-foreground">{cause.description}</p>
                  
                  {/* Transparency & Verification Info */}
                  <div className="bg-muted/30 p-3 rounded-lg border border-border/50 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Entity:
                      </span>
                      {/* @ts-ignore */}
                      <span className="font-medium truncate max-w-[150px]" title={cause.entityName}>{cause.entityName}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Info className="w-3 h-3" /> Transparency:
                      </span>
                      {/* @ts-ignore */}
                      <span className={`font-medium ${cause.transparencyScore >= 90 ? "text-green-600" : "text-amber-600"}`}>
                        {/* @ts-ignore */}
                        {cause.transparencyScore}% Score
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-primary">£{cause.raised.toLocaleString()} raised</span>
                      <span className="text-muted-foreground">of £{cause.target.toLocaleString()}</span>
                    </div>
                    <Progress value={(cause.raised / cause.target) * 100} className="h-2 bg-muted" />
                  </div>
                </CardContent>
                <CardFooter className="pt-4 gap-2 flex-col sm:flex-row">
                  <DonateModal cause={cause} />
                  {/* @ts-ignore */}
                  {cause.projectLink && (
                    <Button variant="outline" className="w-full sm:w-auto" asChild>
                      {/* @ts-ignore */}
                      <a href={cause.projectLink} target="_blank" rel="noopener noreferrer" className="gap-2">
                        View Project <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function DonateModal({ cause }: { cause: any }) {
  const [amount, setAmount] = useState("");
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Donate Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Donate to {cause.title}</DialogTitle>
          <DialogDescription>
            Your donation helps {cause.organization} reach their goal.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-3 gap-2">
            {[10, 50, 100].map((val) => (
              <Button 
                key={val} 
                variant="outline" 
                onClick={() => setAmount(val.toString())}
                className={amount === val.toString() ? "border-primary bg-primary/5 text-primary" : ""}
              >
                £{val}
              </Button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-muted-foreground">£</span>
            <Input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Other amount" 
              className="pl-8"
            />
          </div>
        </div>

        <Button className="w-full gap-2" size="lg">
          <CreditCard className="w-4 h-4" /> Pay Securely
        </Button>
        
        <p className="text-xs text-center text-muted-foreground mt-2 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3 h-3" /> Secure 128-bit SSL Encrypted
        </p>
      </DialogContent>
    </Dialog>
  );
}
