export const getRandomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Функция генерирует {count} случайных уникальных чисел в диапазоне от 0..{maxValue}
 * @param {Number} count
 * @param {Number} maxValue
 * @return {Array} Массив случайных уникальных чисел
*/
export const generateRandomUniqueNumbers = (count = 3, minValue = 0, maxValue = 10): number[] => {
  const result = [];

  while(result.length < count) {
    const random = getRandomNumber(minValue, maxValue);
    const foundIndex = result.findIndex((current) => current === random);

    if(foundIndex === -1) {
      result.push(random);
    }
  }

  return result;
};

export function getRandomItem<T>(items: T[]): T {
  const randomNumer = getRandomNumber(0, items.length - 1);
  return items[randomNumer];
}

export function getRandomItems<T>(items: T[]): T[] {
  if(items.length === 0) {
    return [];
  }

  if(items.length === 1) {
    return items;
  }

  const randomCount = getRandomNumber(1, items.length);
  const randomUniqueNumbers = generateRandomUniqueNumbers(randomCount, 0, items.length - 1);
  return randomUniqueNumbers.map((number) => items[number]);
}
