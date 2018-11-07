import React from 'react';
import classNames from 'classnames';

export default class TreeNode extends React.Component {
    handleCollapseItem = (nodeItem, event) => {
        event.preventDefault();
        const { data } = this.props;
        const { onNodeCollapse } = data;

        onNodeCollapse && onNodeCollapse(nodeItem, event);
    };

    handleExpandItem = (nodeItem, event) => {
        event.preventDefault();
        const { data } = this.props;
        const { onNodeExpand } = data;

        onNodeExpand && onNodeExpand(nodeItem, event);
    };

    renderExpander() {
        const { data, index } = this.props;
        const {
            items,
            isNodeExpandedSelector,
            hasChildItemsSelector,
            nodeExpanderComponent: Expander,
            nodeCollapserComponent: Collapser,
            nodeIconComponent: Icon,
        } = data;
        const nodeItem = items[index];

        if (!hasChildItemsSelector(nodeItem)) {
            return <Icon node={nodeItem} />;
        }

        if (isNodeExpandedSelector(nodeItem)) {
            return <Collapser node={nodeItem} onClick={event => this.handleCollapseItem(nodeItem, event)} />;
        }
        return <Expander node={nodeItem} onClick={event => this.handleExpandItem(nodeItem, event)} />;
    }

    renderContent() {
        const { data, index } = this.props;

        const {
            items,
            onNodeClick,
            onNodeDoubleClick,
            onNodeContextMenu,
            nodeContentClassName,
            nodeContentStyle,
        } = data;
        const nodeItem = items[index];

        let className;
        if (nodeContentClassName) {
            if (typeof nodeContentClassName === 'function') {
                className = nodeContentClassName(nodeItem);
            } else {
                className = nodeContentClassName;
            }
        }

        let optionalStyle = {};
        if (nodeContentStyle) {
            if (typeof nodeContentStyle === 'function') {
                optionalStyle = nodeContentStyle(nodeItem) || {};
            } else {
                optionalStyle = nodeContentStyle;
            }
        }

        return (
            <div
                className={classNames('VTTree__NodeContent', className)}
                style={optionalStyle}
                title={nodeItem.content}
                onClick={onNodeClick && (event => onNodeClick(nodeItem, event))}
                onDoubleClick={onNodeDoubleClick && (event => onNodeDoubleClick(nodeItem, event))}
                onContextMenu={onNodeContextMenu && (event => onNodeContextMenu(nodeItem, event))}
            >
                {nodeItem.content}
            </div>
        );
    }

    render() {
        const { data, index, style } = this.props;

        const { items, levelPadding, nodeClassName, nodeStyle } = data;
        const nodeItem = items[index];

        let className;
        if (nodeClassName) {
            if (typeof nodeClassName === 'function') {
                className = nodeClassName(nodeItem);
            } else {
                className = nodeClassName;
            }
        }

        let optionalStyle = {};
        if (nodeStyle) {
            if (typeof nodeStyle === 'function') {
                optionalStyle = nodeStyle(nodeItem) || {};
            } else {
                optionalStyle = nodeStyle;
            }
        }

        return (
            <div
                className={classNames('VTTree__Node', className)}
                style={{ ...optionalStyle, ...style, paddingLeft: levelPadding * nodeItem._depth }}
            >
                {this.renderExpander()}

                {this.renderContent()}
            </div>
        );
    }
}
