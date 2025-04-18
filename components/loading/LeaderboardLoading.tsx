"use client";
import { Trophy, Filter, Search } from 'lucide-react';

export function LeaderboardLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="flex justify-start items-center mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 z-50 text-blue-400 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl z-50 font-bold text-white">Leaderboard</h1>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6">
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-3 flex items-center">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <div className="w-full h-10 bg-gray-700/50 rounded-lg animate-pulse" />
              </div>
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg w-32">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </div>
            </div>

            {/* Loading Rows */}
            <div className="space-y-2">
              {[...Array(8)].map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg border border-gray-700/50 bg-gradient-to-r from-gray-800/30 to-gray-800/20"
                >
                  <div className="w-8 h-8 bg-gray-700/50 rounded-lg animate-pulse" />
                  <div className="w-12 h-12 bg-gray-700/50 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-5 bg-gray-700/50 rounded w-48 animate-pulse" />
                    <div className="h-4 bg-gray-700/50 rounded w-32 animate-pulse" />
                  </div>
                  <div className="hidden sm:flex items-center gap-6">
                    <div className="space-y-1">
                      <div className="h-5 bg-gray-700/50 rounded w-24 animate-pulse" />
                      <div className="h-2 bg-gray-700/50 rounded w-32 animate-pulse" />
                    </div>
                    <div className="w-8 h-8 bg-gray-700/50 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>

            {/* Loading Pagination */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-8 h-8 bg-gray-700/50 rounded-lg animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="h-8 bg-gray-700/50 rounded w-48 animate-pulse" />
              <div className="h-4 bg-gray-700/50 rounded w-32 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}