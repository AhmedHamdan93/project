import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} AuthApp. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}