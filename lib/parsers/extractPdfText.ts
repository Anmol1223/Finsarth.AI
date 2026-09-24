import PDFParser from "pdf2json";

export async function extractPdfText(
  buffer: Uint8Array
): Promise<string> {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on(
      "pdfParser_dataError",
       (errData: any) => {
  console.log("PDF ERROR:", errData);
  reject(errData);
}
    );
    pdfParser.on(
  "pdfParser_dataReady",
  (pdfData: any) => {
    console.log(
      JSON.stringify(pdfData, null, 2).slice(0, 500)
    );

    let text = "";

pdfData.Pages.forEach((page: any) => {
  page.Texts.forEach((item: any) => {
    item.R.forEach((r: any) => {
      text += decodeURIComponent(r.T) + " ";
    });
  });
});

resolve(text);
  }
);


    pdfParser.parseBuffer(
      Buffer.from(buffer)
    );
  });
}