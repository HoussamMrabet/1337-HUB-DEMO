"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Navbar } from '@/components/Navbar';
import { PeerFinder } from './PeerFinder';
import { BugReport } from '@/components/BugReport';
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
                <PeerFinder />
                {showScroll && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-6 left-6 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition"
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