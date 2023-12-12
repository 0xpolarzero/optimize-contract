import { type FC, useState } from 'react';

import { Input } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type ImportsInputProps = {
  input: string;
  setInput: (input: string) => void;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const ImportsInput: FC<ImportsInputProps> = ({ input, setInput }) => {
  return (
    <Input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="paste your contract here"
      className="text-sm"
    />
  );
};

ImportsInput.displayName = 'ImportsInput';

export default ImportsInput;
