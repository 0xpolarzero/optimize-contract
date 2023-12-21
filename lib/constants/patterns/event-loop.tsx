import {
  ASTNode,
  BaseASTNode,
  Block,
  EmitStatement,
  EventDefinition,
  ForStatement,
  FunctionDefinition,
  SimpleStatement,
  SourceUnit,
  Statement,
  WhileStatement,
} from '@solidity-parser/parser/dist/src/ast-types';

import { CodePatternResult } from '@/lib/types/code';
import { extractFunctionCodeFromNode } from '@/lib/utils';

export const findFunctionsWithLoopEvent = (code: string, ast: SourceUnit): CodePatternResult[] => {
  const result: CodePatternResult[] = [];

  const traverse = (
    node: ASTNode | FunctionDefinition | Block | ForStatement | WhileStatement,
    currentFunction: CodePatternResult | null = null,
  ) => {
    // Initialize current function with details
    if (node.type === 'FunctionDefinition') {
      currentFunction = {
        code: extractFunctionCodeFromNode(code, node),
        message: <>aaa</>,
        startLine: node.loc?.start.line || 1,
        highlightedLines: [],
        link: 'https://twitter.com/PopPunkOnChain/status/1643050696755773441',
      };
    }

    // SourceUnit: the whole file
    if (node.type === 'SourceUnit') {
      for (const child of node.children) {
        traverse(child as ASTNode, currentFunction);
      }
    }

    // ContractDefinition: a contract
    if (node.type === 'ContractDefinition') {
      for (const subNode of node.subNodes) {
        traverse(subNode as ASTNode, currentFunction);
      }
    }

    // FunctionDefinition: a function inside any contract
    if (node.type === 'FunctionDefinition') {
      traverse(node.body as ASTNode, currentFunction);
    }

    // Block: a block of code inside a function
    if (node.type === 'Block' && currentFunction) {
      traverseStatements(node.statements, currentFunction);
    }

    // The previous function has been traversed, add it to the result
    if (node.type === 'FunctionDefinition' && currentFunction) {
      if (currentFunction.highlightedLines.length > 0) {
        result.push(currentFunction);
      }
    }
  };

  traverse(ast);
  return result;
};

// Go through the statements inside a function
const traverseStatements = (
  statements: (BaseASTNode | SimpleStatement)[],
  currentFunction: CodePatternResult,
) => {
  for (const statement of statements) {
    // It needs to be a loop, otherwise we don't care
    if (
      (statement.type === 'ForStatement' || statement.type === 'WhileStatement') &&
      currentFunction
    ) {
      // For each loop, find if there are any events inside
      const eventsInLoop = findEventsInLoop(
        statement as ForStatement | WhileStatement,
        currentFunction.startLine,
      );
      // If so, add them
      if (eventsInLoop) {
        currentFunction.highlightedLines.push(
          ...eventsInLoop.map((event) => event.line - currentFunction.startLine),
        );
        currentFunction.message = (
          <div>
            Event{eventsInLoop.length > 1 ? 's' : ''} inside a loop; consider using a batch event
            such as{' '}
            {eventsInLoop.map((event, index) => (
              <>
                <pre key={index} className="inline-block">
                  {event.eventName}
                  Batch
                </pre>
                {index < eventsInLoop.length - 1 ? ', ' : ''}
              </>
            ))}{' '}
            outside the loop
          </div>
        );
      }
    }
  }
};

// Find all events emitted inside a loop
const findEventsInLoop = (loopNode: ForStatement | WhileStatement, functionStartLine: number) => {
  const events: (BaseASTNode | EventDefinition)[] = [];
  const eventsMinimal = [];
  const traverseLoopBody = (node: BaseASTNode) => {
    // If there are nested loops, traverse them too
    if ('statements' in node) {
      for (const statement of node.statements as Statement[]) {
        traverseLoopBody(statement);
      }
    }

    // If there is an event, add it to the list
    if (node.type === 'EmitStatement') {
      events.push((node as EmitStatement).eventCall.expression);
    }
  };

  traverseLoopBody(loopNode.body);

  // For each event, add it with its name and line number
  for (const event of events) {
    if (event.loc && 'name' in event && event.loc.start.line > functionStartLine) {
      eventsMinimal.push({ line: event.loc.start.line, eventName: event.name });
    }
  }

  return eventsMinimal;
};
