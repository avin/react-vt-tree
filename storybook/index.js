import React from 'react';
import { storiesOf } from '@storybook/react';
import { Tree } from '../src';
import SizeMe from '@avinlab/react-size-me';
import treeData from './utils/treeData';

export default class TreeExample extends React.Component {
    state = {
        treeData,
        expandedNodes: new Set(),
    };

    handleNodeExpand = (treeNode, e) => {
        let expandedNodes = new Set(this.state.expandedNodes);
        expandedNodes.add(treeNode.id);
        this.setState({ expandedNodes });
    };

    handleNodeCollapse = (treeNode, e) => {
        let expandedNodes = new Set(this.state.expandedNodes);
        expandedNodes.delete(treeNode.id);
        this.setState({ expandedNodes });
    };

    makeNodes(parentId, onlyIds) {
        const { treeData } = this.state;
        const { expandedNodes } = this.state;
        const nodes = [];
        for (const id of onlyIds || Object.keys(treeData)) {
            let treeDataItem = treeData[id];
            if (treeDataItem.parentId === parentId) {
                treeDataItem = {
                    ...treeDataItem,
                    childNodes: this.makeNodes(treeDataItem.id, treeDataItem.childIds),
                    isExpanded: expandedNodes.has(id),
                };
                nodes.push(treeDataItem);
            }
        }

        if (!nodes.length) {
            return;
        }

        return nodes;
    }

    handleExpandAll = () => {
        const { treeData } = this.state;
        const expandedNodes = new Set(Object.keys(treeData));
        this.setState({ expandedNodes });
    };

    handleCollapseAll = () => {
        this.setState({ expandedNodes: new Set() });
    };

    render() {
        const { treeData } = this.state;
        const nodes = this.makeNodes();
        return (
            <div>
                Tree size: {Object.keys(treeData).length} items
                <button onClick={this.handleExpandAll}>Expand all</button>
                <button onClick={this.handleCollapseAll}>Collapse all</button>
                <hr />
                <div className="root">
                    <SizeMe>
                        {({ width, height }) => (
                            <Tree
                                width={width}
                                height={height}
                                nodes={nodes}
                                onNodeExpand={this.handleNodeExpand}
                                onNodeCollapse={this.handleNodeCollapse}
                            />
                        )}
                    </SizeMe>
                </div>
            </div>
        );
    }
}

storiesOf('react-vt-tree', module).add('demo', () => <TreeExample />);
