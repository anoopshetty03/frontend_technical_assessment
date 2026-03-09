// apiCallNode.js - Node for making API calls

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const APICallNode = createNode({
  title: 'API Call',
  width: 240,
  height: 140,
  color: '#e8f8f0',
  description: 'Make HTTP requests',
  fields: [
    {
      key: 'method',
      label: 'Method',
      type: 'select',
      default: 'GET',
      options: [
        { label: 'GET', value: 'GET' },
        { label: 'POST', value: 'POST' },
        { label: 'PUT', value: 'PUT' },
        { label: 'DELETE', value: 'DELETE' },
      ],
    },
    {
      key: 'url',
      label: 'URL',
      type: 'text',
      default: 'https://api.example.com/data',
    },
    {
      key: 'timeout',
      label: 'Timeout (ms)',
      type: 'number',
      default: 5000,
    },
  ],
  handles: [
    {
      id: 'trigger',
      type: 'target',
      position: Position.Left,
      top: 30,
    },
    {
      id: 'success',
      type: 'source',
      position: Position.Right,
      top: 30,
    },
    {
      id: 'error',
      type: 'source',
      position: Position.Right,
      top: 70,
    },
  ],
});
