import React from 'react';
import treeData from './utils/flatTreeData';
import SizeMe from '@avinlab/react-size-me';
import Tree from '../src/Tree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowDown, faFish } from '@fortawesome/free-solid-svg-icons';

export default class Styling extends React.Component {
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

        const mainProps = {
            nodes: treeData.nodes,
            onNodeExpand: this.handleNodeExpand,
            onNodeCollapse: this.handleNodeCollapse,
            nodeChildrenSelector: nodeItem => this.getChildNodes(nodeItem),
            firstLevelItemsSelector: items => items.filter(i => !i.parentId),
            hasChildItemsSelector: nodeItem => nodeItem.childIds && nodeItem.childIds.length,
            isNodeExpandedSelector: nodeItem => expandedNodes.has(nodeItem.id),
            additionalData: { expandedNodes },
        };

        return (
            <div>
                Tree size: <b>{treeData.nodes.length}</b> items &nbsp;
                <button onClick={this.handleExpandAll}>Expand all</button> &nbsp;
                <button onClick={this.handleCollapseAll}>Collapse all</button> &nbsp;
                <hr />
                <div className="container">
                    <div className="treeContainer defaultStyle">
                        <div className="header">Default style</div>
                        <SizeMe>{({ width, height }) => <Tree {...mainProps} width={width} height={height} />}</SizeMe>
                    </div>

                    <div className="treeContainer style1">
                        <div className="header">Hover node effect</div>
                        <SizeMe>
                            {({ width, height }) => (
                                <Tree {...mainProps} width={width} height={height} nodeClassName="treeNode" />
                            )}
                        </SizeMe>
                    </div>

                    <div className="treeContainer style2">
                        <div className="header">Font-awesome icons</div>
                        <SizeMe>
                            {({ width, height }) => (
                                <Tree
                                    {...mainProps}
                                    width={width}
                                    height={height}
                                    nodeExpanderComponent={({ node, ...props }) => (
                                        <div className="nodeIcon" {...props}>
                                            <FontAwesomeIcon icon={faArrowRight} {...props} />
                                        </div>
                                    )}
                                    nodeCollapserComponent={({ node, ...props }) => (
                                        <div className="nodeIcon" {...props}>
                                            <FontAwesomeIcon icon={faArrowDown} {...props} />
                                        </div>
                                    )}
                                    nodeIconComponent={({ node, ...props }) => (
                                        <div className="nodeIcon rotating" {...props}>
                                            <FontAwesomeIcon icon={faFish} {...props} />
                                        </div>
                                    )}
                                />
                            )}
                        </SizeMe>
                    </div>

                    <div className="treeContainer style1">
                        <div className="header">No-padding tree</div>
                        <SizeMe>
                            {({ width, height }) => (
                                <Tree
                                    {...mainProps}
                                    width={width}
                                    height={height}
                                    levelPadding={0}
                                    nodeStyle={node => ({
                                        backgroundColor: `rgba(0,0,0,${node._depth / 5})`,
                                        color: node._depth > 2 ? '#FFF' : '#000',
                                    })}
                                />
                            )}
                        </SizeMe>
                    </div>
                </div>
            </div>
        );
    }
}
