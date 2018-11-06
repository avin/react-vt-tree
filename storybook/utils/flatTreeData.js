let nounce = 1;
function generateNodes(depth, parentId) {
    let items = [];
    for (let i = 0; i < 10; i += 1) {
        const id = String(nounce);
        items.push({
            id,
            content: `Item ${nounce++}`,
            parentId,
        });
        if (depth < 3) {
            items = [...items, ...generateNodes(depth + 1, id)];
        }
    }
    return items;
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
