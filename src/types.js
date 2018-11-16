// @flow

import * as React from 'react';

export type NodeParams = {
    /** Node data object */
    node: any,

    /** Depth of node */
    depth: number,

    /** Has children sign */
    hasChildren: boolean,

    /** Is expanded sign */
    isExpanded: boolean,

    /** Index of node */
    index: number,
};

export type nodeActionHandler = (event: SyntheticMouseEvent<HTMLElement>, nodeParams: NodeParams) => void;

export type onScrollHandler = ({
    scrollDirection: 'forward' | 'backward',
    scrollOffset: number,
    scrollUpdateWasRequested: boolean,
}) => void;

export type NodeContentProps = {
    ...NodeParams,

    /** Style object */
    style?: Object,

    /** ClassName string */
    className?: string,

    /** Children elements */
    children: React.Node,
};

export type NodeExpanderProps = {
    ...NodeParams,

    /** On Click expander handler */
    onClick?: Function,

    className?: string,
};

export type TreeNodeProps = {|
    /** Item additional data */
    data: Object,

    /** Node row index */
    index: number,

    /** Node row specific style */
    style: Object,
|};

export type TreeProps = {|
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
    hasChildrenSelector?: Function,

    /** Node's content selector */
    nodeContentSelector: Function,

    /** Selector to get first level items (with no parents) */
    firstLevelNodesSelector: Function,

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

    /** Node content component */
    nodeContentComponent?: React.Component<NodeContentProps> | Function,

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
