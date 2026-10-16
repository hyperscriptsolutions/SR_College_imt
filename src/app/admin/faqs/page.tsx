"use client";

import React, { useState, useEffect } from "react";
import {
  HelpCircle,
  Plus,
  Trash2,
  Edit2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  X,
  Save,
} from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isPublished: boolean;
  sortOrder: number;
}

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [modalForm, setModalForm] = useState({
    question: "",
    answer: "",
  });

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<FAQItem | null>(null);

  const loadFaqs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/faqs");
      if (res.ok) {
        const data = await res.json();
        setFaqs(data.faqs);
      }
    } catch {
      setNotification({ type: "error", message: "Failed to load FAQs." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const handleOpenAdd = () => {
    setEditingFaq(null);
    setModalForm({ question: "", answer: "" });
    setModalOpen(true);
  };

  const handleOpenEdit = (faq: FAQItem) => {
    setEditingFaq(faq);
    setModalForm({ question: faq.question, answer: faq.answer });
    setModalOpen(true);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);

    if (editingFaq) {
      try {
        const res = await fetch("/api/admin/faqs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingFaq.id,
            question: modalForm.question,
            answer: modalForm.answer,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setFaqs(data.faqs);
          setNotification({ type: "success", message: "FAQ updated successfully." });
          setModalOpen(false);
        } else {
          setNotification({ type: "error", message: data.error || "Failed to update FAQ." });
        }
      } catch {
        setNotification({ type: "error", message: "Server communication error." });
      }
    } else {
      try {
        const res = await fetch("/api/admin/faqs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: modalForm.question,
            answer: modalForm.answer,
          }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setFaqs(data.faqs);
          setNotification({ type: "success", message: "New FAQ added successfully." });
          setModalOpen(false);
        } else {
          setNotification({ type: "error", message: data.error || "Failed to add FAQ." });
        }
      } catch {
        setNotification({ type: "error", message: "Failed to add FAQ." });
      }
    }
  };

  const handleTogglePublish = async (faq: FAQItem) => {
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: faq.id,
          isPublished: !faq.isPublished,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFaqs(data.faqs);
        setNotification({
          type: "success",
          message: `FAQ ${!faq.isPublished ? "published" : "hidden from public view"}.`,
        });
      }
    } catch {
      setNotification({ type: "error", message: "Failed to update publication status." });
    }
  };

  const handleReorder = async (faq: FAQItem, direction: "up" | "down") => {
    try {
      const res = await fetch("/api/admin/faqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: faq.id,
          moveDirection: direction,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFaqs(data.faqs);
      }
    } catch {
      setNotification({ type: "error", message: "Failed to reorder FAQ." });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      const res = await fetch(`/api/admin/faqs?id=${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setFaqs(data.faqs);
        setNotification({ type: "success", message: "FAQ removed successfully." });
      } else {
        setNotification({ type: "error", message: data.error || "Failed to delete FAQ." });
      }
    } catch {
      setNotification({ type: "error", message: "Error deleting FAQ." });
    } finally {
      setDeleteTarget(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#2684FF]" />
        <span className="text-xs text-[#536B8E]">Loading FAQ management...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Frequently Asked Questions (FAQ) Manager
          </h1>
          <p className="text-xs sm:text-sm text-[#536B8E] mt-1">
            Maintain verified public questions and answers for prospective DHLS applicants.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#2684FF] hover:bg-[#1E74E8] shadow-md shadow-[#2684FF]/25 hover:shadow-lg transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
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

      {/* FAQ List */}
      <div className="rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200/80 dark:border-[#29D7FF]/15 shadow-sm p-6 sm:p-8 space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={faq.id}
            className={`p-5 rounded-2xl border transition-all ${
              faq.isPublished
                ? "bg-slate-50/50 dark:bg-white/5 border-slate-200/80 dark:border-white/10"
                : "bg-slate-100/40 dark:bg-white/[0.02] border-dashed border-slate-300 dark:border-white/10 opacity-70"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#2684FF] bg-[#2684FF]/10 px-2 py-0.5 rounded-md">
                    Q{idx + 1}
                  </span>
                  {!faq.isPublished && (
                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-500/20 px-2 py-0.5 rounded-full">
                      Hidden from public
                    </span>
                  )}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#13264A] dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-xs text-[#536B8E] leading-relaxed pt-1">
                  {faq.answer}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 self-end sm:self-start flex-shrink-0">
                <button
                  onClick={() => handleReorder(faq, "up")}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-20 hover:bg-slate-200/60 dark:hover:bg-white/10"
                  title="Move Up"
                  aria-label="Move Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleReorder(faq, "down")}
                  disabled={idx === faqs.length - 1}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-20 hover:bg-slate-200/60 dark:hover:bg-white/10"
                  title="Move Down"
                  aria-label="Move Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleTogglePublish(faq)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    faq.isPublished
                      ? "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/20"
                      : "text-slate-400 hover:bg-slate-200/60"
                  }`}
                  title={faq.isPublished ? "Publicly Visible (Click to Hide)" : "Hidden (Click to Publish)"}
                  aria-label="Toggle publication"
                >
                  {faq.isPublished ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleOpenEdit(faq)}
                  className="p-1.5 rounded-lg text-[#2684FF] hover:bg-[#2684FF]/10 transition-colors"
                  title="Edit FAQ"
                  aria-label="Edit FAQ"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteTarget(faq)}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 transition-colors"
                  title="Delete FAQ"
                  aria-label="Delete FAQ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#0A1E3D] border border-slate-200 dark:border-[#29D7FF]/20 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-white/10 mb-6">
              <h3 className="text-lg font-bold">
                {editingFaq ? "Edit FAQ" : "Add New FAQ Question"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1 text-[#536B8E] uppercase tracking-wider">
                  Question
                </label>
                <input
                  type="text"
                  required
                  value={modalForm.question}
                  onChange={(e) => setModalForm({ ...modalForm, question: e.target.value })}
                  placeholder="e.g. What educational qualification is required?"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 text-[#536B8E] uppercase tracking-wider">
                  Answer
                </label>
                <textarea
                  rows={4}
                  required
                  value={modalForm.answer}
                  onChange={(e) => setModalForm({ ...modalForm, answer: e.target.value })}
                  placeholder="Comprehensive, verified response..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#2684FF]/20 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#2684FF] hover:bg-[#1E74E8] shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingFaq ? "Update FAQ" : "Save FAQ"}</span>
                </button>
              </div>
            </form>
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
                Delete FAQ Question
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#536B8E] leading-relaxed mb-6">
              Are you sure you want to permanently delete:
              <br />
              <strong className="text-[#13264A] dark:text-white font-semibold">
                &ldquo;{deleteTarget.question}&rdquo;
              </strong>
              ?
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
