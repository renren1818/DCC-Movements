export function TimeConvertion(time: string): string {
  if (!time) return "-";

  const [hour, month] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hour, month);

  return new Intl.DateTimeFormat("en-Us", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}
