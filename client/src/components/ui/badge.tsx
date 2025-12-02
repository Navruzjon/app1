import * as React from "react"
import { View, Text, StyleSheet } from "react-native-web"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "whitespace-nowrap inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-xs",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow-xs",
        outline: "text-foreground border [border-color:var(--badge-outline)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.ComponentPropsWithoutRef<typeof View>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, style, children, ...props }: BadgeProps) {
  // Need to separate text style from view style if possible, or just rely on inheritance (which RN doesn't do well)
  // But simpler to just wrap children in Text if they are strings.
  // For now, we'll assume children might be text.
  
  const isText = typeof children === 'string' || typeof children === 'number';

  return (
    <View className={cn(badgeVariants({ variant }), className)} style={[styles.badge, style]} {...props}>
      {isText ? <Text style={styles.text}>{children}</Text> : children}
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 9999,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  }
});

export { Badge, badgeVariants }
