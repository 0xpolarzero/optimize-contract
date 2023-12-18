import type { FC } from 'react';

import { Github } from 'lucide-react';

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
        <div className="mr-8">
          <div className="text-base font-semibold md:text-2xl">optimize_deps</div>
          <span className="mt-0.5 text-sm text-gray-11 md:mt-1 md:text-base">
            Paste a smart contract, and it will recommend more optimized dependencies, as well as a
            few basic best practices for saving gas.
          </span>
        </div>
      </div>

      {/* Links (desktop) */}
      <div className="hidden space-x-2 md:flex">
        <Button
          href="https://github.com/0xpolarzero/optimize-dependencies"
          leftIcon={<Github />}
          newTab
        >
          GitHub
        </Button>
      </div>
      {/* Links (mobile) */}
      <div className="mt-4 flex w-full space-x-2 md:hidden">
        <Button
          size="md"
          className="w-full"
          href="https://github.com/0xpolarzero/optimize-dependencies"
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
