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
    handleClickExpander = (event: SyntheticMouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const { data, index } = this.props;
        const { items, onNodeExpand, onNodeCollapse } = data;

        if (items[index].isExpanded) {
            onNodeCollapse && onNodeCollapse(event, items[index]);
        } else {
            onNodeExpand && onNodeExpand(event, items[index]);
        }
    };

    renderExpander() {
        const { data, index } = this.props;
        const { items, nodeExpanderComponent: Expander } = data;

        if (!items[index].hasChildren) {
            return;
        }

        return <Expander {...items[index]} onClick={this.handleClickExpander} className="VTTree__NodeExpander" />;
    }

    renderContent() {
        const { data, index } = this.props;

        const {
            items,
            nodeContentClassName,
            nodeContentStyle,
            nodeContentSelector,
            nodeContentComponent: NodeContentComponent,
        } = data;

        let optionalClassName;
        if (nodeContentClassName) {
            if (typeof nodeContentClassName === 'function') {
                optionalClassName = nodeContentClassName(items[index]);
            } else {
                optionalClassName = nodeContentClassName;
            }
        }

        let optionalStyle = {};
        if (nodeContentStyle) {
            if (typeof nodeContentStyle === 'function') {
                optionalStyle = nodeContentStyle(items[index]) || {};
            } else {
                optionalStyle = nodeContentStyle;
            }
        }

        const style = optionalStyle;
        const className = classNames('VTTree__NodeContent', optionalClassName);

        return (
            <NodeContentComponent style={style} className={className} {...items[index]}>
                {nodeContentSelector(items[index].node)}
            </NodeContentComponent>
        );
    }

    render() {
        const { data, index, style } = this.props;

        const {
            items,
            levelPadding,
            nodeClassName,
            nodeStyle,
            onNodeClick,
            onNodeDoubleClick,
            onNodeContextMenu,
        } = data;

        let className;
        if (nodeClassName) {
            if (typeof nodeClassName === 'function') {
                className = nodeClassName(items[index]);
            } else {
                className = nodeClassName;
            }
        }

        let optionalStyle = {};
        if (nodeStyle) {
            if (typeof nodeStyle === 'function') {
                optionalStyle = nodeStyle(items[index]) || {};
            } else {
                optionalStyle = nodeStyle;
            }
        }

        return (
            <div
                className={classNames('VTTree__Node', className)}
                style={{ ...optionalStyle, ...style, paddingLeft: levelPadding * items[index].depth }}
                onClick={onNodeClick && (event => onNodeClick(event, items[index]))}
                onDoubleClick={onNodeDoubleClick && (event => onNodeDoubleClick(event, items[index]))}
                onContextMenu={onNodeContextMenu && (event => onNodeContextMenu(event, items[index]))}
            >
                {this.renderExpander()}
                {this.renderContent()}
            </div>
        );
    }
}
