export function isMatch(value: string, searchString: string): boolean {
  return (
    !searchString || value.toLowerCase().includes(searchString.toLowerCase())
  );
}
