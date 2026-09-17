export function detectBank(
  text: string
) {
  const content = text.toUpperCase();

  if (
    content.includes("CANARA BANK")
  ) {
    return "CANARA";
  }

  return "UNKNOWN";
}