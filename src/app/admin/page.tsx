"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Inbox,
  Clock,
  Layers,
  HelpCircle,
  FileEdit,
  ArrowRight,
  Phone,
  Calendar,
  Sparkles,
  RefreshCw,
  Eye,
} from "lucide-react";

interface StatsData {
  totalEnquiries: number;
  newEnquiries: number;
  contactedEnquiries: number;
  resolvedEnquiries: number;
  totalSubjects: number;
  totalFAQs: number;
  lastContentUpdate: string;
}

interface RecentEnquiry {
  enquiryId: string;
  fullName: string;
  mobile: string;
  qualification: string;
  submittedAt: string;
  status: "New" | "Contacted" | "Resolved";
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recent, setRecent] = useState<RecentEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setRecent(data.recentEnquiries || []);
      }
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-[#536B8E] mt-1">
            Real-time management metrics for SR College of Education DHLS course portal.
          </p>
        </div>

        <button
          onClick={fetchStats}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-[#0A1E3D] border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-[#2684FF]" : ""}`} />
          <span>Refresh Live Data</span>
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Enquiries */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#536B8E] uppercase tracking-wider">
              Total Enquiries
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#2684FF]/10 text-[#2684FF] flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold tracking-tight mb-1">
            {stats ? stats.totalEnquiries : "..."}
          </div>
          <div className="text-xs text-[#536B8E]">
            Direct admissions submissions recorded
          </div>
        </div>

        {/* New Enquiries */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Pending Action
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold tracking-tight text-amber-600 dark:text-amber-400 mb-1">
            {stats ? stats.newEnquiries : "..."}
          </div>
          <div className="text-xs text-[#536B8E]">
            Awaiting college contact callback
          </div>
        </div>

        {/* Total Subjects */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#536B8E] uppercase tracking-wider">
              Curriculum Subjects
            </span>
            <div className="w-10 h-10 rounded-2xl bg-[#9B6DFF]/15 text-[#9B6DFF] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold tracking-tight mb-1">
            {stats ? stats.totalSubjects : "18"}
          </div>
          <div className="text-xs text-[#536B8E]">
            Across Semester 1 & Semester 2
          </div>
        </div>

        {/* Published FAQs */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-[#536B8E] uppercase tracking-wider">
              Published FAQs
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold tracking-tight mb-1">
            {stats ? stats.totalFAQs : "8"}
          </div>
          <div className="text-xs text-[#536B8E]">
            Live on student FAQ accordion
          </div>
        </div>

      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <Link
          href="/admin/enquiries"
          className="p-6 rounded-3xl bg-gradient-to-br from-[#071B3D] to-[#102B58] text-white shadow-lg shadow-[#071B3D]/10 hover:shadow-xl transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#29D7FF]">
                Admissions Desk
              </span>
              <Inbox className="w-5 h-5 text-[#29D7FF]" />
            </div>
            <h3 className="text-lg font-bold mb-1">Review Student Enquiries</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              View student submissions, mark as Contacted or Resolved, and export CSV logs.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#29D7FF] group-hover:translate-x-1 transition-transform">
            <span>Open Enquiries Inbox</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          href="/admin/curriculum"
          className="p-6 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2684FF]">
                Curriculum
              </span>
              <Layers className="w-5 h-5 text-[#2684FF]" />
            </div>
            <h3 className="text-lg font-bold mb-1">Manage Semesters & Subjects</h3>
            <p className="text-xs text-[#536B8E] leading-relaxed">
              Add new subjects, edit codes/descriptions, reorder topics, or toggle visibility.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#2684FF] group-hover:translate-x-1 transition-transform">
            <span>Open Curriculum Editor</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        <Link
          href="/admin/content"
          className="p-6 rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9B6DFF]">
                Page Content
              </span>
              <FileEdit className="w-5 h-5 text-[#9B6DFF]" />
            </div>
            <h3 className="text-lg font-bold mb-1">Edit DHLS Course Copy</h3>
            <p className="text-xs text-[#536B8E] leading-relaxed">
              Modify hero headlines, course duration, eligibility guidelines, and CTAs.
            </p>
          </div>
          <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-[#9B6DFF] group-hover:translate-x-1 transition-transform">
            <span>Update Content</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

      </div>

      {/* Recent Enquiries Table */}
      <div className="rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100 dark:border-white/10">
          <div>
            <h3 className="text-lg font-bold">Recently Received Enquiries</h3>
            <p className="text-xs text-[#536B8E]">
              Latest student admission inquiries stored in the college audit records.
            </p>
          </div>
          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-[#2684FF] hover:underline flex items-center gap-1"
          >
            <span>View All Enquiries</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="text-center py-12 text-xs text-[#536B8E]">
            No student enquiries recorded yet. Submissions from the public enquiry form will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/10 text-[#536B8E] uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Ref ID</th>
                  <th className="py-3 px-4">Candidate</th>
                  <th className="py-3 px-4">Mobile</th>
                  <th className="py-3 px-4">Qualification</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {recent.map((item) => (
                  <tr key={item.enquiryId} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#2684FF]">
                      {item.enquiryId}
                    </td>
                    <td className="py-3.5 px-4 font-semibold">
                      {item.fullName}
                    </td>
                    <td className="py-3.5 px-4">
                      <a
                        href={`tel:${item.mobile}`}
                        className="hover:underline flex items-center gap-1.5 text-[#2684FF]"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{item.mobile}</span>
                      </a>
                    </td>
                    <td className="py-3.5 px-4 text-[#536B8E]">
                      {item.qualification}
                    </td>
                    <td className="py-3.5 px-4 text-[#536B8E] whitespace-nowrap">
                      {new Date(item.submittedAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          item.status === "New"
                            ? "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300"
                            : item.status === "Contacted"
                            ? "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300"
                            : "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/enquiries?search=${item.enquiryId}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 text-[#13264A] dark:text-white font-semibold transition-colors text-[11px]"
                      >
                        <Eye className="w-3 h-3" />
                        <span>View</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Audit timestamp footer */}
      <div className="flex items-center justify-between text-xs text-[#536B8E] pt-2">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>
            Last Content Update:{" "}
            {stats?.lastContentUpdate
              ? new Date(stats.lastContentUpdate).toLocaleString("en-IN")
              : "Just now"}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[#2684FF]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Database synchronised</span>
        </div>
      </div>

    </div>
  );
}
