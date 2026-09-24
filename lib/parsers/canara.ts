export function parseCanaraStatement(text: string) {
  const upiMatches =
    text.match(
      /\d{2}-\d{2}-\d{4}[\s\S]*?(?=\d{2}-\d{2}-\d{4}|$)/g
    ) || [];

  return upiMatches
  .filter(
  (item) =>
    !item.includes("UNAUTHORISED DEBITS") &&
    !item.includes("PASS SHEET SHALL BE DEEMED") &&
    !item.includes("THE ENTRIES IN SUCH PASS SHEET") &&
    !item.includes("SHALL BIND THE")
)

  .map((item) => {

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
      if (
  description.includes("UNAUTHORISED DEBITS") ||
  description.includes("PASS SHEET SHALL BE DEEMED") ||
  description.includes("THE ENTRIES IN SUCH PASS SHEET") ||
  description.includes("SHALL BIND THE")
) {
  return null;
}

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

    const rawDate = dateMatch?.[0] || "";
    const formattedDate = rawDate
      ? rawDate.split("-").reverse().join("-")
      : "";

      let category = "Other";

const merchantName =
  description.split("/")[3] || "";

const merchant =
  merchantName.toUpperCase();

if (merchant.includes("SWIGGY")) {
  category = "Food";
}
else if (merchant.includes("ZOMATO")) {
  category = "Food";
}
else if (merchant.includes("AMAZON")) {
  category = "Shopping";
}
else if (merchant.includes("FLIPKART")) {
  category = "Shopping";
}
else if (
  description.includes("CREDIT CARD")
) {
  category = "Credit Card";
}
else if (
  description.includes("UPI/DR/")
) {
  category = "Expense";
}
else if (
  description.includes("UPI/CR/")
) {
  category = "Transfers";
}
    return {
      date: formattedDate,
      amount,
      balance,
      category,
      merchant: description.split("/")[3] || "Unknown",
      deposit: item.includes("UPI/CR/")
        ? amount
        : 0,
      withdrawal: item.includes("UPI/DR/")
        ? amount
        : 0,
      description,
    };
  })
  .filter(Boolean);
}
