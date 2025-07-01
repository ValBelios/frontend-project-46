const formatValue = (value) => {
  if (typeof value === 'object' && value !== null) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const plain = (tree, parent = '') => {
  const lines = tree.flatMap((node) => {
    const property = parent ? `${parent}.${node.key}` : node.key;
    switch (node.type) {
      case 'added':
        return `Property '${property}' was added with value: ${formatValue(node.value)}`;
      case 'removed':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
      case 'nested':
        return plain(node.children, property);
      default:
        return [];
    }
  });

  return lines.join('\n');
};

export default plain;
