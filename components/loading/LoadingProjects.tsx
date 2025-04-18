"use client";
import { FolderKanban, Search, Filter } from 'lucide-react';

export function LoadingProjects() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <FolderKanban className="w-8 h-8 text-blue-400 animate-pulse" />
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Projects</h1>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <div className="w-full h-10 bg-gray-700/50 rounded-lg animate-pulse" />
            </div>
            <div className="flex gap-4">
              <div className="w-40 h-10 bg-gray-700/50 rounded-lg animate-pulse" />
              <div className="w-40 h-10 bg-gray-700/50 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 animate-pulse"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-4">
                <div className="space-y-2">
                  <div className="h-6 w-48 bg-gray-700/50 rounded" />
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="h-6 w-24 bg-gray-700/50 rounded-full" />
                    <div className="h-6 w-20 bg-gray-700/50 rounded-full" />
                    <div className="h-6 w-28 bg-gray-700/50 rounded-full" />
                  </div>
                </div>
                <div className="h-6 w-24 bg-gray-700/50 rounded-full" />
              </div>

              <div className="h-16 w-full bg-gray-700/50 rounded mb-4" />

              <div className="flex flex-wrap gap-2 mb-4">
                {[...Array(3)].map((_, tagIndex) => (
                  <div
                    key={tagIndex}
                    className="h-6 w-20 bg-gray-700/50 rounded-full"
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 h-10 bg-gray-700/50 rounded-lg" />
                <div className="flex-1 h-10 bg-gray-700/50 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}