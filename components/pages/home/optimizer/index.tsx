import { type FC, useState } from 'react';

import ImportsInput from './imports-input';
import PatternRecommendations from './pattern-recommendations';
import Recommendations from './recommendations';

import { EXAMPLE_CODE } from '@/lib/constants/example';

import { Button } from '@/components/ui';

const Optimizer: FC = () => {
  const [input, setInput] = useState<string>('');

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2 self-end">
        <Button intent="primary" disabled={input !== ''} onClick={() => setInput(EXAMPLE_CODE)}>
          Try with an example
        </Button>
        <Button variant="ghost" onClick={() => setInput('')}>
          Clear
        </Button>
      </div>
      <ImportsInput input={input} setInput={setInput} />
      <Recommendations input={input} />
      <PatternRecommendations input={input} />
    </div>
  );
};

Optimizer.displayName = 'Optimizer';

export default Optimizer;
