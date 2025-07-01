
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'neuro';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'neuro',
  size = 'md',
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const baseClasses = 'font-poppins font-medium transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 rounded-lg',
    secondary: 'bg-secondary text-text-primary hover:bg-gray-300 focus:ring-2 focus:ring-gray-400 rounded-lg',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary-500 rounded-lg',
    ghost: 'text-primary hover:bg-primary-50 focus:ring-2 focus:ring-primary-500 rounded-lg',
    neuro: 'neuro-button text-text-primary'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
