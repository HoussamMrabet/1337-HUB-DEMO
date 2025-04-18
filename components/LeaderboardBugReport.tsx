"use client";
import { useState } from "react";
import { Bug, X, Send, Loader2 } from "lucide-react";
import useUser from "@/hooks/useUser";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function BugReport() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [login, setLogin] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const { data: user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: 'houssammrabet5@gmail.com',
          login: user?.login || login,
          subject,
          description,
        }),
      });

      if (response.ok) {
        toast.success(
          <div className="flex flex-col gap-1">
            <p className="font-medium">Your Report is Submitted!</p>
          </div>
        );
        setIsOpen(false);
        resetForm();
      } else {
        const error = await response.json();
        toast.error(
          <div className="flex flex-col gap-1">
            <p className="font-medium">Failed to submit report</p>
            <p className="text-sm text-gray-500">{error.message || 'An unexpected error occurred'}</p>
          </div>
        );
      }
    } catch (error) {
      toast.error(
        <div className="flex flex-col gap-1">
          <p className="font-medium">Failed to submit report</p>
          <p className="text-sm text-gray-500">Network error. Please try again.</p>
        </div>
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitting(false);
    if (!user?.login) setLogin("");
    setSubject("");
    setDescription("");
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-16 md:bottom-[5.5rem] right-6 z-50 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group animate-in slide-in-from-bottom-6"
      >
        <Bug className="w-6 h-6 text-white" />
        <span className="absolute hidden lg:block right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Report an issue
        </span>
      </button>

      {isOpen && (
        <div
          onClick={handleBackgroundClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in-0 duration-200"
        >
          <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl border border-gray-700 animate-in slide-in-from-bottom-4 duration-300">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl" />

            <form onSubmit={handleSubmit} className="relative p-6">
              <button
                type="button"
                onClick={() => !isSubmitting && setIsOpen(false)}
                disabled={isSubmitting}
                className={cn(
                  "absolute top-4 right-4 text-gray-400 transition-colors",
                  !isSubmitting && "hover:text-white",
                  isSubmitting && "opacity-50 cursor-not-allowed"
                )}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Bug className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  Report an Issue
                </h2>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-300">
                    Your Login
                  </label>
                  <input
                    type="text"
                    value={user?.login || login}
                    disabled={user?.login ? true : false || isSubmitting}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                    placeholder="Your login"
                    className={cn(
                      "w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-colors",
                      !isSubmitting && "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-300">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    disabled={isSubmitting}
                    required
                    placeholder="Brief description of the issue"
                    className={cn(
                      "w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-colors",
                      !isSubmitting && "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-gray-300">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={isSubmitting}
                    required
                    placeholder="Detailed explanation of the issue..."
                    rows={4}
                    className={cn(
                      "w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 transition-colors resize-none",
                      !isSubmitting && "focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
                      isSubmitting && "opacity-50 cursor-not-allowed"
                    )}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-all transform",
                    !isSubmitting && "hover:from-blue-700 hover:to-purple-700 hover:scale-[1.02] active:scale-[0.98]",
                    isSubmitting && "opacity-80 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}