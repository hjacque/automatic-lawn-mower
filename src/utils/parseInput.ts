import { Direction } from "../models/direction";
import { Position } from "../models/position";

export type MowerDriveData = {
  initialPosition: Position;
  initialDirection: Direction;
  instructions: string;
};

export function parseInput(lines: string[]): {
  maxX: number;
  maxY: number;
  mowersDriveData: MowerDriveData[];
} {
  if (lines.length < 3 || lines.length % 2 === 0) {
    throw new Error(
      "Invalid input: must have an odd number of lines (at least 3).",
    );
  }

  if (!lines[0].match(/^[1-9][0-9]* [1-9][0-9]*$/)) {
    throw new Error(
      "Invalid lawn size: the first line must contain two non-negative numbers.",
    );
  }
  const [maxX, maxY] = lines[0].split(" ").map(Number);

  const mowersDriveData: MowerDriveData[] = [];

  for (let i = 1; i < lines.length; i += 2) {
    const positionParts = lines[i].split(" ");
    if (positionParts.length !== 3) {
      throw new Error(
        `Invalid mower position format at line ${i + 1}. Expected: "X Y D".`,
      );
    }

    const [xStr, yStr, direction] = positionParts;
    const x = Number(xStr),
      y = Number(yStr);
    if (isNaN(x) || isNaN(y) || x < 0 || y < 0 || x > maxX || y > maxY) {
      throw new Error(
        `Invalid mower position at line ${i + 1}: "${lines[i]}". ` +
          `Position must be within (0,0) to (${maxX},${maxY}).`,
      );
    }
    if (!direction.match(/^[NESW]$/)) {
      throw new Error(
        `Invalid mower direction at line ${i + 1}: "${lines[i]}". ` +
          `Direction must be N, E, S, or W.`,
      );
    }

    const instructions = lines[i + 1];
    if (!instructions.match(/^[LRF]+$/)) {
      throw new Error(
        `Invalid instruction sequence at line ${i + 2}: "${instructions}". Allowed: "L", "R", "F".`,
      );
    }

    mowersDriveData.push({
      initialPosition: { x, y } as Position,
      initialDirection: direction as Direction,
      instructions,
    });
  }

  return { maxX, maxY, mowersDriveData };
}
