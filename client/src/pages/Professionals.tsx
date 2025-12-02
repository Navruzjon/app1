import Layout from "@/components/layout/Layout";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal } from 'react-native-web';
import { Search, MapPin, Building2, Briefcase, Star, DollarSign, Filter, Globe, Phone, Mail, Lock, Unlock, X, ShieldCheck, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Mock data for professionals
const professionals = [
  {
    id: 1,
    name: "Dr. Sarah Ahmed",
    profession: "Pediatrician",
    rate: "£120/hr",
    location: { city: "London", town: "Wembley", lat: 51.5505, lng: -0.2987 },
    radius: "10 miles",
    mosque: "Wembley Central Masjid",
    rating: 4.9,
    reviews: 124,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&h=200",
    specialties: ["Child Health", "Vaccinations"],
    recentWork: "Led a community vaccination drive for 500+ children.",
    contactHidden: true,
    phone: "+44 7700 900000",
    email: "dr.ahmed@example.com"
  },
  {
    id: 2,
    name: "Yusuf Khan",
    profession: "Electrician",
    rate: "£60/hr",
    location: { city: "Birmingham", town: "Sparkhill", lat: 52.4862, lng: -1.8904 },
    radius: "15 miles",
    mosque: "Sparkbrook Masjid",
    rating: 4.8,
    reviews: 89,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200",
    specialties: ["Wiring", "Lighting", "Emergency Repairs"],
    recentWork: "Installed energy-efficient lighting for the local madrassah.",
    contactHidden: false,
    phone: "+44 7700 900001",
    email: "yusuf.sparks@example.com"
  },
  {
    id: 3,
    name: "Aisha Malik",
    profession: "Math Tutor",
    rate: "£35/hr",
    location: { city: "London", town: "Ilford", lat: 51.5588, lng: 0.0855 },
    radius: "5 miles",
    mosque: "Ilford Islamic Centre",
    rating: 5.0,
    reviews: 45,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200",
    specialties: ["GCSE", "A-Level", "Calculus"],
    recentWork: "Helped 5 students achieve A* in A-Level Maths this year.",
    contactHidden: true,
    phone: "+44 7700 900002",
    email: "aisha.m@example.com"
  },
  {
    id: 4,
    name: "Ibrahim Patel",
    profession: "Legal Consultant",
    rate: "£150/hr",
    location: { city: "Manchester", town: "Cheetham Hill", lat: 53.4808, lng: -2.2426 },
    radius: "National (Remote)",
    mosque: "North Manchester Jamia Mosque",
    rating: 4.7,
    reviews: 210,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200",
    specialties: ["Property Law", "Islamic Wills", "Family Law"],
    recentWork: "Pro bono legal advice clinic for low-income families.",
    contactHidden: true,
    phone: "+44 7700 900003",
    email: "ibrahim.law@example.com"
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

const Button = ({ children, onPress, variant = "primary", style, disabled }: { children: React.ReactNode, onPress?: () => void, variant?: "primary" | "outline" | "ghost" | "secondary", style?: any, disabled?: boolean }) => {
  let bg = "#059669";
  let border = "transparent";
  let textColor = "#ffffff";

  if (variant === "outline") {
    bg = "transparent";
    border = "#e2e8f0";
    textColor = "#0f172a";
  } else if (variant === "ghost") {
    bg = "transparent";
    textColor = "#0f172a";
  } else if (variant === "secondary") {
    bg = "#f1f5f9";
    textColor = "#0f172a";
  }

  if (disabled) {
    bg = "#e2e8f0";
    textColor = "#94a3b8";
  }
  
  return (
    <TouchableOpacity 
      onPress={disabled ? undefined : onPress} 
      style={[styles.button, { backgroundColor: bg, borderColor: border, borderWidth: variant === "outline" ? 1 : 0 }, style]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const Badge = ({ children, variant = "default", style }: { children: React.ReactNode, variant?: string, style?: any }) => {
  const bg = variant === "secondary" ? "#fef3c7" : "#059669";
  const color = variant === "secondary" ? "#b45309" : "#ffffff";
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

export default function Professionals() {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactRequests, setContactRequests] = useState<number[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isLocating, setIsLocating] = useState(false);

  const handleRequestContact = (id: number) => {
    setContactRequests([...contactRequests, id]);
    toast({
      title: "Request Sent",
      description: "The professional has been notified. You will see their details once they approve.",
    });
  };

  const handleNearMe = () => {
    setIsLocating(true);
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported.",
        variant: "destructive"
      });
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setIsLocating(false);
        toast({
          title: "Location Found",
          description: "Showing professionals nearest to you.",
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLocating(false);
      }
    );
  };

  const filteredProfessionals = professionals.filter(pro => 
      pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pro.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      pro.recentWork.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>Community Professionals</Text>
            <Text style={styles.pageSubtitle}>Find trusted experts within your community.</Text>
          </View>
          <RegisterProfessionalDialog />
        </View>

        {/* Search & Filter Bar */}
        <View style={styles.filterBar}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#94a3b8" style={styles.searchIcon} />
            <Input 
              placeholder="Search for doctors, projects, skills..." 
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
          </View>
          <Button variant="outline" style={{ flexDirection: 'row', gap: 8 }}>
            <Filter size={16} color="#0f172a" /> <Text>Filters</Text>
          </Button>
          <Button 
            variant={userLocation ? "primary" : "outline"} 
            onPress={handleNearMe}
            style={{ flexDirection: 'row', gap: 8 }}
            disabled={isLocating}
          >
            {isLocating ? <Text style={{ color: '#000' }}>...</Text> : <MapPin size={16} color={userLocation ? "#fff" : "#0f172a"} />} 
            <Text>{userLocation ? "Near Me (Active)" : "Near Me"}</Text>
          </Button>
        </View>

        {/* Professionals Grid */}
        <View style={styles.grid}>
          {filteredProfessionals.map((pro) => {
             const isPending = contactRequests.includes(pro.id);

             return (
            <Card key={pro.id} style={styles.proCard}>
              <CardHeader style={{ flexDirection: 'row', gap: 16, alignItems: 'flex-start' }}>
                <Image 
                  source={{ uri: pro.avatar }} 
                  style={styles.avatar}
                />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text numberOfLines={1} style={styles.proName}>{pro.name}</Text>
                    <Badge variant="secondary" style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                      <Star size={12} color="#b45309" fill="currentColor" />
                      <Text style={{ fontSize: 12, color: '#b45309' }}>{pro.rating} ({pro.reviews})</Text>
                    </Badge>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                    <Briefcase size={12} color="#059669" style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 14, color: '#059669', fontWeight: '500' }}>{pro.profession}</Text>
                  </View>
                </View>
              </CardHeader>
              
              <CardContent style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                  {pro.specialties.map(tag => (
                    <View key={tag} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.recentWorkBox}>
                  <Text style={styles.recentWorkLabel}>Recent Work</Text>
                  <Text numberOfLines={2} style={styles.recentWorkText}>"{pro.recentWork}"</Text>
                </View>

                <View style={styles.detailsList}>
                   <View style={styles.detailRow}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <DollarSign size={16} color="#64748b" style={{ marginRight: 6 }} /> 
                        <Text style={styles.detailLabel}>Rate</Text>
                      </View>
                      <Text style={styles.detailValue}>{pro.rate}</Text>
                   </View>
                   <View style={styles.detailRow}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MapPin size={16} color="#64748b" style={{ marginRight: 6 }} /> 
                        <Text style={styles.detailLabel}>Location</Text>
                      </View>
                      <Text style={styles.detailValue}>{pro.location.town}, {pro.location.city}</Text>
                   </View>
                   <View style={styles.detailRow}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Globe size={16} color="#64748b" style={{ marginRight: 6 }} /> 
                        <Text style={styles.detailLabel}>Radius</Text>
                      </View>
                      <Text style={styles.detailValue}>{pro.radius}</Text>
                   </View>
                   <View style={styles.detailRow}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Building2 size={16} color="#64748b" style={{ marginRight: 6 }} /> 
                        <Text style={styles.detailLabel}>Masjid</Text>
                      </View>
                      <Text numberOfLines={1} style={[styles.detailValue, { maxWidth: 150 }]}>{pro.mosque}</Text>
                   </View>
                </View>

                {/* Contact Details Section */}
                {!pro.contactHidden ? (
                  <View style={styles.contactBox}>
                    <View style={styles.contactRow}>
                      <Phone size={12} color="#166534" style={{ marginRight: 6 }} /> 
                      <Text style={styles.contactText}>{pro.phone}</Text>
                    </View>
                    <View style={styles.contactRow}>
                      <Mail size={12} color="#166534" style={{ marginRight: 6 }} /> 
                      <Text style={styles.contactText}>{pro.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                      <Unlock size={12} color="#16a34a" style={{ marginRight: 4 }} /> 
                      <Text style={{ fontSize: 10, color: '#16a34a' }}>Contact details revealed</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.hiddenContactBox}>
                    <Lock size={12} color="#64748b" style={{ marginRight: 6 }} /> 
                    <Text style={{ fontSize: 12, color: '#64748b' }}>Contact details hidden</Text>
                  </View>
                )}
              </CardContent>
              
              <CardFooter style={{ flexDirection: 'row', gap: 8 }}>
                {pro.contactHidden ? (
                   <Button 
                    style={{ flex: 1 }} 
                    disabled={isPending} 
                    variant={isPending ? "secondary" : "primary"}
                    onPress={() => !isPending && handleRequestContact(pro.id)}
                  >
                     {isPending ? "Request Sent" : "Request Contact"}
                   </Button>
                ) : (
                   <Button style={{ flex: 1, backgroundColor: '#16a34a' }}>Call Now</Button>
                )}
                <RateProfessionalDialog professional={pro} />
              </CardFooter>
            </Card>
          );
          })}
        </View>
      </View>
    </Layout>
  );
}

function RateProfessionalDialog({ professional }: { professional: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outline" onPress={() => setIsOpen(true)}>
        <Star size={16} color="#0f172a" />
      </Button>

      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Rate {professional.name}</Text>
                <Text style={styles.modalDescription}>Share your experience with this professional.</Text>
              </View>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.modalBody}>
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                 <Text style={styles.label}>Your Rating</Text>
                 <View style={{ flexDirection: 'row', gap: 8 }}>
                   {[1, 2, 3, 4, 5].map((star) => (
                     <TouchableOpacity key={star} onPress={() => setRating(star)}>
                       <Star 
                         size={32} 
                         color={star <= rating ? "#fbbf24" : "#e2e8f0"} 
                         fill={star <= rating ? "#fbbf24" : "none"}
                       />
                     </TouchableOpacity>
                   ))}
                 </View>
              </View>

              <View style={{ marginBottom: 20 }}>
                <Text style={styles.label}>Review</Text>
                <Input placeholder="Was the service professional? timely? Describe your experience..." multiline numberOfLines={4} style={{ height: 100, textAlignVertical: 'top', paddingTop: 10 }} />
              </View>

              <Button onPress={handleSubmit} disabled={rating === 0}>Submit Review</Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

function RegisterProfessionalDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = () => {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    toast({
      title: "Welcome to the Professional Network!",
      description: "Your subscription is active and profile is live.",
    });
    setOpen(false);
    setStep(1);
  };

  return (
    <>
      <Button onPress={() => setOpen(true)} style={{ flexDirection: 'row', gap: 8 }}>
        <Briefcase size={16} color="#ffffff" /> <Text style={{ color: '#ffffff', fontWeight: '600' }}>List Your Service</Text>
      </Button>

      <Modal
        visible={open}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {step === 1 && "Professional Registration"}
                  {step === 2 && "Choose Your Plan"}
                  {step === 3 && "Secure Payment"}
                </Text>
                <Text style={styles.modalDescription}>
                  {step === 1 && "Share your expertise with the community."}
                  {step === 2 && "Join the trusted network of community professionals."}
                  {step === 3 && "Complete your subscription to go live."}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              {step === 1 && (
                <View>
                  <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.label}>Profession/Title</Text>
                      <Input placeholder="e.g. Plumber" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.label}>Rate / Price</Text>
                      <Input placeholder="e.g. £50/hr" />
                    </View>
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={styles.label}>Specialties</Text>
                    <Input placeholder="e.g. Emergency repairs" />
                  </View>
                  <View style={{ flexDirection: 'row', gap: 16 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.label}>City</Text>
                      <Input placeholder="e.g. London" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.label}>Affiliated Masjid</Text>
                      <Input placeholder="Closest Masjid" />
                    </View>
                  </View>
                </View>
              )}

              {step === 2 && (
                <View>
                  <View style={styles.planCard}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                      <View>
                        <Text style={styles.planTitle}>Professional Tier</Text>
                        <Text style={styles.planDesc}>For serious experts.</Text>
                      </View>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={styles.planPrice}>$5.00</Text>
                        <Text style={styles.planPeriod}>/month</Text>
                      </View>
                    </View>
                    <View style={{ gap: 8 }}>
                      {["Verified Professional Badge", "Unlimited Client Leads", "Featured in Search"].map(f => (
                        <View key={f} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                          <Check size={16} color="#059669" />
                          <Text style={{ fontSize: 14 }}>{f}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              )}

              {step === 3 && (
                <View>
                  <View style={styles.summaryBox}>
                    <Text style={{ fontWeight: '500' }}>Professional Tier Subscription</Text>
                    <Text style={{ fontWeight: 'bold' }}>$5.00</Text>
                  </View>
                  
                  <View style={{ marginBottom: 16 }}>
                    <Text style={styles.label}>Name on Card</Text>
                    <Input placeholder="Ahmed Hassan" />
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={styles.label}>Card Number</Text>
                    <Input placeholder="0000 0000 0000 0000" />
                  </View>
                  <View style={{ flexDirection: 'row', gap: 16 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.label}>Expiry</Text>
                      <Input placeholder="MM/YY" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.label}>CVC</Text>
                      <Input placeholder="123" />
                    </View>
                  </View>
                </View>
              )}
            </View>

            <View style={styles.modalFooter}>
              <Button variant="ghost" onPress={() => step > 1 ? setStep(step - 1) : setOpen(false)} style={{ marginRight: 8 }}>
                {step > 1 ? "Back" : "Cancel"}
              </Button>
              <Button onPress={handleSubmit}>
                {step === 1 ? "Next: Select Plan" : step === 2 ? "Next: Payment" : "Pay & Join"}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  filterBar: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  searchContainer: {
    flex: 1,
    minWidth: 200,
    position: 'relative',
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  proCard: {
    flex: 1,
    minWidth: 320,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#f1f5f9',
  },
  proName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  tag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: '#64748b',
  },
  recentWorkBox: {
    backgroundColor: 'rgba(241, 245, 249, 0.5)',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    marginBottom: 16,
  },
  recentWorkLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  recentWorkText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#0f172a',
  },
  detailsList: {
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    paddingTop: 16,
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    color: '#64748b',
    fontSize: 14,
  },
  detailValue: {
    fontWeight: '500',
    color: '#0f172a',
    fontSize: 14,
  },
  contactBox: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#dcfce7',
    padding: 12,
    borderRadius: 8,
    gap: 4,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
    color: '#166534',
  },
  hiddenContactBox: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
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
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '100%',
    maxWidth: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  modalDescription: { fontSize: 14, color: '#64748b' },
  modalBody: { padding: 20 },
  modalFooter: { padding: 20, paddingTop: 0, flexDirection: 'row', justifyContent: 'flex-end' },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 6, color: '#0f172a' },
  planCard: {
    borderWidth: 2,
    borderColor: '#059669',
    backgroundColor: '#ecfdf5',
    borderRadius: 12,
    padding: 16,
  },
  planTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  planDesc: { fontSize: 12, color: '#64748b' },
  planPrice: { fontSize: 20, fontWeight: 'bold', color: '#0f172a' },
  planPeriod: { fontSize: 12, color: '#64748b' },
  summaryBox: {
    backgroundColor: '#f1f5f9',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});
