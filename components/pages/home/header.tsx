import type { FC } from 'react';

import { Github } from 'lucide-react';

import LogoIcon from '@/components/common/logo-icon';
import WebsiteAvatar from '@/components/common/website-avatar';
import { Button } from '@/components/ui';

const WebsiteHeader: FC = () => {
  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-6 p-3 md:flex-row md:justify-between md:rounded-2xl md:p-6">
      <div className="flex w-full items-center">
        {/* Avatar (desktop) */}
        <WebsiteAvatar className="mr-4 hidden md:block" size={40} />
        {/* Avatar (mobile) */}
        <WebsiteAvatar className="mr-2 md:hidden" size={32} />
        <div>
          <div className="text-base font-semibold md:text-2xl">optimize_contracts</div>
          <span className="mt-0.5 text-sm text-gray-11 md:mt-1 md:text-base">
            optimize_contracts_description
          </span>
        </div>
      </div>

      {/* Links (desktop) */}
      <div className="hidden space-x-2 md:flex">
        <Button href="optimize_contracts_github_url" leftIcon={<Github />} newTab>
          GitHub
        </Button>
      </div>
      {/* Links (mobile) */}
      <div className="mt-4 flex w-full space-x-2 md:hidden">
        <Button
          size="md"
          className="w-full"
          href="optimize_contracts_github_url"
          leftIcon={<Github />}
        >
          GitHub
        </Button>
      </div>
    </div>
  );
};

WebsiteHeader.displayName = 'WebsiteHeader';

export default WebsiteHeader;
