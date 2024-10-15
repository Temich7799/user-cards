export const getRandomIndexesMap = (count: number) => {
  const indexesMap = new Map<number, number>();
  while (indexesMap.size < count) {
    const randomIndex = Math.floor(Math.random() * count);
    indexesMap.set(randomIndex, randomIndex);
  }
  return indexesMap;
};
