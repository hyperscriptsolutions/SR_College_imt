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
    <section id="enquiry" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#367BFF]/10 border border-[#367BFF]/20 text-xs font-bold text-[#367BFF] uppercase tracking-wider mb-3">
            <Send className="w-3.5 h-3.5" />
            Admissions Desk
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10264A] tracking-tight mb-4">
            Ready to Explore DHLS?
          </h2>
          <p className="text-base sm:text-lg text-[#586885] leading-relaxed">
            Have questions about eligibility, course details or admission availability? Get in touch with SR College of Education.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct College Helplines & Guidance */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="p-8 rounded-3xl bg-[#10264A] text-white shadow-xl border border-[#367BFF]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#367BFF]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A99BFF] mb-3">
                <ShieldCheck className="w-4 h-4 text-[#367BFF]" />
                Direct College Contact
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">
                Speak With Admissions
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Prefer immediate guidance? Call the official college desk to discuss current batch status, verification of documents, or visiting the campus in Rohtak.
              </p>

              {/* Call Buttons */}
              <div className="space-y-3 mb-6">
                <a
                  href="tel:9416968076"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#367BFF] flex items-center justify-center text-white">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-300 font-medium">Primary Admissions Line</div>
                      <div className="text-base font-bold text-white tracking-wide">9416968076</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#A99BFF] group-hover:underline">Call Now</span>
                </a>

                <a
                  href="tel:9896302035"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#A99BFF]/20 text-[#A99BFF] flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-300 font-medium">Secondary Admissions Desk</div>
                      <div className="text-base font-bold text-white tracking-wide">9896302035</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#A99BFF] group-hover:underline">Call Now</span>
                </a>
              </div>

              {/* Email link */}
              <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-slate-300">
                <Mail className="w-4 h-4 text-[#367BFF]" />
                <span>Email:</span>
                <a
                  href="mailto:srcollegeeducation@gmail.com"
                  className="text-white font-medium hover:underline"
                >
                  srcollegeeducation@gmail.com
                </a>
              </div>
            </div>

            {/* Privacy Assurance Box */}
            <div className="p-6 rounded-2xl bg-[#F5F7FC] border border-slate-200/80 flex items-start gap-3.5">
              <Lock className="w-5 h-5 text-[#367BFF] flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#586885] leading-relaxed">
                <strong className="text-[#10264A] font-semibold">Privacy Commitment:</strong> Your contact information is never shared with third parties or external marketing agencies. It is used exclusively by the SR College of Education admissions desk to provide verified information regarding the DHLS course.
              </div>
            </div>

          </div>

          {/* Right Column: High Conversion Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#F5F7FC] rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-lg relative">
              
              {submitSuccess ? (
                /* Success State */
                <div className="text-center py-10 px-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 animate-bounce">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#10264A] mb-2">
                    Enquiry Submitted Successfully!
                  </h3>
                  <div className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 mb-4">
                    Reference ID: {submitSuccess.enquiryId}
                  </div>
                  <p className="text-sm text-[#586885] leading-relaxed max-w-md mx-auto mb-8">
                    {submitSuccess.message}
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-[#10264A] bg-white border border-slate-300 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#10264A] mb-1">
                      DHLS Course Enquiry Form
                    </h3>
                    <p className="text-xs text-[#586885]">
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
                      <label htmlFor="fullName" className="block text-xs font-bold text-[#10264A] mb-1.5 uppercase tracking-wider">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Ramesh Kumar"
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm text-[#17233C] focus:outline-none focus:ring-2 transition-all ${
                            errors.fullName
                              ? "border-rose-400 focus:ring-rose-200"
                              : "border-slate-300 focus:border-[#367BFF] focus:ring-[#367BFF]/20"
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
                        <label htmlFor="mobile" className="block text-xs font-bold text-[#10264A] mb-1.5 uppercase tracking-wider">
                          Mobile Number <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 text-xs font-semibold">
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
                            className={`w-full pl-12 pr-4 py-3 rounded-xl bg-white border text-sm text-[#17233C] focus:outline-none focus:ring-2 transition-all ${
                              errors.mobile
                                ? "border-rose-400 focus:ring-rose-200"
                                : "border-slate-300 focus:border-[#367BFF] focus:ring-[#367BFF]/20"
                            }`}
                          />
                        </div>
                        {errors.mobile && (
                          <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.mobile}</p>
                        )}
                      </div>

                      {/* Email Address (Optional) */}
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-[#10264A] mb-1.5 uppercase tracking-wider">
                          Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="name@example.com"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm text-[#17233C] focus:outline-none focus:ring-2 transition-all ${
                              errors.email
                                ? "border-rose-400 focus:ring-rose-200"
                                : "border-slate-300 focus:border-[#367BFF] focus:ring-[#367BFF]/20"
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
                      <label htmlFor="qualification" className="block text-xs font-bold text-[#10264A] mb-1.5 uppercase tracking-wider">
                        Highest Educational Qualification <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <select
                          id="qualification"
                          required
                          value={formData.qualification}
                          onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white border text-sm text-[#17233C] focus:outline-none focus:ring-2 transition-all appearance-none cursor-pointer ${
                            errors.qualification
                              ? "border-rose-400 focus:ring-rose-200"
                              : "border-slate-300 focus:border-[#367BFF] focus:ring-[#367BFF]/20"
                          }`}
                        >
                          <option value="">Select your qualification...</option>
                          <option value="12th Standard (Higher Secondary)">12th Standard / Higher Secondary (10+2)</option>
                          <option value="Graduate / Bachelor's Degree">Graduate / Bachelor&apos;s Degree (B.A, B.Sc, B.Com, etc.)</option>
                          <option value="Post Graduate / Master's Degree">Post Graduate / Master&apos;s Degree</option>
                          <option value="Diploma Holder">Diploma in Other Discipline</option>
                          <option value="Currently Appearing for 12th">Currently Appearing for 12th</option>
                          <option value="Other">Other Qualification</option>
                        </select>
                      </div>
                      {errors.qualification && (
                        <p className="mt-1 text-[11px] text-rose-600 font-medium">{errors.qualification}</p>
                      )}
                    </div>

                    {/* Message / Query */}
                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-[#10264A] mb-1.5 uppercase tracking-wider">
                        Questions or Remarks <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea
                          id="message"
                          rows={3}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us what you would like to know about DHLS admissions or batch schedules..."
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 text-sm text-[#17233C] focus:outline-none focus:border-[#367BFF] focus:ring-2 focus:ring-[#367BFF]/20 transition-all resize-none"
                        />
                      </div>
                    </div>

                    {/* Privacy notice banner */}
                    <p className="text-[11px] text-[#586885] leading-relaxed pt-1">
                      By submitting this form, you acknowledge that your details will be utilized solely by SR College of Education to communicate DHLS course information. No spam or commercial resale.
                    </p>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-[#367BFF] to-[#1A54D6] hover:from-[#4585FF] hover:to-[#2161E8] shadow-lg shadow-[#367BFF]/25 hover:shadow-xl hover:shadow-[#367BFF]/40 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit DHLS Admission Enquiry</span>
                          <Send className="w-4 h-4" />
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
