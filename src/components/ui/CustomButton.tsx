
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  to?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

const CustomButton = ({
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  to,
  isLoading = false,
  icon,
  iconPosition = 'left',
  className,
  children,
  ...props
}: CustomButtonProps) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-primary";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 active:bg-primary/80 disabled:bg-primary/50",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70 disabled:bg-secondary/50",
    ghost: "bg-transparent hover:bg-primary/10 active:bg-primary/20 text-foreground hover:text-primary disabled:text-foreground/50",
    outline: "border border-input bg-transparent hover:bg-primary/5 hover:text-primary hover:border-primary text-foreground disabled:opacity-50"
  };
  
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-11 px-6 text-base",
    xl: "h-12 px-8 text-base"
  };
  
  const loadingSpinner = (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg 
        className="animate-spin h-5 w-5" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
  
  const content = (
    <>
      {isLoading && loadingSpinner}
      <span className={cn("flex items-center gap-2", isLoading && "opacity-0")}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </span>
    </>
  );
  
  const buttonClasses = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    isLoading && "cursor-not-allowed",
    className
  );
  
  // If it's a link to an external site
  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={buttonClasses}
      >
        {content}
      </a>
    );
  }
  
  // If it's a router link
  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
      >
        {content}
      </Link>
    );
  }
  
  // Regular button
  return (
    <button
      className={buttonClasses}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {content}
    </button>
  );
};

export default CustomButton;
