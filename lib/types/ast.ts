import { ASTNode } from '@solidity-parser/parser/dist/src/ast-types';

export type ASTResponse = {
  node: ASTNode | null;
  success: boolean;
  error?: string | null;
};
