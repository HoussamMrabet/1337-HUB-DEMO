"use client"
import Image from 'next/image';
import { Rocket, Book } from 'lucide-react';
import { BugReport } from '@/components/BugReport';
import { Toaster } from 'sonner';

export default function Auth() {
  const handleAuthenticate = () => {
    const oauthUrl = process.env.NEXT_PUBLIC_API_URI;
    if (oauthUrl)
      window.location.href = oauthUrl;
  }

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center p-8">
        {/* Background with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/1337.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content (ensuring it's not affected by the overlay) */}
        <div className="relative z-10 max-w-4xl w-full space-y-12">
          {/* Header Section */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 blur-3xl bg-blue-500/20 rounded-full" />
                <Image
                  src="/hmrabet.png"
                  alt="hmrabet"
                  width={96}
                  height={96}
                  className="relative w-24 h-24 rounded-full"
                />
              </div>
            </div>

            <h1 className="text-5xl font-bold text-white mb-4">
              1337
              <span className="text-blue-400"> HUB</span>
            </h1>

            {/* App Purpose */}
            <div className="relative max-w-2xl mx-auto mb-8 p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-xl rounded-2xl" />
              <div className="relative flex items-start gap-4">
                <div className="p-2 rounded-lg bg-blue-500/10 mt-1">
                  <Book className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-gray-300 text-left">
                  Your dedicated companion in the 1337 journey. We're here to help you manage your projects efficiently and boost your professional growth within the innovative 42 ecosystem.
                </p>
              </div>
            </div>

            <button
              onClick={handleAuthenticate}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-medium text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 blur-xl bg-white/20 rounded-xl group-hover:blur-2xl transition-all" />
              <div className="relative flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                Authenticate
              </div>
            </button>
          </div>

          {/* Terms Section */}
          {/* <div className="relative p-6 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-xl rounded-2xl" />
            <div className="relative space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Security & Privacy Commitment</h2>
              </div>
              
              <div className="grid gap-4 text-sm text-gray-400">
                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  <span className="block text-blue-400 font-medium mb-1">Exclusive 42 Network Access</span>
                  Authentication is exclusively managed through the 42 API, ensuring secure access for verified 42 Network students only.
                </div>
                
                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  <span className="block text-blue-400 font-medium mb-1">Zero Data Storage</span>
                  We operate with real-time data only - no personal or project information is stored outside the 42 ecosystem.
                </div>
                
                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  <span className="block text-blue-400 font-medium mb-1">Privacy First</span>
                  Your data stays within the 42 Network. No sharing with third parties, no external access, no exceptions.
                </div>
                
                <div className="p-4 bg-gray-800/30 rounded-xl border border-gray-700/30">
                  <span className="block text-blue-400 font-medium mb-1">Student-Focused Initiative</span>
                  Built by students, for students - a non-commercial tool dedicated to enhancing your 42 journey.
                </div>
              </div>
            </div>
          </div> */}


          <div className="text-center text-gray-400 text-sm">
            Made with ❤️ by{' '}
            <a
              href="https://github.com/HoussamMrabet"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Houssam Mrabet
            </a>
            {' '}|{' '}
            <a
              href="https://profile.intra.42.fr/users/hmrabet"
              target="_blank" rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              42 Profile
            </a>
          </div>
        </div>
      </div>

      <BugReport />
      <Toaster />
    </>
  );
}

