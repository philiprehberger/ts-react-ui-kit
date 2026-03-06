import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface LiveRegionContextType {
  announce: (message: string, priority?: 'polite' | 'assertive') => void;
}

const LiveRegionContext = createContext<LiveRegionContextType | null>(null);

export function LiveRegionProvider({ children }: { children: ReactNode }) {
  const [politeMessage, setPoliteMessage] = useState('');
  const [assertiveMessage, setAssertiveMessage] = useState('');

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (priority === 'assertive') {
      setAssertiveMessage('');
      setTimeout(() => setAssertiveMessage(message), 100);
      setTimeout(() => setAssertiveMessage(''), 1000);
    } else {
      setPoliteMessage('');
      setTimeout(() => setPoliteMessage(message), 100);
      setTimeout(() => setPoliteMessage(''), 1000);
    }
  }, []);

  return (
    <LiveRegionContext.Provider value={{ announce }}>
      {children}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{politeMessage}</div>
      <div role="alert" aria-live="assertive" aria-atomic="true" className="sr-only">{assertiveMessage}</div>
    </LiveRegionContext.Provider>
  );
}

export function useAnnounce() {
  const context = useContext(LiveRegionContext);
  if (!context) throw new Error('useAnnounce must be used within a LiveRegionProvider');
  return context.announce;
}
