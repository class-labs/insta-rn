export function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((s) => s.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
