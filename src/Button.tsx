import React from 'react';
import { cn } from './utils';
import type { ButtonProps } from './types';

const SpinnerIcon = () => (
  <svg className="animate-spin" width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
    <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" opacity="0.75" />
  </svg>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth,
      isLoading,
      isDisabled,
      loading,
      disabled,
      leftIcon,
      rightIcon,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const resolvedLoading = isLoading ?? loading;
    const resolvedDisabled = isDisabled ?? disabled;

    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-medium rounded-lg
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variantStyles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500/50',
      secondary: 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800 focus:ring-gray-500/50',
      outline: 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 active:bg-gray-100 dark:active:bg-gray-600 focus:ring-gray-500/50',
      ghost: 'bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 focus:ring-gray-500/50',
      danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500/50',
    };

    const sizeStyles = {
      sm: 'px-4 py-2.5 text-sm min-h-[44px]',
      md: 'px-5 py-3 text-base min-h-[44px]',
      lg: 'px-6 py-3.5 text-lg min-h-[48px]',
    };

    const isButtonDisabled = resolvedDisabled || resolvedLoading;

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], fullWidth && 'w-full', className)}
        disabled={isButtonDisabled}
        aria-disabled={isButtonDisabled || undefined}
        aria-busy={resolvedLoading || undefined}
        {...props}
      >
        {resolvedLoading ? (
          <>
            <SpinnerIcon />
            <span className="sr-only">Loading</span>
            <span aria-hidden="true">Loading...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
