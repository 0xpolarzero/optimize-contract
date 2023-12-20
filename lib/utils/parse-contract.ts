import * as parser from '@solidity-parser/parser';

import { ASTResponse } from '@/lib/types/ast';

export const parseContract = (contract: string): ASTResponse => {
  try {
    return { success: true, node: parser.parse(contract, { loc: true }) };
  } catch (err) {
    console.log(err);
    return { success: false, node: null, error: (err as string) || 'Error parsing contract' };
  }
};
