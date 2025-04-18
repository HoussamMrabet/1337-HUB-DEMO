"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Navbar } from '@/components/Navbar';
import { Projects } from './Projects';
import { BugReport } from '@/components/BugReport';
import { Toaster } from 'sonner';

export default function LeaderboardPage() {
    const router = useRouter();

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
    }, [router]);
    return (
        <>
            <div className="min-h-screen bg-gray-900">
                <Navbar />
                <Projects />
            </div>
            <BugReport />
            <Toaster />
        </>
    );
}