"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CollegeLogo from "@/components/CollegeLogo";
import {
  LayoutDashboard,
  FileText,
  Layers,
  HelpCircle,
  Inbox,
  Palette,
  Settings,
  LogOut,
  Sun,
  Moon,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  User,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ username: string; email: string } | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(!isLoginPage);

  // Restore saved theme on client mount
  useEffect(() => {
    const saved = localStorage.getItem("sr_admin_theme") as "light" | "dark" | null;
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setTheme("dark");
      document.documentElement.setAttribute("data-admin-theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.removeAttribute("data-admin-theme");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("sr_admin_theme", next);
    if (next === "dark") {
      document.documentElement.setAttribute("data-admin-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-admin-theme");
    }
  };

  // Check authentication status on non-login admin pages
  useEffect(() => {
    if (isLoginPage) return;

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/session");
        if (res.ok) {
          const data = await res.json();
          setAdminUser(data.user);
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuth();
  }, [isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {}
    router.push("/admin/login");
  };

  if (isLoginPage) {
    return <div className="min-h-screen bg-[#F5F8FF] text-[#13264A]">{children}</div>;
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F8FF] text-[#13264A]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#2684FF] border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-[#536B8E]">Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Course Content", href: "/admin/content", icon: FileText },
    { label: "Semesters & Subjects", href: "/admin/curriculum", icon: Layers },
    { label: "FAQs Management", href: "/admin/faqs", icon: HelpCircle },
    { label: "Admission Enquiries", href: "/admin/enquiries", icon: Inbox },
    { label: "Website Appearance", href: "/admin/appearance", icon: Palette },
    { label: "Admin Settings", href: "/admin/settings", icon: Settings },
  ];

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen flex ${isDark ? "bg-[#051329] text-[#F5F8FF]" : "bg-[#F5F8FF] text-[#13264A]"}`}>
      
      {/* Sidebar for Desktop */}
      <aside
        className={`hidden lg:flex lg:flex-col lg:w-64 border-r transition-colors duration-200 z-30 ${
          isDark
            ? "bg-[#0B1324] border-[#26345B] text-slate-200"
            : "bg-[#172A50] border-[#26345B] text-white"
        }`}
      >
        {/* Brand Crest */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <CollegeLogo variant="light" className="h-9 w-9" showText={false} />
            <div>
              <div className="text-sm font-extrabold tracking-tight text-white leading-tight">
                SR COLLEGE
              </div>
              <div className="text-[10px] text-[#D9AD54] font-semibold tracking-wider uppercase">
                DHLS Admin Panel
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? "bg-[#2684FF] text-white shadow-md shadow-[#2684FF]/30"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#29D7FF]"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {/* View Public Website */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#29D7FF]" />
              <span>Public DHLS Page</span>
            </span>
            <span className="text-[10px] text-slate-400">View</span>
          </a>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-300 hover:text-rose-200 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header
          className={`h-16 border-b px-4 sm:px-8 flex items-center justify-between transition-colors duration-200 z-20 ${
            isDark
              ? "bg-[#0A1E3D] border-[#29D7FF]/15"
              : "bg-white border-slate-200/80 shadow-sm"
          }`}
        >
          {/* Mobile hamburger & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#536B8E]">
              <ShieldCheck className="w-4 h-4 text-[#2684FF]" />
              <span>Authenticated Admin Workspace</span>
            </div>
          </div>

          {/* Right Controls: Theme Toggle & Admin Badge */}
          <div className="flex items-center gap-3">
            {/* Working Light/Dark Mode Switch */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-xl border transition-colors flex items-center gap-2 text-xs font-semibold ${
                isDark
                  ? "bg-[#051329] border-[#29D7FF]/20 text-[#29D7FF] hover:bg-[#071B3D]"
                  : "bg-slate-100 border-slate-200 text-[#13264A] hover:bg-slate-200"
              }`}
              title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
              aria-label="Toggle admin color theme"
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#2684FF]" />
                  <span className="hidden md:inline">Dark Mode</span>
                </>
              )}
            </button>

            {/* Admin Profile pill */}
            <div
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs ${
                isDark
                  ? "bg-[#030D1D] border-white/10 text-slate-200"
                  : "bg-slate-50 border-slate-200 text-[#13264A]"
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-[#2684FF] text-white flex items-center justify-center font-bold text-[10px]">
                {adminUser?.username?.[0]?.toUpperCase() || "A"}
              </div>
              <span className="font-semibold">{adminUser?.username || "Admin"}</span>
            </div>
          </div>
        </header>

        {/* Mobile Slide-over Drawer */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 bg-[#172A50] text-white p-6 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <div className="flex items-center gap-2">
                    <CollegeLogo variant="light" className="h-8 w-8" showText={false} />
                    <span className="font-bold text-sm">DHLS Admin</span>
                  </div>
                  <button onClick={() => setMobileSidebarOpen(false)}>
                    <X className="w-5 h-5 text-slate-300" />
                  </button>
                </div>

                <nav className="space-y-1.5">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                          isActive
                            ? "bg-[#2684FF] text-white"
                            : "text-slate-300 hover:bg-white/10"
                        }`}
                      >
                        <Icon className="w-4 h-4 text-[#29D7FF]" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-300 py-2"
                >
                  <ExternalLink className="w-4 h-4 text-[#29D7FF]" />
                  <span>Public DHLS Page</span>
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-xs text-rose-300 font-semibold py-2 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Routed Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">{children}</main>
      </div>

    </div>
  );
}
