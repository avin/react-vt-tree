import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import TreeNode from '../TreeNode';
import { FixedSizeList as List } from 'react-window';
import NodeCollapser from '../NodeCollapser/NodeCollapser';
import NodeExpander from '../NodeExpander/NodeExpander';
import NodeIcon from '../NodeIcon/NodeIcon';
import NodeContent from '../NodeContent/NodeContent';

const getItemData = memoize(
    (
        items,
        depthList,
        isNodeExpandedSelector,
        hasChildItemsSelector,
        levelPadding,
        nodeClassName,
        nodeStyle,
        nodeContentClassName,
        nodeContentStyle,
        onNodeClick,
        onNodeCollapse,
        onNodeIconClick,
        onNodeContextMenu,
        onNodeDoubleClick,
        onNodeExpand,
        nodeExpanderComponent,
        nodeCollapserComponent,
        nodeIconComponent,
        nodeContentComponent,
        ...additionalData
    ) => ({
        items,
        depthList,
        isNodeExpandedSelector,
        hasChildItemsSelector,
        levelPadding,
        nodeClassName,
        nodeStyle,
        nodeContentClassName,
        nodeContentStyle,
        onNodeClick,
        onNodeCollapse,
        onNodeIconClick,
        onNodeContextMenu,
        onNodeDoubleClick,
        onNodeExpand,
        nodeExpanderComponent,
        nodeCollapserComponent,
        nodeIconComponent,
        nodeContentComponent,
        additionalData,
    })
);

export default class Tree extends React.PureComponent {
    static propTypes = {
        /** Width of tree container */
        width: PropTypes.number.isRequired,

        /** Height of tree container */
        height: PropTypes.number.isRequired,

        className: PropTypes.string,

        /** Tree node items */
        nodes: PropTypes.any.isRequired,

        /** Selector to get expanded status of node item */
        isNodeExpandedSelector: PropTypes.func.isRequired,

        /** Selector to get child-nodes */
        nodeChildrenSelector: PropTypes.func.isRequired,

        /** Selector to determine children presence */
        hasChildItemsSelector: PropTypes.func.isRequired,

        /** Selector to get first level items (with no parents) */
        firstLevelItemsSelector: PropTypes.func.isRequired,

        /** Padding of 1x depth level */
        levelPadding: PropTypes.number,

        /** Node optional className string or generate function */
        nodeClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

        /** Node optional style object or generate function */
        nodeStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

        /** Node content optional className string or generate function */
        nodeContentClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

        /** Node content optional style object or generate function */
        nodeContentStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),

        /** On node click handler */
        onNodeClick: PropTypes.func,

        /** On node collapse handler */
        onNodeCollapse: PropTypes.func,

        /** On click Node Icon handler */
        onNodeIconClick: PropTypes.func,

        /** On node context menu handler */
        onNodeContextMenu: PropTypes.func,

        /** On node double click handler */
        onNodeDoubleClick: PropTypes.func,

        /** On node expand handler */
        onNodeExpand: PropTypes.func,

        /** Node Expander component */
        nodeExpanderComponent: PropTypes.func,

        /** Node Collapser component */
        nodeCollapserComponent: PropTypes.func,

        /** Node icon component */
        nodeIconComponent: PropTypes.func,

        /** Node content component */
        nodeContentComponent: PropTypes.func,

        /** Height of tree row */
        itemHeight: PropTypes.number,

        /** On scroll tree list */
        onScroll: PropTypes.func,

        /** Scroll offset for initial tree list render */
        initialScrollOffset: PropTypes.number,

        /**
         * Any other react-window list props
         * @see https://react-window.now.sh/#/api/FixedSizeList
         **/
        listProps: PropTypes.object,
    };

    static defaultProps = {
        style: {},
        levelPadding: 20,
        nodeExpanderComponent: NodeExpander,
        nodeCollapserComponent: NodeCollapser,
        nodeIconComponent: NodeIcon,
        nodeContentComponent: NodeContent,
        itemHeight: 25,
        initialScrollOffset: 0,
        listProps: {},
    };

    _createList(nodes) {
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

        this._list = list;
        this._depthList = depthList;

        return [this._list, this._depthList];
    }

    scrollToNode(findIndexFunction) {
        if (typeof findIndexFunction === 'function') {
            const nodeIndex = this._list.findIndex(findIndexFunction);
            if (nodeIndex !== undefined) {
                this.list.scrollToItem(nodeIndex);
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
            onNodeIconClick,
            onNodeContextMenu,
            onNodeDoubleClick,
            onNodeExpand,
            isNodeExpandedSelector,
            hasChildItemsSelector,
            firstLevelItemsSelector,
            nodeExpanderComponent,
            nodeCollapserComponent,
            nodeIconComponent,
            nodeContentComponent,
            itemHeight,
            initialScrollOffset,
            listProps,
        } = this.props;
        const [items, depthList] = this._createList(firstLevelItemsSelector(nodes));

        const itemData = getItemData(
            items,
            depthList,
            isNodeExpandedSelector,
            hasChildItemsSelector,
            levelPadding,
            nodeClassName,
            nodeStyle,
            nodeContentClassName,
            nodeContentStyle,
            onNodeClick,
            onNodeCollapse,
            onNodeIconClick,
            onNodeContextMenu,
            onNodeDoubleClick,
            onNodeExpand,
            nodeExpanderComponent,
            nodeCollapserComponent,
            nodeIconComponent,
            nodeContentComponent
        );

        return (
            <List
                ref={i => (this.list = i)}
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
