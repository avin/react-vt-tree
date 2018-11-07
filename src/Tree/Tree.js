import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import TreeNode from '../TreeNode';
import { FixedSizeList as List } from 'react-window';
import NodeCollapser from '../NodeCollapser/NodeCollapser';
import NodeExpander from '../NodeExpander/NodeExpander';
import NodeIcon from '../NodeIcon/NodeIcon';

const getItemData = memoize(
    (
        items,
        isNodeExpandedSelector,
        hasChildItemsSelector,
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
        nodeCollapserComponent,
        nodeIconComponent,
        ...additionalData
    ) => ({
        items,
        isNodeExpandedSelector,
        hasChildItemsSelector,
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
        nodeCollapserComponent,
        nodeIconComponent,
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
        nodes: PropTypes.arrayOf(
            PropTypes.shape({
                childNodes: PropTypes.arrayOf(PropTypes.any),

                className: PropTypes.string,

                contentRef: PropTypes.string,

                content: PropTypes.node,

                data: PropTypes.object,
            })
        ).isRequired,

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

        /** onNodeClick handler */
        onNodeClick: PropTypes.func,

        /** onNodeCollapse handler */
        onNodeCollapse: PropTypes.func,

        /** onNodeContextMenu handler */
        onNodeContextMenu: PropTypes.func,

        /** onNodeDoubleClick handler */
        onNodeDoubleClick: PropTypes.func,

        /** onNodeExpand handler */
        onNodeExpand: PropTypes.func,

        /** nodeExpanderComponent */
        nodeExpanderComponent: PropTypes.func,

        /** nodeCollapserComponent */
        nodeCollapserComponent: PropTypes.func,

        /** nodeIconComponent */
        nodeIconComponent: PropTypes.func,

        /** Height of tree row */
        itemHeight: PropTypes.number,

        /** On scroll tree list */
        onScroll: PropTypes.func,

        /** Scroll offset for initial tree list render */
        initialScrollOffset: PropTypes.number,
    };

    static defaultProps = {
        style: {},
        levelPadding: 20,
        nodeExpanderComponent: NodeExpander,
        nodeCollapserComponent: NodeCollapser,
        nodeIconComponent: NodeIcon,
        itemHeight: 25,
        initialScrollOffset: 0,
    };

    _createList(nodes, depth = 0) {
        const { nodeChildrenSelector, isNodeExpandedSelector } = this.props;

        this._list = nodes.reduce((resultList, node) => {
            node._depth = depth;
            resultList.push(node);
            if (isNodeExpandedSelector(node)) {
                const childNodes = nodeChildrenSelector(node);
                if (childNodes) {
                    resultList = resultList.concat(this._createList(childNodes, depth + 1));
                }
            }
            return resultList;
        }, []);

        return this._list;
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
            onNodeContextMenu,
            onNodeDoubleClick,
            onNodeExpand,
            isNodeExpandedSelector,
            hasChildItemsSelector,
            firstLevelItemsSelector,
            nodeExpanderComponent,
            nodeCollapserComponent,
            nodeIconComponent,
            itemHeight,
            initialScrollOffset,
        } = this.props;
        const items = this._createList(firstLevelItemsSelector(nodes));

        const itemData = getItemData(
            items,
            isNodeExpandedSelector,
            hasChildItemsSelector,
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
            nodeCollapserComponent,
            nodeIconComponent
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
            >
                {TreeNode}
            </List>
        );
    }
}
