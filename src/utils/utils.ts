export const capitalize = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const generateRollArray = (count: number) => {
  return Array.from({ length: count }, (_, i) => i + 1);
};

export const getDieForIngredientCount = (count: number): number => {
  if (count <= 5) return 4;
  if (count <= 7) return 6;
  if (count <= 9) return 8;
  if (count <= 11) return 10;
  if (count <= 19) return 12;
  return 20;
};
