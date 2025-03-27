import { createLawn } from "./models/lawn";
import { Mower } from "./models/mower";
import { MowerService } from "./services/mowerService";
import { parseInput } from "./utils/parseInput";
import { readFileContent } from "./utils/readFileContent";

function main() {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Usage: npm start -- <input_file>");
    process.exit(1);
  }

  const input = readFileContent(filePath);
  const { maxX, maxY, mowersDriveData } = parseInput(input);
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
