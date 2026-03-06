import React from 'react';
import { cn } from './utils';
import type { InputProps } from './types';

const ChevronDownIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const Input = React.forwardRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, InputProps>(
  (props, ref) => {
    const {
      as = 'input',
      size = 'md',
      state = 'default',
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth,
      className,
      id,
      required,
      children,
      ...restProps
    } = props;

    const generatedId = React.useId();
    const inputId = id || generatedId;
    const helperTextId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const actualState = error ? 'error' : state;

    const baseStyles = `
      w-full rounded-lg border bg-white dark:bg-gray-800
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-gray-900
      disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 dark:disabled:bg-gray-700
      placeholder:text-gray-400 dark:placeholder:text-gray-500
    `;

    const sizeStyles = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-base', lg: 'px-5 py-3 text-lg' };

    const stateStyles = {
      default: 'border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:border-gray-400 dark:hover:border-gray-500 focus:border-blue-500 focus:ring-blue-500/20',
      success: 'border-green-500 text-gray-900 dark:text-gray-100 focus:border-green-500 focus:ring-green-500/20',
      error: 'border-red-500 text-gray-900 dark:text-gray-100 focus:border-red-500 focus:ring-red-500/20',
      warning: 'border-yellow-500 text-gray-900 dark:text-gray-100 focus:border-yellow-500 focus:ring-yellow-500/20',
    };

    const elementClassName = cn(
      baseStyles,
      sizeStyles[size],
      stateStyles[actualState],
      as !== 'select' && leftIcon && 'pl-10',
      as !== 'select' && rightIcon && 'pr-10',
      as === 'select' && 'appearance-none pr-10',
      className
    );

    const renderElement = () => {
      const describedBy = error ? errorId : helperText ? helperTextId : undefined;

      if (as === 'select') {
        return (
          <>
            <select
              ref={ref as React.Ref<HTMLSelectElement>}
              id={inputId}
              className={elementClassName}
              aria-describedby={describedBy}
              aria-invalid={actualState === 'error'}
              aria-required={required || undefined}
              required={required}
              {...(restProps as React.SelectHTMLAttributes<HTMLSelectElement>)}
            >
              {children}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <ChevronDownIcon />
            </div>
          </>
        );
      }

      if (as === 'textarea') {
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            id={inputId}
            className={elementClassName}
            aria-describedby={describedBy}
            aria-invalid={actualState === 'error'}
            aria-required={required || undefined}
            required={required}
            {...(restProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        );
      }

      return (
        <>
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            id={inputId}
            className={elementClassName}
            aria-describedby={describedBy}
            aria-invalid={actualState === 'error'}
            aria-required={required || undefined}
            required={required}
            {...(restProps as React.InputHTMLAttributes<HTMLInputElement>)}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {rightIcon}
            </div>
          )}
        </>
      );
    };

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
            {required && (
              <>
                <span aria-hidden="true" className="text-red-500 ml-1">*</span>
                <span className="sr-only">(required)</span>
              </>
            )}
          </label>
        )}
        <div className="relative">{renderElement()}</div>
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-600" role="alert">{error}</p>
        )}
        {!error && helperText && (
          <p id={helperTextId} className="mt-1 text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
