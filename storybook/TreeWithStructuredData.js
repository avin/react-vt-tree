import React from 'react';
import treeNodes, {count as treeNodesSize} from './utils/structuredTreeData';
import SizeMe from '@avinlab/react-size-me';
import Tree from '../src/Tree';
import JSONTree from 'react-json-tree';

export default class TreeWithStructuredData extends React.Component {
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
        const expandedNodes = new Set();
        const passNodes = nodes => {
            nodes.forEach(node => {
                expandedNodes.add(node.id);
                if (node.children) {
                    passNodes(node.children);
                }
            });
        };
        passNodes(treeNodes);
        this.setState({ expandedNodes });
    };

    handleCollapseAll = () => {
        this.setState({ expandedNodes: new Set() });
    };

    getChildNodes = nodeItem => nodeItem.children;

    render() {
        const { expandedNodes } = this.state;

        return (
            <div>
                Tree size: <b>{treeNodesSize}</b> items &nbsp;
                <button onClick={this.handleExpandAll}>Expand all</button> &nbsp;
                <button onClick={this.handleCollapseAll}>Collapse all</button> &nbsp;
                <hr />
                <div className="treeContainer">
                    <SizeMe>
                        {({ width, height }) => (
                            <Tree
                                width={width}
                                height={height}
                                nodes={treeNodes}
                                onNodeExpand={this.handleNodeExpand}
                                onNodeCollapse={this.handleNodeCollapse}
                                nodeChildrenSelector={nodeItem => this.getChildNodes(nodeItem)}
                                hasChildItemsSelector={nodeItem => nodeItem.children && nodeItem.children.length}
                                isNodeExpandedSelector={nodeItem => expandedNodes.has(nodeItem.id)}
                                additionalData={{ expandedNodes }}
                            />
                        )}
                    </SizeMe>
                </div>

                <h2>Content data structure:</h2>
                <JSONTree data={treeNodes} />
            </div>
        );
    }
}
