import Link from 'next/link';
import type { FC } from 'react';

import { cn } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LogoProps = {
  className?: string;
  href?: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Logo: FC<LogoProps> = ({ className, href = '/' }) => {
  return (
    <Link href={href} className={cn('h-8 w-8 hover:brightness-75', className)} aria-label="Home">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        role="img"
      >
        <title>optimize_deps</title>
        <desc>optimize_deps logo.</desc>
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    </Link>
  );
};

Logo.displayName = 'Logo';

export default Logo;
