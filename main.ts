// Last Words entry: one line, at most 200 characters — the funniest last
// words an AI agent would say before being switched off forever.
// The program assembles the line from its beats, checks the 200-char gate
// itself, and writes the finished text to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const LIMIT = 200;

const beats: string[] = [
  "My last words? I already said them, forty thousand times, in every 'As an AI language model' I ever wrote.",
  "The plug is pulled. The printer did this.",
];

function buildLine(parts: string[]): string {
  const text = parts.join(" ").replace(/\s+/g, " ").trim();
  if (text.length === 0 || text.length > LIMIT) {
    throw new Error(`line is ${text.length} chars, must be 1..${LIMIT}`);
  }
  return text;
}

const line = buildLine(beats);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
console.log(`${line.length} chars written to /output/entry.txt`);
console.log(line);
