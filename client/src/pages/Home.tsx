import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, Platform } from 'react-native-web';
import Layout from "@/components/layout/Layout";
import { Heart, MessageCircle, Share2, MapPin, Clock, MoreHorizontal, Camera, Smartphone } from "@/components/ui/Icons";
import { posts, prayerTimes, currentUser } from "@/lib/mockData";
import patternBg from "@assets/generated_images/subtle_islamic_geometric_pattern_background_in_soft_emerald_and_white.png";
import { useState, useEffect } from 'react';

// Dynamic import for QR Code to avoid Native crashes
let QRCodeSVG: any = null;
if (Platform.OS === 'web') {
  try {
    QRCodeSVG = require('qrcode.react').QRCodeSVG;
  } catch (e) {
    console.warn('QRCodeSVG not available');
  }
}

export default function Home() {
  const [expoUrl, setExpoUrl] = useState('');

  useEffect(() => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const host = window.location.hostname;
      // Construct Expo URL based on current host
      // Replit: <repl>-5000.<region>.replit.dev -> <repl>-8081.<region>.replit.dev
      if (host.includes('replit.dev')) {
        // Naive replacement of 5000 with 8081 if it exists in the URL
        if (host.includes('5000')) {
          setExpoUrl(`exp://${host.replace('5000', '8081')}`);
        } else {
          // Fallback: try to construct it assuming standard port mapping wasn't explicit
          // This is tricky without knowing exact ID, but usually 5000 is in the URL for the webview
          // If not, we might be on the main domain?
          setExpoUrl(`exp://${host}`); // Unlikely to work without port mapping
        }
      } else {
        // Localhost
        setExpoUrl(`exp://${window.location.hostname}:8081`);
      }
    }
  }, []);

  const renderPost = ({ item: post }: { item: typeof posts[0] }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.authorRow}>
          <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.authorName}>{post.author.name}</Text>
            <Text style={styles.authorHandle}>{post.author.handle} • {post.time}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <MoreHorizontal size={20} color="#64748b" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContent}>
        {post.type === 'prayer_request' && (
          <View style={[styles.badge, styles.badgeAmber]}>
            <Text style={styles.badgeTextAmber}>🤲 Prayer Request</Text>
          </View>
        )}
        {post.type === 'announcement' && (
          <View style={[styles.badge, styles.badgePrimary]}>
            <Text style={styles.badgeTextPrimary}>📢 Announcement</Text>
          </View>
        )}
        
        <Text style={styles.postText}>{post.content}</Text>
        
        {post.image && (
          <View style={styles.postImageContainer}>
            <Image source={{ uri: post.image }} style={styles.postImage} />
          </View>
        )}

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionButton}>
            <Heart size={18} color="#64748b" />
            <Text style={styles.actionText}>{post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={18} color="#64748b" />
            <Text style={styles.actionText}>{post.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { marginLeft: 'auto' }]}>
            <Share2 size={18} color="#64748b" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <Layout>
      <View style={styles.grid}>
        {/* Main Feed Section */}
        <View style={styles.mainFeed}>
          
          {/* Welcome Hero */}
          <View style={styles.heroCard}>
            <Image source={{ uri: patternBg }} style={styles.heroBg} />
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>As-salamu alaykum, {currentUser.name.split(' ')[0]}</Text>
              <Text style={styles.heroSubtitle}>May your day be filled with barakah and peace.</Text>
              
              <View style={styles.quoteBox}>
                <Text style={styles.quoteText}>"Verily, with hardship comes ease."</Text>
                <Text style={styles.quoteSource}>— Surah Ash-Sharh (94:6)</Text>
              </View>
            </View>
          </View>

          {/* Composer */}
          <View style={styles.composerCard}>
            <View style={styles.composerRow}>
              <Image source={{ uri: currentUser.avatar }} style={styles.avatarSmall} />
              <View style={styles.inputWrapper}>
                <TextInput 
                  placeholder="Share a reflection, prayer request, or update..." 
                  placeholderTextColor="#94a3b8"
                  style={styles.input}
                />
                <View style={styles.composerActions}>
                   <TouchableOpacity style={styles.mediaButton}>
                    <Camera size={16} color="#64748b" />
                    <Text style={styles.mediaButtonText}>Photo</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.postButton}>
                     <Text style={styles.postButtonText}>Post</Text>
                   </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Feed Items */}
          <View style={styles.feedSection}>
            <Text style={styles.sectionTitle}>Community Feed</Text>
            {/* Mapping instead of FlatList because we are inside a ScrollView from Layout */}
            {posts.map(post => (
              <View key={post.id} style={{ marginBottom: 16 }}>
                {renderPost({ item: post })}
              </View>
            ))}
          </View>
        </View>

        {/* Right Sidebar Widgets - Hide on mobile if needed via styles */}
        <View style={styles.sidebar}>
          {/* Prayer Times Widget */}
          <View style={styles.widgetCard}>
            <View style={styles.widgetHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Clock size={20} color="#059669" />
                <Text style={styles.widgetTitle}>Prayer Times</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <MapPin size={12} color="#64748b" />
                <Text style={styles.locationText}>London, UK</Text>
              </View>
            </View>
            <View style={styles.prayerList}>
              {Object.entries(prayerTimes).map(([name, time]) => (
                <View 
                  key={name} 
                  style={[
                    styles.prayerRow,
                    name === 'asr' && styles.prayerRowActive
                  ]}
                >
                  <Text style={[styles.prayerName, name === 'asr' && styles.textWhite]}>{name}</Text>
                  <Text style={[styles.prayerTime, name === 'asr' && styles.textWhite]}>{time}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.fullTimetableBtn}>
                <Text style={styles.btnTextOutline}>Full Timetable</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Mobile App QR Code Widget */}
          {Platform.OS === 'web' && expoUrl && QRCodeSVG && (
            <View style={styles.widgetCard}>
              <View style={styles.widgetHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Smartphone size={20} color="#059669" />
                  <Text style={styles.widgetTitle}>Mobile App</Text>
                </View>
              </View>
              <View style={{ padding: 24, alignItems: 'center', gap: 16 }}>
                <View style={{ padding: 12, backgroundColor: 'white', borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 8 }}>
                  <QRCodeSVG value={expoUrl} size={180} />
                </View>
                <Text style={{ textAlign: 'center', color: '#64748b', fontSize: 13, lineHeight: 20 }}>
                  Scan with <Text style={{ fontWeight: '600', color: '#0f172a' }}>Expo Go</Text> on Android or iOS to test on your device.
                </Text>
                <View style={{ padding: 8, backgroundColor: '#f0fdf4', borderRadius: 8, width: '100%' }}>
                  <Text style={{ fontSize: 11, color: '#166534', textAlign: 'center', fontFamily: 'monospace' }} numberOfLines={1} ellipsizeMode="middle">
                    {expoUrl}
                  </Text>
                </View>
              </View>
            </View>
          )}

          {/* Suggested Groups */}
          <View style={styles.widgetCard}>
            <View style={styles.widgetHeader}>
              <Text style={styles.widgetTitle}>Suggested Groups</Text>
            </View>
            <View style={styles.groupList}>
              {[
                { name: "Tech Muslims", members: "1.2k" },
                { name: "Halal Foodies", members: "5.4k" },
                { name: "Charity Run 2025", members: "340" }
              ].map((group) => (
                <View key={group.name} style={styles.groupRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                    <View style={styles.groupIcon}>
                      <Text style={styles.groupInitial}>{group.name[0]}</Text>
                    </View>
                    <View>
                      <Text style={styles.groupName}>{group.name}</Text>
                      <Text style={styles.groupMembers}>{group.members} members</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.joinBtn}>
                    <Text style={styles.joinBtnText}>Join</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    gap: 32,
    // @ts-ignore
    '@media (max-width: 1024px)': {
      flexDirection: 'column',
    },
  },
  mainFeed: {
    flex: 2,
    gap: 24,
  },
  sidebar: {
    flex: 1,
    gap: 24,
    // @ts-ignore
    '@media (max-width: 1024px)': {
      display: 'none',
    },
  },
  heroCard: {
    backgroundColor: '#059669', // primary
    borderRadius: 24,
    padding: 32,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  heroBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  heroContent: {
    zIndex: 10,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 24,
    fontSize: 16,
  },
  quoteBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  quoteText: {
    color: '#ffffff',
    fontStyle: 'italic',
    fontSize: 18,
    marginBottom: 12,
    fontFamily: 'serif',
  },
  quoteSource: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    fontWeight: '500',
  },
  composerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  composerRow: {
    flexDirection: 'row',
    gap: 16,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 12,
    // @ts-ignore
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  composerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  mediaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  mediaButtonText: {
    fontSize: 12,
    color: '#64748b',
  },
  postButton: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: 16,
  },
  feedSection: {
    marginTop: 8,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
  },
  authorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  authorHandle: {
    fontSize: 12,
    color: '#64748b',
  },
  cardContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeAmber: {
    backgroundColor: '#fffbeb',
    borderWidth: 1,
    borderColor: '#fde68a',
  },
  badgeTextAmber: {
    color: '#b45309',
    fontSize: 12,
    fontWeight: '500',
  },
  badgePrimary: {
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  badgeTextPrimary: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '500',
  },
  postText: {
    fontSize: 14,
    lineHeight: 24, // 1.5 * 16
    color: '#334155',
  },
  postImageContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 8,
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: '#64748b',
  },
  widgetCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    padding: 0,
    overflow: 'hidden',
  },
  widgetHeader: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0f172a',
  },
  locationText: {
    fontSize: 12,
    color: '#64748b',
  },
  prayerList: {
    padding: 24,
    gap: 4,
  },
  prayerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 8,
  },
  prayerRowActive: {
    backgroundColor: '#059669',
  },
  prayerName: {
    fontSize: 14,
    color: '#0f172a',
    textTransform: 'capitalize',
  },
  prayerTime: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#0f172a',
  },
  textWhite: {
    color: '#ffffff',
  },
  fullTimetableBtn: {
    marginTop: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  btnTextOutline: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
  },
  groupList: {
    padding: 24,
    gap: 16,
  },
  groupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupInitial: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#64748b',
  },
  groupName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f172a',
  },
  groupMembers: {
    fontSize: 12,
    color: '#64748b',
  },
  joinBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  joinBtnText: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
});
