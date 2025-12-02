export function DateFormater(format: string) {
  const date = new Date(format);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
