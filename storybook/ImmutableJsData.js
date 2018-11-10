import React from 'react';
import treeData from './utils/immutableJsTreeData';
import SizeMe from '@avinlab/react-size-me';
import Tree from '../src';
import JSONTree from 'react-json-tree';
import jsonViewerTheme from './utils/jsonViewerTheme';
import { action } from '@storybook/addon-actions';
import SourceCode from './SourceCode';
import * as  Immutable from 'immutable';

export default class ImmutableJsData extends React.Component {
    state = {
        expandedNodes: new Set(),
    };

    handleNodeExpand = (e, { node }) => {
        let expandedNodes = new Set(this.state.expandedNodes);
        expandedNodes.add(node.get('id'));
        this.setState({ expandedNodes });
    };

    handleNodeCollapse = (e, { node }) => {
        let expandedNodes = new Set(this.state.expandedNodes);
        expandedNodes.delete(node.get('id'));
        this.setState({ expandedNodes });
    };

    handleExpandAll = () => {
        const expandedNodes = new Set(Object.keys(treeData.nodesIndexes));
        console.log('expandedNodes', expandedNodes);
        this.setState({ expandedNodes });
    };

    handleCollapseAll = () => {
        this.setState({ expandedNodes: new Set() });
    };

    getChildNodes = node => {
        let results = [];
        node.get('childIds') &&
            node.get('childIds').forEach(childId => {
                results.push(treeData.nodes.get(treeData.nodesIndexes[childId]));
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
                    Tree size: <b>{treeData.nodes.size}</b> items &nbsp;
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
                                firstLevelItemsSelector={nodes => nodes.filter(i => !i.get('parentId'))}
                                hasChildrenSelector={node => node.get('childIds', new Immutable.List()).size}
                                isNodeExpandedSelector={node => expandedNodes.has(node.get('id'))}
                                additionalData={{ expandedNodes }}
                                onNodeClick={action('onNodeClick')}
                                onNodeDoubleClick={action('onNodeDoubleClick')}
                                onNodeContextMenu={action('onNodeContextMenu')}
                                nodeContentSelector={node => node.get('content')}
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
