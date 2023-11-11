export function getValueArrayFromEnum<V, E extends Record<string, V>>(enm: E): Array<V> {
  return Object.values(enm);
}

export function getKeyArrayFromEnum<E extends Record<string, string>>(enm: E): Array<keyof E> {
  return Object.keys(enm) as (keyof E)[];
}
