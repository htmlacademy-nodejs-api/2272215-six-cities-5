export function getValueArrayFromEnum<V, E extends Record<string, V>>(enm: E): Array<V> {
  return Object.values(enm);
}
