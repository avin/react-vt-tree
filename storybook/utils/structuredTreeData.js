let nounce = 1;
function generateNodes(depth) {
    let nodes = [];
    for (let i = 0; i < 10; i += 1) {
        const id = String(nounce);
        nodes.push({
            id,
            content: `Item ${nounce++}`,
            children: depth < 3 && generateNodes(depth + 1, id),
        });
    }
    return nodes;
}

const nodes = generateNodes(0);

export const count = nounce - 1;
export default nodes;
