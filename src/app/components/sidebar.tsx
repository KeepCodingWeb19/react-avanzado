import ThemeToggle from "./theme-toggle";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      Sidebar Content
      <ThemeToggle />
    </aside>
  );
}
