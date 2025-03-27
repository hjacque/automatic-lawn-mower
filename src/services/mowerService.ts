import { CARDINAL_DIRECTIONS } from "../constants";
import { Direction } from "../models/direction";
import { GrassState } from "../models/lawn";
import { Mower } from "../models/mower";

const movements: Record<Direction, { mx: number; my: number }> = {
  N: { mx: 0, my: 1 },
  E: { mx: 1, my: 0 },
  S: { mx: 0, my: -1 },
  W: { mx: -1, my: 0 },
};

export class MowerService {
  static execute(mower: Mower, instructions: string): void {
    for (const instruction of instructions) {
      switch (instruction) {
        case "L":
          this.turnLeft(mower);
          break;
        case "R":
          this.turnRight(mower);
          break;
        case "F":
          this.moveForward(mower);
          break;
        default:
          console.error("Invalid instruction", instruction);
          break;
      }
    }
    console.log(`${mower.position.x} ${mower.position.y} ${mower.direction}`);
  }

  private static turnLeft(mower: Mower): void {
    const currentIndex = CARDINAL_DIRECTIONS.indexOf(mower.direction);
    mower.direction = CARDINAL_DIRECTIONS[(currentIndex + 3) % 4];
  }

  private static turnRight(mower: Mower): void {
    const currentIndex = CARDINAL_DIRECTIONS.indexOf(mower.direction);
    mower.direction = CARDINAL_DIRECTIONS[(currentIndex + 1) % 4];
  }

  private static moveForward(mower: Mower): void {
    const { mx, my } = movements[mower.direction];

    if (mx) {
      const newX = mower.position.x + mx;
      if (
        newX >= 0 &&
        newX < mower.lawn[mower.lawn.length - mower.position.y - 1].length
      ) {
        mower.position.x = newX;
        mower.lawn[mower.lawn.length - mower.position.y - 1][mower.position.x] =
          GrassState.Mowed;
      }
    } else if (my) {
      const newY = mower.position.y + my;
      if (newY >= 0 && newY < mower.lawn.length) {
        mower.position.y = newY;
        mower.lawn[mower.lawn.length - mower.position.y - 1][mower.position.x] =
          GrassState.Mowed;
      }
    }
  }
}
