/**
 * Наивная реализация глубокого копирования объекта.
 *
 * @param value копируемый объект
 */
export function cloneDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
