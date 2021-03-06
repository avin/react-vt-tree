import * as Immutable from 'immutable';

let nounce = 1;
function generateNodes(depth, parentId) {
    let nodes = new Immutable.List();
    for (let i = 0; i < 10; i += 1) {
        const id = 'i' + nounce;
        nodes = nodes.push(
            new Immutable.Map({
                id,
                content: `Node ${nounce++}`,
                parentId,
            })
        );
        if (depth < 3) {
            nodes = nodes.concat(generateNodes(depth + 1, id));
        }
    }
    return nodes;
}

let nodes = generateNodes(0);

const nodesIndexes = {};
nodes.forEach((node, idx) => {
    nodesIndexes[node.get('id')] = idx;
});

for (const node of nodes) {
    if (node.get('parentId')) {
        let childIds = nodes.getIn([nodesIndexes[node.get('parentId')], 'childIds'], new Immutable.List());
        childIds = childIds.push(node.get('id'));

        nodes = nodes.setIn([nodesIndexes[node.get('parentId')], 'childIds'], childIds);
    }
}
export default { nodes, nodesIndexes };
