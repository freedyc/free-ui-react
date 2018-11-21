function groupBy(array, attr) {
    return array.reduce((ret, item) => {
        const attrValue = item[attr];
        ret[attrValue] = ret[attrValue] || [];
        ret[attrValue].push(item);
        return ret;
    }, {});
}

const defaultOptions = {
    rootId: '',
    idAttr: 'id',
    textAttr: 'name',
    parentAttr: 'parentId'
}

function buildTree( parentId, groups, options) {
    options = Object.assign({}, defaultOptions, options);
    return (groups[parentId] || []).reduce((ret, item) => {
        item = Object.assign({}, item, {
            id: item[options.idAttr],
            text: item[options.textAttr]
        });

        const children = buildTree(item.id, groups, options);
        if (children.length > 0) item.children = children;
        return ret.concat(item);
    }, []);
}

function arrayToTree (array, options) {
    options = Object.assign({}, defaultOptions, options);
    return buildTree(options.rootId, groupBy(array, options.parentAttr), options);
}

function findChild (tree, fun) {
    if (!tree) return;
    tree = tree.children || tree;
    if (!Array.isArray(tree)) return;

    for (const node of tree) {
        let ret = fun(node);
        if (ret) {
            return node;
        } else if((ret = findChild(node.children, fun))) {
            return ret;
        }
    }
}

export default {
    findChild,
    arrayToTree,
}