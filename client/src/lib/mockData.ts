import { Users, Calendar, BookOpen, MapPin, Heart, Star, MessageCircle } from "lucide-react";

export const currentUser = {
  id: "1",
  name: "Ahmed Hassan",
  handle: "@ahmed_h",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200",
  bio: "Seeker of knowledge. Passionate about community service and youth mentorship.",
  location: "London, UK",
  interests: ["Islamic History", "Charity", "Football", "Calligraphy"],
  stats: {
    prayers: 85, // % on time
    quran: 12, // juz read this month
    charity: 150, // £ donated
  }
};

export const posts = [
  {
    id: 1,
    author: {
      name: "Sarah Ahmed",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=200&h=200",
      handle: "@sarah_design"
    },
    content: "Just finished reading Surah Al-Kahf. The reminder about patience in the story of Musa (AS) always hits home. Jumu'ah Mubarak everyone! 🕌✨",
    time: "2 hours ago",
    likes: 45,
    comments: 12,
    type: "update"
  },
  {
    id: 2,
    author: {
      name: "Community Admin",
      avatar: "/attached_assets/mosque-silhouette.png", // Using our generated asset
      handle: "@admin"
    },
    content: "📢 Reminder: The monthly food drive is happening this Saturday at 10 AM. We still need 5 volunteers for packaging!",
    image: "/attached_assets/generated_images/diverse_muslim_community_members_in_a_modern_center.png",
    time: "5 hours ago",
    likes: 89,
    comments: 24,
    type: "announcement"
  },
  {
    id: 3,
    author: {
      name: "Bilal O.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=200&h=200",
      handle: "@bilal_o"
    },
    content: "Please keep my grandmother in your duas, she is undergoing surgery tomorrow. May Allah grant her Shifa.",
    time: "1 day ago",
    likes: 156,
    comments: 45,
    type: "prayer_request"
  }
];

export const groups = [
  {
    id: 1,
    name: "Fajr Warriors",
    members: 1240,
    description: "Encouraging each other to wake up for Fajr prayer.",
    icon: Star
  },
  {
    id: 2,
    name: "Quran Study Circle",
    members: 850,
    description: "Weekly Tadabbur and recitation correction.",
    icon: BookOpen
  },
  {
    id: 3,
    name: "Local Charity Team",
    members: 420,
    description: "Organizing local food drives and support.",
    icon: Heart
  }
];

export const prayerTimes = {
  fajr: "05:12",
  dhuhr: "12:30",
  asr: "15:45",
  maghrib: "18:12",
  isha: "19:45"
};

export const resources = [
  {
    id: 1,
    title: "Understanding The Seerah",
    type: "Series",
    author: "Sh. Yasir Qadhi",
    duration: "105 Episodes",
    thumbnail: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    title: "Fiqh of Purification",
    type: "Article",
    author: "Islamic Studies Inst.",
    duration: "15 min read",
    thumbnail: "https://images.unsplash.com/photo-1597933814678-15506d574cb7?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    title: "Daily Adhkar Guide",
    type: "PDF",
    author: "UmmahLink Team",
    duration: "Download",
    thumbnail: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=500&q=60"
  }
];

export const notifications = [
  {
    id: 1,
    title: "Prayer Time Soon",
    message: "Asr prayer is in 15 minutes.",
    time: "10m ago",
    type: "prayer",
    read: false
  },
  {
    id: 2,
    title: "New Event in Fajr Warriors",
    message: "Group Qiyam Night scheduled for this Friday.",
    time: "1h ago",
    type: "group",
    read: false
  },
  {
    id: 3,
    title: "Donation Update",
    message: "Your donation to the Water Well Project has been received. JazakAllah Khair!",
    time: "5h ago",
    type: "charity",
    read: true
  }
];

export const charityCauses = [
  {
    id: 1,
    title: "Clean Water for All",
    organization: "Global Relief Trust",
    image: "/attached_assets/generated_images/water_well_construction_in_arid_village.png",
    target: 5000,
    raised: 3250,
    category: "Sadaqah Jariyah",
    description: "Build deep water wells in drought-affected regions to provide clean drinking water for entire villages."
  },
  {
    id: 2,
    title: "Orphan Sponsorship",
    organization: "Mercy Keepers",
    image: "/attached_assets/generated_images/happy_diverse_children_in_classroom.png",
    target: 12000,
    raised: 8450,
    category: "Zakat Eligible",
    description: "Provide education, healthcare, and food security for orphans in conflict zones."
  },
  {
    id: 3,
    title: "Winter Emergency Kit",
    organization: "Ummah United",
    image: "/attached_assets/generated_images/emergency_food_distribution_trucks.png",
    target: 2500,
    raised: 450,
    category: "Emergency",
    description: "Blankets, heaters, and warm coats for refugees facing harsh winter conditions."
  }
];
