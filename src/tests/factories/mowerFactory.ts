import { Direction } from "../../models/direction";
import type { Lawn } from "../../models/lawn";
import { Mower } from "../../models/mower";
import { Position } from "../../models/position";

export class MowerFactory {
  static generate(
    initialPosition: Position,
    initialDirection: Direction,
    lawn: Lawn,
  ): Mower {
    return new Mower(initialPosition, initialDirection, lawn);
  }
}
