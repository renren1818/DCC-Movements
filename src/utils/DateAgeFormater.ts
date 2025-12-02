export function DateAgeFormatter(purchaseDate: string | Date): string {
  const start = new Date(purchaseDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  let months = now.getMonth() - start.getMonth();

  // adjust if current month is before purchase month
  if (months < 0) {
    years--;
    months += 12;
  }

  // clamp to zero if negative (future purchase date)
  if (years < 0) years = 0;
  if (months < 0) months = 0;

  return `${years}Y ${months}M`;
}