// @flow

import React from 'react';
import type { NodeElementProps } from '../Tree/Tree';

const NodeContent = ({  node, nodeDepth, nodeIndex, ...props }: NodeElementProps) => (
    <div {...props}>
        {node.content}
    </div>
);

export default NodeContent;
