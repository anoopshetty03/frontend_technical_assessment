// jsonParserNode.js - Node for parsing JSON

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const JSONParserNode = createNode({
  title: 'JSON Parser',
  width: 220,
  height: 100,
  color: '#f8f4e8',
  description: 'Parse and validate JSON',
  fields: [
    {
      key: 'path',
      label: 'JSON Path',
      type: 'text',
      default: '$.data',
    },
    {
      key: 'mode',
      label: 'Mode',
      type: 'select',
      default: 'parse',
      options: [
        { label: 'Parse', value: 'parse' },
        { label: 'Stringify', value: 'stringify' },
        { label: 'Validate', value: 'validate' },
      ],
    },
  ],
  handles: [
    {
      id: 'input',
      type: 'target',
      position: Position.Left,
    },
    {
      id: 'output',
      type: 'source',
      position: Position.Right,
    },
  ],
});
