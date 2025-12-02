import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Groups from "@/pages/Groups";
import Resources from "@/pages/Resources";
import Prayer from "@/pages/Prayer";
import Charity from "@/pages/Charity";
import Professionals from "@/pages/Professionals";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/groups" component={Groups} />
      <Route path="/professionals" component={Professionals} />
      <Route path="/resources" component={Resources} />
      <Route path="/prayer" component={Prayer} />
      <Route path="/charity" component={Charity} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
