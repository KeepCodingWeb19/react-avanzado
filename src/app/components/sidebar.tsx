import Link from "next/link";
import ThemeToggle from "./theme-toggle";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      Sidebar Content
      <nav className="flex flex-col">
        <Link href="/" className="mb-2 hover:underline">
          Home
        </Link>
        <Link href="/dashboard" className="mb-2 hover:underline">
          Dashboard
        </Link>
        <Link href="/login" className="mb-2 hover:underline">
          Login
        </Link>
      </nav>
      <ThemeToggle />
    </aside>
  );
}
