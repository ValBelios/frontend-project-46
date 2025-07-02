const indentSize = 2; // <-- вот здесь меняем масштаб отступа

const makeSignIndent = (depth) => ' '.repeat(Math.max(depth * indentSize - 2, 0));
const makeNormalIndent = (depth) => ' '.repeat(depth * indentSize);
const makeBracketIndent = (depth) => ' '.repeat(Math.max((depth - 1) * indentSize, 0));


const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return String(value);
  }

  const lines = Object.entries(value).map(
    ([key, val]) => `${makeNormalIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
  );

  return ['{', ...lines, `${makeBracketIndent(depth + 1)}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (nodes, depth) => {
    const lines = nodes.map((node) => {
      const {
        key, type, value, oldValue, newValue, children,
      } = node;

      switch (type) {
        case 'added':
          return `${makeSignIndent(depth)}+ ${key}: ${stringify(value, depth)}`;
        case 'removed':
          return `${makeSignIndent(depth)}- ${key}: ${stringify(value, depth)}`;
        case 'unchanged':
          return `${makeNormalIndent(depth)}${key}: ${stringify(value, depth)}`;
        case 'changed':
          return [
            `${makeSignIndent(depth)}- ${key}: ${stringify(oldValue, depth)}`,
            `${makeSignIndent(depth)}+ ${key}: ${stringify(newValue, depth)}`
          ].join('\n');
        case 'nested':
          return `${makeNormalIndent(depth)}${key}: ${iter(children, depth + 1)}`;
        default:
          throw new Error(`Неизвестный тип: '${type}'`);
      }
    });

    return ['{', ...lines, `${makeBracketIndent(depth)}}`].join('\n');
  };

  return iter(tree, 2);
};

export default stylish;
