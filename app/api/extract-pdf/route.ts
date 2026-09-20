import { NextResponse } from "next/server";
import { extractPdfText } from "@/lib/parsers/extractPdfText";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;

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

    return NextResponse.json({
      success: true,
      text,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}