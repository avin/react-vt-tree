import React from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import TreeItem from '../TreeItem';
import { FixedSizeList as List } from 'react-window';

const getItemData = memoize(
    (items, onNodeClick, onNodeCollapse, onNodeContextMenu, onNodeDoubleClick, onNodeExpand) => ({
        items,
        onNodeClick,
        onNodeCollapse,
        onNodeContextMenu,
        onNodeDoubleClick,
        onNodeExpand,
    }),
);

export default class Tree extends React.PureComponent {
    static propTypes = {
        /** Width of tree container */
        width: PropTypes.number.isRequired,

        /** Height of tree container */
        height: PropTypes.number.isRequired,

        className: PropTypes.string,

        nodes: PropTypes.arrayOf(
            PropTypes.shape({
                childNodes: PropTypes.arrayOf(PropTypes.any),

                className: PropTypes.string,

                contentRef: PropTypes.string,

                content: PropTypes.node,

                data: PropTypes.object,
            }),
        ).isRequired,

        onNodeClick: PropTypes.func,

        onNodeCollapse: PropTypes.func,

        onNodeContextMenu: PropTypes.func,

        onNodeDoubleClick: PropTypes.func,

        onNodeExpand: PropTypes.func,
    };

    static defaultProps = {
        style: {},
    };

    _createList(nodes, depth = 0) {
        let resultList = [];

        nodes.forEach(node => {
            node = { ...node, _depth: depth };
            resultList.push(node);
            if (node.childNodes && node.isExpanded) {
                resultList = [...resultList, ...this._createList(node.childNodes, depth + 1)];
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
            onNodeClick,
            onNodeCollapse,
            onNodeContextMenu,
            onNodeDoubleClick,
            onNodeExpand,
        } = this.props;
        const items = this._createList(nodes);

        const itemData = getItemData(
            items,
            onNodeClick,
            onNodeCollapse,
            onNodeContextMenu,
            onNodeDoubleClick,
            onNodeExpand,
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
