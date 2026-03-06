import { forwardRef } from 'react';
import { cn } from './utils';
import { Input } from './Input';
import type { StateProps, IconSlotProps, CommonSize } from './types';

export interface FormInputProps
  extends StateProps,
    IconSlotProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  errorMessage?: string;
  /** @deprecated Use errorMessage */
  error?: string | null;
  touched?: boolean;
  helperText?: string;
  size?: CommonSize;
  wrapperClassName?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label, errorMessage, isLoading, isDisabled, isError, error, touched, helperText,
      size = 'md', leftIcon, rightIcon, wrapperClassName, className, id, required, disabled, ...props
    },
    ref
  ) => {
    const resolvedErrorMessage = errorMessage ?? error ?? undefined;
    const hasError = isError ?? (touched ? !!resolvedErrorMessage : false);
    const displayedError = hasError ? resolvedErrorMessage : undefined;
    const resolvedDisabled = isDisabled ?? disabled;

    return (
      <div className={cn('form-input-wrapper', wrapperClassName)}>
        <Input
          ref={ref as React.Ref<HTMLInputElement>}
          id={id}
          label={label}
          error={displayedError}
          helperText={helperText}
          size={size}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          required={required}
          disabled={resolvedDisabled || isLoading}
          fullWidth
          className={className}
          {...props}
        />
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
