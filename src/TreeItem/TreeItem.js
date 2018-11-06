import React from 'react';

export default class TreeItem extends React.Component {
    handleCollapseItem = (nodeItem, event) => {
        const { data } = this.props;
        const { onNodeCollapse } = data;

        onNodeCollapse(nodeItem, event);
    };

    handleExpandItem = (nodeItem, event) => {
        const { data } = this.props;
        const { onNodeExpand } = data;

        onNodeExpand(nodeItem, event);
    };

    renderExpander(nodeItem) {
        const { data } = this.props;
        const {
            isNodeExpandedSelector,
            hasChildItemsSelector,
            nodeExpanderComponent: Expander,
            nodeCollapserComponent: Collapser,
            nodeIconComponent: Icon,
        } = data;

        if (!hasChildItemsSelector(nodeItem)) {
            return <Icon node={nodeItem} />;
        }

        if (isNodeExpandedSelector(nodeItem)) {
            return <Collapser onClick={event => this.handleCollapseItem(nodeItem, event)} />;
        }
        return <Expander onClick={event => this.handleExpandItem(nodeItem, event)} />;
    }

    render() {
        const { data, index, style } = this.props;

        const { items, levelPadding } = data;
        const item = items[index];

        return (
            <div className="VTTree__TreeItem" style={{ ...style, paddingLeft: levelPadding * item._depth }}>
                {this.renderExpander(item)}
                <div className="VTTree__ItemContent" title={item.content}>
                    {item.content}
                </div>
            </div>
        );
    }
}
