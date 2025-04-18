"use client";
// import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import Cookies from "js-cookie";
import { LoadingScreen } from '@/components/loading/LoadingScreen';
import useUser from '@/hooks/useUser';

const Redirect = () => {
    const { data, isLoading, error } = useUser();
    const router = useRouter();

    // useEffect(() => {
    //     const timerId = setTimeout(() => {
    //         if (me) {
    //             console.log("User data loaded", me);
    //             localStorage.setItem('userProfile', JSON.stringify(me));
    //             router.push('/leaderboard');  // Or wherever you want to redirect
    //         }
    //       }, 3000);
    
    //       return () => clearTimeout(timerId);
    // }, [router]);

    useEffect(() => {
        if (error) {            
            console.log("Error fetching user data:", error);
            // Clear localStorage and cookies if there is any error
            localStorage.clear();
            Object.keys(Cookies.get()).forEach(cookieName => {
                Cookies.remove(cookieName);
            });

            router.push('/auth');
        }
    }, [data, error, router]);

    // Loading screen while the data is being fetched
    if (isLoading) {
        return <LoadingScreen message='Preparing data...' />;
    }
    
    // return <LoadingScreen />;
    return <LoadingScreen message="Everything’s ready!" />;
};

export default Redirect;
