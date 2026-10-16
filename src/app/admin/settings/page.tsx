"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Lock,
  Mail,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  KeyRound,
  ShieldCheck,
  Calendar,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [email, setEmail] = useState("");
  const [lastLogin, setLastLogin] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setEmail(data.user.email || "");
          setLastLogin(data.user.lastLogin || null);
        }
      } catch {
        setNotification({ type: "error", message: "Failed to load account profile." });
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (newPassword !== confirmPassword) {
      setNotification({ type: "error", message: "New password and confirmation do not match." });
      return;
    }

    if (newPassword.length < 8) {
      setNotification({ type: "error", message: "New password must be at least 8 characters long." });
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword, email }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ type: "success", message: "Admin password updated successfully." });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setNotification({ type: "error", message: data.error || "Failed to update password." });
      }
    } catch {
      setNotification({ type: "error", message: "Network connection error." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);
    setIsSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ type: "success", message: "Admin notification email updated." });
      } else {
        setNotification({ type: "error", message: data.error || "Failed to update email." });
      }
    } catch {
      setNotification({ type: "error", message: "Network connection error." });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#2684FF]" />
        <span className="text-xs text-[#536B8E]">Loading account settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Admin Security & Account Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#536B8E] mt-1">
          Manage system security, update administrative credentials, and view session logs.
        </p>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs ${
            notification.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
              : "bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300"
          }`}
        >
          {notification.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Security Profile Info */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#2684FF]/10 text-[#2684FF] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold">Admin Account: admin</div>
            <div className="text-xs text-[#536B8E]">
              Protected with PBKDF2 SHA-256 cryptographic hashing (100,000 rounds)
            </div>
          </div>
        </div>

        {lastLogin && (
          <div className="text-xs text-[#536B8E] flex items-center gap-1.5 self-start sm:self-auto bg-slate-50 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/10">
            <Calendar className="w-3.5 h-3.5" />
            <span>Last Login: {new Date(lastLogin).toLocaleString("en-IN")}</span>
          </div>
        )}
      </div>

      {/* Change Password Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm space-y-5">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-[#2684FF]">
          <KeyRound className="w-4 h-4" />
          <span>Update Admin Password</span>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-[#536B8E]">
              Current Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current administrator password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-[#536B8E]">
                New Password (Min 8 Characters)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New strong password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-[#536B8E]">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#2684FF] hover:bg-[#1E74E8] shadow-md shadow-[#2684FF]/25 hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-70"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>

      {/* Notification Email Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-[#29D7FF]">
          <Mail className="w-4 h-4" />
          <span>Admissions Notification Email</span>
        </div>

        <form onSubmit={handleUpdateEmail} className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold mb-1.5 uppercase tracking-wider text-[#536B8E]">
              College Administration Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#13264A] dark:text-white bg-slate-100 dark:bg-white/10 hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Save Email</span>
          </button>
        </form>
      </div>

    </div>
  );
}
