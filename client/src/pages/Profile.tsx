import Layout from "@/components/layout/Layout";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal, Switch } from 'react-native-web';
import { currentUser } from "@/lib/mockData";
import { MapPin, Calendar, Award, Book, Heart, Star, Shield, UserCog, X } from "lucide-react-native";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

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

const Button = ({ children, onPress, variant = "primary", style, size = "default" }: { children: React.ReactNode, onPress?: () => void, variant?: "primary" | "outline" | "ghost", style?: any, size?: "default" | "icon" }) => {
  const bg = variant === "primary" ? "#0f172a" : "transparent";
  const border = variant === "outline" ? "#e2e8f0" : "transparent";
  const textColor = variant === "primary" ? "#ffffff" : "#0f172a";
  
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, { backgroundColor: bg, borderColor: border, borderWidth: variant === "outline" ? 1 : 0 }, style]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const Badge = ({ children, variant = "default", style }: { children: React.ReactNode, variant?: string, style?: any }) => {
  const bg = variant === "secondary" ? "#f1f5f9" : "#0f172a";
  const color = variant === "secondary" ? "#0f172a" : "#ffffff";
  const border = variant === "outline" ? "#e2e8f0" : "transparent";
  
  return (
    <View style={[styles.badge, { backgroundColor: variant === "outline" ? "transparent" : bg, borderColor: border, borderWidth: variant === "outline" ? 1 : 0 }, style]}>
      <Text style={[styles.badgeText, { color: variant === "outline" ? "#0f172a" : color }]}>{children}</Text>
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

export default function Profile() {
  const [privacySettings, setPrivacySettings] = useState({
    useNickname: false,
    nickname: "Ahmed_99",
    showFullName: true
  });
  const [activeTab, setActiveTab] = useState("journey");

  return (
    <Layout>
      <View style={styles.container}>
        {/* Profile Header */}
        <View style={{ marginBottom: 32 }}>
          {/* Cover Image */}
          <View style={styles.coverImage}>
             <View style={styles.coverOverlay} />
          </View>
          
          {/* Profile Info Overlay */}
          <View style={styles.profileInfoContainer}>
            <View style={styles.profileHeaderContent}>
              <View style={{ position: 'relative' }}>
                <Image 
                  source={{ uri: currentUser.avatar }} 
                  style={styles.avatar}
                />
                <View style={styles.onlineIndicator} />
              </View>
              
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>
                  {privacySettings.useNickname ? privacySettings.nickname : currentUser.name}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <Text style={styles.profileHandle}>{currentUser.handle}</Text>
                  {privacySettings.useNickname && (
                    <Badge variant="outline" style={{ flexDirection: 'row', gap: 4 }}>
                      <Shield size={12} color="#0f172a" /> <Text>Private Mode</Text>
                    </Badge>
                  )}
                </View>
                <View style={styles.metaRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <MapPin size={14} color="#64748b" style={{ marginRight: 4 }} /> 
                    <Text style={styles.metaText}>{currentUser.location}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Calendar size={14} color="#64748b" style={{ marginRight: 4 }} /> 
                    <Text style={styles.metaText}>Joined Dec 2023</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.actionButtons}>
                <EditProfileDialog settings={privacySettings} onSave={setPrivacySettings} />
                <Button variant="outline">Share</Button>
              </View>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.grid}>
          {/* Left Column - Info */}
          <View style={styles.leftColumn}>
            <Card style={styles.infoCard}>
              <CardHeader>
                <CardTitle style={{ fontSize: 16 }}>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <Text style={styles.bioText}>
                  {currentUser.bio}
                </Text>
                
                <View style={{ marginTop: 24 }}>
                  <Text style={styles.sectionHeader}>Interests</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {currentUser.interests.map(tag => (
                      <Badge key={tag} variant="secondary">
                        <Text>{tag}</Text>
                      </Badge>
                    ))}
                  </View>
                </View>
              </CardContent>
            </Card>

             <Card style={styles.infoCard}>
              <CardHeader>
                <CardTitle style={{ fontSize: 16, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Award size={20} color="#f59e0b" /> Impact Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <View style={styles.statRow}>
                   <Text style={styles.statLabel}>Prayers on Time</Text>
                   <Text style={styles.statValue}>{currentUser.stats.prayers}%</Text>
                </View>
                <View style={styles.statRow}>
                   <Text style={styles.statLabel}>Quran Read (Juz)</Text>
                   <Text style={styles.statValue}>{currentUser.stats.quran}</Text>
                </View>
                <View style={[styles.statRow, { borderBottomWidth: 0 }]}>
                   <Text style={styles.statLabel}>Charity Given</Text>
                   <Text style={styles.statValue}>£{currentUser.stats.charity}</Text>
                </View>
              </CardContent>
            </Card>
          </View>

          {/* Right Column - Feed/Tabs */}
          <View style={styles.rightColumn}>
            <View style={styles.tabsList}>
              {["Faith Journey", "Posts", "Groups"].map((tab) => {
                const key = tab === "Faith Journey" ? "journey" : tab.toLowerCase();
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

             {activeTab === 'journey' && (
                <View style={styles.timelineContainer}>
                  {/* Timeline Item */}
                  <View style={styles.timelineItem}>
                    <View style={styles.timelineIconBox}>
                       <Book size={16} color="#0f172a" />
                    </View>
                    <Card style={styles.timelineCard}>
                      <CardContent style={{ padding: 20 }}>
                        <Text style={styles.timelineDate}>2 Days Ago</Text>
                        <Text style={styles.timelineTitle}>Completed Juz 28</Text>
                        <Text style={styles.timelineText}>Reflecting on Surah Al-Mujadila. The themes of Allah's omniscience really resonated with me today.</Text>
                      </CardContent>
                    </Card>
                  </View>

                   {/* Timeline Item */}
                   <View style={styles.timelineItem}>
                    <View style={[styles.timelineIconBox, { borderColor: '#d97706', backgroundColor: '#fef3c7' }]}>
                       <Heart size={16} color="#d97706" />
                    </View>
                    <Card style={styles.timelineCard}>
                      <CardContent style={{ padding: 20 }}>
                        <Text style={[styles.timelineDate, { color: '#d97706' }]}>Last Week</Text>
                        <Text style={styles.timelineTitle}>Volunteered at Food Bank</Text>
                        <Text style={styles.timelineText}>Helped distribute 500+ meals with the Local Charity Team. Alhamdulillah for the opportunity to serve.</Text>
                      </CardContent>
                    </Card>
                  </View>
                  
                  {/* Timeline Item */}
                   <View style={styles.timelineItem}>
                    <View style={[styles.timelineIconBox, { borderColor: '#2563eb', backgroundColor: '#dbeafe' }]}>
                       <MapPin size={16} color="#2563eb" />
                    </View>
                    <Card style={styles.timelineCard}>
                      <CardContent style={{ padding: 20 }}>
                        <Text style={[styles.timelineDate, { color: '#2563eb' }]}>December 2023</Text>
                        <Text style={styles.timelineTitle}>Umrah Trip</Text>
                        <Text style={styles.timelineText}>A life-changing journey to the Holy Lands. May Allah invite us all again.</Text>
                         <View style={{ marginTop: 12, height: 160, borderRadius: 8, overflow: 'hidden', backgroundColor: '#f1f5f9' }}>
                            {/* Mock Image Placeholder */}
                            <View style={{ flex: 1, backgroundColor: '#cbd5e1' }} />
                         </View>
                      </CardContent>
                    </Card>
                  </View>
                </View>
             )}
             
             {activeTab !== 'journey' && (
                <View style={{ padding: 40, alignItems: 'center' }}>
                  <Text style={{ color: '#94a3b8' }}>No content yet.</Text>
                </View>
             )}
          </View>
        </View>
      </View>
    </Layout>
  );
}

function EditProfileDialog({ settings, onSave }: { settings: any, onSave: any }) {
  const [open, setOpen] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    onSave(localSettings);
    setOpen(false);
    toast({
      title: "Profile Updated",
      description: "Your privacy settings have been saved.",
    });
  };

  return (
    <>
      <Button onPress={() => setOpen(true)} style={{ flexDirection: 'row', gap: 8 }}>
        <UserCog size={16} color="#ffffff" /> <Text style={{ color: '#ffffff' }}>Edit Profile</Text>
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
                <Text style={styles.modalTitle}>Edit Profile & Privacy</Text>
                <Text style={styles.modalDescription}>Manage your public identity and visibility.</Text>
              </View>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={{ marginBottom: 16 }}>
                <Text style={styles.label}>Full Name</Text>
                <Input defaultValue={currentUser.name} />
              </View>
              
              <View style={{ borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 16 }}>
                <Text style={[styles.label, { marginBottom: 16 }]}>Privacy Settings</Text>
                
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: '#0f172a' }}>Use Nickname</Text>
                    <Text style={{ fontSize: 12, color: '#64748b' }}>Hide your real name from the public directory.</Text>
                  </View>
                  <Switch 
                    value={localSettings.useNickname} 
                    onValueChange={(checked) => setLocalSettings({...localSettings, useNickname: checked})}
                  />
                </View>
                
                {localSettings.useNickname && (
                  <View>
                    <Text style={styles.label}>Nickname</Text>
                    <Input 
                      value={localSettings.nickname} 
                      onChangeText={(text: string) => setLocalSettings({...localSettings, nickname: text})}
                    />
                  </View>
                )}
              </View>
            </View>

            <View style={styles.modalFooter}>
              <Button onPress={handleSave}>Save Changes</Button>
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
  coverImage: {
    height: 200,
    backgroundColor: '#059669',
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  profileInfoContainer: {
    paddingHorizontal: 24,
    paddingBottom: 0,
  },
  profileHeaderContent: {
    marginTop: -60,
    flexDirection: 'row',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 24,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64,
    borderWidth: 4,
    borderColor: '#ffffff',
    backgroundColor: '#f1f5f9',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#22c55e',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  profileDetails: {
    flex: 1,
    marginBottom: 8,
    minWidth: 200,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  profileHandle: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  metaText: {
    fontSize: 14,
    color: '#64748b',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    gap: 32,
    flexWrap: 'wrap',
  },
  leftColumn: {
    flex: 1,
    minWidth: 300,
    gap: 24,
  },
  rightColumn: {
    flex: 2,
    minWidth: 300,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  bioText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  statLabel: { fontSize: 14, color: '#64748b' },
  statValue: { fontSize: 14, fontWeight: 'bold', fontFamily: 'monospace', color: '#059669' },
  
  tabsList: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 24,
  },
  tabTrigger: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabTriggerActive: {
    borderBottomColor: '#0f172a',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
  tabTextActive: {
    color: '#0f172a',
  },
  timelineContainer: {
    paddingLeft: 20,
    borderLeftWidth: 2,
    borderLeftColor: '#f1f5f9',
    gap: 32,
  },
  timelineItem: {
    position: 'relative',
  },
  timelineIconBox: {
    position: 'absolute',
    left: -37, // -20 padding + -17 (half of 34 width)
    top: 0,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#f1f5f9',
    borderWidth: 2,
    borderColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  timelineCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  timelineDate: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginBottom: 4,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  timelineText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
  },

  // Shared
  card: { backgroundColor: '#ffffff', borderRadius: 12, borderWidth: 1, borderColor: '#f1f5f9' },
  cardHeader: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#0f172a' },
  cardContent: { padding: 16, paddingTop: 0 },
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
  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', padding: 16 },
  modalContent: { backgroundColor: '#ffffff', borderRadius: 12, width: '100%', maxWidth: 425, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: 20, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 4 },
  modalDescription: { fontSize: 14, color: '#64748b' },
  modalBody: { padding: 20 },
  modalFooter: { padding: 20, paddingTop: 0, alignItems: 'flex-end' },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 6, color: '#0f172a' },
});
