import { Mower, createLawn } from "./index";
import type { Lawn } from "./index";

class LawnFactory {
  static generate(maxX: number, maxY: number): Lawn {
    return createLawn(maxX, maxY);
  }
}

describe("Mower", () => {
  let consoleSpy: jest.SpyInstance;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should not move outside the lawn", () => {
    const lawn = LawnFactory.generate(0, 0);
    const mower = new Mower({ x: 0, y: 0 }, "S", lawn);
    mower.execute("FF");

    expect(mower.position).toEqual({ x: 0, y: 0 });
    expect(consoleSpy).toHaveBeenCalledWith("0 0 S");
  });

  it("should mow the entire surface", () => {
    const lawn = LawnFactory.generate(4, 5);
    const mower = new Mower({ x: 0, y: 0 }, "N", lawn);
    mower.execute("FFFFFFRFRFFFFFFLFLFFFFFFRFRFFFFFFLFLFFFFFF");

    expect(mower.position).toEqual({ x: 4, y: 5 });
    expect(mower.lawn).toEqual([
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
    ]);
    expect(consoleSpy).toHaveBeenCalledWith("4 5 N");
  });

  it("should execute a sequence of instructions", () => {
    const lawn = LawnFactory.generate(5, 5);
    const mower1 = new Mower({ x: 1, y: 2 }, "N", lawn);
    mower1.execute("LFLFLFLFF");
    expect(mower1.position).toEqual({ x: 1, y: 3 });
    expect(mower1.direction).toBe("N");
    expect(consoleSpy).toHaveBeenCalledWith("1 3 N");

    const mower2 = new Mower({ x: 3, y: 3 }, "E", lawn);
    mower2.execute("FFRFFRFRRF");
    expect(mower2.position).toEqual({ x: 5, y: 1 });
    expect(mower2.direction).toBe("E");
    expect(consoleSpy).toHaveBeenCalledWith("5 1 E");
  });
});
