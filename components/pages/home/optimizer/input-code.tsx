import { type FC } from 'react';

import { Textarea } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type InputCodeProps = {
  input: string;
  setInput: (input: string) => void;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const InputCode: FC<InputCodeProps> = ({ input, setInput }) => {
  return (
    <Textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      placeholder="paste your contract here"
      className="min-h-[100px] text-sm transition-all focus:min-h-[200px]"
    />
  );
};

InputCode.displayName = 'InputCode';

export default InputCode;
