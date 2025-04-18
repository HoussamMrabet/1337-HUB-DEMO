"use client"
import { Code2 } from 'lucide-react';

export function LoadingLogo() {
  return (
    <div className="flex flex-col items-center mb-12">
      <div className="relative">
        <div className="absolute inset-0 blur-xl bg-blue-500/20 rounded-full" />
        <div className="relative animate-bounce">
          <Code2 className="w-16 h-16 text-blue-400" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-white mt-6 tracking-wider">
        1337
        <span className="text-blue-400"> HUB</span>
      </h1>
    </div>
  );
}