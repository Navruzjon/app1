"use client"

import * as React from "react"
import { View, Text, Platform } from "react-native-web"

// Mock Tooltip for React Native / Web compatibility (Radix is DOM only)
const TooltipProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const TooltipTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View>
>(({ className, sideOffset = 4, ...props }, ref) => {
  if (Platform.OS !== 'web') return null; // No tooltips on mobile
  return (
    <View
      ref={ref}
      style={{ 
        position: 'absolute', 
        zIndex: 50, 
        backgroundColor: 'black', 
        padding: 4, 
        borderRadius: 4 
      }}
      {...props as any}
    >
       {props.children}
    </View>
  )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
