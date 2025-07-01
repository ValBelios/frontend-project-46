const indent = (depth, replacer = ' ', spacesCount = 4) => {
  const count = depth * spacesCount - 2;
  return replacer.repeat(Math.max(count, 0));
};

const makeIndent = (depth) => indent(depth);
const makeBracketIndent = (depth) => indent(depth - 1);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) return String(value);

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${makeIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`);

  return ['{', ...lines, `${makeBracketIndent(depth + 1)}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (node, depth) => {
    const lines = node.map((item) => {
      switch (item.type) {
        case 'added':
          return `${makeIndent(depth)}+ ${item.key}: ${stringify(item.value, depth)}`;
        case 'removed':
          return `${makeIndent(depth)}- ${item.key}: ${stringify(item.value, depth)}`;
        case 'unchanged':
          return `${makeIndent(depth)}  ${item.key}: ${stringify(item.value, depth)}`;
        case 'changed':
          return [
            `${makeIndent(depth)}- ${item.key}: ${stringify(item.oldValue, depth)}`,
            `${makeIndent(depth)}+ ${item.key}: ${stringify(item.newValue, depth)}`
          ].join('\n');
        case 'nested':
          return `${makeIndent(depth)}  ${item.key}: ${iter(item.children, depth + 1)}`;
        default:
          throw new Error(`Неизвестный тип: ${item.type}`);
      }
    });

    return ['{', ...lines, `${makeBracketIndent(depth)}}`].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;
