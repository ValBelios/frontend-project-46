const indent = (depth, replacer = ' ', spacesCount = 4) => {
  const count = depth * spacesCount - 2;
  return replacer.repeat(Math.max(count, 0));
};

const makeIndent = (depth) => indent(depth);
const makeBracketIndent = (depth) => indent(depth - 1);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${makeIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`
  );

  return ['{', ...lines, `${makeBracketIndent(depth + 1)}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (nodes, depth) => {
    const lines = nodes.map((node) => {
      const [key, data] = Object.entries(node)[0];
      const { operation, value, prevValue } = data;

      switch (operation) {
        case 'added':
          return `${makeIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'removed':
          return `${makeIndent(depth)}- ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${makeIndent(depth)}  ${key}: ${stringify(value, depth)}`;
        case 'updated':
          return [
            `${makeIndent(depth)}- ${key}: ${stringify(prevValue, depth)}`,
            `${makeIndent(depth)}+ ${key}: ${stringify(value, depth)}`
          ].join('\n');
        case 'nested':
          return `${makeIndent(depth)}  ${key}: ${iter(value, depth + 1)}`;
        default:
          throw new Error(`Неизвестный тип операции: '${operation}'`);
      }
    });

    return ['{', ...lines, `${makeBracketIndent(depth)}}`].join('\n');
  };

  return iter(tree, 1);
};

export default stylish;
