import { Direction } from "../models/direction";
import { Position } from "../models/position";

type MowerDriveData = {
  initialPosition: Position;
  initialDirection: Direction;
  instructions: string;
};

export function parseInput(input: string[]): {
  maxX: number;
  maxY: number;
  mowersDriveData: MowerDriveData[];
} {
  const [maxX, maxY] = input[0].split(" ").map(Number);
  const mowersDriveData: MowerDriveData[] = [];

  for (let i = 1; i < input.length; i += 2) {
    const [x, y, direction] = input[i].split(" ");
    mowersDriveData.push({
      initialPosition: { x: Number(x), y: Number(y) } as Position,
      initialDirection: direction as Direction,
      instructions: input[i + 1],
    });
  }

  return { maxX, maxY, mowersDriveData };
}
