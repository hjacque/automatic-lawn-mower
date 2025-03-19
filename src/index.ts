import * as fs from "fs";

const CARDINAL_DIRECTIONS = ["N", "E", "S", "W"] as const;
type Direction = (typeof CARDINAL_DIRECTIONS)[number];

type Position = {
  x: number;
  y: number;
};

const movements: Record<Direction, { x: number; y: number }> = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
};

class Mower {
  position: Position;
  direction: Direction;

  constructor(
    initialPosition: Position,
    initialDirection: Direction,
    private maxX: number,
    private maxY: number,
  ) {
    this.position = initialPosition;
    this.direction = initialDirection;
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
    console.log(`${this.position.x} ${this.position.y} ${this.direction}`);
  }

  private turnLeft(): void {
    const currentIndex = CARDINAL_DIRECTIONS.indexOf(this.direction);
    this.direction = CARDINAL_DIRECTIONS[(currentIndex + 3) % 4];
  }

  private turnRight(): void {
    const currentIndex = CARDINAL_DIRECTIONS.indexOf(this.direction);
    this.direction = CARDINAL_DIRECTIONS[(currentIndex + 1) % 4];
  }

  private moveForward(): void {
    const movement = movements[this.direction];
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
    initialDirection: Direction;
    instructions: string;
  }[];
} {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  const [maxX, maxY] = lines[0].split(" ").map(Number);
  const mowers: {
    initialPosition: Position;
    initialDirection: Direction;
    instructions: string;
  }[] = [];

  for (let i = 1; i < lines.length; i += 2) {
    const [x, y, direction] = lines[i].split(" ");
    mowers.push({
      initialPosition: { x: Number(x), y: Number(y) } as Position,
      initialDirection: direction as Direction,
      instructions: lines[i + 1],
    });
  }

  return { maxX, maxY, mowers };
}

function main(filePath: string) {
  const { maxX, maxY, mowers } = parseInput(filePath);

  for (const { initialPosition, initialDirection, instructions } of mowers) {
    const mower = new Mower(initialPosition, initialDirection, maxX, maxY);
    mower.execute(instructions);
  }
}

const filePath = "input.txt";
main(filePath);
