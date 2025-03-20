import { Mower } from "./index";

describe("Mower", () => {
  let consoleSpy: jest.SpyInstance;
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it("should not move outside the lawn", () => {
    const mower = new Mower({ x: 0, y: 0 }, "S", 1, 1);
    mower.execute("FF");

    expect(mower.position).toEqual({ x: 0, y: 0 });
    expect(consoleSpy).toHaveBeenCalledWith("0 0 S");
  });

  it("should execute a sequence of instructions", () => {
    const mower1 = new Mower({ x: 1, y: 2 }, "N", 5, 5);
    mower1.execute("LFLFLFLFF");
    expect(mower1.position).toEqual({ x: 1, y: 3 });
    expect(mower1.direction).toBe("N");
    expect(consoleSpy).toHaveBeenCalledWith("1 3 N");

    const mower2 = new Mower({ x: 3, y: 3 }, "E", 5, 5);
    mower2.execute("FFRFFRFRRF");
    expect(mower2.position).toEqual({ x: 5, y: 1 });
    expect(mower2.direction).toBe("E");
    expect(consoleSpy).toHaveBeenCalledWith("5 1 E");
  });
});

