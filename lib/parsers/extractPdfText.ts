import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

export async function extractPdfText(
  buffer: Uint8Array
) {
  const loadingTask = pdfjsLib.getDocument({
    data: buffer,
  });

  const pdf = await loadingTask.promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);

    const content =
      await page.getTextContent();

    text += content.items
      .map((item: any) => item.str)
      .join(" ");
  }

  return text;
}