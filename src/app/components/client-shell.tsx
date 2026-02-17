"use client";

interface ClientShellProps {
  children: React.ReactNode;
}

export default function ClientShell({ children }: ClientShellProps) {
  return (
    <div className="mt-4 px-4 py-2 bg-gray-600 text-white rounded">
      <h3 className="font-bold mb-2">User Profile (Client Component)</h3>
      {children}
    </div>
  );
}
