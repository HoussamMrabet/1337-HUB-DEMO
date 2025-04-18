"use client";
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorScreen({ 
  message = "Something went wrong while fetching the data",
  onRetry 
}: ErrorScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-red-500/10 rounded-full">
                <AlertCircle className="w-12 h-12 text-red-400" />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-white text-center mb-4">
              Oops! An Error Occurred
            </h2>
            
            <p className="text-gray-400 text-center mb-8">
              {message}
            </p>

            {onRetry && (
              <button
                onClick={onRetry}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}