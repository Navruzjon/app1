import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Platform } from 'react-native-web';
import { useLocation } from "wouter";
import { Home, User, Users, BookOpen, Moon, Settings, Menu, Heart, Bell, Check, Briefcase, Calendar } from "lucide-react";
import { useState } from "react";
import { currentUser, notifications } from "@/lib/mockData";

// Mocking complex components for the RN rewrite to focus on structure
const MobileSheet = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <View style={styles.mobileSheetOverlay}>
      <TouchableOpacity style={styles.mobileSheetBackdrop} onPress={onClose} />
      <View style={styles.mobileSheetContent}>
        {children}
      </View>
    </View>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
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

  const mobileNavItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Moon, label: "Prayer", href: "/prayer" },
    { icon: Users, label: "Community", href: "/groups" },
    { icon: Briefcase, label: "Services", href: "/professionals" },
    { icon: User, label: "Profile", href: "/profile" },
  ];

  const NavContent = () => (
    <View style={styles.navContent}>
      <View style={styles.logoContainer}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>UL</Text>
        </View>
        <Text style={styles.logoTitle}>UmmahLink</Text>
      </View>

      <ScrollView style={styles.navScroll}>
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <TouchableOpacity
              key={item.href}
              onPress={() => {
                setLocation(item.href);
                setIsMobileOpen(false);
              }}
              style={[
                styles.navItem,
                isActive && styles.navItemActive
              ]}
            >
              <item.icon 
                size={20} 
                color={isActive ? "#ffffff" : "#64748b"} 
              />
              <Text style={[
                styles.navLabel,
                isActive && styles.navLabelActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.userFooter}>
        <TouchableOpacity style={styles.userCard}>
          <Image 
            source={{ uri: currentUser.avatar }} 
            style={styles.userAvatar}
          />
          <View style={styles.userInfo}>
            <Text numberOfLines={1} style={styles.userName}>{currentUser.name}</Text>
            <Text numberOfLines={1} style={styles.userHandle}>{currentUser.handle}</Text>
          </View>
          <Settings size={16} color="#64748b" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Desktop Sidebar */}
      {/* We use a media query style check or just hide it on small screens using width: 0 or hidden */}
      <View style={[styles.sidebar, { display: 'flex' }]}>
         <NavContent />
      </View>

      {/* Mobile Header */}
      <View style={styles.mobileHeader}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBoxSmall}>
            <Text style={styles.logoTextSmall}>UL</Text>
          </View>
          <Text style={styles.headerTitle}>UmmahLink</Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={20} color="#64748b" />
            {notifications.some(n => !n.read) && (
              <View style={styles.notificationBadge} />
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => setIsMobileOpen(true)}
          >
            <Menu size={24} color="#0f172a" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Mobile Sheet (Drawer) */}
      <MobileSheet isOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)}>
        <NavContent />
      </MobileSheet>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {children}
        </ScrollView>
      </View>

      {/* Mobile Bottom Nav */}
      <View style={styles.bottomNav}>
        {mobileNavItems.map((item) => {
          const isActive = location === item.href;
          return (
            <TouchableOpacity
              key={item.href}
              onPress={() => setLocation(item.href)}
              style={styles.bottomNavItem}
            >
              <item.icon 
                size={20} 
                color={isActive ? "#059669" : "#94a3b8"}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <Text style={[
                styles.bottomNavLabel,
                isActive && styles.bottomNavLabelActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f8fafc', // bg-background
    // @ts-ignore
    height: '100vh', // Full viewport height for web
  },
  sidebar: {
    width: 280,
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    backgroundColor: '#ffffff',
    // Hide on mobile (this is a simplified way, normally use Dimensions or media queries)
    // For this mockup, we'll rely on the fact that mobile usually has narrow width
    // But RN doesn't do media queries in StyleSheet easily.
    // We'll assume desktop layout primarily and hide sidebar if screen is small?
    // Actually, standard RN approach is using Dimensions.
    // For now, let's leave it visible but covered by mobile header on small screens via zIndex?
    // Or just keep it simple.
    display: 'none', // Default to hidden, show on large screens if we could. 
    // Since we can't easily do media queries here without hooks, let's make it responsive via logic if needed.
    // BUT, react-native-web maps StyleSheet to CSS, so we CAN use media queries!
    // @ts-ignore
    '@media (min-width: 768px)': {
      display: 'flex',
    },
  },
  mobileHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    zIndex: 40,
    // @ts-ignore
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  logoBoxSmall: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoTextSmall: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  iconButton: {
    padding: 8,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ef4444',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  mainContent: {
    flex: 1,
    // @ts-ignore
    '@media (min-width: 768px)': {
      paddingTop: 0,
    },
    paddingTop: 64, // Mobile header height
    paddingBottom: 64, // Bottom nav height
  },
  scrollContent: {
    padding: 16,
    // @ts-ignore
    '@media (min-width: 768px)': {
      padding: 32,
      maxWidth: 1024,
      alignSelf: 'center',
      width: '100%',
    },
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 50,
    // @ts-ignore
    '@media (min-width: 768px)': {
      display: 'none',
    },
  },
  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  bottomNavLabel: {
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '500',
  },
  bottomNavLabelActive: {
    color: '#059669',
  },
  navContent: {
    flex: 1,
    paddingVertical: 24,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  logoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  navScroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    gap: 12,
    marginBottom: 4,
  },
  navItemActive: {
    backgroundColor: '#059669',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  navLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  navLabelActive: {
    color: '#ffffff',
  },
  userFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
    gap: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  userHandle: {
    fontSize: 12,
    color: '#64748b',
  },
  mobileSheetOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  mobileSheetBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  mobileSheetContent: {
    width: 280,
    height: '100%',
    backgroundColor: '#ffffff',
  },
});
