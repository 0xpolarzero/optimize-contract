import Image from 'next/image';
import type { FC } from 'react';

import avatar from '@/public/avatar.svg';

import { cn } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type WebsiteAvatarProps = {
  className?: string;
  size?: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const WebsiteAvatar: FC<WebsiteAvatarProps> = ({ className, size = 40 }) => {
  return (
    <Image
      className={cn('my-0 opacity-80', className)}
      width={size}
      height={size}
      src={avatar}
      alt="optimize_dependencies avatar"
    />
  );
};

WebsiteAvatar.displayName = 'WebsiteAvatar';

export default WebsiteAvatar;
