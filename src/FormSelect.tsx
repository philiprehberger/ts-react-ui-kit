import { forwardRef } from 'react';
import { cn } from './utils';
import { Input } from './Input';
import type { StateProps, CommonSize } from './types';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormSelectProps
  extends StateProps,
    Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  options: SelectOption[];
  errorMessage?: string;
  /** @deprecated Use errorMessage */
  error?: string | null;
  touched?: boolean;
  helperText?: string;
  placeholder?: string;
  size?: CommonSize;
  wrapperClassName?: string;
}

export const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      label, options, errorMessage, isLoading, isDisabled, isError, error, touched, helperText,
      placeholder, size = 'md', wrapperClassName, className, id, required, disabled, value, ...props
    },
    ref
  ) => {
    const resolvedErrorMessage = errorMessage ?? error ?? undefined;
    const hasError = isError ?? (touched ? !!resolvedErrorMessage : false);
    const displayedError = hasError ? resolvedErrorMessage : undefined;
    const resolvedDisabled = isDisabled ?? disabled;

    return (
      <div className={cn('form-select-wrapper', wrapperClassName)}>
        <Input
          ref={ref as React.Ref<HTMLSelectElement>}
          as="select"
          id={id}
          label={label}
          error={displayedError}
          helperText={helperText}
          size={size}
          required={required}
          disabled={resolvedDisabled || isLoading}
          fullWidth
          className={className}
          value={value}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>
          ))}
        </Input>
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';
