import { Home } from 'lucide-react';

import type { Page } from '@/lib/types/site';

/**
 * Pages displayed on the navigation bar.
 */
export const NAVBAR_PAGES: Page[] = [{ name: 'Home', slug: '/', icon: <Home /> }];

/**
 * Contact links
 */
export const CONTACT_LINKS: Record<string, string> = {
  email: 'contact@polarzero.xyz',
  twitter: 'https://twitter.com/0xpolarzero',
};
