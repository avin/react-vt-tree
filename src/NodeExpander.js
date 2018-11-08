// @flow

import * as React from 'react';

export type NodeExpanderProps = {
    node: Object,
    isExpanded: boolean,
    nodeDepth: number,
    nodeIndex: number,
};

type State = {
    withAnimation: boolean,
    prevNode?: any,
    prevIsExpanded?: boolean,
}

export default class NodeExpander extends React.Component<NodeExpanderProps, State> {
    state = {
        withAnimation: false,
    };

    static getDerivedStateFromProps(nextProps: Object, prevState: Object) {
        const result = prevState.prevNode === nextProps.node && prevState.prevIsExpanded !== nextProps.isExpanded;

        const state = {
            withAnimation: false,
            prevNode: nextProps.node,
            prevIsExpanded: nextProps.isExpanded,
        };
        if (result) {
            state.withAnimation = true;
        }
        return state;
    }

    render() {
        const { node, nodeDepth, nodeIndex, isExpanded, ...props } = this.props;
        const { withAnimation } = this.state;
        return (
            <svg x="0px" y="0px" viewBox="0 0 16 16" enableBackground="new 0 0 16 16" {...props}>
                <g
                    style={{
                        transformOrigin: '50% 50%',
                        transform: isExpanded && 'rotate(90deg)',
                        transition: withAnimation && 'transform .2s cubic-bezier(.4,1,.75,.9)',
                    }}
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.71,7.29l-4-4C6.53,3.11,6.28,3,6,3C5.45,3,5,3.45,5,4
			c0,0.28,0.11,0.53,0.29,0.71L8.59,8l-3.29,3.29C5.11,11.47,5,11.72,5,12c0,0.55,0.45,1,1,1c0.28,0,0.53-0.11,0.71-0.29l4-4
			C10.89,8.53,11,8.28,11,8C11,7.72,10.89,7.47,10.71,7.29z"
                    />
                </g>
            </svg>
        );
    }
}
