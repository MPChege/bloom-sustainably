
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  as?: "button" | "link";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      as = "button",
      href,
      icon,
      iconPosition = "left",
      ...props
    },
    ref
  ) => {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none smooth-transition";
    
    const variants = {
      primary: "bg-primary text-white hover:bg-primary/90 active:bg-primary/95 shadow-sm",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/95",
      outline: "border border-primary text-primary hover:bg-primary/5 active:bg-primary/10",
      ghost: "text-primary hover:bg-primary/5 active:bg-primary/10",
      link: "text-primary underline-offset-4 hover:underline",
    };
    
    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded",
      md: "text-sm px-5 py-2.5 rounded-md",
      lg: "text-base px-6 py-3 rounded-md",
    };
    
    const buttonClasses = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth ? "w-full" : "",
      className
    );
    
    const content = (
      <>
        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      </>
    );
    
    if (as === "link" && href) {
      return (
        <Link to={href} className={buttonClasses}>
          {content}
        </Link>
      );
    }
    
    return (
      <button className={buttonClasses} ref={ref} {...props}>
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
