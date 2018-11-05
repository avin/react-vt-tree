import faker from 'faker';
import shortid from 'shortid';

function generateNodes(depth, parentId) {
    let items = {};
    for (let i = 0; i < faker.random.number({ min: 5, max: 7 }); i += 1) {
        const id = shortid.generate();
        items[id] = {
            id,
            content: faker.random.word(),
            parentId,
        };
        if (depth < 3) {
            items = { ...items, ...generateNodes(depth + 1, id) };
        }
    }
    return items;
}

const nodes = generateNodes(0);
for (let node of Object.keys(nodes)) {
    if (node.parentId) {
        nodes[node.parentId].childIds = nodes[node.parentId].childIds || [];
        nodes[node.parentId].childIds.push(node.id);
    }
}
export default nodes;
