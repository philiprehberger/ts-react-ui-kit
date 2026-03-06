import React, { forwardRef } from 'react';
import type { RadioGroupProps } from './types';

export const RadioGroup = forwardRef<HTMLInputElement, RadioGroupProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      disabled = false,
      error,
      helperText,
      state = 'default',
      size = 'md',
      layout = 'vertical',
      required = false,
      name,
      className = '',
      ...props
    },
    ref
  ) => {
    const effectiveState = error ? 'error' : state;

    const sizeClasses = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
    const stateClasses = { default: 'border-gray-300', success: 'border-green-500', error: 'border-red-500', warning: 'border-yellow-500' };
    const labelSizeClasses = { sm: 'text-sm', md: 'text-base', lg: 'text-lg' };
    const helperSizeClasses = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };
    const layoutClasses = { vertical: 'flex flex-col space-y-2', horizontal: 'flex flex-row flex-wrap gap-4' };

    const handleChange = (optionValue: string) => {
      if (!disabled && onChange) onChange(optionValue);
    };

    const groupId = `radio-group-${name}`;

    return (
      <fieldset className={className} aria-invalid={effectiveState === 'error'} aria-describedby={error ? `${groupId}-error` : helperText ? `${groupId}-helper` : undefined}>
        {label && (
          <legend className={`font-medium text-gray-900 dark:text-gray-100 mb-2 ${labelSizeClasses[size]}`}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </legend>
        )}
        <div className={layoutClasses[layout]}>
          {options.map((option, index) => {
            const optionId = `${groupId}-option-${index}`;
            const isDisabled = disabled || option.disabled;
            return (
              <div key={option.value} className="flex flex-col">
                <label htmlFor={optionId} className={`flex items-center gap-2 ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
                  <input
                    ref={index === 0 ? ref : undefined}
                    type="radio"
                    id={optionId}
                    name={name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={() => handleChange(option.value)}
                    disabled={isDisabled}
                    className={`${sizeClasses[size]} ${stateClasses[effectiveState]} text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-gray-900 ${isDisabled ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-700' : 'bg-white dark:bg-gray-800 cursor-pointer'}`}
                    {...props}
                  />
                  <span className={`text-gray-900 dark:text-gray-100 ${labelSizeClasses[size]} ${isDisabled ? 'opacity-50' : ''}`}>
                    {option.label}
                  </span>
                </label>
                {option.helperText && (
                  <p className={`text-gray-500 dark:text-gray-400 ${helperSizeClasses[size]} ml-6 mt-0.5`}>{option.helperText}</p>
                )}
              </div>
            );
          })}
        </div>
        {(helperText || error) && (
          <div className="mt-2">
            {error && <p id={`${groupId}-error`} className={`text-red-500 ${helperSizeClasses[size]}`} role="alert">{error}</p>}
            {helperText && !error && <p id={`${groupId}-helper`} className={`text-gray-500 dark:text-gray-400 ${helperSizeClasses[size]}`}>{helperText}</p>}
          </div>
        )}
      </fieldset>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';
