export default function classnames(...args: string[]): string {
  return args.filter(Boolean).join(" ");
}
