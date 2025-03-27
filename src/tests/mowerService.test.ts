import { LawnFactory } from "./factories/lawnFactory";
import { MowerFactory } from "./factories/mowerFactory";
import { MowerService } from "../services/mowerService";

describe("MowerService", () => {
  let consoleSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it("should not move outside the lawn", () => {
    const lawn = LawnFactory.generate(0, 0);
    const mower = MowerFactory.generate({ x: 0, y: 0 }, "S", lawn);
    MowerService.execute(mower, "FF");

    expect(mower.position).toEqual({ x: 0, y: 0 });
    expect(consoleSpy).toHaveBeenCalledWith("0 0 S");
  });

  it("should log error invalid instructions", () => {
    const lawn = LawnFactory.generate(0, 0);
    const mower = MowerFactory.generate({ x: 0, y: 0 }, "S", lawn);
    MowerService.execute(mower, "I");

    expect(mower.position).toEqual({ x: 0, y: 0 });
    expect(consoleErrorSpy).toHaveBeenCalledWith("Invalid instruction", "I");
  });

  it("should mow the entire surface", () => {
    const lawn = LawnFactory.generate(4, 5);
    const mower = MowerFactory.generate({ x: 0, y: 0 }, "N", lawn);
    MowerService.execute(mower, "FFFFFRFRFFFFFLFLFFFFFRFRFFFFFLFLFFFFF");

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
    const mower1 = MowerFactory.generate({ x: 1, y: 2 }, "N", lawn);
    MowerService.execute(mower1, "LFLFLFLFF");
    expect(mower1.position).toEqual({ x: 1, y: 3 });
    expect(mower1.direction).toBe("N");
    expect(consoleSpy).toHaveBeenCalledWith("1 3 N");

    const mower2 = MowerFactory.generate({ x: 3, y: 3 }, "E", lawn);
    MowerService.execute(mower2, "FFRFFRFRRF");
    expect(mower2.position).toEqual({ x: 5, y: 1 });
    expect(mower2.direction).toBe("E");
    expect(consoleSpy).toHaveBeenCalledWith("5 1 E");
  });
});
