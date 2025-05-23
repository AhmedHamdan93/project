import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { ProfilePage } from '@/pages/profile';
import { DashboardPage } from '@/pages/dashboard';
import { Layout } from '@/components/layout';
import { AuthProvider } from '@/context/auth-provider';
import { protectedLoader } from '@/lib/auth';

// Root route with auth provider
const rootRoute = createRootRoute({
  component: () => (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  ),
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: RegisterPage,
});

// Protected routes
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/profile',
  component: ProfilePage,
  beforeLoad: protectedLoader,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
  beforeLoad: protectedLoader,
});

// Create the router
const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  profileRoute,
  dashboardRoute,
]);

export const router = createRouter({ routeTree });

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}