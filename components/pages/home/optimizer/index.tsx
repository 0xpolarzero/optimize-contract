import { type FC, useState } from 'react';

import ImportsInput from './imports-input';
import Recommendations from './recommendations';

const Optimizer: FC = () => {
  const [input, setInput] = useState<string>('');

  return (
    <div className="flex flex-col space-y-4">
      <ImportsInput input={input} setInput={setInput} />
      <Recommendations input={input} />
    </div>
  );
};

Optimizer.displayName = 'Optimizer';

export default Optimizer;
