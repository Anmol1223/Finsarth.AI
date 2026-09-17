import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

async function test() {
  const pdfPath =
    "./canara_epassbook_2026-04-05 18_23_56.211343.pdf";

  const data = new Uint8Array(
    fs.readFileSync(pdfPath)
  );

  const pdf = await pdfjsLib.getDocument({
    data,
  }).promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const content =
      await page.getTextContent();

    text += content.items
      .map((item) => item.str)
      .join(" ");
  }

  console.log(text);
  const matches = text.match(/\d{2}-\d{2}-\d{4}/g);

console.log("DATES FOUND:");
console.log(matches);
const transactions = [];

const transactionRegex =
  /(\d{2}-\d{2}-\d{4})/g;

let match;

while ((match = transactionRegex.exec(text)) !== null) {
  transactions.push({
    date: match[1],
  });
}

console.log("TRANSACTIONS:");
console.log(transactions.slice(0, 10));
const lines = text
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean);

console.log("FIRST 100 LINES");
console.log(lines.slice(0, 100));
const upiMatches = text.match(
  /\d{2}-\d{2}-\d{4}[\s\S]*?(?=\d{2}-\d{2}-\d{4}|$)/g
);

const parsedTransactions = upiMatches.map(
  (item) => {
    const dateMatch =
      item.match(/\d{2}-\d{2}-\d{4}/);

    const amountMatches =
      item.match(/[\d,]+\.\d{2}/g);

const description = item
  .replace(dateMatch?.[0] || "", "")
  .replace(
    amountMatches?.[
      amountMatches.length - 2
    ] || "",
    ""
  )
  .replace(
    amountMatches?.[
      amountMatches.length - 1
    ] || "",
    ""
  )
  .replace(
  /page\s+\d+Date\s+Particulars\s+Deposits\s+Withdrawals\s+Balance/gi,
  ""
)
  .trim();

return {
  date: dateMatch?.[0] || "",

  amount: Number(
    (
      amountMatches?.[
        amountMatches.length - 2
      ] || "0"
    ).replace(/,/g, "")
  ),

  balance: Number(
    (
      amountMatches?.[
        amountMatches.length - 1
      ] || "0"
    ).replace(/,/g, "")
  ),

  type: item.includes("UPI/CR/")
    ? "CREDIT"
    : item.includes("UPI/DR/")
    ? "DEBIT"
    : "OTHER",

  deposit: item.includes("UPI/CR/")
    ? Number(
        (
          amountMatches?.[
            amountMatches.length - 2
          ] || "0"
        ).replace(/,/g, "")
      )
    : 0,

  withdrawal: item.includes("UPI/DR/")
    ? Number(
        (
          amountMatches?.[
            amountMatches.length - 2
          ] || "0"
        ).replace(/,/g, "")
      )
    : 0,

 category: "Uncategorized",

merchant: (() => {
  if (description.includes("/")) {
    const parts = description.split("/");

    if (parts.length > 3) {
      return parts[3].trim();
    }
  }

  return description
    .split(" ")
    .slice(0, 4)
    .join(" ");
})(),
description,
};
  });

console.log("PARSED:");
console.log(parsedTransactions);
fs.writeFileSync(
  "parsed-transactions.json",
  JSON.stringify(
    parsedTransactions,
    null,
    2
  )
);

console.log(
  "JSON FILE CREATED"
);
}

test();
