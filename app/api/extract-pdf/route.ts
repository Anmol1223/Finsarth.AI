import { NextResponse } from "next/server";
import { extractPdfText } from "@/lib/parsers/extractPdfText";

export async function POST() {
  try {
    const text = await extractPdfText(
      new Uint8Array()
    );

    return NextResponse.json({
      text,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}