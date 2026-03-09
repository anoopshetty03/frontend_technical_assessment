// databaseNode.js - Node for database operations

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const DatabaseNode = createNode({
  title: 'Database',
  width: 220,
  height: 120,
  color: '#e8f4f8',
  description: 'Query a database',
  fields: [
    {
      key: 'connection',
      label: 'Connection',
      type: 'select',
      default: 'PostgreSQL',
      options: [
        { label: 'PostgreSQL', value: 'PostgreSQL' },
        { label: 'MySQL', value: 'MySQL' },
        { label: 'MongoDB', value: 'MongoDB' },
      ],
    },
    {
      key: 'query',
      label: 'Query',
      type: 'textarea',
      default: 'SELECT * FROM table',
    },
  ],
  handles: [
    {
      id: 'filter',
      type: 'source',
      position: Position.Right,
      label: 'Results',
    },
  ],
});
