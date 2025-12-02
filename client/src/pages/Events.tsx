import Layout from "@/components/layout/Layout";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native-web';
import { Search, MapPin, Clock, Calendar as CalendarIcon, Users, Share2, Ticket } from "@/components/ui/Icons";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Annual Community Iftar",
    date: new Date(2025, 2, 15), // March 15, 2025
    time: "17:30 - 20:00",
    location: "Central Park Pavilion",
    attendees: 145,
    category: "Social",
    image: "/attached_assets/generated_images/community_iftar_gathering_outdoors.png",
    price: "Free",
    description: "Join us for our biggest community gathering of the year. Bring a dish to share!"
  },
  {
    id: 2,
    title: "Calligraphy Masterclass",
    date: new Date(2025, 2, 18),
    time: "14:00 - 16:00",
    location: "Art Center, Studio B",
    attendees: 12,
    category: "Workshop",
    image: "/attached_assets/generated_images/islamic_calligraphy_workshop.png",
    price: "£25",
    description: "Learn the basics of Thuluth script with Master Calligrapher Hisham."
  },
  {
    id: 3,
    title: "Youth Soccer Tournament",
    date: new Date(2025, 2, 20),
    time: "09:00 - 14:00",
    location: "City Sports Complex",
    attendees: 60,
    category: "Sports",
    image: "/attached_assets/generated_images/youth_sports_day_soccer.png",
    price: "£5/team",
    description: "Annual 5-a-side tournament for ages 12-16. Prizes for winners!"
  },
  {
    id: 4,
    title: "Fiqh of Finance Seminar",
    date: new Date(2025, 2, 22),
    time: "18:30 - 20:30",
    location: "East London Mosque Hall",
    attendees: 85,
    category: "Education",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=500&q=60",
    price: "Free",
    description: "Understanding modern finance through an Islamic perspective."
  }
];

// Reusable Components
const Card = ({ children, style }: { children: React.ReactNode, style?: any }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const CardHeader = ({ children, style }: { children: React.ReactNode, style?: any }) => (
  <View style={[styles.cardHeader, style]}>{children}</View>
);

const CardTitle = ({ children, style }: { children: React.ReactNode, style?: any }) => (
  <Text style={[styles.cardTitle, style]}>{children}</Text>
);

const CardContent = ({ children, style }: { children: React.ReactNode, style?: any }) => (
  <View style={[styles.cardContent, style]}>{children}</View>
);

const CardFooter = ({ children, style }: { children: React.ReactNode, style?: any }) => (
  <View style={[styles.cardFooter, style]}>{children}</View>
);

const Button = ({ children, onPress, variant = "primary", style, size = "default" }: { children: React.ReactNode, onPress?: () => void, variant?: "primary" | "outline" | "ghost", style?: any, size?: "default" | "icon" }) => {
  const bg = variant === "primary" ? "#0f172a" : "transparent";
  const border = variant === "outline" ? "#e2e8f0" : "transparent";
  const textColor = variant === "primary" ? "#ffffff" : "#0f172a";
  
  const padding = size === "icon" ? 8 : 16;
  
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, { backgroundColor: bg, borderColor: border, borderWidth: variant === "outline" ? 1 : 0, paddingHorizontal: padding }, style]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const Badge = ({ children, variant = "default", style }: { children: React.ReactNode, variant?: string, style?: any }) => {
  const bg = variant === "secondary" ? "#f1f5f9" : "#0f172a";
  const color = variant === "secondary" ? "#0f172a" : "#ffffff";
  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[styles.badgeText, { color }]}>{children}</Text>
    </View>
  );
};

const Input = ({ value, onChangeText, placeholder, style, ...props }: any) => (
  <TextInput
    value={value}
    onChangeText={onChangeText}
    placeholder={placeholder}
    style={[styles.input, style]}
    placeholderTextColor="#94a3b8"
    {...props}
  />
);

