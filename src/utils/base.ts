export function keys<O>(o: O) {
  return Object.keys(o) as (keyof O)[];
}

export function values<O>(o: O) {
  return (Object.keys(o) as (keyof O)[]).map(key => o[key]);
}
