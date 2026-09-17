export function parseCanaraStatement(text: string) {
  const upiMatches =
    text.match(
      /\d{2}-\d{2}-\d{4}[\s\S]*?(?=\d{2}-\d{2}-\d{4}|$)/g
    ) || [];

  return upiMatches.map((item) => {
    const dateMatch =
      item.match(/\d{2}-\d{2}-\d{4}/);

    const amountMatches =
      item.match(/[\d,]+\.\d{2}/g) || [];

    const description = item
      .replace(dateMatch?.[0] || "", "")
      .replace(
        amountMatches[
          amountMatches.length - 2
        ] || "",
        ""
      )
      .replace(
        amountMatches[
          amountMatches.length - 1
        ] || "",
        ""
      )
      .replace(
        /page\s+\d+Date\s+Particulars\s+Deposits\s+Withdrawals\s+Balance/gi,
        ""
      )
      .trim();

    const amount = Number(
      (
        amountMatches[
          amountMatches.length - 2
        ] || "0"
      ).replace(/,/g, "")
    );

    const balance = Number(
      (
        amountMatches[
          amountMatches.length - 1
        ] || "0"
      ).replace(/,/g, "")
    );

    return {
      date: dateMatch?.[0] || "",
      amount,
      balance,
      merchant:
  description.split("/")[3] || "Unknown",
      type: item.includes("UPI/CR/")
        ? "CREDIT"
        : item.includes("UPI/DR/")
        ? "DEBIT"
        : "OTHER",
      deposit: item.includes("UPI/CR/")
        ? amount
        : 0,
      withdrawal: item.includes("UPI/DR/")
        ? amount
        : 0,
      description,
    };
  });
}