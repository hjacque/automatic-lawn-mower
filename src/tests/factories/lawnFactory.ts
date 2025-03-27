import { createLawn } from "../../models/lawn";
import type { Lawn } from "../../models/lawn";

export class LawnFactory {
  static generate(maxX: number, maxY: number): Lawn {
    return createLawn(maxX, maxY);
  }
}
