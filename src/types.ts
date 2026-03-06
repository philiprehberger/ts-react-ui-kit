import * as React from 'react';

// =============================================================================
// SIZE SCALE
// =============================================================================

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type CommonSize = 'sm' | 'md' | 'lg';

// =============================================================================
// STATE PROPS
// =============================================================================

export interface StateProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

// =============================================================================
// FORM FIELD PROPS
// =============================================================================

export interface FormFieldBaseProps extends StateProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  id?: string;
  name?: string;
  touched?: boolean;
}

// =============================================================================
// EVENT HANDLERS
// =============================================================================

export interface EventHandlers<T = unknown> {
  onChange?: (value: T) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

// =============================================================================
// STYLE PROPS
// =============================================================================

export interface StyleProps {
  className?: string;
}

// =============================================================================
// COMBINED STANDARD PROPS
// =============================================================================

export interface StandardComponentProps extends StateProps, StyleProps {
  size?: CommonSize;
  children?: React.ReactNode;
}

// =============================================================================
// ICON PROPS
// =============================================================================

export interface IconSlotProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// =============================================================================
// VARIANT TYPES
// =============================================================================

export type ActionVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type StatusVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
export type ColorVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
export type SizeVariant = Size;
export type StateVariant = 'default' | 'success' | 'error' | 'warning';

// =============================================================================
// LAYOUT PROPS
// =============================================================================

export type Orientation = 'horizontal' | 'vertical';
export type Alignment = 'start' | 'center' | 'end';
export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// =============================================================================
// COMPONENT PROP TYPES
// =============================================================================

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: CommonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  /** @deprecated Use isLoading */
  loading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'ghost' | 'flat';
  hoverable?: boolean;
  clickable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg';
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'discount' | 'new' | 'featured';
  size?: CommonSize;
  dot?: boolean;
  pill?: boolean;
}

interface BaseInputProps {
  size?: CommonSize;
  state?: StateVariant;
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  as?: 'input' | 'select' | 'textarea';
}

export interface InputInputProps extends BaseInputProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  as?: 'input';
}

export interface SelectInputProps extends BaseInputProps, Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  as: 'select';
  children: React.ReactNode;
}

export interface TextareaInputProps extends BaseInputProps, Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  as: 'textarea';
}

export type InputProps = InputInputProps | SelectInputProps | TextareaInputProps;

export interface TextFieldProps extends Omit<InputInputProps, 'type' | 'as'> {
  type?: 'text' | 'email' | 'url' | 'tel' | 'date';
}

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  state?: StateVariant;
  size?: CommonSize;
  labelClassName?: string;
}

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
  helperText?: string;
}

export interface RadioGroupProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'onChange'> {
  label?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  state?: StateVariant;
  size?: CommonSize;
  layout?: 'vertical' | 'horizontal';
  required?: boolean;
  name: string;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: CommonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  trigger?: React.ReactNode;
}

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number;
}

export interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'info' | 'warning' | 'danger';
  onConfirm: () => void;
  onCancel: () => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
}

export interface ToastData {
  id: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  duration?: number;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };
export type Without<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
