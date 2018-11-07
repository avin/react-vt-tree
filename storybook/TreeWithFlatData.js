import React from 'react';
import treeData from './utils/flatTreeData';
import SizeMe from '@avinlab/react-size-me';
import Tree from '../src/Tree';
import JSONTree from 'react-json-tree';
import jsonViewerTheme from './utils/jsonViewerTheme';
import { action } from '@storybook/addon-actions';
import SourceCode from './SourceCode';

export default class TreeWithFlatData extends React.Component {
    state = {
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

    handleExpandAll = () => {
        const expandedNodes = new Set(Object.keys(treeData.nodesIndexes));
        this.setState({ expandedNodes });
    };

    handleCollapseAll = () => {
        this.setState({ expandedNodes: new Set() });
    };

    getChildNodes = nodeItem => {
        let results = [];
        nodeItem.childIds &&
            nodeItem.childIds.forEach(childId => {
                results.push(treeData.nodes[treeData.nodesIndexes[childId]]);
            });
        if (results.length) {
            return results;
        }
    };

    render() {
        const { expandedNodes } = this.state;

        return (
            <div>
                <SourceCode>TreeWithFlatData.js</SourceCode>
                <div>
                    Tree size: <b>{treeData.nodes.length}</b> items &nbsp;
                    <button onClick={this.handleExpandAll}>Expand all</button> &nbsp;
                    <button onClick={this.handleCollapseAll}>Collapse all</button>
                </div>
                <hr />
                <div className="treeContainer">
                    <SizeMe>
                        {({ width, height }) => (
                            <Tree
                                width={width}
                                height={height}
                                nodes={treeData.nodes}
                                onNodeExpand={this.handleNodeExpand}
                                onNodeCollapse={this.handleNodeCollapse}
                                nodeChildrenSelector={nodeItem => this.getChildNodes(nodeItem)}
                                firstLevelItemsSelector={items => items.filter(i => !i.parentId)}
                                hasChildItemsSelector={nodeItem => nodeItem.childIds && nodeItem.childIds.length}
                                isNodeExpandedSelector={nodeItem => expandedNodes.has(nodeItem.id)}
                                additionalData={{ expandedNodes }}
                                onNodeClick={action('onNodeClick')}
                                onNodeDoubleClick={action('onNodeDoubleClick')}
                                onNodeContextMenu={action('onNodeContextMenu')}
                            />
                        )}
                    </SizeMe>
                </div>
                <h2>Content data structure:</h2>
                <JSONTree data={treeData} theme={jsonViewerTheme} />
            </div>
        );
    }
}
