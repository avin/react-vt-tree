import React from 'react';
import classNames from 'classnames';

export default class TreeNode extends React.PureComponent {
    handleClickIcon = event => {
        event.preventDefault();
        const { data, index } = this.props;
        const { items, depthList, onNodeIconClick } = data;
        const node = items[index];
        const nodeDepth = depthList[index];

        const handlerParams = { node, nodeDepth, nodeIndex: index };

        onNodeIconClick && onNodeIconClick(event, handlerParams);
    };

    handleClickCollapser = event => {
        event.preventDefault();
        const { data, index } = this.props;
        const { items, depthList, onNodeCollapse } = data;
        const node = items[index];
        const nodeDepth = depthList[index];

        const handlerParams = { node, nodeDepth, nodeIndex: index };

        onNodeCollapse && onNodeCollapse(event, handlerParams);
    };

    handleClickExpander = event => {
        event.preventDefault();
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
            return <Icon node={node} nodeDepth={nodeDepth} nodeIndex={index} onClick={this.handleClickIcon} />;
        }

        if (isNodeExpandedSelector(node)) {
            return (
                <Collapser node={node} nodeDepth={nodeDepth} nodeIndex={index} onClick={this.handleClickCollapser} />
            );
        }

        return <Expander node={node} nodeDepth={nodeDepth} nodeIndex={index} onClick={this.handleClickExpander} />;
    }

    renderContent() {
        const { data, index } = this.props;

        const {
            items,
            depthList,
            onNodeClick,
            onNodeDoubleClick,
            onNodeContextMenu,
            nodeContentClassName,
            nodeContentStyle,
            nodeContentComponent: Content,
        } = data;
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

        const handlerParams = { node, nodeDepth, nodeIndex: index };

        return (
            <Content
                node={node}
                nodeDepth={nodeDepth}
                nodeIndex={index}
                style={optionalStyle}
                className={className}
                onClick={onNodeClick && (event => onNodeClick(event, handlerParams))}
                onDoubleClick={onNodeDoubleClick && (event => onNodeDoubleClick(event, handlerParams))}
                onContextMenu={onNodeContextMenu && (event => onNodeContextMenu(event, handlerParams))}
            />
        );
    }

    render() {
        const { data, index, style } = this.props;

        const { items, depthList, levelPadding, nodeClassName, nodeStyle } = data;
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

        return (
            <div
                className={classNames('VTTree__Node', className)}
                style={{ ...optionalStyle, ...style, paddingLeft: levelPadding * nodeDepth }}
            >
                {this.renderExpander()}

                {this.renderContent()}
            </div>
        );
    }
}
