import * as React from "react"
import { View, Text, StyleSheet } from "react-native-web"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, style, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    style={[styles.card, style]}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, style, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    style={[styles.header, style]}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, style, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    style={[styles.title, style]}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  React.ElementRef<typeof Text>,
  React.ComponentPropsWithoutRef<typeof Text>
>(({ className, style, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    style={[styles.description, style]}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, style, ...props }, ref) => (
  <View ref={ref} className={cn("p-6 pt-0", className)} style={[styles.content, style]} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, style, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    style={[styles.footer, style]}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    padding: 24,
    gap: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#0f172a',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
  },
  content: {
    padding: 24,
    paddingTop: 0,
  },
  footer: {
    padding: 24,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
