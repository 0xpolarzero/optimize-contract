import * as parser from '@solidity-parser/parser';
// import '@solidity-parser/parser/dist/index.iife';
import { ASTNode } from '@solidity-parser/parser/dist/src/ast-types';

export const parseContract = async (contract: string): Promise<ASTNode> => {
  // const parser = (window as any).SolidityParser;
  try {
    return parser.parse(contract, { loc: true });
  } catch (err) {
    console.log(err);
    throw new Error(`Failed to parse solidity code from source code:\n${contract}`, { cause: err });
  }
};
