// @flow

import * as React from 'react';
import classNames from 'classnames';

import type { TreeNodeProps } from './types';

export default class TreeNode extends React.PureComponent<TreeNodeProps> {
    getNodeParams = index => {
        const { data } = this.props;
        const { items, additionalData } = data;
        return Object.assign(items[index], { additionalData });
    };

    handleClickExpander = (event: SyntheticMouseEvent<HTMLElement>) => {
        event.stopPropagation();
        const { data, index } = this.props;
        const { onNodeExpand, onNodeCollapse } = data;

        if (this.getNodeParams(index).isExpanded) {
            onNodeCollapse && onNodeCollapse(event, this.getNodeParams(index));
        } else {
            onNodeExpand && onNodeExpand(event, this.getNodeParams(index));
        }
    };

    renderExpander() {
        const { data, index } = this.props;
        const { nodeExpanderComponent: Expander } = data;

        if (!this.getNodeParams(index).hasChildren) {
            return;
        }

        return (
            <Expander
                {...this.getNodeParams(index)}
                onClick={this.handleClickExpander}
                className="VTTree__NodeExpander"
            />
        );
    }

    renderContent() {
        const { data, index } = this.props;

        const {
            nodeContentClassName,
            nodeContentStyle,
            nodeContentSelector,
            nodeContentComponent: NodeContentComponent,
        } = data;

        let optionalClassName;
        if (nodeContentClassName) {
            if (typeof nodeContentClassName === 'function') {
                optionalClassName = nodeContentClassName(this.getNodeParams(index));
            } else {
                optionalClassName = nodeContentClassName;
            }
        }

        let optionalStyle = {};
        if (nodeContentStyle) {
            if (typeof nodeContentStyle === 'function') {
                optionalStyle = nodeContentStyle(this.getNodeParams(index)) || {};
            } else {
                optionalStyle = nodeContentStyle;
            }
        }

        const style = optionalStyle;
        const className = classNames('VTTree__NodeContent', optionalClassName);

        return (
            <NodeContentComponent style={style} className={className} {...this.getNodeParams(index)}>
                {nodeContentSelector(this.getNodeParams(index).node)}
            </NodeContentComponent>
        );
    }

    render() {
        const { data, index, style } = this.props;

        const { levelPadding, nodeClassName, nodeStyle, onNodeClick, onNodeDoubleClick, onNodeContextMenu } = data;

        let className;
        if (nodeClassName) {
            if (typeof nodeClassName === 'function') {
                className = nodeClassName(this.getNodeParams(index));
            } else {
                className = nodeClassName;
            }
        }

        let optionalStyle = {};
        if (nodeStyle) {
            if (typeof nodeStyle === 'function') {
                optionalStyle = nodeStyle(this.getNodeParams(index)) || {};
            } else {
                optionalStyle = nodeStyle;
            }
        }

        return (
            <div
                className={classNames('VTTree__Node', className)}
                style={{ ...optionalStyle, ...style, paddingLeft: levelPadding * this.getNodeParams(index).depth }}
                onClick={onNodeClick && (event => onNodeClick(event, this.getNodeParams(index)))}
                onDoubleClick={onNodeDoubleClick && (event => onNodeDoubleClick(event, this.getNodeParams(index)))}
                onContextMenu={onNodeContextMenu && (event => onNodeContextMenu(event, this.getNodeParams(index)))}
            >
                {this.renderExpander()}
                {this.renderContent()}
            </div>
        );
    }
}
