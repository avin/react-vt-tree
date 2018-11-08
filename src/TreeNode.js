// @flow

import * as React from 'react';
import classNames from 'classnames';

type TreeNodeProps = {|
    /** Item additional data */
    data: Object,

    /** Node row index */
    index: number,

    /** Node row specific style */
    style: Object,
|};

export default class TreeNode extends React.PureComponent<TreeNodeProps> {
    handleClickExpander = (event: SyntheticMouseEvent<HTMLElement>, isExpanded: boolean) => {
        event.stopPropagation();
        const { data, index } = this.props;
        const { items, depthList, onNodeExpand, onNodeCollapse } = data;
        const node = items[index];
        const nodeDepth = depthList[index];

        const handlerParams = { node, nodeDepth, isExpanded, nodeIndex: index };

        if (isExpanded) {
            onNodeCollapse && onNodeCollapse(event, handlerParams);
        } else {
            onNodeExpand && onNodeExpand(event, handlerParams);
        }
    };

    renderExpander() {
        const { data, index } = this.props;
        const {
            items,
            depthList,
            nodeExpanderComponent: Expander,
            hasChildNodesSelector,
            isNodeExpandedSelector,
        } = data;
        const node = items[index];
        const nodeDepth = depthList[index];
        const isExpanded = isNodeExpandedSelector(node);

        if (!hasChildNodesSelector(node)) {
            return;
        }

        return (
            <Expander
                isExpanded={isExpanded}
                node={node}
                nodeDepth={nodeDepth}
                nodeIndex={index}
                onClick={e => this.handleClickExpander(e, isExpanded)}
                className="VTTree__NodeExpander"
            />
        );
    }

    renderContent() {
        const { data, index } = this.props;

        const { items, depthList, nodeContentClassName, nodeContentStyle, nodeContentSelector } = data;
        const node = items[index];
        const nodeDepth = depthList[index];

        let className;
        if (nodeContentClassName) {
            if (typeof nodeContentClassName === 'function') {
                className = nodeContentClassName({ node, nodeDepth, nodeIndex: index });
            } else {
                className = nodeContentClassName;
            }
        }

        let optionalStyle = {};
        if (nodeContentStyle) {
            if (typeof nodeContentStyle === 'function') {
                optionalStyle = nodeContentStyle({ node, nodeDepth, nodeIndex: index }) || {};
            } else {
                optionalStyle = nodeContentStyle;
            }
        }

        return (
            <div style={optionalStyle} className={classNames('VTTree__NodeContent', className)}>
                {nodeContentSelector(node)}
            </div>
        );
    }

    render() {
        const { data, index, style } = this.props;

        const {
            items,
            depthList,
            levelPadding,
            nodeClassName,
            nodeStyle,
            onNodeClick,
            onNodeDoubleClick,
            onNodeContextMenu,
        } = data;
        const node = items[index];
        const nodeDepth = depthList[index];

        let className;
        if (nodeClassName) {
            if (typeof nodeClassName === 'function') {
                className = nodeClassName({ node, nodeDepth, nodeIndex: index });
            } else {
                className = nodeClassName;
            }
        }

        let optionalStyle = {};
        if (nodeStyle) {
            if (typeof nodeStyle === 'function') {
                optionalStyle = nodeStyle({ node, nodeDepth, nodeIndex: index }) || {};
            } else {
                optionalStyle = nodeStyle;
            }
        }

        const handlerParams = { node, nodeDepth, nodeIndex: index };

        return (
            <div
                className={classNames('VTTree__Node', className)}
                style={{ ...optionalStyle, ...style, paddingLeft: levelPadding * nodeDepth }}
                onClick={onNodeClick && (event => onNodeClick(event, handlerParams))}
                onDoubleClick={onNodeDoubleClick && (event => onNodeDoubleClick(event, handlerParams))}
                onContextMenu={onNodeContextMenu && (event => onNodeContextMenu(event, handlerParams))}
            >
                {this.renderExpander()}

                {this.renderContent()}
            </div>
        );
    }
}
