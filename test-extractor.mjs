import fs from "fs";
import { extractPdfText } from "./lib/parsers/extractPdfText.ts";

const buffer = new Uint8Array(
  fs.readFileSync(
    "./canara_epassbook_2026-04-05 18_23_56.211343.pdf"
  )
);

const text = await extractPdfText(buffer);

console.log(text.slice(0, 500));