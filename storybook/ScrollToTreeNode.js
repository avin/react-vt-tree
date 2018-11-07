import React from 'react';
import treeData from './utils/flatTreeData';
import SizeMe from '@avinlab/react-size-me';
import Tree from '../src/Tree';
import SourceCode from './SourceCode';

export default class ScrollToTreeNode extends React.Component {
    state = {
        expandedNodes: new Set(Object.keys(treeData.nodesIndexes)),
        scrollToNodeContent: treeData.nodes[Math.floor(Math.random() * treeData.nodes.length)].content,
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

    handleScrollToNode = () => {
        const { scrollToNodeContent } = this.state;
        this.tree.scrollToNode(i => i.content === scrollToNodeContent);

        this.setState({
            scrollToNodeContent: treeData.nodes[Math.floor(Math.random() * treeData.nodes.length)].content,
        });
    };

    render() {
        const { expandedNodes, scrollToNodeContent } = this.state;

        return (
            <div>
                <SourceCode>ScrollToTreeNode.js</SourceCode>

                <div>
                    <button onClick={this.handleScrollToNode}>
                        Scroll to <b>{scrollToNodeContent}</b>
                    </button>{' '}
                </div>
                <hr />
                <div className="treeContainer">
                    <SizeMe>
                        {({ width, height }) => (
                            <Tree
                                ref={i => (this.tree = i)}
                                width={width}
                                height={height}
                                nodes={treeData.nodes}
                                nodeChildrenSelector={nodeItem => this.getChildNodes(nodeItem)}
                                firstLevelItemsSelector={items => items.filter(i => !i.parentId)}
                                hasChildItemsSelector={nodeItem => nodeItem.childIds && nodeItem.childIds.length}
                                isNodeExpandedSelector={nodeItem => expandedNodes.has(nodeItem.id)}
                                additionalData={{ expandedNodes }}
                            />
                        )}
                    </SizeMe>
                </div>
            </div>
        );
    }
}
