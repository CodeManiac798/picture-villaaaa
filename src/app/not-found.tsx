import Link from 'next/link';
import { Container } from '@/components/layout/Container';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-(--color-ivory) flex items-center">
      <Container>
        <p className="text-label text-(--color-mist) mb-4">404</p>
        <h1 className="font-display text-display-xl text-(--color-charcoal) mb-6">
          Page not found.
        </h1>
        <Link
          href="/"
          className="text-label text-(--color-gold) hover:underline underline-offset-4 transition-colors"
        >
          Return home
        </Link>
      </Container>
    </div>
  );
}
