import { type FC } from 'react';

import { Textarea } from '@/components/ui';

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
    <Textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="paste your contract here"
      className="min-h-[200px] text-sm"
    />
  );
};

ImportsInput.displayName = 'ImportsInput';

export default ImportsInput;
