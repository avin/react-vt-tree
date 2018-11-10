// @flow

import * as React from 'react';
import memoize from 'memoize-one';
import TreeNode from './TreeNode';
import { FixedSizeList as List } from 'react-window';
import NodeExpander from './NodeExpander';
import NodeContent from './NodeContent';
import type {
    NodeParams,
    TreeProps,
} from './types';

const getItemData = memoize(
    (
        items,
        isNodeExpandedSelector,
        hasChildrenSelector,
        nodeContentSelector,
        levelPadding,
        nodeClassName,
        nodeStyle,
        nodeContentClassName,
        nodeContentStyle,
        onNodeClick,
        onNodeCollapse,
        onNodeContextMenu,
        onNodeDoubleClick,
        onNodeExpand,
        nodeExpanderComponent,
        nodeContentComponent,
        ...additionalData
    ) => ({
        items,
        isNodeExpandedSelector,
        hasChildrenSelector,
        nodeContentSelector,
        levelPadding,
        nodeClassName,
        nodeStyle,
        nodeContentClassName,
        nodeContentStyle,
        onNodeClick,
        onNodeCollapse,
        onNodeContextMenu,
        onNodeDoubleClick,
        onNodeExpand,
        nodeExpanderComponent,
        nodeContentComponent,
        additionalData,
    }),
);

export default class Tree extends React.PureComponent<TreeProps> {
    static defaultProps = {
        style: {},
        levelPadding: 22,
        nodeExpanderComponent: NodeExpander,
        nodeContentComponent: NodeContent,
        itemHeight: 25,
        initialScrollOffset: 0,
        listProps: {},
    };

    _nodesList: Array<NodeParams>;
    _listRef: ?React.ElementRef<any>;

    _createList(nodes: any) {
        let { nodeChildrenSelector, isNodeExpandedSelector, hasChildrenSelector } = this.props;

        let hasChildrenFunction =
            hasChildrenSelector ||
            (node => {
                const nodeChildren = nodeChildrenSelector(node);
                return nodeChildren && nodeChildren.length;
            });

        this._nodesList = [];
        let index = 0;

        const fillList = (nodes, depth) => {
            nodes.forEach(node => {
                let hasChildren = hasChildrenFunction(node);
                const isExpanded = hasChildren && isNodeExpandedSelector(node);
                this._nodesList.push({
                    node,
                    depth,
                    isExpanded,
                    hasChildren,
                    index: index++,
                });

                if (isExpanded) {
                    const childNodes = nodeChildrenSelector(node);
                    if (childNodes) {
                        fillList(childNodes, depth + 1);
                    }
                }
            });
        };
        fillList(nodes, 0);

        return this._nodesList;
    }

    scrollToNode(findIndexFunction: Function) {
        if (typeof findIndexFunction === 'function') {
            const nodeIndex = this._nodesList.findIndex(findIndexFunction);
            if (nodeIndex !== undefined) {
                this._listRef && this._listRef.scrollToItem(nodeIndex);
            }
        }
    }

    render() {
        const {
            nodes,
            height,
            width,
            className,
            style,
            levelPadding,
            nodeClassName,
            nodeStyle,
            nodeContentClassName,
            nodeContentStyle,
            onNodeClick,
            onNodeCollapse,
            onNodeContextMenu,
            onNodeDoubleClick,
            onNodeExpand,
            isNodeExpandedSelector,
            hasChildrenSelector,
            nodeContentSelector,
            firstLevelItemsSelector,
            nodeExpanderComponent,
            nodeContentComponent,
            itemHeight,
            initialScrollOffset,
            listProps,
        } = this.props;
        const items = this._createList(firstLevelItemsSelector(nodes));

        const itemData = getItemData(
            items,
            isNodeExpandedSelector,
            hasChildrenSelector,
            nodeContentSelector,
            levelPadding,
            nodeClassName,
            nodeStyle,
            nodeContentClassName,
            nodeContentStyle,
            onNodeClick,
            onNodeCollapse,
            onNodeContextMenu,
            onNodeDoubleClick,
            onNodeExpand,
            nodeExpanderComponent,
            nodeContentComponent,
        );

        return (
            <List
                ref={i => (this._listRef = i)}
                height={height}
                itemCount={items.length}
                itemData={itemData}
                itemSize={itemHeight}
                width={width}
                className={className}
                style={style}
                initialScrollOffset={initialScrollOffset}
                {...listProps}
            >
                {TreeNode}
            </List>
        );
    }
}