export default function Events() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>Community Events</Text>
            <Text style={styles.pageSubtitle}>Gather, learn, and celebrate together.</Text>
          </View>
          <Button style={{ flexDirection: 'row', gap: 8 }}>
            <CalendarIcon size={16} color="#ffffff" /> <Text style={{ color: '#ffffff' }}>Host Event</Text>
          </Button>
        </View>

        <View style={styles.layoutGrid}>
          {/* Main Feed */}
          <View style={styles.mainFeed}>
            {/* Search */}
            <View style={styles.searchContainer}>
              <Search size={20} color="#94a3b8" style={styles.searchIcon} />
              <Input 
                placeholder="Search events..." 
                style={styles.searchInput}
              />
            </View>

            {/* Tabs */}
            <View style={styles.tabsList}>
              {["Upcoming", "Popular", "My Events"].map((tab) => {
                const key = tab.toLowerCase().replace(' ', '-');
                const isActive = activeTab === key;
                return (
                  <TouchableOpacity 
                    key={key}
                    onPress={() => setActiveTab(key)}
                    style={[styles.tabTrigger, isActive && styles.tabTriggerActive]}
                  >
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={{ gap: 24 }}>
              {activeTab === 'upcoming' && events.map((event) => (
                <Card key={event.id} style={styles.eventCard}>
                  <View style={styles.imageWrapper}>
                    <Image 
                      source={{ uri: event.image }} 
                      style={styles.eventImage}
                    />
                    <View style={styles.dateBadge}>
                      <Text style={styles.dateMonth}>{event.date.toLocaleString('default', { month: 'short' })}</Text>
                      <Text style={styles.dateDay}>{event.date.getDate()}</Text>
                    </View>
                  </View>
                  
                  <View style={{ flex: 1 }}>
                    <CardHeader style={{ paddingBottom: 8 }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                        <Badge variant="secondary">
                          <Text>{event.category}</Text>
                        </Badge>
                        <Text style={{ fontWeight: '600', color: '#059669' }}>{event.price}</Text>
                      </View>
                      <CardTitle>{event.title}</CardTitle>
                      <Text numberOfLines={2} style={styles.eventDesc}>{event.description}</Text>
                    </CardHeader>
                    
                    <CardContent style={{ flex: 1 }}>
                      <View style={{ gap: 6 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Clock size={16} color="#64748b" style={{ marginRight: 8 }} /> 
                          <Text style={styles.detailText}>{event.time}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <MapPin size={16} color="#64748b" style={{ marginRight: 8 }} /> 
                          <Text style={styles.detailText}>{event.location}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Users size={16} color="#64748b" style={{ marginRight: 8 }} /> 
                          <Text style={styles.detailText}>{event.attendees} attending</Text>
                        </View>
                      </View>
                    </CardContent>
                    
                    <CardFooter style={{ flexDirection: 'row', gap: 8 }}>
                      <Button style={{ flex: 1, flexDirection: 'row', gap: 8 }}>
                        <Ticket size={16} color="#ffffff" /> <Text style={{ color: '#ffffff' }}>RSVP</Text>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 size={16} color="#0f172a" />
                      </Button>
                    </CardFooter>
                  </View>
                </Card>
              ))}
              {activeTab !== 'upcoming' && (
                <View style={{ padding: 40, alignItems: 'center' }}>
                  <Text style={{ color: '#94a3b8' }}>No events found.</Text>
                </View>
              )}
            </View>
          </View>

          {/* Sidebar */}
          <View style={styles.sidebar}>
            <Card style={styles.sidebarCard}>
              <CardHeader>
                <CardTitle>Host an Event</CardTitle>
              </CardHeader>
              <CardContent>
                <Text style={{ color: '#64748b', marginBottom: 16 }}>Organize a meetup, lecture, or charity drive for the community.</Text>
                <Button variant="outline" style={{ width: '100%' }}>Create Event</Button>
              </CardContent>
            </Card>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    maxWidth: 1024,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 32,
    flexWrap: 'wrap',
    gap: 16,
  },
  pageTitle: { fontSize: 30, fontWeight: 'bold', color: '#0f172a', marginBottom: 4 },
  pageSubtitle: { fontSize: 16, color: '#64748b' },
  layoutGrid: {
    flexDirection: 'row',
    gap: 32,
    flexWrap: 'wrap',
  },
  mainFeed: {
    flex: 1,
    minWidth: 300,
  },
  sidebar: {
    width: 300,
    display: 'none', // Hide on mobile default
    // @ts-ignore
    '@media (min-width: 1024px)': {
      display: 'flex',
    },
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1,
  },
  searchInput: {
    paddingLeft: 48,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    fontSize: 16,
  },
  tabsList: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  tabTrigger: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tabTriggerActive: {
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
  },
  tabText: {
    color: '#64748b',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#0f172a',
  },
  eventCard: {
    flexDirection: 'row',
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    width: 200,
    height: 200,
    position: 'relative',
    // On mobile stack it
    flexGrow: 1,
  },
  eventImage: {
    width: '100%',
    height: '100%',
  },
  dateBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    minWidth: 50,
  },
  dateMonth: { fontSize: 10, fontWeight: 'bold', color: '#059669', textTransform: 'uppercase' },
  dateDay: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  eventDesc: { fontSize: 14, color: '#64748b', marginTop: 4 },
  detailText: { fontSize: 14, color: '#64748b' },
  sidebarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  // Shared
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardHeader: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#0f172a' },
  cardContent: { padding: 16, paddingTop: 0 },
  cardFooter: { padding: 16, borderTopWidth: 1, borderTopColor: '#f1f5f9' },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: { fontWeight: '500', fontSize: 14 },
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start' },
  badgeText: { fontSize: 12, fontWeight: '500' },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ffffff',
    fontSize: 14,
  },
});
