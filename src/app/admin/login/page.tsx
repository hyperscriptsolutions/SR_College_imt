"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CollegeLogo from "@/components/CollegeLogo";
import { Lock, User, ArrowRight, Loader2, AlertCircle, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push("/admin");
      } else {
        setErrorMessage(data.error || "Invalid username or password.");
      }
    } catch {
      setErrorMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#172A50] text-white relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D9AD54]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#8B1745]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Crest & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex justify-center mb-4">
            <CollegeLogo variant="light" className="h-16 w-16" showText={false} />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white mb-1">
            S. R. COLLEGE OF EDUCATION
          </h1>
          <p className="text-xs text-[#D9AD54] font-semibold uppercase tracking-wider">
            DHLS Administration Portal
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl bg-[#26345B] border border-white/10 shadow-2xl p-8 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#D9AD54]" />
            <span>Authorized Personnel Only</span>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-start gap-3 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D9AD54] focus:ring-2 focus:ring-[#D9AD54]/20 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-slate-200 mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#D9AD54] focus:ring-2 focus:ring-[#D9AD54]/20 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-full font-bold text-white bg-[#8B1745] hover:bg-[#721238] shadow-md transition-all duration-150 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4 text-[#D9AD54]" />
                </>
              )}
            </button>
          </form>

          {/* Secure Default Hint for Authorized Staff */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Default system administrator account: <code className="text-[#D9AD54] font-mono">admin</code> / <code className="text-[#D9AD54] font-mono">Admin@SRCollege2026</code>.
              <br />
              (Password can be changed inside Admin Settings).
            </p>
          </div>
        </div>

        {/* Back to public link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            &larr; Back to Public DHLS Website
          </a>
        </div>

      </div>
    </div>
  );
}
