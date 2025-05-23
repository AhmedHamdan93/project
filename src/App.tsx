import { StrictMode } from 'react';
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { router } from '@/router';

function App() {
  return (
    <StrictMode>
      <ThemeProvider defaultTheme="light" storageKey="auth-app-theme">
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </ThemeProvider>
    </StrictMode>
  );
}

export default App;