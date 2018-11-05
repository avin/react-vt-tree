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
        if (nodeItem.isExpanded) {
            return <span onClick={event => this.handleCollapseItem(nodeItem, event)}>⯆</span>;
        }
        return <span onClick={event => this.handleExpandItem(nodeItem, event)}>⯈</span>;
    }

    render() {
        const { data, index, style } = this.props;

        const { items } = data;
        const item = items[index];

        //⯈⯆
        return (
            <div style={{ ...style, paddingLeft: 20 * item._depth }}>
                {item.childNodes && this.renderExpander(item)}
                {item.content}
            </div>
        );
    }
}
