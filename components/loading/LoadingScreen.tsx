"use client";
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { LoadingLogo } from './LoadingLogo';
import { LoadingProgress } from './LoadingProgress';
import { useRouter } from 'next/navigation';


export function LoadingScreen({message} : {message: string}) {
  const router = useRouter();

  useEffect(() => {
    const isLogged = Cookies.get("logged");

    if (!isLogged) {
      const timerId = setTimeout(() => {
        Cookies.set("logged", 'true', { expires: 1 });

        router.push('/leaderboard');
      }, 3000);

      return () => clearTimeout(timerId);
    } else {
      router.push('/leaderboard');
    }

  }, [router]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br z-50 from-gray-900 via-blue-900 to-gray-900 flex flex-col items-center justify-center">
      <div className="w-full max-w-md px-8">
        <LoadingLogo />
        <LoadingProgress />
        <p className="text-center text-gray-400 text-sm mt-8 animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
}
