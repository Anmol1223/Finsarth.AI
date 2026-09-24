import { supabase } from "@/lib/supabase";
import { parseCanaraStatement } from "@/lib/parsers/canara";
import { NextResponse } from "next/server";
import { extractPdfText } from "@/lib/parsers/extractPdfText";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;
    const userId =
  formData.get("user_id") as string;
  console.log("RECEIVED USER ID =", userId);

if (!userId) {
  return NextResponse.json({
    success: false,
    error: "user_id missing",
  });
}

    if (!file) {
      return NextResponse.json({
        success: false,
        error: "No file uploaded",
      });
    }

    const bytes = await file.arrayBuffer();

    const text = await extractPdfText(
      new Uint8Array(bytes)
    );

    const transactions =
  parseCanaraStatement(text).map(
    (tx) => ({
      ...tx,
      user_id: userId,
    })
  );
    const { data: existingData, error } =
  await supabase
    .from("transactions")
    .select(
      "user_id,date,amount,description"
    )
    .eq("user_id", userId);

if (error) {
  return NextResponse.json({
    success: false,
    error: error.message,
  });
}

const existingKeys = new Set(
  (existingData || []).map(
    (tx) =>
      `${tx.user_id}|${tx.date}|${tx.amount}|${tx.description}`
  )
);
const newTransactions =
  transactions.filter((tx) => {
    const key =
      `${tx.user_id}|${tx.date}|${tx.amount}|${tx.description}`;

    return !existingKeys.has(key);
  });

const { error: insertError } =
  await supabase
    .from("transactions")
    .insert(newTransactions);

if (insertError) {
  return NextResponse.json({
    success: false,
    error: insertError.message,
  });
}

return NextResponse.json({
  success: true,
  text,
  transactions: newTransactions,
  imported: newTransactions.length,
});
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}