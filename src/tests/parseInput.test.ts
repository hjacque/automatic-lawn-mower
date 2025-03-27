import { parseInput } from "../utils/parseInput";

describe("parseInput", () => {
  it("should parse valid input correctly", () => {
    const input = ["5 5", "1 2 N", "LFLFLFLFF", "3 3 E", "FFRFFRFRRF"];

    expect(parseInput(input)).toEqual({
      maxX: 5,
      maxY: 5,
      mowersDriveData: [
        {
          initialPosition: { x: 1, y: 2 },
          initialDirection: "N",
          instructions: "LFLFLFLFF",
        },
        {
          initialPosition: { x: 3, y: 3 },
          initialDirection: "E",
          instructions: "FFRFFRFRRF",
        },
      ],
    });
  });

  it("should throw error for insufficient number of lines", () => {
    expect(() => parseInput([])).toThrow(
      "Invalid input: must have an odd number of lines (at least 3).",
    );
  });

  it("should throw error for invalid number of lines", () => {
    expect(() => parseInput(["5 5", "1 2 N", "LFLFLFLFF", "3 3 E"])).toThrow(
      "Invalid input: must have an odd number of lines (at least 3).",
    );
  });

  it("should throw error for invalid lawn size", () => {
    expect(() => parseInput(["A B", "1 2 N", "LFLFLFLFF"])).toThrow(
      "Invalid lawn size: the first line must contain two non-negative numbers.",
    );
  });

  it("should throw error for invalid mower position", () => {
    expect(() => parseInput(["5 5", "A 2 N 3", "LFLFLFLFF"])).toThrow(
      'Invalid mower position format at line 2. Expected: "X Y D"',
    );
  });

  it("should throw error for invalid mower position when outside of lawn surface", () => {
    expect(() => parseInput(["5 5", "8 4 N", "LFLFLFLFF"])).toThrow(
      `Invalid mower position at line 2: "8 4 N". ` +
        `Position must be within (0,0) to (5,5).`,
    );
  });

  it("should throw error for invalid mower direction", () => {
    expect(() => parseInput(["5 5", "5 5 T", "LFLFLFLFF"])).toThrow(
      `Invalid mower direction at line 2: "5 5 T". ` +
        `Direction must be N, E, S, or W.`,
    );
  });

  it("should throw error for invalid instructions", () => {
    expect(() => parseInput(["5 5", "1 2 N", "XFLFLFLFF"])).toThrow(
      `Invalid instruction sequence at line 3: "XFLFLFLFF". Allowed: "L", "R", "F".`,
    );
  });
});
