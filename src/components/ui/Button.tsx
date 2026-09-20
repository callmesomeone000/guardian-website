'use client';

import { forwardRef, ButtonHTMLAttributes, ElementType } from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, asChild = false, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background-primary disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'bg-accent-cyan text-background-primary hover:bg-accent-teal active:scale-[0.98] focus-visible:ring-accent-cyan',
      secondary: 'bg-background-elevated text-foreground-primary border border-border-primary hover:bg-background-tertiary hover:border-border-secondary active:scale-[0.98] focus-visible:ring-border-secondary',
      ghost: 'bg-transparent text-foreground-secondary hover:text-foreground-primary hover:bg-background-tertiary active:scale-[0.98] focus-visible:ring-border-secondary',
      danger: 'bg-accent-red text-white hover:bg-red-600 active:scale-[0.98] focus-visible:ring-accent-red',
    };
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
    };

    const Comp = asChild ? Slot : 'button';

    // Slot (asChild) requires exactly one React element child, so it must
    // just pass `children` straight through with no extra siblings.
    if (asChild) {
      return (
        <Comp
          ref={ref}
          className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </Comp>
    );
  }
);

Button.displayName = 'Button';
