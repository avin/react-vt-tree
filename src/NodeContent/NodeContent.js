import React from 'react';
import classNames from 'classnames';

export default class NodeContent extends React.Component {
    render() {
        const { className, node, nodeDepth, nodeIndex, ...props } = this.props;
        return (
            <div {...props} className={classNames('VTTree__NodeContent', className)}>
                {node.content}
            </div>
        );
    }
}
