let nounce = 1;
function generateNodes(depth) {
    let items = [];
    for (let i = 0; i < 32; i += 1) {
        const id = String(nounce);
        items.push({
            id,
            content: nounce++,
            children: depth < 3 && generateNodes(depth + 1, id),
        });
    }
    return items;
}

const nodes = generateNodes(0);

export const count = nounce - 1;
export default nodes;
