import { Link, useLocation } from "wouter";
import { Home, User, Users, BookOpen, Moon, Settings, Menu, X, Heart, Bell, Check, Briefcase, Calendar, Star } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser, notifications } from "@/lib/mockData";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Users, label: "Groups", href: "/groups" },
    { icon: Calendar, label: "Events", href: "/events" },
    { icon: BookOpen, label: "Resources", href: "/resources" },
    { icon: Briefcase, label: "Professionals", href: "/professionals" },
    { icon: Moon, label: "Prayer & Qibla", href: "/prayer" },
    { icon: Heart, label: "Charity", href: "/charity" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  const NotificationsPopover = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          {notifications.some(n => !n.read) && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-background" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b border-border">
          <h4 className="font-semibold leading-none">Notifications</h4>
          <p className="text-xs text-muted-foreground mt-1">You have {notifications.filter(n => !n.read).length} unread messages.</p>
        </div>
        <ScrollArea className="h-80">
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 flex gap-3 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}>
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!notification.read ? 'bg-primary' : 'bg-transparent'}`} />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <p className="text-[10px] text-muted-foreground pt-1">{notification.time}</p>
                </div>
                {notification.read && <Check className="w-3 h-3 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-2 border-t border-border">
           <Button variant="ghost" size="sm" className="w-full text-xs">Mark all as read</Button>
        </div>
      </PopoverContent>
    </Popover>
  );

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-xl shadow-lg shadow-primary/20">
          UL
        </div>
        <span className="font-heading font-bold text-2xl text-foreground tracking-tight">UmmahLink</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <a
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 font-medium"
                      : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }
                `}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"}`} />
                <span>{item.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer transition-colors">
          <Avatar className="h-10 w-10 border-2 border-background">
            <AvatarImage src={currentUser.avatar} />
            <AvatarFallback>AH</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-foreground">{currentUser.name}</p>
            <p className="text-xs text-muted-foreground truncate">{currentUser.handle}</p>
          </div>
          <Settings className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 lg:w-72 border-r border-sidebar-border bg-sidebar fixed inset-y-0 left-0 z-30">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-background/80 backdrop-blur-md border-b border-border z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-heading font-bold text-lg">
            UL
          </div>
          <span className="font-heading font-bold text-xl">UmmahLink</span>
        </div>
        
        <div className="flex items-center gap-2">
          <NotificationsPopover />
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72 bg-sidebar border-r border-sidebar-border">
              <NavContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 lg:ml-72 pt-16 md:pt-0 min-h-screen transition-all duration-300 ease-in-out relative">
        {/* Desktop Notification Bell (Floating Top Right) */}
        <div className="hidden md:block absolute top-6 right-8 z-20">
           <NotificationsPopover />
        </div>
        
        <div className="max-w-5xl mx-auto p-4 md:p-8 animate-in fade-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
