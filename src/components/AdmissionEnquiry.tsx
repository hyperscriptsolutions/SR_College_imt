"use client";

import React, { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  ShieldCheck,
  Loader2,
  Lock,
  User,
  GraduationCap,
  MessageSquare,
} from "lucide-react";

export default function AdmissionEnquiry() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    qualification: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<{
    enquiryId: string;
    message: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (at least 2 characters).";
    }

    const cleanPhone = formData.mobile.replace(/[\s\-+]/g, "").slice(-10);
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!cleanPhone || !phoneRegex.test(cleanPhone)) {
      errs.mobile = "Please enter a valid 10-digit Indian mobile number (e.g. 9896302035).";
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = "Please enter a valid email address.";
      }
    }

    if (!formData.qualification) {
      errs.qualification = "Please select your highest educational qualification.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          mobile: formData.mobile,
          email: formData.email,
          qualification: formData.qualification,
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitSuccess({
          enquiryId: data.enquiryId,
          message: data.message,
        });
        setFormData({
          fullName: "",
          mobile: "",
          email: "",
          qualification: "",
          message: "",
        });
        setErrors({});
      } else {
        setSubmitError(data.error || "Unable to submit enquiry. Please call the college directly.");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError("Network connection error. Please verify your connection or call the college admissions desk.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="enquiry" className="py-20 sm:py-28 bg-[#FFFCF6] relative border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9AD54]/10 border border-[#D9AD54]/30 text-xs font-bold text-[#B88B2E] uppercase tracking-wider mb-3">
            <Send className="w-3.5 h-3.5 text-[#D9AD54]" />
            Admissions Desk
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172A50] tracking-tight mb-4">
            Ready to Explore DHLS?
          </h2>
          <p className="text-base sm:text-lg text-[#718096] leading-relaxed">
            Have questions about eligibility, course details or admission availability? Get in touch with S.R College of Education.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct College Helplines & Guidance */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            <div className="p-7 sm:p-8 rounded-3xl bg-[#172A50] text-white shadow-xl border border-[#26345B] relative overflow-hidden">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9AD54] mb-3">
                <ShieldCheck className="w-4 h-4 text-[#D9AD54]" />
                Direct College Contact
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Speak With Admissions
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Prefer immediate guidance? Call the official college desk to discuss current batch status, verification of documents, or visiting the campus in Rohtak.
              </p>

              {/* Call Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 mb-6">
                <a
                  href="tel:9896302035"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#D9AD54] flex items-center justify-center text-[#172A50] flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 font-medium">Primary Admissions</div>
                      <div className="text-sm font-bold text-white tracking-wide font-mono">9896302035</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#D9AD54] group-hover:underline">Call</span>
                </a>

                <a
                  href="tel:7404153253"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 text-[#D9AD54] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 font-medium">Admissions Desk</div>
                      <div className="text-sm font-bold text-white tracking-wide font-mono">7404153253</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#D9AD54] group-hover:underline">Call</span>
                </a>

                <a
                  href="tel:9992700255"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 text-[#D9AD54] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 font-medium">Counseling Helpline</div>
                      <div className="text-sm font-bold text-white tracking-wide font-mono">9992700255</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#D9AD54] group-hover:underline">Call</span>
                </a>

                <a
                  href="tel:9306040793"
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white/20 text-[#D9AD54] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-300 font-medium">Information Desk</div>
                      <div className="text-sm font-bold text-white tracking-wide font-mono">9306040793</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#D9AD54] group-hover:underline">Call</span>
                </a>
              </div>

              {/* Email link */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-[#D9AD54]" />
                <span>Email:</span>
                <a
                  href="mailto:srcollegeeducation@gmail.com"
                  className="text-white font-medium hover:text-[#D9AD54] transition-colors hover:underline"
                >
                  srcollegeeducation@gmail.com
                </a>
              </div>
            </div>

            {/* Privacy Assurance Box */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-2xs flex items-start gap-3.5">
              <Lock className="w-5 h-5 text-[#8B1745] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#718096] leading-relaxed">
                <strong className="text-[#172A50] font-semibold">Privacy Commitment:</strong> Your contact information is never shared with third parties. It is used exclusively by the S.R College of Education admissions desk to provide verified information regarding the DHLS course.
              </div>
            </div>

          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#E8E2D8] shadow-sm relative">
              
              {submitSuccess ? (
                /* Success State */
                <div className="text-center py-10 px-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#172A50] mb-2">
                    Enquiry Submitted Successfully!
                  </h3>
                  <div className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-4">
                    Reference ID: {submitSuccess.enquiryId}
                  </div>
                  <p className="text-sm text-[#718096] leading-relaxed max-w-md mx-auto mb-8">
                    {submitSuccess.message}
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-[#172A50] bg-[#FFFCF6] border border-[#E8E2D8] hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#172A50] mb-1">
                      DHLS Course Enquiry Form
                    </h3>
                    <p className="text-xs text-[#718096]">
                      Fill out this brief form to receive official course guidance and seat availability updates.
                    </p>
                  </div>

                  {submitError && (
                    <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-700">
                      <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-bold text-[#172A50] mb-1.5 uppercase tracking-wider">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Ramesh Kumar"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFFCF6] border text-sm text-[#263238] focus:outline-none focus:ring-2 transition-all ${
                            errors.fullName
                              ? "border-rose-400 focus:ring-rose-200"
                              : "border-[#E8E2D8] focus:border-[#172A50] focus:ring-[#172A50]/20"
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Mobile Number & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Mobile Number */}
                      <div>
                        <label htmlFor="mobile" className="block text-xs font-bold text-[#172A50] mb-1.5 uppercase tracking-wider">
                          Mobile Number <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500 text-xs font-semibold">
                            +91
                          </div>
                          <input
                            id="mobile"
                            type="tel"
                            maxLength={10}
                            required
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                            placeholder="10-digit number"
                            className={`w-full pl-12 pr-4 py-3 rounded-xl bg-[#FFFCF6] border text-sm text-[#263238] focus:outline-none focus:ring-2 transition-all ${
                              errors.mobile
                                ? "border-rose-400 focus:ring-rose-200"
                                : "border-[#E8E2D8] focus:border-[#172A50] focus:ring-[#172A50]/20"
                            }`}
                          />
                        </div>
                        {errors.mobile && (
                          <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.mobile}</p>
                        )}
                      </div>

                      {/* Email Address (Optional) */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-[#172A50] mb-1.5 uppercase tracking-wider">
                          Email Address <span className="text-[#718096] font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@example.com"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFFCF6] border text-sm text-[#263238] focus:outline-none focus:ring-2 transition-all ${
                              errors.email
                                ? "border-rose-400 focus:ring-rose-200"
                                : "border-[#E8E2D8] focus:border-[#172A50] focus:ring-[#172A50]/20"
                            }`}
                          />
                        </div>
                        {errors.email && (
                          <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.email}</p>
                        )}
                      </div>

                    </div>

                    {/* Highest Educational Qualification */}
                    <div>
                      <label htmlFor="qualification" className="block text-xs font-bold text-[#172A50] mb-1.5 uppercase tracking-wider">
                        Highest Educational Qualification <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <select
                          id="qualification"
                          required
                          value={formData.qualification}
                          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFFCF6] border text-sm text-[#263238] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                            errors.qualification
                              ? "border-rose-400 focus:ring-rose-200"
                              : "border-[#E8E2D8] focus:border-[#172A50] focus:ring-[#172A50]/20"
                          }`}
                        >
                          <option value="">Select your qualification...</option>
                          <option value="12th Standard (PCM / PCB)">12th Standard / Higher Secondary (10+2 PCM or PCB)</option>
                          <option value="Graduate / Bachelor's Degree">Graduate / Bachelor&apos;s Degree (B.A, B.Sc, B.Com, etc.)</option>
                          <option value="Post Graduate / Master's Degree">Post Graduate / Master&apos;s Degree</option>
                          <option value="Diploma Holder">Diploma in Other Discipline</option>
                          <option value="Currently Appearing for 12th (PCM / PCB)">Currently Appearing for 12th (PCM / PCB)</option>
                          <option value="Other">Other Qualification</option>
                        </select>
                      </div>
                      {errors.qualification && (
                        <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.qualification}</p>
                      )}
                    </div>

                    {/* Message / Query */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-[#172A50] mb-1.5 uppercase tracking-wider">
                        Questions or Remarks <span className="text-[#718096] font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3.5 pointer-events-none text-stone-400">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea
                          id="message"
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us what you would like to know about DHLS admissions or batch schedules..."
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FFFCF6] border border-[#E8E2D8] text-sm text-[#263238] focus:outline-none focus:border-[#172A50] focus:ring-2 focus:ring-[#172A50]/20 transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Privacy notice */}
                    <p className="text-[11px] text-[#718096] leading-relaxed pt-1">
                      By submitting this form, you acknowledge that your details will be utilized solely by S.R College of Education to communicate DHLS course information. No commercial marketing resale.
                    </p>

                    {/* Submit Button in Burgundy #8B1745 */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-full font-bold text-white bg-[#8B1745] hover:bg-[#721238] shadow-md hover:shadow-lg transition-all duration-150 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit DHLS Admission Enquiry</span>
                          <Send className="w-4 h-4 text-[#D9AD54]" />
                        </>
                      )}
                    </button>

                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
