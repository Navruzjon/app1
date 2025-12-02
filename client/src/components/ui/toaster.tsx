import { useToast } from "@/hooks/use-toast"
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native-web';
import { X } from "@/components/ui/Icons";

export function Toaster() {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) return null;

  return (
    <View style={styles.viewport}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <View key={id} style={styles.toast}>
            <View style={styles.content}>
              {title && <Text style={styles.title}>{title}</Text>}
              {description && (
                <Text style={styles.description}>{description}</Text>
              )}
            </View>
            {action && <View>{action}</View>}
            <TouchableOpacity onPress={() => dismiss(id)} style={styles.close}>
               <X size={16} color="#64748b" />
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  viewport: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 100,
    gap: 8,
    // @ts-ignore
    ...Platform.select({
      web: {
        pointerEvents: 'box-none',
        alignItems: 'flex-end',
      },
      default: {
        alignItems: 'center',
      }
    })
  },
  toast: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    minWidth: 300,
    maxWidth: '90%',
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#0f172a',
  },
  description: {
    fontSize: 12,
    color: '#64748b',
  },
  close: {
    padding: 4,
  }
});
