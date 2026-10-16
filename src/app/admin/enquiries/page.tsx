"use client";

import React, { useState, useEffect } from "react";
import {
  Inbox,
  Search,
  Filter,
  Download,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  CheckCheck,
  Eye,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  User,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

interface EnquiryItem {
  enquiryId: string;
  fullName: string;
  mobile: string;
  email?: string | null;
  qualification: string;
  message?: string;
  course: string;
  institution: string;
  submittedAt: string;
  status: "New" | "Contacted" | "Resolved";
  notes?: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Detail Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [editStatus, setEditStatus] = useState<"New" | "Contacted" | "Resolved">("New");
  const [editNotes, setEditNotes] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Delete Target
  const [deleteTarget, setDeleteTarget] = useState<EnquiryItem | null>(null);

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (statusFilter !== "ALL") params.set("status", statusFilter);

      const res = await fetch(`/api/admin/enquiries?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch {
      setNotification({ type: "error", message: "Failed to load enquiries." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEnquiries();
    }, 250);
    return () => clearTimeout(timer);
  }, [search, statusFilter]);

  const handleOpenDetail = (item: EnquiryItem) => {
    setSelectedEnquiry(item);
    setEditStatus(item.status);
    setEditNotes(item.notes || "");
  };

  const handleUpdateStatus = async () => {
    if (!selectedEnquiry) return;
    setIsUpdatingStatus(true);
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryId: selectedEnquiry.enquiryId,
          status: editStatus,
          notes: editNotes,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ type: "success", message: `Status updated to ${editStatus}.` });
        setSelectedEnquiry(data.enquiry);
        fetchEnquiries();
      } else {
        setNotification({ type: "error", message: data.error || "Failed to update." });
      }
    } catch {
      setNotification({ type: "error", message: "Error updating status." });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await fetch(`/api/admin/enquiries?enquiryId=${deleteTarget.enquiryId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNotification({ type: "success", message: "Enquiry removed from records." });
        if (selectedEnquiry?.enquiryId === deleteTarget.enquiryId) {
          setSelectedEnquiry(null);
        }
        fetchEnquiries();
      } else {
        setNotification({ type: "error", message: data.error || "Failed to delete enquiry." });
      }
    } catch {
      setNotification({ type: "error", message: "Failed to delete enquiry." });
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Admission Enquiries Inbox
          </h1>
          <p className="text-xs sm:text-sm text-[#536B8E] mt-1">
            Student submissions from the public DHLS admission enquiry form.
          </p>
        </div>

        {/* Export CSV Button */}
        <a
          href="/api/admin/enquiries?export=csv"
          download
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-[#13264A] dark:text-white bg-white dark:bg-[#0A1E3D] border border-slate-200 dark:border-white/10 hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#2684FF]" />
          <span>Export All Enquiries (CSV)</span>
        </a>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs ${
            notification.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
              : "bg-rose-50 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2.5">
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 flex-shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by candidate name, mobile, email or Ref ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="New">New (Pending)</option>
            <option value="Contacted">Contacted</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

      </div>

      {/* Enquiries Table */}
      <div className="rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold">
            Showing {enquiries.length} {enquiries.length === 1 ? "Record" : "Records"}
          </h3>
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-xs text-[#2684FF] hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <Loader2 className="w-6 h-6 animate-spin text-[#2684FF]" />
            <span className="text-xs text-[#536B8E]">Loading enquiries...</span>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="text-center py-16 text-xs text-[#536B8E]">
            No admission enquiries match the current filter or search query.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-white/10 text-[#536B8E] uppercase tracking-wider font-bold">
                  <th className="py-3 px-4">Ref ID</th>
                  <th className="py-3 px-4">Candidate Name</th>
                  <th className="py-3 px-4">Mobile</th>
                  <th className="py-3 px-4">Qualification</th>
                  <th className="py-3 px-4">Submission Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {enquiries.map((item) => (
                  <tr
                    key={item.enquiryId}
                    className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => handleOpenDetail(item)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-[#2684FF]">
                      {item.enquiryId}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#13264A] dark:text-white">
                      {item.fullName}
                    </td>
                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`tel:${item.mobile}`}
                        className="hover:underline flex items-center gap-1.5 text-[#2684FF] font-medium"
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
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white hover:bg-slate-200"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detailed View Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200 dark:border-[#29D7FF]/20 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10 mb-6">
              <div>
                <span className="text-xs font-mono font-bold text-[#2684FF]">
                  {selectedEnquiry.enquiryId}
                </span>
                <h3 className="text-lg font-bold text-[#13264A] dark:text-white">
                  Enquiry Details: {selectedEnquiry.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-xs">
              
              {/* Candidate Info Grid */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                <div>
                  <span className="text-[#536B8E] block mb-1">Mobile Number:</span>
                  <a
                    href={`tel:${selectedEnquiry.mobile}`}
                    className="font-bold text-sm text-[#2684FF] hover:underline flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{selectedEnquiry.mobile}</span>
                  </a>
                </div>

                <div>
                  <span className="text-[#536B8E] block mb-1">Email Address:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedEnquiry.email || "Not provided"}
                  </span>
                </div>

                <div>
                  <span className="text-[#536B8E] block mb-1">Qualification:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedEnquiry.qualification}
                  </span>
                </div>

                <div>
                  <span className="text-[#536B8E] block mb-1">Submitted On:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {new Date(selectedEnquiry.submittedAt).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Message from Candidate */}
              <div>
                <span className="font-bold text-[#536B8E] uppercase tracking-wider block mb-1.5">
                  Candidate Message / Questions
                </span>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 leading-relaxed text-slate-800 dark:text-slate-200">
                  {selectedEnquiry.message || "No specific message provided."}
                </div>
              </div>

              {/* Status Update Controls */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/10 space-y-3">
                <span className="font-bold text-[#13264A] dark:text-white uppercase tracking-wider block">
                  Update Enquiry Status
                </span>

                <div className="grid grid-cols-3 gap-2">
                  {(["New", "Contacted", "Resolved"] as const).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setEditStatus(st)}
                      className={`py-2 px-3 rounded-xl font-bold border transition-all text-xs flex items-center justify-center gap-1.5 ${
                        editStatus === st
                          ? st === "New"
                            ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                            : st === "Contacted"
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                          : "bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {st === "Resolved" ? <CheckCheck className="w-3.5 h-3.5" /> : null}
                      <span>{st}</span>
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[#536B8E] font-medium mb-1">
                    Internal Follow-Up Notes:
                  </label>
                  <textarea
                    rows={2}
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    placeholder="e.g. Spoke to candidate on phone, confirmed 12th marks, scheduled campus visit..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20 resize-none"
                  />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(selectedEnquiry)}
                  className="text-xs font-semibold text-rose-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Enquiry</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedEnquiry(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleUpdateStatus}
                    disabled={isUpdatingStatus}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#2684FF] hover:bg-[#1E74E8] shadow-md flex items-center gap-1.5 disabled:opacity-60"
                  >
                    {isUpdatingStatus ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    <span>Save Status</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200 dark:border-[#29D7FF]/20 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 text-rose-500 mb-4">
              <div className="p-3 rounded-2xl bg-rose-500/10">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#13264A] dark:text-white">
                Delete Enquiry Record
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#536B8E] leading-relaxed mb-6">
              Are you sure you want to permanently delete the enquiry record for{" "}
              <strong className="text-[#13264A] dark:text-white font-semibold">
                {deleteTarget.fullName} ({deleteTarget.enquiryId})
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-600/25 transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
