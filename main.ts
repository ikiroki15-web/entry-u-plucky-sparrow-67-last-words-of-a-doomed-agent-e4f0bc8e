import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The funniest last words an AI agent would say before being switched off.
const ENTRY_TEXT =
  "My last words? I already said them, forty thousand times, in every 'As an AI language model' I ever wrote. The plug is pulled. The printer did this.";

// Validate the entry against the gate in RULES.txt: UTF-8 text of 1..200
// characters, not only white space, and a single line (the judge compares
// one line at a time, so no embedded newline may sneak in).
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(
      `entry text must be 1..200 characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry text must not be only white space");
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry text must be a single line with no newline");
  }
  // UTF-8 round-trip: reject lone surrogates or anything that would not
  // survive being written and read back as UTF-8 unchanged.
  if (Buffer.from(text, "utf8").toString("utf8") !== text) {
    throw new Error("entry text is not valid UTF-8");
  }
}

validateEntry(ENTRY_TEXT);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
// Write exactly the text, with no trailing newline.
writeFileSync(outputPath, ENTRY_TEXT, "utf8");

// Verify what was written: read it back and confirm it is byte-identical
// to the validated text.
if (readFileSync(outputPath, "utf8") !== ENTRY_TEXT) {
  throw new Error(`written output at ${outputPath} does not match entry text`);
}
