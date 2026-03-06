import { forwardRef } from 'react';
import { cn } from './utils';
import { Input } from './Input';
import type { InputInputProps, TextFieldProps } from './types';

export const FormField = forwardRef<HTMLInputElement, InputInputProps>(
  (props, ref) => (
    <div className="mb-4">
      <Input ref={ref as React.Ref<HTMLInputElement>} {...props} />
    </div>
  )
);
FormField.displayName = 'FormField';

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ type = 'text', ...props }, ref) => <FormField ref={ref} type={type} {...props} />
);
TextField.displayName = 'TextField';

export const EmailField = forwardRef<HTMLInputElement, Omit<InputInputProps, 'type' | 'as'>>(
  (props, ref) => <FormField ref={ref} type="email" {...props} />
);
EmailField.displayName = 'EmailField';

export const PasswordField = forwardRef<HTMLInputElement, Omit<InputInputProps, 'type' | 'as'>>(
  (props, ref) => <FormField ref={ref} type="password" {...props} />
);
PasswordField.displayName = 'PasswordField';

export const SearchField = forwardRef<HTMLInputElement, Omit<InputInputProps, 'type' | 'as'>>(
  (props, ref) => <FormField ref={ref} type="search" {...props} />
);
SearchField.displayName = 'SearchField';

export interface NumberFieldProps extends Omit<InputInputProps, 'type' | 'as'> {
  min?: number;
  max?: number;
  step?: number;
}

export const NumberField = forwardRef<HTMLInputElement, NumberFieldProps>(
  (props, ref) => <FormField ref={ref} type="number" {...props} />
);
NumberField.displayName = 'NumberField';

export interface FormGroupProps {
  label?: string;
  children: React.ReactNode;
  description?: string;
  className?: string;
}

export function FormGroup({ label, description, children, className }: FormGroupProps) {
  return (
    <div className={cn('mb-6', className)}>
      {label && (
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900">{label}</h3>
          {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export interface FormRowProps {
  children: React.ReactNode;
  gap?: number;
  className?: string;
}

export function FormRow({ children, gap = 4, className }: FormRowProps) {
  const gapMap: Record<number, string> = { 2: 'gap-2', 3: 'gap-3', 4: 'gap-4', 6: 'gap-6', 8: 'gap-8' };
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2', gapMap[gap] || 'gap-4', className)}>
      {children}
    </div>
  );
}
