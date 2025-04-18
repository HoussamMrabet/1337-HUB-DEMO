'use client';

import AuthChecker from "@/components/AuthChecker";
import { Suspense } from "react";

export default function Home() {

  return (
    <Suspense>
      <AuthChecker />
    </Suspense>
  );
}