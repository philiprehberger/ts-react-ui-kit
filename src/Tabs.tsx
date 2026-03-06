import {
  createContext, useContext, useState, useCallback, useMemo,
  ReactNode, memo, KeyboardEvent, useRef, useId,
} from 'react';
import { cn } from './utils';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs compound components must be used within a Tabs root');
  return context;
}

interface TabsRootProps {
  defaultTab: string;
  children: ReactNode;
  className?: string;
  onChange?: (tab: string) => void;
  value?: string;
}

function TabsRoot({ defaultTab, children, className, onChange, value }: TabsRootProps) {
  const [internalTab, setInternalTab] = useState(defaultTab);
  const baseId = useId();
  const activeTab = value ?? internalTab;

  const setActiveTab = useCallback((tab: string) => {
    if (value === undefined) setInternalTab(tab);
    onChange?.(tab);
  }, [onChange, value]);

  const contextValue = useMemo(() => ({ activeTab, setActiveTab, baseId }), [activeTab, setActiveTab, baseId]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cn('tabs', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabListProps {
  children: ReactNode;
  className?: string;
  variant?: 'underline' | 'pills' | 'bordered';
}

const TabList = memo(function TabList({ children, className, variant = 'underline' }: TabListProps) {
  const tabListRef = useRef<HTMLDivElement>(null);
  const variantStyles = {
    underline: 'border-b border-gray-200 dark:border-gray-700',
    pills: 'bg-gray-100 dark:bg-gray-800 p-1 rounded-lg gap-1',
    bordered: 'border border-gray-200 dark:border-gray-700 rounded-lg p-1 gap-1',
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = tabListRef.current?.querySelectorAll('[role="tab"]:not([disabled])');
    if (!tabs?.length) return;
    const tabsArray = Array.from(tabs) as HTMLButtonElement[];
    const currentIndex = tabsArray.findIndex((tab) => tab === document.activeElement);
    let nextIndex: number;
    switch (event.key) {
      case 'ArrowLeft': nextIndex = currentIndex > 0 ? currentIndex - 1 : tabsArray.length - 1; tabsArray[nextIndex]?.focus(); event.preventDefault(); break;
      case 'ArrowRight': nextIndex = currentIndex < tabsArray.length - 1 ? currentIndex + 1 : 0; tabsArray[nextIndex]?.focus(); event.preventDefault(); break;
      case 'Home': tabsArray[0]?.focus(); event.preventDefault(); break;
      case 'End': tabsArray[tabsArray.length - 1]?.focus(); event.preventDefault(); break;
    }
  };

  return (
    <div ref={tabListRef} role="tablist" aria-orientation="horizontal" onKeyDown={handleKeyDown} className={cn('flex', variantStyles[variant], className)}>
      {children}
    </div>
  );
});

interface TabProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  icon?: ReactNode;
}

const Tab = memo(function Tab({ value, children, className, disabled = false, icon }: TabProps) {
  const { activeTab, setActiveTab, baseId } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${value}`}
      id={`${baseId}-tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
      className={cn(
        'px-4 py-2 font-medium text-sm transition-colors whitespace-nowrap',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900',
        isActive ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 -mb-px' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
});

interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
  keepMounted?: boolean;
}

const TabPanel = memo(function TabPanel({ value, children, className, keepMounted = false }: TabPanelProps) {
  const { activeTab, baseId } = useTabs();
  const isActive = activeTab === value;
  if (!keepMounted && !isActive) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      hidden={!isActive}
      tabIndex={0}
      className={cn('py-4 focus:outline-none', !isActive && 'hidden', className)}
    >
      {children}
    </div>
  );
});

export const Tabs = Object.assign(TabsRoot, {
  List: TabList,
  Tab,
  Panel: TabPanel,
});
