import React from 'react';
import classNames from 'classnames';

const NodeIcon = props => (
    <svg
        x="0px"
        y="0px"
        viewBox="0 0 16 16"
        enableBackground="new 0 0 16 16"
        {...props}
        className={classNames('VTTree__ItemIcon', props.className)}
    >
        <g>
            <circle fillRule="evenodd" clipRule="evenodd" cx="8" cy="8" r="3" />
        </g>
    </svg>
);

export default NodeIcon;
