"use client";
import { Code2, Users } from 'lucide-react';

export function LoadingTeams() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-blue-400 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Peer Finder</h1>
          </div>
        </div>

        {/* Filter Bar Skeleton */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-blue-400/50 animate-pulse">
              <Code2 className="w-5 h-5" />
              <div className="h-5 w-24 bg-gray-700/50 rounded" />
            </div>
            <div className="grid gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 bg-gray-700/50 rounded-lg animate-pulse" />
              ))}
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-8">
          {[1, 2, 3].map((section) => (
            <div key={section} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-32 bg-gray-800/50 rounded animate-pulse" />
                <div className="h-6 w-16 bg-gray-800/50 rounded animate-pulse" />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((card) => (
                  <div
                    key={card}
                    className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 animate-pulse"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div className="h-6 w-24 bg-gray-700/50 rounded" />
                        <div className="h-6 w-20 bg-gray-700/50 rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-gray-700/50 rounded" />
                        <div className="h-4 w-24 bg-gray-700/50 rounded" />
                      </div>
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map((avatar) => (
                          <div
                            key={avatar}
                            className="w-10 h-10 rounded-full bg-gray-700/50"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
