import { forwardRef } from 'react';
import { cn } from './utils';
import type { SkeletonProps } from './types';

const roundedStyles = {
  none: 'rounded-none', sm: 'rounded', md: 'rounded-md', lg: 'rounded-lg', full: 'rounded-full',
};

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width, height, rounded = 'md', variant = 'default', className, style, ...props }, ref) => {
    const variantStyles = { default: '', text: 'h-4 w-full', circular: 'rounded-full', rectangular: 'rounded-none' };
    const inlineStyles = {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading..."
        className={cn('animate-pulse bg-gray-200 dark:bg-gray-700', roundedStyles[rounded], variantStyles[variant], className)}
        style={inlineStyles}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export function TextSkeleton({ lines = 3, gap = 2 }: { lines?: number; gap?: number }) {
  return (
    <div className={cn(`space-y-${gap}`)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} variant="text" width={index === lines - 1 ? '60%' : '100%'} />
      ))}
    </div>
  );
}

export function AvatarSkeleton({ size = 40 }: { size?: number }) {
  return <Skeleton variant="circular" width={size} height={size} />;
}

export function CardSkeleton() {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Skeleton width="60%" height={24} className="mb-4" />
      <TextSkeleton lines={3} />
      <Skeleton width={120} height={36} className="mt-4" />
    </div>
  );
}
