import { Area } from '../types/types';

export default (arr: Area[], select: keyof Area) => {
  if (!arr || !arr.length) return [];
  return arr
    .map((area) => ({
      label: area[select],
      value: area[select],
    }))
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.label === value.label && t.label)
    );
};
