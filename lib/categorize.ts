export function categorize(description: string) {
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