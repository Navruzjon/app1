import * as React from "react"
import { TextInput, StyleSheet, Platform } from "react-native-web"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<TextInput, React.ComponentProps<typeof TextInput>>(
  ({ className, style, ...props }, ref) => {
    return (
      <TextInput
        style={[styles.input, style]}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        placeholderTextColor="#94a3b8"
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: 'transparent',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    // @ts-ignore
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      }
    })
  }
});

export { Input }
