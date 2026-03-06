import React, { forwardRef, useId } from 'react';
import type { CheckboxProps } from './types';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      checked,
      onChange,
      disabled = false,
      error,
      helperText,
      state = 'default',
      size = 'md',
      className = '',
      labelClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const effectiveState = error ? 'error' : state;

    const sizeClasses = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
    const stateClasses = { default: 'border-gray-300', success: 'border-green-500', error: 'border-red-500', warning: 'border-yellow-500' };
    const labelSizeClasses = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' };
    const helperSizeClasses = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && onChange) onChange(e.target.checked);
    };

    const checkboxId = id || `checkbox-${generatedId}`;

    return (
      <div className="flex flex-col">
        <label
          htmlFor={checkboxId}
          className={`flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${labelClassName}`}
        >
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={effectiveState === 'error'}
            aria-describedby={error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined}
            className={`${sizeClasses[size]} rounded ${stateClasses[effectiveState]} text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900 ${disabled ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800 cursor-pointer'} ${className}`}
            {...props}
          />
          {label && (
            <span className={`text-gray-900 dark:text-gray-100 ${labelSizeClasses[size]} ${disabled ? 'opacity-50' : ''}`}>
              {label}
            </span>
          )}
        </label>
        {(helperText || error) && (
          <div className="mt-1 ml-6">
            {error && (
              <p id={`${checkboxId}-error`} className={`text-red-500 ${helperSizeClasses[size]}`} role="alert">{error}</p>
            )}
            {helperText && !error && (
              <p id={`${checkboxId}-helper`} className={`text-gray-500 dark:text-gray-400 ${helperSizeClasses[size]}`}>{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
