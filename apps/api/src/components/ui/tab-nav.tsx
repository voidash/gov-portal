"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TabNav({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <nav className="dn-tabs" aria-label="Tabs">
      {items.map((item) => (
        <Link
          key={item.href}
          className="dn-tab"
          href={item.href}
          aria-current={pathname === item.href ? "page" : undefined}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
