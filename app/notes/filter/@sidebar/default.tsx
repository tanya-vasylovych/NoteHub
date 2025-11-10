"use client";
import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { usePathname } from "next/navigation";

const tagsList: string[] = [
  "All notes",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <ul className={css.menuList}>
      {tagsList.map((item) => {
        const linkPath = `/notes/filter/${item}`;
        const isActive = pathname === linkPath;

        return (
          <li className={css.menuItem} key={item}>
            <Link
              href={linkPath}
              className={`${css.menuLink} ${isActive ? css.active : ""}`}
            >
              {item}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Sidebar;
