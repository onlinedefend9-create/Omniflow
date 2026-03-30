import * as React from "react"
import { motion, HTMLMotionProps } from "motion/react"

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF007F] focus:ring-offset-2 focus:ring-offset-[#09090b] disabled:opacity-50 disabled:pointer-events-none"
    
    const variants = {
      primary: "bg-[#FF007F] text-white hover:bg-[#ff3399] hover:brightness-110 hover:shadow-[0_0_15px_rgba(255,0,127,0.4)]",
      outline: "border border-[#FF007F] text-white hover:bg-[rgba(255,0,127,0.1)]",
      ghost: "text-white hover:text-[#FF007F] hover:bg-[rgba(255,255,255,0.05)]"
    }
    
    const sizes = {
      sm: "h-9 px-4 text-sm",
      md: "h-10 px-6 py-2",
      lg: "h-12 px-8 text-lg"
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    )
  }
)
Button.displayName = "Button"
