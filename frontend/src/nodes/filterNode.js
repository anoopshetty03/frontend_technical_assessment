// filterNode.js - Node for filtering data

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const FilterNode = createNode({
  title: 'Filter',
  width: 220,
  height: 110,
  color: '#f0e8f8',
  description: 'Filter data by condition',
  fields: [
    {
      key: 'field',
      label: 'Field',
      type: 'text',
      default: 'status',
    },
    {
      key: 'operator',
      label: 'Operator',
      type: 'select',
      default: '==',
      options: [
        { label: 'Equals', value: '==' },
        { label: 'Not Equals', value: '!=' },
        { label: 'Greater Than', value: '>' },
        { label: 'Less Than', value: '<' },
      ],
    },
    {
      key: 'value',
      label: 'Value',
      type: 'text',
      default: 'active',
    },
  ],
  handles: [
    {
      id: 'input',
      type: 'target',
      position: Position.Left,
    },
    {
      id: 'true',
      type: 'source',
      position: Position.Right,
      top: 30,
    },
    {
      id: 'false',
      type: 'source',
      position: Position.Right,
      top: 70,
    },
  ],
});
