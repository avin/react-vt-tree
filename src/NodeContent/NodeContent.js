// @flow

import React from 'react';
import classNames from 'classnames';
import type { NodeElementProps } from '../TreeNode/TreeNode';

const NodeContent = ({ className, node, nodeDepth, nodeIndex, ...props }: NodeElementProps) => (
    <div {...props} className={classNames('VTTree__NodeContent', className)}>
        {node.content}
    </div>
);

export default NodeContent;
