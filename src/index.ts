import * as fs from "fs";

const orientation = ["N", "E", "S", "W"] as const;
type Orientation = (typeof orientation)[number];

type Position = {
  x: number;
  y: number;
};

const MOVEMENTS: Record<Orientation, { x: number; y: number }> = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

class Mower {
  position: Position;
  orientation: Orientation;

  constructor(
    initialPosition: Position,
    initialOrientation: Orientation,
    private maxX: number,
    private maxY: number,
  ) {
    this.position = initialPosition;
    this.orientation = initialOrientation;
  }

  execute(instructions: string): void {
    for (const instruction of instructions) {
      if (instruction === "L") {
        this.turnLeft();
      } else if (instruction === "R") {
        this.turnRight();
      } else if (instruction === "F") {
        this.moveForward();
      }
    }
    console.log(`${this.position.x} ${this.position.y} ${this.orientation}`);
  }

  private turnLeft(): void {
    const currentIndex = orientation.indexOf(this.orientation);
    this.orientation = orientation[(currentIndex + 3) % 4];
  }

  private turnRight(): void {
    const currentIndex = orientation.indexOf(this.orientation);
    this.orientation = orientation[(currentIndex + 1) % 4];
  }

  private moveForward(): void {
    const movement = MOVEMENTS[this.orientation];
    const newX = this.position.x + movement.x;
    const newY = this.position.y + movement.y;

    if (newX >= 0 && newX <= this.maxX && newY >= 0 && newY <= this.maxY) {
      this.position.x = newX;
      this.position.y = newY;
    }
  }
}

function parseInput(filePath: string): {
  maxX: number;
  maxY: number;
  mowers: {
    initialPosition: Position;
    initialOrientation: Orientation;
    instructions: string;
  }[];
} {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  const [maxX, maxY] = lines[0].split(" ").map(Number);
  const mowers: {
    initialPosition: Position;
    initialOrientation: Orientation;
    instructions: string;
  }[] = [];

  for (let i = 1; i < lines.length; i += 2) {
    const [x, y, orientation] = lines[i].split(" ");
    mowers.push({
      initialPosition: { x: Number(x), y: Number(y) } as Position,
      initialOrientation: orientation as Orientation,
      instructions: lines[i + 1],
    });
  }

  return { maxX, maxY, mowers };
}

function main(filePath: string) {
  const { maxX, maxY, mowers } = parseInput(filePath);

  for (const { initialPosition, initialOrientation, instructions } of mowers) {
    const mower = new Mower(initialPosition, initialOrientation, maxX, maxY);
    mower.execute(instructions);
  }
}

const filePath = "input.txt";
main(filePath);

// 5 5
// 1 2 N
// LFLFLFLFF
// 3 3 E
// FFRFFRFRRF

// expect
// 1 3 N
// 5 1 E
