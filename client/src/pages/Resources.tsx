import Layout from "@/components/layout/Layout";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Platform } from 'react-native-web';
import { Search, MapPin, Clock, Calendar as CalendarIcon, Users, Share2, Ticket, PlayCircle, FileText, Download, Check } from "@/components/ui/Icons";
import { useState } from "react";
import { resources } from "@/lib/mockData";

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

const Button = ({ children, onPress, variant = "primary", style }: { children: React.ReactNode, onPress?: () => void, variant?: "primary" | "outline" | "ghost" | "link", style?: any }) => {
  let bg = "#059669";
  let border = "transparent";
  let textColor = "#ffffff";

  if (variant === "outline") {
    bg = "transparent";
    border = "#e2e8f0";
    textColor = "#0f172a";
  } else if (variant === "link") {
    bg = "transparent";
    textColor = "#059669";
  } else if (variant === "ghost") {
    bg = "transparent";
    textColor = "#0f172a";
  }
  
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

export default function Resources() {
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.heroBanner}>
          <View style={{ maxWidth: 600, zIndex: 10 }}>
            <Text style={styles.heroTitle}>Knowledge is Light</Text>
            <Text style={styles.heroSubtitle}>Access curated Islamic lectures, articles, and books to deepen your understanding and strengthen your faith.</Text>
            <View style={styles.heroSearchBox}>
              <Search size={20} color="rgba(255,255,255,0.7)" />
              <TextInput 
                placeholder="Search library..." 
                placeholderTextColor="rgba(255,255,255,0.5)"
                style={styles.heroInput}
              />
            </View>
          </View>
          {/* Decorative elements simulated */}
          <View style={[styles.decorativeCircle, { right: -50, top: -50, backgroundColor: 'rgba(255,255,255,0.1)' }]} />
          <View style={[styles.decorativeCircle, { right: 20, bottom: -50, backgroundColor: 'rgba(251, 191, 36, 0.2)' }]} />
        </View>

        <View style={{ marginTop: 32 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={styles.sectionTitle}>Featured Resources</Text>
            <Button variant="link">View All</Button>
          </View>

          <View style={styles.grid}>
            {resources.map((resource) => (
              <Card key={resource.id} style={styles.resourceCard}>
                <View style={styles.imageContainer}>
                  <Image 
                    source={{ uri: resource.thumbnail }} 
                    style={styles.resourceImage}
                  />
                  <View style={styles.overlayGradient} />
                  <Badge style={styles.typeBadge}>
                    <Text style={{ fontSize: 12, fontWeight: '600' }}>{resource.type}</Text>
                  </Badge>
                  <View style={styles.playButton}>
                     {resource.type === 'Series' ? <PlayCircle size={24} color="#fff" /> : 
                      resource.type === 'PDF' ? <Download size={24} color="#fff" /> : 
                      <FileText size={24} color="#fff" />}
                  </View>
                </View>
                <CardContent style={{ padding: 20 }}>
                  <Text numberOfLines={2} style={styles.resourceTitle}>{resource.title}</Text>
                  <Text style={styles.resourceAuthor}>{resource.author}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
                    <Clock size={12} color="#94a3b8" style={{ marginRight: 6 }} />
                    <Text style={{ fontSize: 12, color: '#64748b' }}>{resource.duration}</Text>
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        </View>
        
        {/* Categories Grid */}
        <View style={{ marginTop: 40 }}>
            <Text style={styles.sectionTitle}>Browse Topics</Text>
            <View style={styles.categoryGrid}>
                {['Aqeedah', 'Fiqh', 'History', 'Quran', 'Hadith', 'Spirituality', 'Family', 'Finance', 'Social Issues', 'Dua', 'Arabic', 'New Muslims'].map(topic => (
                    <TouchableOpacity key={topic} style={styles.categoryBox}>
                        <Text style={styles.categoryText}>{topic}</Text>
                    </TouchableOpacity>
                ))}
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
  heroBanner: {
    backgroundColor: '#0f172a',
    borderRadius: 24,
    padding: 48,
    position: 'relative',
    overflow: 'hidden',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 32,
    lineHeight: 28,
  },
  heroSearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    maxWidth: 400,
  },
  heroInput: {
    flex: 1,
    height: 48,
    color: '#ffffff',
    marginLeft: 12,
    fontSize: 16,
    borderWidth: 0,
    // @ts-ignore
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  decorativeCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    // @ts-ignore
    ...Platform.select({
      web: {
        filter: 'blur(60px)',
      },
    }),
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0f172a',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  resourceCard: {
    flex: 1,
    minWidth: 280,
    maxWidth: 350,
    overflow: 'hidden',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  imageContainer: {
    height: 192,
    position: 'relative',
  },
  resourceImage: {
    width: '100%',
    height: '100%',
  },
  overlayGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  typeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  playButton: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    // @ts-ignore
    ...Platform.select({
      web: {
        backdropFilter: 'blur(4px)',
      },
    }),
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  resourceAuthor: {
    fontSize: 14,
    color: '#64748b',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 16,
  },
  categoryBox: {
    width: 100, // Fixed size roughly for square look
    height: 100,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  categoryText: {
    fontWeight: '500',
    color: '#0f172a',
    fontSize: 14,
  },
  // Shared
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cardHeader: { padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: '600', color: '#0f172a' },
  cardContent: { padding: 16 },
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
});
