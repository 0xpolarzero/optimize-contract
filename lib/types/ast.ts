import { SourceUnit } from '@solidity-parser/parser/dist/src/ast-types';

export type ASTResponse = {
  node: SourceUnit | null;
  success: boolean;
  error?: string | null;
};
