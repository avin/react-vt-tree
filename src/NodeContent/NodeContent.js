// @flow

import React from 'react';
import type { NodeElementProps } from '../TreeNode/TreeNode';

const NodeContent = ({  node, nodeDepth, nodeIndex, ...props }: NodeElementProps) => (
    <div {...props}>
        {node.content}
    </div>
);

export default NodeContent;
