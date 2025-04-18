"use client"; // Ensure the component is client-side rendered

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crown, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  onClick?: (() => void) | ((e: React.MouseEvent) => void);
}

export function NavLink({ to, icon: Icon, label, onClick }: NavLinkProps) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const isActive = pathname === to;

  return (
    <Link
      href={to}
      onClick={onClick}
      className={`group relative flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? 'text-white bg-gray-800'
          : 'text-gray-300 hover:text-white hover:bg-gray-800'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}
