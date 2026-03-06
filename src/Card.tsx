import React from 'react';
import { cn } from './utils';
import type { CardProps } from './types';

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      hoverable = false,
      clickable = false,
      padding = 'md',
      rounded = 'lg',
      className,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: 'bg-white dark:bg-gray-800',
      bordered: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
      elevated: 'bg-white dark:bg-gray-800 shadow-md',
      ghost: 'bg-transparent',
      flat: 'bg-gray-50 dark:bg-gray-700',
    };

    const paddingStyles = { none: '', sm: 'p-3', md: 'p-4', lg: 'p-6' };
    const roundedStyles = { none: 'rounded-none', sm: 'rounded', md: 'rounded-md', lg: 'rounded-lg' };

    return (
      <div
        ref={ref}
        className={cn(
          'transition-all duration-200',
          roundedStyles[rounded],
          variantStyles[variant],
          paddingStyles[padding],
          hoverable && 'hover:shadow-lg hover:-translate-y-0.5',
          clickable && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4 pb-4 border-b border-gray-200 dark:border-gray-700', className)} {...props}>
      {children}
    </div>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  )
);
CardBody.displayName = 'CardBody';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mt-4 pt-4 border-t border-gray-200 dark:border-gray-700', className)} {...props}>
      {children}
    </div>
  )
);
CardFooter.displayName = 'CardFooter';

export const CompoundCard = Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});
