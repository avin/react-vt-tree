import React from 'react';
import treeNodes, { count as treeNodesSize } from './utils/largeTreeData';
import SizeMe from '@avinlab/react-size-me';
import Tree from '../src';
import SourceCode from './SourceCode';

export default class StressTreeNode extends React.Component {
    state = {
        expandedNodes: new Set(),
    };

    handleNodeExpand = (e, {node}) => {
        let expandedNodes = new Set(this.state.expandedNodes);
        expandedNodes.add(node.id);
        this.setState({ expandedNodes });
    };

    handleNodeCollapse = (e, {node}) => {
        let expandedNodes = new Set(this.state.expandedNodes);
        expandedNodes.delete(node.id);
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
                <SourceCode>StressTreeNode.js</SourceCode>
                <div>
                    Tree size: <b style={{color: '#F00'}}>{treeNodesSize}</b> nodes &nbsp;
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
                                nodes={treeNodes}
                                onNodeExpand={this.handleNodeExpand}
                                onNodeCollapse={this.handleNodeCollapse}
                                nodeChildrenSelector={nodeItem => this.getChildNodes(nodeItem)}
                                hasChildrenSelector={nodeItem => nodeItem.children && nodeItem.children.length}
                                isNodeExpandedSelector={nodeItem => expandedNodes.has(nodeItem.id)}
                                firstLevelNodesSelector={nodes => nodes}
                                nodeContentSelector={node => node.content}
                                additionalData={{ expandedNodes }}
                            />
                        )}
                    </SizeMe>
                </div>
            </div>
        );
    }
}
