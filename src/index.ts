import { createLawn } from "./models/lawn";
import { Mower } from "./models/mower";
import { MowerService } from "./services/mowerService";
import { parseInput } from "./utils/parseInput";
import type { MowerDriveData } from "./utils/parseInput";
import { readFileContent } from "./utils/readFileContent";

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: npm start -- <input_file>");
    process.exit(1);
  }

  let input: string[];
  try {
    input = readFileContent(filePath);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  let maxX: number, maxY: number, mowersDriveData: MowerDriveData[];
  try {
    ({ maxX, maxY, mowersDriveData } = parseInput(input));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  const lawn = createLawn(maxX, maxY);

  for (const {
    initialPosition,
    initialDirection,
    instructions,
  } of mowersDriveData) {
    const mower = new Mower(initialPosition, initialDirection, lawn);
    MowerService.execute(mower, instructions);
  }
}

main();
