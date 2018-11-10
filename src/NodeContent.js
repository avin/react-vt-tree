// @flow

import React from 'react';

import type { NodeContentProps } from './types';

const NodeContent = ({ style, className, children }: NodeContentProps) => (
    <div style={style} className={className}>
        {children}
    </div>
);

export default NodeContent;
