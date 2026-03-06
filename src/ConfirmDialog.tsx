import React, { useEffect, useRef } from 'react';
import { cn } from './utils';
import { Button } from './Button';
import type { ConfirmDialogProps } from './types';

const AlertIcon = ({ className }: { className?: string }) => (
  <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const InfoIcon = ({ className }: { className?: string }) => (
  <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen, title, message, confirmText = 'Confirm', cancelText = 'Cancel', variant = 'info', onConfirm, onCancel,
}) => {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) onCancel(); };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCancel]);

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isOpen && document.activeElement?.tagName !== 'BUTTON') { e.preventDefault(); onConfirm(); }
    };
    if (isOpen) document.addEventListener('keydown', handleEnter);
    return () => document.removeEventListener('keydown', handleEnter);
  }, [isOpen, onConfirm]);

  useEffect(() => {
    if (!isOpen) return;
    const el = dialogRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (confirmButtonRef.current) setTimeout(() => confirmButtonRef.current?.focus(), 100);
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) onCancel();
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const variantConfig = {
    danger: { icon: <AlertIcon className="w-6 h-6 text-red-500" />, iconBg: 'bg-red-50 dark:bg-red-900/30' },
    warning: { icon: <AlertIcon className="w-6 h-6 text-yellow-600" />, iconBg: 'bg-yellow-50 dark:bg-yellow-900/30' },
    info: { icon: <InfoIcon className="w-6 h-6 text-blue-500" />, iconBg: 'bg-blue-50 dark:bg-blue-900/30' },
  };

  const config = variantConfig[variant];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4 py-5" role="dialog" aria-modal="true" aria-labelledby="dialog-title" aria-describedby="dialog-message">
      <div ref={dialogRef} className="w-full max-w-[500px] rounded-xl shadow-2xl bg-white dark:bg-gray-800 p-6 sm:p-8 relative">
        <div className="flex items-start gap-4">
          <div className={cn('flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center', config.iconBg)}>
            {config.icon}
          </div>
          <div className="flex-1">
            <h3 id="dialog-title" className="font-medium text-xl text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
            <p id="dialog-message" className="text-gray-500 dark:text-gray-400 text-sm mb-6">{message}</p>
            <div className="flex flex-wrap gap-3 justify-end">
              <Button ref={cancelButtonRef} type="button" onClick={onCancel} variant="secondary" size="md" aria-label={`Cancel: ${cancelText}`}>{cancelText}</Button>
              <Button ref={confirmButtonRef} type="button" onClick={onConfirm} variant={variant === 'danger' ? 'danger' : 'primary'} size="md" aria-label={`Confirm: ${confirmText}`}>{confirmText}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
