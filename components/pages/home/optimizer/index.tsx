import { type FC, useMemo, useState } from 'react';

import InputCode from './input-code';
import PatternRecommendations from './pattern-recommendations';
import Recommendations from './recommendations';
import { ASTNode } from '@solidity-parser/parser/dist/src/ast-types';
import { ExternalLink } from 'lucide-react';

import { EXAMPLE_CODE } from '@/lib/constants/example';
import { parseContract } from '@/lib/utils/parse-contract';

import { Button, useToast } from '@/components/ui';

const Optimizer: FC = () => {
  const { toast } = useToast();

  const [input, setInput] = useState<string>('');
  const [parsedInput, setParsedInput] = useState<ASTNode | null>(null);

  const submit = () => {
    const ast = parseContract(input);
    if (ast.success) {
      setParsedInput(ast.node);
    } else {
      toast({
        title: 'Error parsing contract',
        description: 'Please make sure it compiles correctly.',
        intent: 'fail',
        action: (
          <Button
            size="sm"
            variant="secondary"
            intent="fail"
            href="https://remix.ethereum.org"
            rightIcon={<ExternalLink />}
            newTab
          >
            Try on Remix
          </Button>
        ),
      });
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2 self-end">
        <Button variant="ghost" onClick={() => setInput('')}>
          Clear
        </Button>
        <Button intent="none" disabled={input !== ''} onClick={() => setInput(EXAMPLE_CODE)}>
          Try with an example
        </Button>
        <Button intent="primary" disabled={input === ''} onClick={submit}>
          Submit
        </Button>
      </div>
      <InputCode input={input} setInput={setInput} />
      {parsedInput ? <Recommendations input={input} parsed={parsedInput} /> : null}
    </div>
  );
};

Optimizer.displayName = 'Optimizer';

export default Optimizer;
