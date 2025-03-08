"use client";
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ThemeProvider } from 'next-themes';
import { useEffect } from 'react';
import { hydrateAuthFromCookies } from '@/store/auth/actions';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hydrate auth state from cookies on client-side initialization
    store.dispatch(hydrateAuthFromCookies() as unknown as ReturnType<typeof hydrateAuthFromCookies>);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </Provider>
  );
}