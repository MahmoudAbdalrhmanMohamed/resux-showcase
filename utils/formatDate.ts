export function formatDate(input: string | number | Date): string {
  const date = input instanceof Date ? input : new Date(input);
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
}
