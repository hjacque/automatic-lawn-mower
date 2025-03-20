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

export class Mower {
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

function readFileContent(filePath: string): string[] {
  const lines = fs.readFileSync(filePath, "utf-8").split("\n");
  return lines;
}

type MowerDriveData = {
  initialPosition: Position;
  initialDirection: Direction;
  instructions: string;
};

function parseInput(input: string[]): {
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

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: npm start -- <input_file>");
    process.exit(1);
  }

  const input = readFileContent(filePath);
  const { maxX, maxY, mowersDriveData } = parseInput(input);

  for (const { initialPosition, initialDirection, instructions } of mowersDriveData) {
    const mower = new Mower(initialPosition, initialDirection, maxX, maxY);
    mower.execute(instructions);
  }
}

if (require.main === module) {
  main();
}
