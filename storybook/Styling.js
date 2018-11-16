import React from 'react';
import treeData from './utils/flatTreeData';
import SizeMe from '@avinlab/react-size-me';
import Tree from '../src';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen, faTag } from '@fortawesome/free-solid-svg-icons';
import SourceCode from './SourceCode';

const SimpleExpander = ({ node, depth, index, isExpanded, ...props }) => <div {...props}>{isExpanded ? '-' : '+'}</div>;

export default class Styling extends React.Component {
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
            firstLevelNodesSelector: nodes => nodes.filter(i => !i.parentId),
            hasChildrenSelector: nodeItem => nodeItem.childIds && nodeItem.childIds.length,
            isNodeExpandedSelector: nodeItem => expandedNodes.has(nodeItem.id),
            nodeContentSelector: node => node.content,
            additionalData: { expandedNodes },
        };

        return (
            <div>
                <SourceCode>Styling.js</SourceCode>
                <div>
                    Tree size: <b>{treeData.nodes.length}</b> nodes &nbsp;
                    <button onClick={this.handleExpandAll}>Expand all</button> &nbsp;
                    <button onClick={this.handleCollapseAll}>Collapse all</button>
                </div>
                <hr />
                <div className="container">
                    <div>
                        <div className="header">Default style</div>
                        <div className="treeContainer defaultStyle">
                            <SizeMe>
                                {({ width, height }) => <Tree {...mainProps} width={width} height={height} />}
                            </SizeMe>
                        </div>
                    </div>

                    <div>
                        <div className="header">Hover node effect</div>
                        <div className="treeContainer style1">
                            <SizeMe>
                                {({ width, height }) => (
                                    <Tree {...mainProps} width={width} height={height} nodeClassName="treeNode" />
                                )}
                            </SizeMe>
                        </div>
                    </div>

                    <div>
                        <div className="header">Content with icons</div>
                        <div className="treeContainer style2">
                            <SizeMe>
                                {({ width, height }) => (
                                    <Tree
                                        {...mainProps}
                                        width={width}
                                        height={height}
                                        nodeContentComponent={({ node, hasChildren, isExpanded, style, className }) => {
                                            let icon = faTag;
                                            let iconColor = 'red';
                                            if (hasChildren) {
                                                icon = faFolder;
                                                iconColor = 'green';
                                                if (isExpanded) {
                                                    icon = faFolderOpen;
                                                }
                                            }
                                            return (
                                                <div style={style} className={className}>
                                                    <FontAwesomeIcon icon={icon} color={iconColor} /> {node.content}
                                                </div>
                                            );
                                        }}
                                    />
                                )}
                            </SizeMe>
                        </div>
                    </div>

                    <div>
                        <div className="header">No-padding tree</div>
                        <div className="treeContainer style1">
                            <SizeMe>
                                {({ width, height }) => (
                                    <Tree
                                        {...mainProps}
                                        width={width}
                                        height={height}
                                        levelPadding={0}
                                        nodeStyle={({ depth }) => ({
                                            backgroundColor: `rgba(0,0,0,${depth / 5})`,
                                            color: depth > 2 ? '#FFF' : '#000',
                                        })}
                                    />
                                )}
                            </SizeMe>
                        </div>
                    </div>

                    <div>
                        <div className="header">Custom expanders</div>
                        <div className="treeContainer style1">
                            <SizeMe>
                                {({ width, height }) => (
                                    <Tree
                                        {...mainProps}
                                        width={width}
                                        height={height}
                                        nodeExpanderComponent={SimpleExpander}
                                        itemHeight={20}
                                    />
                                )}
                            </SizeMe>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
