export const getRandomIndexesMap = (count: number, maxValue?: number) => {
  const indexesMap = new Set();
  while (indexesMap.size < count) {
    const randomIndex = Math.floor(Math.random() * (maxValue || count));
    indexesMap.add(randomIndex);
  }
  return indexesMap;
};
