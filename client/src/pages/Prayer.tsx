import Layout from "@/components/layout/Layout";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Switch, Modal } from 'react-native-web';
import { prayerTimes } from "@/lib/mockData";
import { Compass, Clock, MapPin, Moon, Bell, Mail, MessageSquare, Globe, X } from "@/components/ui/Icons";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

// Reusable Native Components
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

export default function Prayer() {
  const today = new Date();
  
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.pageTitle}>Prayer Times</Text>
            <View style={styles.locationRow}>
              <Text style={styles.locationText}>
                <MapPin size={14} color="#64748b" style={{ marginRight: 4 }} /> London, United Kingdom
              </Text>
              <Text style={styles.timezoneText}>
                <Globe size={12} color="#64748b" style={{ marginRight: 4 }} /> Timezone: Europe/London (GMT+0)
              </Text>
            </View>
            <Text style={styles.dateText}>{format(today, "EEEE, d MMMM yyyy")} • 14 Rajab 1446</Text>
          </View>
          
          <PrayerAlertsDialog />
        </View>

        {/* Main Countdown Card */}
        <Card style={styles.mainCard}>
          <View style={styles.patternOverlay} />
          <CardContent style={styles.mainCardContent}>
            <Text style={styles.nextPrayerLabel}>Next Prayer: Asr</Text>
            <Text style={styles.countdownText}>02:14:32</Text>
            <Text style={styles.beginsText}>Begins at {prayerTimes.asr}</Text>
          </CardContent>
        </Card>

        <View style={styles.grid}>
          {/* Timetable */}
          <Card style={styles.gridCard}>
            <CardHeader>
              <CardTitle style={styles.cardTitleWithIcon}>
                <Clock size={20} color="#059669" style={{ marginRight: 8 }} /> Today's Schedule
              </CardTitle>
            </CardHeader>
            <CardContent style={{ padding: 0 }}>
              <View style={styles.timetable}>
                {Object.entries(prayerTimes).map(([name, time], index) => (
                  <View key={name} style={[styles.timetableRow, index !== Object.keys(prayerTimes).length - 1 && styles.borderBottom]}>
                    <View style={styles.prayerNameRow}>
                      {name === 'fajr' || name === 'isha' || name === 'maghrib' ? 
                        <Moon size={16} color="#64748b" style={{ marginRight: 12 }} /> : 
                        <Clock size={16} color="#64748b" style={{ marginRight: 12 }} />
                      }
                      <Text style={styles.prayerName}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
                    </View>
                    <View style={styles.timeBadge}>
                      <Text style={styles.timeText}>{time}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </CardContent>
          </Card>

          {/* Qibla */}
          <Card style={styles.gridCard}>
            <CardHeader>
              <CardTitle style={styles.cardTitleWithIcon}>
                <Compass size={20} color="#059669" style={{ marginRight: 8 }} /> Qibla Direction
              </CardTitle>
            </CardHeader>
            <CardContent style={styles.qiblaContent}>
              <View style={styles.compassCircle}>
                {/* Compass Needles */}
                <View style={[styles.compassNeedleContainer, { transform: [{ rotate: '119deg' }] }]}>
                   <View style={styles.compassNeedle} />
                   <View style={styles.compassCenter} />
                </View>
                <View style={styles.compassTextContainer}>
                   <Text style={styles.compassDegrees}>119°</Text>
                   <Text style={styles.compassDirection}>South East</Text>
                </View>
                
                {/* Cardinal Points */}
                <Text style={[styles.cardinalPoint, { top: 8, alignSelf: 'center' }]}>N</Text>
                <Text style={[styles.cardinalPoint, { bottom: 8, alignSelf: 'center' }]}>S</Text>
                <Text style={[styles.cardinalPoint, { left: 8, top: '45%' }]}>W</Text>
                <Text style={[styles.cardinalPoint, { right: 8, top: '45%' }]}>E</Text>
              </View>
              <Text style={styles.qiblaHelpText}>
                Align the arrow with the Kaaba icon to find Qibla.
              </Text>
            </CardContent>
          </Card>
        </View>
      </View>
    </Layout>
  );
}

function PrayerAlertsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [email, setEmail] = useState("ahmed@example.com");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    toast({
      title: "Preferences Saved",
      description: "You will now receive prayer alerts based on your settings.",
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button variant="outline" onPress={() => setIsOpen(true)} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Bell size={16} color="#0f172a" /> <Text>Prayer Alerts</Text>
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
                <Text style={styles.modalTitle}>Prayer Notifications</Text>
                <Text style={styles.modalDescription}>Manage how you want to be notified.</Text>
              </View>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              {/* Email Settings */}
              <View style={styles.settingRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>
                    <Mail size={16} color="#64748b" style={{ marginRight: 8 }} /> Email Alerts
                  </Text>
                  <Text style={styles.settingHelp}>Receive daily prayer schedules.</Text>
                </View>
                <Switch value={emailEnabled} onValueChange={setEmailEnabled} />
              </View>
              
              {emailEnabled && (
                <Input 
                  value={email} 
                  onChangeText={setEmail} 
                  placeholder="Enter your email" 
                  style={{ marginBottom: 16 }}
                />
              )}

              {/* SMS Settings */}
              <View style={styles.settingRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>
                    <MessageSquare size={16} color="#64748b" style={{ marginRight: 8 }} /> SMS Alerts
                  </Text>
                  <Text style={styles.settingHelp}>Get reminders 15 mins before prayer.</Text>
                </View>
                <Switch value={smsEnabled} onValueChange={setSmsEnabled} />
              </View>

              {smsEnabled && (
                <Input 
                  value={phone} 
                  onChangeText={setPhone} 
                  placeholder="+44 7700 900000" 
                />
              )}
            </View>

            <View style={styles.modalFooter}>
              <Button onPress={handleSave}>Save Preferences</Button>
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
    maxWidth: 800,
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
    marginBottom: 8,
  },
  locationRow: {
    marginBottom: 8,
  },
  locationText: {
    color: '#64748b',
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  timezoneText: {
    color: '#94a3b8',
    fontSize: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: '#059669',
    fontWeight: '500',
    fontSize: 16,
  },
  mainCard: {
    backgroundColor: '#059669',
    borderRadius: 16,
    marginBottom: 32,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  patternOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.05,
  },
  mainCardContent: {
    padding: 32,
    alignItems: 'center',
  },
  nextPrayerLabel: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  countdownText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'monospace',
    letterSpacing: -2,
    marginBottom: 16,
    textAlign: 'center',
  },
  beginsText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
  },
  grid: {
    flexDirection: 'row',
    gap: 32,
    flexWrap: 'wrap',
  },
  gridCard: {
    flex: 1,
    minWidth: 300,
  },
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
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  cardTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    padding: 16,
  },
  timetable: {
    width: '100%',
  },
  timetableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  prayerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
  },
  timeBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timeText: {
    fontFamily: 'monospace',
    fontWeight: '600',
    color: '#0f172a',
  },
  qiblaContent: {
    alignItems: 'center',
    padding: 32,
  },
  compassCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: '#f1f5f9',
    backgroundColor: 'rgba(241, 245, 249, 0.2)',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassNeedleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassNeedle: {
    width: 4,
    height: 80,
    backgroundColor: '#ef4444',
    position: 'absolute',
    top: 20,
    borderRadius: 2,
  },
  compassCenter: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#0f172a',
    zIndex: 10,
  },
  compassTextContainer: {
    alignItems: 'center',
    zIndex: 20,
  },
  compassDegrees: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  compassDirection: {
    fontSize: 12,
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardinalPoint: {
    position: 'absolute',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#94a3b8',
  },
  qiblaHelpText: {
    marginTop: 24,
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
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
  // Modal Styles
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
  modalFooter: {
    padding: 20,
    paddingTop: 0,
    alignItems: 'flex-end',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingHelp: {
    fontSize: 12,
    color: '#64748b',
  },
});
