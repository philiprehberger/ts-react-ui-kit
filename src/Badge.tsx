import React from 'react';
import { cn } from './utils';
import type { BadgeProps } from './types';

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', dot = false, pill = false, className, children, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-blue-100 text-blue-800',
      secondary: 'bg-purple-100 text-purple-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      discount: 'bg-red-500 text-white',
      new: 'bg-green-500 text-white',
      featured: 'bg-purple-500 text-white',
    };

    const sizeStyles = { sm: 'px-2 py-0.5 text-xs', md: 'px-2.5 py-1 text-sm', lg: 'px-3 py-1.5 text-base' };

    const dotColors = {
      default: 'bg-gray-600', primary: 'bg-blue-600', secondary: 'bg-purple-600',
      success: 'bg-green-600', warning: 'bg-yellow-600', error: 'bg-red-600',
      discount: 'bg-red-700', new: 'bg-green-700', featured: 'bg-purple-700',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium transition-colors duration-200',
          variantStyles[variant],
          sizeStyles[size],
          pill ? 'rounded-full' : 'rounded',
          className
        )}
        {...props}
      >
        {dot && <span className={cn('w-2 h-2 rounded-full', dotColors[variant])} aria-hidden="true" />}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export interface DiscountBadgeProps extends Omit<BadgeProps, 'variant'> {
  percentage?: number;
}

export const DiscountBadge = React.forwardRef<HTMLSpanElement, DiscountBadgeProps>(
  ({ percentage, children, ...props }, ref) => (
    <Badge ref={ref} variant="discount" {...props}>
      {children || (percentage ? `${percentage}% OFF` : 'Sale')}
    </Badge>
  )
);
DiscountBadge.displayName = 'DiscountBadge';

export const NewBadge = React.forwardRef<HTMLSpanElement, Omit<BadgeProps, 'variant' | 'children'>>(
  (props, ref) => <Badge ref={ref} variant="new" {...props}>New</Badge>
);
NewBadge.displayName = 'NewBadge';

export const FeaturedBadge = React.forwardRef<HTMLSpanElement, Omit<BadgeProps, 'variant' | 'children'>>(
  (props, ref) => <Badge ref={ref} variant="featured" {...props}>Featured</Badge>
);
FeaturedBadge.displayName = 'FeaturedBadge';
