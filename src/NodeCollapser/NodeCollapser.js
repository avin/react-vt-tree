import React from 'react';

const NodeCollapser = ({node, nodeDepth, nodeIndex, ...props}) => (
    <svg
        x="0px"
        y="0px"
        viewBox="0 0 16 16"
        enableBackground="new 0 0 16 16"
        {...props}
    >
        <g>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12,5c-0.28,0-0.53,0.11-0.71,0.29L8,8.59L4.71,5.29C4.53,5.11,4.28,5,4,5
			C3.45,5,3,5.45,3,6c0,0.28,0.11,0.53,0.29,0.71l4,4C7.47,10.89,7.72,11,8,11s0.53-0.11,0.71-0.29l4-4C12.89,6.53,13,6.28,13,6
			C13,5.45,12.55,5,12,5z"
            />
        </g>
    </svg>
);

export default NodeCollapser;
