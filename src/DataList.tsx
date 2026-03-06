import React, { memo, ReactNode, useMemo } from 'react';
import { cn } from './utils';

export interface DataListProps<T> {
  items: T[];
  keyExtractor: (item: T, index: number) => string | number;
  renderItem: (item: T, index: number) => ReactNode;
  renderEmpty?: () => ReactNode;
  renderLoading?: () => ReactNode;
  isLoading?: boolean;
  className?: string;
  layout?: 'list' | 'grid';
  gridCols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'none' | 'sm' | 'md' | 'lg';
  header?: ReactNode;
  footer?: ReactNode;
  separator?: ReactNode;
  divided?: boolean;
}

function DataListInner<T>({
  items, keyExtractor, renderItem, renderEmpty, renderLoading, isLoading = false,
  className, layout = 'list', gridCols = 4, gap = 'md', header, footer, separator, divided = false,
}: DataListProps<T>) {
  const gapStyles = { none: 'gap-0', sm: 'gap-2', md: 'gap-4', lg: 'gap-6' };
  const gridColStyles = {
    1: 'grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4', 5: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };
  const layoutStyles = { list: 'flex flex-col', grid: `grid grid-cols-1 ${gridColStyles[gridCols]}` };

  const renderedItems = useMemo(() => {
    return items.map((item, index) => {
      const key = keyExtractor(item, index);
      const isLast = index === items.length - 1;
      return (
        <div key={key} className={cn(divided && !isLast && layout === 'list' && 'border-b border-gray-200 dark:border-gray-700 pb-4')}>
          {renderItem(item, index)}
          {separator && !isLast && layout === 'list' && <div className="my-2">{separator}</div>}
        </div>
      );
    });
  }, [items, keyExtractor, renderItem, separator, divided, layout]);

  if (isLoading && renderLoading) return <>{renderLoading()}</>;
  if (items.length === 0) return renderEmpty ? <>{renderEmpty()}</> : null;

  return (
    <div className={className}>
      {header && <div className="mb-4">{header}</div>}
      <div className={cn(layoutStyles[layout], gapStyles[gap])}>{renderedItems}</div>
      {footer && <div className="mt-4">{footer}</div>}
    </div>
  );
}

export const DataList = memo(DataListInner) as typeof DataListInner;

export function GridList<T>(props: Omit<DataListProps<T>, 'layout'>): React.ReactElement {
  return <DataList {...props} layout="grid" />;
}

export function StackList<T>(props: Omit<DataListProps<T>, 'layout'>): React.ReactElement {
  return <DataList {...props} layout="list" />;
}

export function DataListSkeleton({ count = 4, layout = 'grid', gridCols = 4, itemHeight = 'h-48', className }: {
  count?: number; layout?: 'list' | 'grid'; gridCols?: 1 | 2 | 3 | 4 | 5 | 6; itemHeight?: string; className?: string;
}) {
  const gridColStyles = {
    1: 'grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4', 5: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };
  return (
    <div className={cn(layout === 'grid' ? `grid grid-cols-1 ${gridColStyles[gridCols]} gap-4` : 'flex flex-col gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn('animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg', itemHeight)} />
      ))}
    </div>
  );
}

export function DataListEmpty({ message = 'No items found', description, icon, action, className }: {
  message?: string; description?: string; icon?: ReactNode; action?: ReactNode; className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      {icon && <div className="mb-4 text-gray-400 dark:text-gray-500">{icon}</div>}
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{message}</h3>
      {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
