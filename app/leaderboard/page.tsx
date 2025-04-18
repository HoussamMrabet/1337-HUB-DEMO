"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Navbar } from '@/components/Navbar';
import { Leaderboard } from './Leaderboard';
import { BugReport } from '@/components/LeaderboardBugReport';
import { Toaster } from 'sonner';
import { ArrowUpCircle } from 'lucide-react';

export default function LeaderboardPage() {
    const router = useRouter();
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {

        const tokenAccess = Cookies.get('tokenAccess');
        const profile = localStorage.getItem('userProfile');

        if (!tokenAccess || !profile) {
            localStorage.clear();
            Object.keys(Cookies.get()).forEach(cookieName => {
                Cookies.remove(cookieName);
            });
            
            router.push('/auth');
        }

        const handleScroll = () => {
            setShowScroll(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [router]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <>
            <div className="min-h-screen bg-gray-900">
                <Navbar />
                <Leaderboard />
                {showScroll && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-16 md:bottom-[5.5rem] left-6 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
                    >
                        <ArrowUpCircle className="w-8 h-8" />
                    </button>
                )}
            </div>
            <BugReport />
            <Toaster />
        </>
    );
}