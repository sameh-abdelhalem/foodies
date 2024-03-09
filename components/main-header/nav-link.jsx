"use client";
import classes from "./main-header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const path = usePathname();
  return (
    <Link
      className={path.startsWith(href) ? classes.active : undefined}
      href={href}
    >
      {children}
    </Link>
  );
}
