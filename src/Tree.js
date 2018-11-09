// @flow

import * as React from 'react';
import memoize from 'memoize-one';
import TreeNode from './TreeNode';
import { FixedSizeList as List } from 'react-window';
import NodeExpander from './NodeExpander';

import type {NodeExpanderProps} from './NodeExpander';

const getItemData = memoize(
    (
        items,
        depthList,
        isNodeExpandedSelector,
        hasChildNodesSelector,
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
        ...additionalData
    ) => ({
        items,
        depthList,
        isNodeExpandedSelector,
        hasChildNodesSelector,
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
        additionalData,
    }),
);

export type NodeParams = {
    node: any,
    nodeDepth: number,
    nodeIndex: number,
};

type nodeActionHandler = (event: SyntheticMouseEvent<HTMLElement>, nodeParams: NodeParams) => void;
type onScrollHandler = ({
    scrollDirection: 'forward' | 'backward',
    scrollOffset: number,
    scrollUpdateWasRequested: boolean,
}) => void;

type TreeProps = {|
    /** Width of tree container */
    width: number,

    /** Height of tree container */
    height: number,

    /** Optional class name tree-list */
    className?: string,

    /** Optional CSS style object for tree-list */
    style?: Object,

    /** Tree node-items */
    nodes: any,

    /** Selector to get expanded status of node item */
    isNodeExpandedSelector: Function,

    /** Selector to get child-nodes */
    nodeChildrenSelector: Function,

    /** Selector to determine children presence */
    hasChildNodesSelector: Function,

    /** Node's content selector */
    nodeContentSelector: Function,

    /** Selector to get first level items (with no parents) */
    firstLevelItemsSelector: Function,

    /** Padding of 1x depth level */
    levelPadding?: number,

    /** Node optional className string or generate function */
    nodeClassName?: string | ((params: NodeParams) => string),

    /** Node optional style object or generate function */
    nodeStyle?: Object | ((params: NodeParams) => Object),

    /** Node content optional className string or generate function */
    nodeContentClassName?: string | ((params: NodeParams) => string),

    /** Node content optional style object or generate function */
    nodeContentStyle?: Object | ((params: NodeParams) => Object),

    /** On node click handler */
    onNodeClick?: nodeActionHandler,

    /** On node collapse handler */
    onNodeCollapse?: nodeActionHandler,

    /** On node context menu handler */
    onNodeContextMenu?: nodeActionHandler,

    /** On node double click handler */
    onNodeDoubleClick?: nodeActionHandler,

    /** On node expand handler */
    onNodeExpand?: nodeActionHandler,

    /** Node Expander component */
    nodeExpanderComponent?: React.Component<NodeExpanderProps> | Function,

    /** Height of tree row */
    itemHeight?: number,

    /** On scroll tree list */
    onScroll?: onScrollHandler,

    /** Scroll offset for initial tree list render */
    initialScrollOffset?: number,

    /**
     * Any other react-window list props
     * @see https://react-window.now.sh/#/api/FixedSizeList
     **/
    listProps?: Object,
|};

export default class Tree extends React.PureComponent<TreeProps> {
    static defaultProps = {
        style: {},
        levelPadding: 22,
        nodeExpanderComponent: NodeExpander,
        itemHeight: 25,
        initialScrollOffset: 0,
        listProps: {},
    };

    _nodesList: Array<any>;
    _depthList: Array<number>;
    _listRef: ?React.ElementRef<any>;

    _createList(nodes: any) {
        const { nodeChildrenSelector, isNodeExpandedSelector } = this.props;

        let list = [];
        let depthList = [];

        const fillList = (nodes, depth) => {
            nodes.forEach(node => {
                depthList.push(depth);
                list.push(node);
                if (isNodeExpandedSelector(node)) {
                    const childNodes = nodeChildrenSelector(node);
                    if (childNodes) {
                        fillList(childNodes, depth + 1);
                    }
                }
            });
        };
        fillList(nodes, 0);

        this._nodesList = list;
        this._depthList = depthList;

        return [this._nodesList, this._depthList];
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
            hasChildNodesSelector,
            nodeContentSelector,
            firstLevelItemsSelector,
            nodeExpanderComponent,
            itemHeight,
            initialScrollOffset,
            listProps,
        } = this.props;
        const [items, depthList] = this._createList(firstLevelItemsSelector(nodes));

        const itemData = getItemData(
            items,
            depthList,
            isNodeExpandedSelector,
            hasChildNodesSelector,
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
