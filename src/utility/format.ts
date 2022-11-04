export const trimName = (name: string, length: number): string =>
  name.length > length ? `${name.substring(0, length - 2)}...` : name;
