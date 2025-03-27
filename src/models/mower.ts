import { Direction } from "./direction";
import { GrassState, Lawn } from "./lawn";
import { Position } from "./position";

export class Mower {
  position: Position;
  direction: Direction;
  lawn: Lawn;

  constructor(
    initialPosition: Position,
    initialDirection: Direction,
    lawn: Lawn,
  ) {
    this.position = initialPosition;
    this.direction = initialDirection;
    this.lawn = lawn;
    this.lawn[this.lawn.length - this.position.y - 1][this.position.x] =
      GrassState.Mowed;
  }
}
