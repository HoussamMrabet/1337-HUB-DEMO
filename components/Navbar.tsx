"use client";
import React, { useState } from "react";
import {
  Trophy,
  Calculator,
  Users,
  Menu,
  X,
  FolderKanban,
} from "lucide-react";
import { NavLink } from "./navigation/NavLink";
import { UserMenu } from "./user/UserMenu";
import useUser from "@/hooks/useUser";

const navItems = [
  { to: "/leaderboard", icon: Trophy, label: "Leaderboard"},
  { to: "/projects", icon: FolderKanban, label: "Projects"},
  { to: "/xp-calculator", icon: Calculator, label: "XP Calculator" },
  { to: "/peer-finder", icon: Users, label: "Peer Finder"},
];

export function Navbar() {
  const { data: me } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-[999] bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="hidden lg:flex items-center space-x-3">
              {navItems.map(({ to, icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  icon={icon}
                  label={label}
                />
              ))}
            </div>

            {me && <UserMenu user={me} />}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:hidden border-t border-gray-800 transition-all duration-200 ease-in-out`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                icon={icon}
                label={label}
              />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
