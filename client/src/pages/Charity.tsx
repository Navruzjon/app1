import Layout from "@/components/layout/Layout";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Switch, Modal } from 'react-native-web';
import { charityCauses } from "@/lib/mockData";
import { Heart, TrendingUp, Users, ShieldCheck, CreditCard, ExternalLink, Info, FileText, AlertCircle, CheckCircle2, Star, X } from "@/components/ui/Icons";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Reusable Native Components (Same as Prayer.tsx for consistency - ideally should be shared)
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

const Button = ({ children, onPress, variant = "primary", style, className }: { children: React.ReactNode, onPress?: () => void, variant?: "primary" | "outline" | "ghost", style?: any, className?: string }) => {
  const bg = variant === "primary" ? "#059669" : variant === "outline" ? "transparent" : "transparent";
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
  const bg = variant === "secondary" ? "#f1f5f9" : "#059669";
  const color = variant === "secondary" ? "#0f172a" : "#ffffff";
  return (
    <View style={[styles.badge, { backgroundColor: bg }, style]}>
      <Text style={[styles.badgeText, { color }]}>{children}</Text>
    </View>
  );
};

const ProgressBar = ({ value }: { value: number }) => (
  <View style={styles.progressContainer}>
    <View style={[styles.progressBar, { width: `${value}%` }]} />
  </View>
);

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

