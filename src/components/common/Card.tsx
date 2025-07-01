
import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'neuro' | 'neuro-inset';
}

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md',
  variant = 'neuro',
  onClick,
  style,
  ...props
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const variantClasses = {
    default: 'bg-white rounded-xl shadow-lg border border-gray-100',
    neuro: 'neuro-card',
    'neuro-inset': 'neuro-inset'
  };

  return (
    <div
      className={cn(
        variantClasses[variant],
        paddingClasses[padding],
        hover && 'hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
