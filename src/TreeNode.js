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
    handleClickIcon = (event: SyntheticMouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const { data, index } = this.props;
        const { items, depthList, onNodeIconClick } = data;
        const node = items[index];
        const nodeDepth = depthList[index];

        const handlerParams = { node, nodeDepth, nodeIndex: index };

        onNodeIconClick && onNodeIconClick(event, handlerParams);
    };

    handleClickCollapser = (event: SyntheticMouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const { data, index } = this.props;
        const { items, depthList, onNodeCollapse } = data;
        const node = items[index];
        const nodeDepth = depthList[index];

        const handlerParams = { node, nodeDepth, nodeIndex: index };

        onNodeCollapse && onNodeCollapse(event, handlerParams);
    };

    handleClickExpander = (event: SyntheticMouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const { data, index } = this.props;
        const { items, depthList, onNodeExpand } = data;
        const node = items[index];
        const nodeDepth = depthList[index];

        const handlerParams = { node, nodeDepth, nodeIndex: index };

        onNodeExpand && onNodeExpand(event, handlerParams);
    };

    renderExpander() {
        const { data, index } = this.props;
        const {
            items,
            depthList,
            isNodeExpandedSelector,
            hasChildItemsSelector,
            nodeExpanderComponent: Expander,
            nodeCollapserComponent: Collapser,
            nodeIconComponent: Icon,
        } = data;
        const node = items[index];
        const nodeDepth = depthList[index];

        if (!hasChildItemsSelector(node)) {
            return (
                <Icon
                    node={node}
                    nodeDepth={nodeDepth}
                    nodeIndex={index}
                    onClick={this.handleClickIcon}
                    className="VTTree__NodeIcon"
                />
            );
        }

        if (isNodeExpandedSelector(node)) {
            return (
                <Collapser
                    node={node}
                    nodeDepth={nodeDepth}
                    nodeIndex={index}
                    onClick={this.handleClickCollapser}
                    className="VTTree__NodeIcon VTTree__NodeIcon--collapse"
                />
            );
        }

        return (
            <Expander
                node={node}
                nodeDepth={nodeDepth}
                nodeIndex={index}
                onClick={this.handleClickExpander}
                className="VTTree__NodeIcon VTTree__NodeIcon--expand"
            />
        );
    }

    renderContent() {
        const { data, index } = this.props;

        const { items, depthList, nodeContentClassName, nodeContentStyle, nodeContentComponent: Content } = data;
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
            <Content
                node={node}
                nodeDepth={nodeDepth}
                nodeIndex={index}
                style={optionalStyle}
                className={classNames('VTTree__NodeContent', className)}
            />
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
