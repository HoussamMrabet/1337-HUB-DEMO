"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Navbar } from "@/components/Navbar";
import { XPCalculator } from "./XPCalculator";
import useUser from "@/hooks/useUser";
import { ApiErrorScreen } from "@/components/error/ApiErrorScreen";
import { LoadingXPCalculator } from "@/components/loading/LoadingXPCalculator";
import { BugReport } from "@/components/BugReport";
import { Toaster } from "sonner";

export default function LeaderboardPage() {
  const { data, isLoading, error, refetch } = useUser();
  const router = useRouter();

  useEffect(() => {
    const tokenAccess = Cookies.get("tokenAccess");
    const profile = localStorage.getItem("userProfile");

    if (!tokenAccess || !profile) {
      localStorage.clear();
      Object.keys(Cookies.get()).forEach((cookieName) => {
        Cookies.remove(cookieName);
      });

      router.push("/auth");
    }
  }, [router]);

  if (isLoading)
    return (
      <>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <LoadingXPCalculator />
        </div>
        <BugReport />
        <Toaster />
      </>
    );
  if (error || !data)
    return (
      <>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <ApiErrorScreen
            error={new Error(error?.message || "No User found")}
            onRetry={refetch}
          />
        </div>
        <BugReport />
        <Toaster />
      </>
    );

  return (
    <>
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <XPCalculator me={data} />
      </div>
      <BugReport />
      <Toaster />
    </>
  );
}
