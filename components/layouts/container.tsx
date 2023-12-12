import type { FC, ReactNode } from 'react';

import { cn } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ContainerLayoutProps = JSX.IntrinsicElements['div'] & {
  children?: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ContainerLayout: FC<ContainerLayoutProps> = ({ className, children, ...rest }) => {
  return (
    <div
      className={cn('mx-auto w-full max-w-[80rem] grow p-4 md:px-20 md:py-16', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ContainerLayout;
