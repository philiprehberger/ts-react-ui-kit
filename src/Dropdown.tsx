import React, { useState, useRef, useEffect } from 'react';
import { cn } from './utils';
import type { DropdownProps, DropdownItem } from './types';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  value,
  onChange,
  placeholder = 'Select...',
  size = 'md',
  fullWidth,
  disabled,
  trigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedItem = items.find((item) => item.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsOpen(false); };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  const handleItemClick = (item: DropdownItem) => {
    if (item.disabled) return;
    onChange?.(item.value);
    setIsOpen(false);
  };

  const sizeStyles = { sm: 'px-3 py-1.5 text-sm', md: 'px-4 py-2 text-base', lg: 'px-5 py-3 text-lg' };

  return (
    <div ref={dropdownRef} className={cn('relative', fullWidth && 'w-full')}>
      {trigger ? (
        <div onClick={() => !disabled && setIsOpen(!isOpen)}>{trigger}</div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'flex items-center justify-between gap-2 w-full',
            'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg',
            'hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
            'transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
            sizeStyles[size]
          )}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2">
            {selectedItem?.icon}
            <span className={!selectedItem ? 'text-gray-400 dark:text-gray-500' : 'dark:text-gray-100'}>
              {selectedItem?.label || placeholder}
            </span>
          </span>
          <ChevronDownIcon className={cn('transition-transform', isOpen && 'rotate-180')} />
        </button>
      )}
      {isOpen && (
        <div
          className={cn(
            'absolute z-10 mt-1 w-full',
            'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg',
            'max-h-60 overflow-auto'
          )}
          role="listbox"
        >
          {items.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              className={cn(
                'flex items-center gap-2 w-full px-4 py-2 text-left dark:text-gray-100',
                'hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                value === item.value && 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              )}
              role="option"
              aria-selected={value === item.value}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
