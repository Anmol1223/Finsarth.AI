
import dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});
import fs from "fs";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
const transactions = JSON.parse(
  fs.readFileSync(
    "./parsed-transactions.json",
    "utf8"
  )
);

function categorize(description) {
  const text = description.toUpperCase();

  if (
    text.includes("SBI CARDS") ||
    text.includes("RBL BANK") ||
    text.includes("CREDIT CARD")
  ) {
    return "Credit Card";
  }

  if (
    text.includes("ZOMATO") ||
    text.includes("SWIGGY")
  ) {
    return "Food";
  }

  if (
    text.includes("AMAZON") ||
    text.includes("FLIPKART")
  ) {
    return "Shopping";
  }

  if (
    text.includes("IRCTC") ||
    text.includes("RAIL")
  ) {
    return "Travel";
  }

  if (
    text.includes("UPI")
  ) {
    return "Transfers";
  }

  return "Other";
}
async function importData() {

    const ACCOUNT_HOLDER =
  "a51b6390-9afb-42e1-86e7-bf7976c31baf";
  const formatted = transactions.map(
    (tx) => ({
      user_id: ACCOUNT_HOLDER,

      date: tx.date
  .split("-")
  .reverse()
  .join("-"),

      amount: tx.amount,

      description: tx.description,

      balance: tx.balance,

      deposit: tx.deposit,

      withdrawal: tx.withdrawal,

      category: categorize(tx.description),

      merchant: tx.merchant,
    })
  );

  const { error } = await supabase
    .from("transactions")
    .insert(formatted);

  if (error) {
    console.error(error);
  } else {
    console.log(
      `Imported ${formatted.length} transactions`
    );
  }
}

importData();