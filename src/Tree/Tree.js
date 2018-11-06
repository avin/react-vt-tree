import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import TreeItem from '../TreeItem';
import { FixedSizeList as List } from 'react-window';

const getItemData = memoize(
    (
        items,
        isNodeExpandedSelector,
        hasChildItemsSelector,
        levelPadding,
        onNodeClick,
        onNodeCollapse,
        onNodeContextMenu,
        onNodeDoubleClick,
        onNodeExpand,
        ...additionalData
    ) => ({
        items,
        isNodeExpandedSelector,
        hasChildItemsSelector,
        levelPadding,
        onNodeClick,
        onNodeCollapse,
        onNodeContextMenu,
        onNodeDoubleClick,
        onNodeExpand,
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
        isNodeExpandedSelector: PropTypes.func,

        /** Selector to get child-nodes */
        nodeChildrenSelector: PropTypes.func,

        /** Selector to determine children presence */
        hasChildItemsSelector: PropTypes.func,

        /** Selector to get first level items (with no parents) */
        firstLevelItemsSelector: PropTypes.func,

        /** Padding of 1x depth level */
        levelPadding: PropTypes.number,

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
    };

    static defaultProps = {
        style: {},
        isNodeExpandedSelector: nodeItem => nodeItem.isExpanded,
        nodeChildrenSelector: nodeItem => nodeItem.children,
        hasChildItemsSelector: nodeItem => nodeItem.children && nodeItem.children.length,
        firstLevelItemsSelector: nodes => nodes,
        levelPadding: 20,
    };

    _createList(nodes, depth = 0) {
        const { nodeChildrenSelector, isNodeExpandedSelector } = this.props;
        let resultList = [];

        nodes.forEach(node => {
            node = { ...node, _depth: depth };
            resultList.push(node);
            if (isNodeExpandedSelector(node)) {
                const childNodes = nodeChildrenSelector(node);
                if (childNodes) {
                    resultList = [...resultList, ...this._createList(childNodes, depth + 1)];
                }
            }
        });

        return resultList;
    }

    render() {
        const {
            nodes,
            height,
            width,
            className,
            style,
            levelPadding,
            onNodeClick,
            onNodeCollapse,
            onNodeContextMenu,
            onNodeDoubleClick,
            onNodeExpand,
            isNodeExpandedSelector,
            hasChildItemsSelector,
            firstLevelItemsSelector,
        } = this.props;
        const items = this._createList(firstLevelItemsSelector(nodes));

        const itemData = getItemData(
            items,
            isNodeExpandedSelector,
            hasChildItemsSelector,
            levelPadding,
            onNodeClick,
            onNodeCollapse,
            onNodeContextMenu,
            onNodeDoubleClick,
            onNodeExpand
        );

        return (
            <div className={className} style={style}>
                <List height={height} itemCount={items.length} itemData={itemData} itemSize={35} width={width}>
                    {TreeItem}
                </List>
            </div>
        );
    }
}
