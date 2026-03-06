import { forwardRef } from 'react';
import { cn } from './utils';
import { Input } from './Input';
import type { StateProps, CommonSize } from './types';

export interface FormTextareaProps
  extends StateProps,
    Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label: string;
  errorMessage?: string;
  /** @deprecated Use errorMessage */
  error?: string | null;
  touched?: boolean;
  helperText?: string;
  size?: CommonSize;
  rows?: number;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  showCharCount?: boolean;
  wrapperClassName?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      label, errorMessage, isLoading, isDisabled, isError, error, touched, helperText,
      size = 'md', rows = 4, resize = 'vertical', showCharCount, maxLength,
      wrapperClassName, className, id, required, disabled, value, ...props
    },
    ref
  ) => {
    const resolvedErrorMessage = errorMessage ?? error ?? undefined;
    const hasError = isError ?? (touched ? !!resolvedErrorMessage : false);
    const displayedError = hasError ? resolvedErrorMessage : undefined;
    const resolvedDisabled = isDisabled ?? disabled;
    const charCount = typeof value === 'string' ? value.length : 0;
    const charCountText = maxLength ? `${charCount}/${maxLength}` : String(charCount);
    const resizeStyles = { none: 'resize-none', vertical: 'resize-y', horizontal: 'resize-x', both: 'resize' };

    return (
      <div className={cn('form-textarea-wrapper', wrapperClassName)}>
        <Input
          ref={ref as React.Ref<HTMLTextAreaElement>}
          as="textarea"
          id={id}
          label={label}
          error={displayedError}
          helperText={helperText}
          size={size}
          required={required}
          disabled={resolvedDisabled || isLoading}
          fullWidth
          rows={rows}
          maxLength={maxLength}
          value={value}
          className={cn(resizeStyles[resize], className)}
          {...props}
        />
        {showCharCount && (
          <div className="flex justify-end mt-1">
            <span className={cn(
              'text-xs',
              maxLength && charCount >= maxLength ? 'text-red-500' : maxLength && charCount >= maxLength * 0.9 ? 'text-yellow-500' : 'text-gray-400 dark:text-gray-500'
            )}>
              {charCountText}
            </span>
          </div>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
