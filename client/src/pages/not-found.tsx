import { View, Text, StyleSheet } from 'react-native-web';
import { AlertCircle } from "lucide-react-native";

// Reusable Components
const Card = ({ children, style }: { children: React.ReactNode, style?: any }) => (
  <View style={[styles.card, style]}>{children}</View>
);

const CardContent = ({ children, style }: { children: React.ReactNode, style?: any }) => (
  <View style={[styles.cardContent, style]}>{children}</View>
);

export default function NotFound() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <CardContent>
          <View style={styles.header}>
            <AlertCircle size={32} color="#ef4444" />
            <Text style={styles.title}>404 Page Not Found</Text>
          </View>

          <Text style={styles.message}>
            Did you forget to add the page to the router?
          </Text>
        </CardContent>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    // @ts-ignore
    minHeight: '100vh',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 448, // max-w-md
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardContent: {
    padding: 24,
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  message: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 16,
  },
});
