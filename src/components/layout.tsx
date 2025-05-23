import { Outlet } from '@tanstack/react-router';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}