import Layout from "@/components/layout/Layout";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Modal } from 'react-native-web';
import { groups } from "@/lib/mockData";
import { Search, MapPin, Building2, Plus, GraduationCap, X } from "lucide-react-native";
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

const CardFooter = ({ children, style }: { children: React.ReactNode, style?: any }) => (
  <View style={[styles.cardFooter, style]}>{children}</View>
);

const Button = ({ children, onPress, variant = "primary", style }: { children: React.ReactNode, onPress?: () => void, variant?: "primary" | "outline" | "ghost", style?: any }) => {
  const bg = variant === "primary" ? "#059669" : "transparent";
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

export default function Groups() {
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>Community Groups</Text>
            <Text style={styles.pageSubtitle}>Find your tribe, learn together, and grow.</Text>
          </View>
          <CreateGroupDialog />
        </View>

        {/* Search & Filter */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#94a3b8" style={styles.searchIcon} />
          <Input 
            placeholder="Search for groups (e.g. Quran, Charity, Sports)..." 
            style={styles.searchInput}
          />
        </View>

        {/* Featured Groups */}
        <View style={{ gap: 40 }}>
          
          {/* Ulama / Scholar Q&A Section */}
          <View style={styles.ulamaSection}>
            <View style={styles.sectionHeader}>
               <View style={styles.ulamaIconBox}>
                 <GraduationCap size={20} color="#4338ca" />
               </View>
               <View>
                 <Text style={styles.ulamaTitle}>Ask a Scholar (Ulama)</Text>
                 <Text style={styles.ulamaSubtitle}>Connect with specialized scholars for specific religious guidance.</Text>
               </View>
            </View>
            
            <View style={styles.grid}>
              {groups.filter(g => g.type === 'ulama_qa').map((group) => (
                <Card key={group.id} style={styles.ulamaCard}>
                  <CardHeader style={{ paddingBottom: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <View style={styles.groupIconBoxUlama}>
                        <group.icon size={24} color="#4f46e5" />
                      </View>
                      {/* @ts-ignore */}
                      {group.specialty && (
                        <View style={styles.specialtyBadge}>
                          {/* @ts-ignore */}
                          <Text style={styles.specialtyText}>{group.specialty}</Text>
                        </View>
                      )}
                    </View>
                    <CardTitle style={{ marginTop: 16, color: '#1e1b4b' }}>{group.name}</CardTitle>
                    <View style={{ marginTop: 4, flexDirection: 'row', alignItems: 'center' }}>
                      <Building2 size={12} color="#4f46e5" style={{ marginRight: 6 }} />
                      <Text style={{ fontSize: 12, color: '#4f46e5', fontWeight: '500' }}>{group.mosque}</Text>
                    </View>
                  </CardHeader>
                  <CardContent style={{ flex: 1 }}>
                    <Text numberOfLines={2} style={{ fontSize: 14, color: '#64748b' }}>{group.description}</Text>
                  </CardContent>
                  <CardFooter>
                    <Button style={{ flex: 1, backgroundColor: '#4f46e5' }}>
                      Ask Question
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </View>
          </View>

          {/* General Groups */}
          <View>
            <Text style={styles.sectionTitle}>Community Groups</Text>
            <View style={styles.grid}>
              {groups.filter(g => g.type !== 'ulama_qa').map((group) => (
                <Card key={group.id} style={styles.groupCard}>
                  <CardHeader style={{ paddingBottom: 12 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <View style={styles.groupIconBox}>
                        <group.icon size={24} color="#059669" />
                      </View>
                      <View style={styles.memberBadge}>
                        <Text style={{ fontSize: 12, color: '#64748b', fontWeight: '500' }}>{group.members} Members</Text>
                      </View>
                    </View>
                    <CardTitle style={{ marginTop: 16 }}>{group.name}</CardTitle>
                    <View style={{ marginTop: 4, gap: 4 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <MapPin size={12} color="#94a3b8" style={{ marginRight: 6 }} />
                          <Text style={{ fontSize: 12, color: '#64748b' }}>{group.location.town}, {group.location.city}, {group.location.country}</Text>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Building2 size={12} color="#059669" style={{ marginRight: 6 }} />
                          <Text style={{ fontSize: 12, color: '#059669', fontWeight: '500' }}>{group.mosque}</Text>
                      </View>
                    </View>
                  </CardHeader>
                  <CardContent style={{ flex: 1 }}>
                    <Text numberOfLines={2} style={{ fontSize: 14, color: '#64748b' }}>{group.description}</Text>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" style={{ flex: 1 }}>
                      View Group
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </View>
          </View>
        </View>

        {/* Discover Categories */}
        <View style={{ marginTop: 40 }}>
          <Text style={styles.sectionTitle}>Discover by Category</Text>
          <View style={styles.categoryGrid}>
            {["Quran Studies", "Charity & Volunteer", "Youth & Students", "Professionals", "Reverts Support", "Sisters Only", "Sports & Fitness", "Events"].map((cat) => (
              <TouchableOpacity key={cat} style={styles.categoryCard}>
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
}

function CreateGroupDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    toast({
      title: "Group Created Successfully",
      description: "Your new group has been created and is pending approval.",
    });
    setOpen(false);
  };

  return (
    <>
      <Button onPress={() => setOpen(true)} style={{ flexDirection: 'row', gap: 8 }}>
        <Plus size={16} color="#ffffff" /> <Text style={{ color: '#ffffff', fontWeight: '600' }}>Create Group</Text>
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
                <Text style={styles.modalTitle}>Create a Community Group</Text>
                <Text style={styles.modalDescription}>Start a new group to connect with people in your area.</Text>
              </View>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={{ marginBottom: 16 }}>
                <Text style={styles.label}>Group Name</Text>
                <Input placeholder="e.g. Sunrise Runners, Quran Circle" />
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={styles.label}>Description</Text>
                <Input placeholder="What is this group about?" multiline numberOfLines={3} style={{ height: 80, textAlignVertical: 'top', paddingTop: 10 }} />
              </View>

              <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Country</Text>
                  <Input placeholder="Select country" />
                </View>
                 <View style={{ flex: 1 }}>
                  <Text style={styles.label}>City</Text>
                  <Input placeholder="e.g. London" />
                </View>
              </View>

              <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Town/Borough</Text>
                  <Input placeholder="e.g. Whitechapel" />
                </View>
                 <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Affiliated Mosque</Text>
                  <Input placeholder="e.g. East London Mosque" />
                </View>
              </View>
            </View>

            <View style={styles.modalFooter}>
              <Button variant="ghost" onPress={() => setOpen(false)} style={{ marginRight: 8 }}>Cancel</Button>
              <Button onPress={handleSubmit}>Create Group</Button>
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
  searchContainer: {
    position: 'relative',
    marginBottom: 32,
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
  ulamaSection: {
    backgroundColor: '#eef2ff',
    borderWidth: 1,
    borderColor: '#e0e7ff',
    borderRadius: 16,
    padding: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  ulamaIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ulamaTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#312e81',
  },
  ulamaSubtitle: {
    fontSize: 14,
    color: '#4338ca',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  ulamaCard: {
    flex: 1,
    minWidth: 300,
    borderColor: '#e0e7ff',
    backgroundColor: '#ffffff',
  },
  groupCard: {
    flex: 1,
    minWidth: 300,
  },
  groupIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(5, 150, 105, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupIconBoxUlama: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#eef2ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  specialtyBadge: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specialtyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4338ca',
  },
  memberBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    flex: 1,
    minWidth: 150,
    padding: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryText: {
    fontWeight: '500',
    color: '#0f172a',
    textAlign: 'center',
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
  cardHeader: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  cardContent: {
    padding: 16,
    paddingTop: 0,
  },
  cardFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 14,
  },
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
    maxWidth: 600,
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
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  modalDescription: {
    fontSize: 14,
    color: '#64748b',
  },
  modalBody: {
    padding: 20,
  },
  modalFooter: {
    padding: 20,
    paddingTop: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#0f172a',
  },
});
