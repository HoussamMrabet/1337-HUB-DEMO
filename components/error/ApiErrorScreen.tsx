"use client";
import { AlertOctagon, RefreshCw, Wifi, Server, Clock } from 'lucide-react';

interface ApiErrorScreenProps {
  error: Error;
  onRetry?: () => void;
}

export function ApiErrorScreen({ error, onRetry }: ApiErrorScreenProps) {
  // Determine error type and customize message
  const getErrorDetails = () => {
    if (error.message.includes('Network Error')) {
      return {
        icon: Wifi,
        title: 'Connection Error',
        message: 'Please check your internet connection and try again',
      };
    }
    if (error.message.includes('429')) {
      return {
        icon: Clock,
        title: 'Rate Limited',
        message: 'Too many requests. Please wait a moment and try again',
      };
    }
    if (error.message.includes('500')) {
      return {
        icon: Server,
        title: 'Server Error',
        message: 'Our servers are having issues. We\'re working on it!',
      };
    }
    return {
      icon: AlertOctagon,
      title: 'Oops! Something went wrong',
      message: error.message,
    };
  };

  const { icon: Icon, title, message } = getErrorDetails();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full" />
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-500/5 rounded-full blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-red-500/10 rounded-full blur-3xl" />
          
          {/* Content */}
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-red-500/10 rounded-full">
                <Icon className="w-12 h-12 text-red-400" />
              </div>
            </div>
            
            <h2 className="text-xl font-semibold text-white text-center mb-4">
              {title}
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