import * as React from "react"
import { motion, HTMLMotionProps } from "motion/react"

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
  delay?: number
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", children, delay = 0, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={`glass-card rounded-xl p-6 ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)
Card.displayName = "Card"
