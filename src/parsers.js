const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    default:
      throw new Error(`Неизвестный формат: ${format}`);
  }
};

export default parse;
