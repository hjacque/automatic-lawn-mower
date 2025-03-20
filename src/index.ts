import * as fs from "fs";

const CARDINAL_DIRECTIONS = ["N", "E", "S", "W"] as const;
type Direction = (typeof CARDINAL_DIRECTIONS)[number];

type Position = {
  x: number;
  y: number;
};

const movements: Record<Direction, { mx: number; my: number }> = {
  N: { mx: 0, my: 1 },
  E: { mx: 1, my: 0 },
  S: { mx: 0, my: -1 },
  W: { mx: -1, my: 0 },
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
      switch (instruction) {
        case "L":
          this.turnLeft();
          break;
        case "R":
          this.turnRight();
          break;
        case "F":
          this.moveForward();
          break;
        default:
          console.error("Invalid instruction", instruction);
          break;
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
    const { mx, my } = movements[this.direction];

    if (mx) {
      const newX = this.position.x + mx;
      if (newX >= 0 && newX <= this.maxX) {
        this.position.x = newX;
      }
    } else if (my) {
      const newY = this.position.y + my;
      if (newY >= 0 && newY <= this.maxY) {
        this.position.y = newY;
      }
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
