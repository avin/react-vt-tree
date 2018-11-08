import React from 'react';
import treeData from './utils/flatTreeData';
import SizeMe from '@avinlab/react-size-me';
import {Tree} from '../src';
import JSONTree from 'react-json-tree';
import jsonViewerTheme from './utils/jsonViewerTheme';
import { action } from '@storybook/addon-actions';
import SourceCode from './SourceCode';

export default class TreeWithFlatData extends React.Component {
    state = {
        expandedNodes: new Set(),
    };

    handleNodeExpand = (e, { node }) => {
        let expandedNodes = new Set(this.state.expandedNodes);
        expandedNodes.add(node.id);
        this.setState({ expandedNodes });
    };

    handleNodeCollapse = (e, { node }) => {
        let expandedNodes = new Set(this.state.expandedNodes);
        expandedNodes.delete(node.id);
        this.setState({ expandedNodes });
    };

    handleExpandAll = () => {
        const expandedNodes = new Set(Object.keys(treeData.nodesIndexes));
        this.setState({ expandedNodes });
    };

    handleCollapseAll = () => {
        this.setState({ expandedNodes: new Set() });
    };

    getChildNodes = node => {
        let results = [];
        node.childIds &&
            node.childIds.forEach(childId => {
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
                                nodeChildrenSelector={node => this.getChildNodes(node)}
                                firstLevelItemsSelector={nodes => nodes.filter(i => !i.parentId)}
                                hasChildItemsSelector={node => node.childIds && node.childIds.length}
                                isNodeExpandedSelector={node => expandedNodes.has(node.id)}
                                additionalData={{ expandedNodes }}
                                onNodeClick={action('onNodeClick')}
                                onNodeDoubleClick={action('onNodeDoubleClick')}
                                onNodeContextMenu={action('onNodeContextMenu')}
                            />
                        )}
                    </SizeMe>
                </div>
                <h3>Content data structure:</h3>
                <JSONTree data={treeData} theme={jsonViewerTheme} />
            </div>
        );
    }
}
