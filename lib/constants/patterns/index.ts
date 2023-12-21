import { findFunctionsWithLoopEvent } from './event-loop';
import { findMulticallPatterns } from './multicall';

export const patterns = [findFunctionsWithLoopEvent, findMulticallPatterns];
