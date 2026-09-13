import type { IssueLabelDto } from "@gov-portal/shared";

function channel(value: number): number {
  const normalized = value / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function isDark(hex: string): boolean {
  const r = Number.parseInt(hex.slice(0, 2), 16);
  const g = Number.parseInt(hex.slice(2, 4), 16);
  const b = Number.parseInt(hex.slice(4, 6), 16);
  const luminance = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  return luminance < 0.45;
}

export function LabelChip({ label }: { label: IssueLabelDto }) {
  const dark = isDark(label.color);
  return (
    <span
      className="dn-label-chip"
      style={{
        backgroundColor: `#${label.color}`,
        color: dark ? "#ffffff" : "#1f2328",
      }}
    >
      {label.name}
    </span>
  );
}
