"use client";
import { Calculator, Sparkles } from 'lucide-react';

export function LoadingXPCalculator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Calculator className="w-8 h-8 text-blue-400 animate-pulse" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white">XP Calculator</h1>
        </div>

        {/* XP Summary Skeleton */}
        <div className="space-y-8">
          <div className="relative overflow-hidden bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <div className="h-5 w-32 bg-gray-700/50 rounded animate-pulse" />
                </div>
                <div className="h-12 bg-gray-700/50 rounded-xl animate-pulse" />
              </div>
              
              <div className="flex flex-col items-end justify-center">
                <div className="h-12 w-32 bg-gray-700/50 rounded-xl animate-pulse mb-2" />
                <div className="h-4 w-24 bg-gray-700/50 rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Add Project Section Skeleton */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="h-6 w-40 bg-gray-700/50 rounded mb-6 animate-pulse" />
            
            <div className="space-y-6">
              <div className="h-12 bg-gray-700/50 rounded-xl animate-pulse" />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-700/50 rounded animate-pulse" />
                  <div className="h-4 w-16 bg-gray-700/50 rounded animate-pulse" />
                </div>
                <div className="h-2 bg-gray-700/50 rounded-full animate-pulse" />
              </div>
              
              <div className="h-16 bg-gray-700/50 rounded-xl animate-pulse" />
              
              <div className="h-12 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-xl animate-pulse" />
            </div>
          </div>

          {/* Project History Skeleton */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
            <div className="h-6 w-40 bg-gray-700/50 rounded mb-6 animate-pulse" />
            
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-700/30 rounded-xl p-4 animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="h-5 w-40 bg-gray-600/50 rounded" />
                      <div className="h-4 w-24 bg-gray-600/50 rounded" />
                    </div>
                    <div className="h-6 w-24 bg-gray-600/50 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}