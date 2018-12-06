let nounce = 1;
function generateNodes(depth, parentId) {
    let nodes = [];
    for (let i = 0; i < 10; i += 1) {
        const id = 'i' + nounce;
        nodes.push({
            id,
            content: `Node ${nounce++}`,
            parentId,
        });
        if (depth < 3 && i < 8) {
            nodes = nodes.concat(generateNodes(depth + 1, id));
        }
    }
    return nodes;
}

const nodes = generateNodes(0);

const nodesIndexes = {};
nodes.forEach((node, idx) => {
    nodesIndexes[node.id] = idx;
});

for (let node of nodes) {
    if (node.parentId) {
        nodes[nodesIndexes[node.parentId]].childIds = nodes[nodesIndexes[node.parentId]].childIds || [];
        nodes[nodesIndexes[node.parentId]].childIds.push(node.id);
    }
}
export default { nodes, nodesIndexes };

