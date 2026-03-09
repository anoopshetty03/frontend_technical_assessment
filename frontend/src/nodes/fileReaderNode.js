// fileReaderNode.js - Node for reading and processing files

import { Position } from 'reactflow';
import { createNode } from './BaseNode';

export const FileReaderNode = createNode({
  title: 'File Reader',
  width: 220,
  height: 110,
  color: '#f8e8e8',
  description: 'Read file content',
  fields: [
    {
      key: 'fileType',
      label: 'File Type',
      type: 'select',
      default: 'text',
      options: [
        { label: 'Plain Text', value: 'text' },
        { label: 'CSV', value: 'csv' },
        { label: 'JSON', value: 'json' },
        { label: 'XML', value: 'xml' },
      ],
    },
    {
      key: 'encoding',
      label: 'Encoding',
      type: 'select',
      default: 'utf-8',
      options: [
        { label: 'UTF-8', value: 'utf-8' },
        { label: 'ASCII', value: 'ascii' },
        { label: 'UTF-16', value: 'utf-16' },
      ],
    },
  ],
  handles: [
    {
      id: 'file',
      type: 'target',
      position: Position.Left,
    },
    {
      id: 'content',
      type: 'source',
      position: Position.Right,
    },
  ],
});
