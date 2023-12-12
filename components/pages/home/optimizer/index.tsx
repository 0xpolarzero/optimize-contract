import { type FC, useState } from 'react';

import ImportsInput from './imports-input';

const Optimizer: FC = () => {
  const [input, setInput] = useState<string>('');

  return (
    <div className="flex flex-col space-y-4">
      <ImportsInput input={input} setInput={setInput} />
      <div>bb</div>
    </div>
  );
};

Optimizer.displayName = 'Optimizer';

export default Optimizer;
