import {
  capitalize,
  generateRollArray,
  getDieForIngredientCount,
} from "@/utils/utils";

describe("Utils Functions", () => {
  describe("capitalize", () => {
    it("capitalizes the first letter of a string", () => {
      expect(capitalize("hello")).toBe("Hello");
      expect(capitalize("world")).toBe("World");
    });

    it("handles empty string", () => {
      expect(capitalize("")).toBe("");
    });

    it("handles single character", () => {
      expect(capitalize("a")).toBe("A");
    });

    it("handles already capitalized string", () => {
      expect(capitalize("Hello")).toBe("Hello");
    });
  });

  describe("generateRollArray", () => {
    it("generates an array of numbers starting from 1", () => {
      expect(generateRollArray(3)).toEqual([1, 2, 3]);
      expect(generateRollArray(5)).toEqual([1, 2, 3, 4, 5]);
    });

    it("handles zero count", () => {
      expect(generateRollArray(0)).toEqual([]);
    });

    it("handles single count", () => {
      expect(generateRollArray(1)).toEqual([1]);
    });
  });

  describe("getDieForIngredientCount", () => {
    it("returns correct die value for different ingredient counts", () => {
      // 5 or less = d4
      expect(getDieForIngredientCount(1)).toBe(4);
      expect(getDieForIngredientCount(5)).toBe(4);

      // 6-7 = d6
      expect(getDieForIngredientCount(6)).toBe(6);
      expect(getDieForIngredientCount(7)).toBe(6);

      // 8-9 = d8
      expect(getDieForIngredientCount(8)).toBe(8);
      expect(getDieForIngredientCount(9)).toBe(8);

      // 10-11 = d10
      expect(getDieForIngredientCount(10)).toBe(10);
      expect(getDieForIngredientCount(11)).toBe(10);

      // 12-19 = d12
      expect(getDieForIngredientCount(12)).toBe(12);
      expect(getDieForIngredientCount(19)).toBe(12);

      // 20+ = d20
      expect(getDieForIngredientCount(20)).toBe(20);
      expect(getDieForIngredientCount(25)).toBe(20);
    });
  });
});