export default function Charity() {
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>Charity & Sadaqah</Text>
            <Text style={styles.pageSubtitle}>Make a lasting impact. "Charity does not decrease wealth."</Text>
          </View>
          <Button variant="outline" style={{ flexDirection: 'row', gap: 8 }}>
            <TrendingUp size={16} color="#0f172a" /> <Text>My Impact</Text>
          </Button>
        </View>

        {/* Hero Stats */}
        <View style={styles.statsGrid}>
          <Card style={[styles.statsCard, { backgroundColor: '#059669', borderWidth: 0 }]}>
            <CardContent style={styles.statsContent}>
              <View style={[styles.statsIconBox, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                <Heart size={24} color="#ffffff" />
              </View>
              <View>
                <Text style={[styles.statsLabel, { color: 'rgba(255,255,255,0.8)' }]}>Total Donated</Text>
                <Text style={[styles.statsValue, { color: '#ffffff' }]}>£1,250.00</Text>
              </View>
            </CardContent>
          </Card>
          
          <Card style={styles.statsCard}>
            <CardContent style={styles.statsContent}>
              <View style={[styles.statsIconBox, { backgroundColor: '#fef3c7' }]}>
                <Users size={24} color="#d97706" />
              </View>
              <View>
                <Text style={styles.statsLabel}>Lives Impacted</Text>
                <Text style={styles.statsValue}>45</Text>
              </View>
            </CardContent>
          </Card>

          <Card style={styles.statsCard}>
            <CardContent style={styles.statsContent}>
              <View style={[styles.statsIconBox, { backgroundColor: '#dbeafe' }]}>
                <ShieldCheck size={24} color="#2563eb" />
              </View>
              <View>
                <Text style={styles.statsLabel}>Projects Supported</Text>
                <Text style={styles.statsValue}>8</Text>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Active Projects */}
        <View style={{ marginTop: 32 }}>
          <Text style={styles.sectionTitle}>Active Campaigns</Text>
          <View style={styles.campaignsGrid}>
            {charityCauses.map((cause) => (
              <Card key={cause.id} style={styles.campaignCard}>
                <View style={styles.imageContainer}>
                  <Image 
                    source={{ uri: cause.image }} 
                    style={styles.campaignImage}
                  />
                  <Badge style={styles.categoryBadge}>
                    <Text style={{ fontSize: 12 }}>{cause.category}</Text>
                  </Badge>
                </View>
                
                <CardHeader>
                  <View style={styles.orgInfo}>
                    <View>
                      <Text style={styles.orgName}>
                        {cause.organization}
                      </Text>
                      {/* @ts-ignore */}
                      <Text style={styles.regNumber}>Reg: {cause.registrationNumber}</Text>
                    </View>
                    {/* @ts-ignore */}
                    {cause.rating && (
                      <View style={[styles.ratingBadge, 
                        /* @ts-ignore */
                        cause.transparencyScore > 90 ? styles.bgGreen : styles.bgAmber
                      ]}>
                        <Star size={12} color={/* @ts-ignore */ cause.transparencyScore > 90 ? "#15803d" : "#b45309"} fill="currentColor" style={{ marginRight: 4 }} />
                        {/* @ts-ignore */}
                        <Text style={{ fontSize: 12, color: cause.transparencyScore > 90 ? "#15803d" : "#b45309" }}>{cause.rating}</Text>
                      </View>
                    )}
                  </View>
                  <CardTitle>{cause.title}</CardTitle>
                </CardHeader>

                <CardContent style={{ flex: 1 }}>
                  <Text numberOfLines={3} style={styles.description}>{cause.description}</Text>
                  
                  <View style={styles.transparencyBox}>
                    <View style={styles.transparencyRow}>
                      <Text style={styles.transparencyLabel}>
                        <FileText size={12} color="#64748b" style={{ marginRight: 4 }} /> Entity:
                      </Text>
                      {/* @ts-ignore */}
                      <Text numberOfLines={1} style={styles.transparencyValue}>{cause.entityName}</Text>
                    </View>
                    <View style={styles.transparencyRow}>
                      <Text style={styles.transparencyLabel}>
                        <Info size={12} color="#64748b" style={{ marginRight: 4 }} /> Transparency:
                      </Text>
                      {/* @ts-ignore */}
                      <Text style={[styles.transparencyValue, { color: cause.transparencyScore >= 90 ? "#16a34a" : "#d97706" }]}>
                        {/* @ts-ignore */}
                        {cause.transparencyScore}% Score
                      </Text>
                    </View>
                  </View>

                  <View style={{ marginTop: 16 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#059669' }}>£{cause.raised.toLocaleString()} raised</Text>
                      <Text style={{ fontSize: 14, color: '#64748b' }}>of £{cause.target.toLocaleString()}</Text>
                    </View>
                    <ProgressBar value={(cause.raised / cause.target) * 100} />
                  </View>
                </CardContent>

                <CardFooter style={styles.cardActions}>
                  <DonateModal cause={cause} />
                </CardFooter>
              </Card>
            ))}
          </View>
        </View>
      </View>
    </Layout>
  );
}

function DonateModal({ cause }: { cause: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  
  return (
    <>
      <Button onPress={() => setIsOpen(true)} style={{ flex: 1 }}>Donate Now</Button>

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
                <Text style={styles.modalTitle}>Donate to {cause.title}</Text>
                <Text style={styles.modalDescription}>Your donation helps {cause.organization} reach their goal.</Text>
              </View>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                {[10, 50, 100].map((val) => (
                  <Button 
                    key={val} 
                    variant="outline" 
                    onPress={() => setAmount(val.toString())}
                    style={[
                      { flex: 1 },
                      amount === val.toString() && { borderColor: '#059669', backgroundColor: '#ecfdf5' }
                    ]}
                  >
                    £{val}
                  </Button>
                ))}
              </View>
              
              <View style={{ position: 'relative', marginBottom: 16 }}>
                <Text style={{ position: 'absolute', left: 12, top: 10, fontSize: 16, color: '#64748b' }}>£</Text>
                <Input 
                  value={amount} 
                  onChangeText={setAmount}
                  placeholder="Other amount" 
                  keyboardType="numeric"
                  style={{ paddingLeft: 32 }}
                />
              </View>

              <Button style={{ flexDirection: 'row', gap: 8 }}>
                <CreditCard size={16} color="#ffffff" /> <Text style={{ color: '#ffffff', fontWeight: '600' }}>Pay Securely</Text>
              </Button>
              
              <Text style={{ fontSize: 12, textAlign: 'center', color: '#94a3b8', marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={12} color="#94a3b8" style={{ marginRight: 4 }} /> Secure 128-bit SSL Encrypted
              </Text>
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
  statsGrid: {
    flexDirection: 'row',
    gap: 24,
    flexWrap: 'wrap',
  },
  statsCard: {
    flex: 1,
    minWidth: 250,
  },
  statsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statsIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    fontFamily: 'monospace',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 24,
  },
  campaignsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  campaignCard: {
    flex: 1,
    minWidth: 300,
    maxWidth: 350, // Roughly 3 cols on large screen
  },
  imageContainer: {
    height: 192,
    width: '100%',
    position: 'relative',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  campaignImage: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#0f172a',
  },
  orgInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  orgName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  regNumber: {
    fontSize: 10,
    color: '#94a3b8',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  bgGreen: {
    backgroundColor: '#f0fdf4',
    borderColor: '#dcfce7',
    borderWidth: 1,
  },
  bgAmber: {
    backgroundColor: '#fffbeb',
    borderColor: '#fef3c7',
    borderWidth: 1,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  transparencyBox: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  transparencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transparencyLabel: {
    fontSize: 12,
    color: '#64748b',
    flexDirection: 'row',
    alignItems: 'center',
  },
  transparencyValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#0f172a',
  },
  cardActions: {
    paddingTop: 16,
    flexDirection: 'row',
    gap: 8,
  },
  // Shared styles
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
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#059669',
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
  // Modal Styles (Duplicated)
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
    maxWidth: 425,
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
});
