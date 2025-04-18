"use client";
import { useState, useRef, useEffect } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Profile } from '@/hooks/useUser';

interface UserMenuProps {
  user: Profile;
}

export function UserMenu({user} : UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName);
    });
    router.push('/auth');
  };

  return (
    <div className="relative z-50" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <img
          src={user.image.link}
          alt={user.login}
          className="w-8 h-8 rounded-full border-2 border-gray-700"
        />
        {/* <span className="text-gray-300 hidden md:block">{user.name}</span> */}
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 lg:right-0 lg:left-auto mt-2 w-[auto] bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <p className="font-medium text-white truncate">{user.displayname}</p>
            <p className="text-sm text-gray-400">{user.cursus_users?.find(c => c.cursus_id == 21)?.grade}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 text-left text-red-400 hover:bg-gray-700/50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}