import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  GraduationCap,
  Clock,
  ShieldCheck,
  Users,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Award,
  Phone,
  Sparkles,
  ChevronRight,
  Briefcase,
  FileText,
  School,
  CalendarCheck,
  Building2,
  CheckCircle,
} from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import AdmissionEnquiry from "@/components/AdmissionEnquiry";
import { getCourseOfferings, getCourseById, type CourseOffering } from "@/lib/dataStore";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const courses = getCourseOfferings();
  return courses.map((course) => ({
    id: course.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const course = getCourseById(id);
  if (!course) {
    return {
      title: "Course Not Found | S.R. College of Education",
    };
  }

  return {
    title: `${course.name} - Eligibility, Syllabus & Admission | S.R College of Education, Rohtak`,
    description: `${course.description} Check eligibility, seat intake, curriculum highlights, and apply online at S.R. College of Education, Rohtak.`,
  };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  const allCourses = getCourseOfferings();
  const otherCourses = allCourses.filter((c) => c.id !== id);

  return (
    <PublicLayout>
      {/* 1. Course Detail Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 bg-[#172A50] text-white overflow-hidden border-b border-[#26345B]">
        {/* Subtle decorative background blurs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#D9AD54]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-300 mb-6 backdrop-blur-xs">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-[#D9AD54]">/</span>
            <Link href="/courses" className="hover:text-white transition-colors">
              Courses
            </Link>
            <span className="text-[#D9AD54]">/</span>
            <span className="text-white font-semibold">{course.shortCode || course.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              {/* Category & Seats Pill */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#D9AD54] text-[#172A50]">
                  {course.category}
                </span>
                {course.seats && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-white/15 px-3 py-1 rounded-full border border-white/20">
                    <Users className="w-3.5 h-3.5 text-[#D9AD54]" />
                    {course.seats}
                  </span>
                )}
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/10">
                  Full-Time Regular
                </span>
              </div>

              {/* Course Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
                {course.name}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-8 max-w-3xl">
                {course.description}
              </p>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#enquiry"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D9AD54] text-[#172A50] hover:bg-[#c99d44] font-bold text-sm shadow-md transition-all cursor-pointer"
                >
                  <span>Enquire for Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="tel:9896302035"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-[#D9AD54]" />
                  <span>Call 9896302035</span>
                </a>

                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  <span>← Back to All Courses</span>
                </Link>
              </div>
            </div>

            {/* Quick Fact Card (Right side) */}
            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 text-white shadow-xl">
              <div className="text-xs font-bold uppercase tracking-wider text-[#D9AD54] mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D9AD54]" />
                <span>Program Snapshot</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                  <Clock className="w-4 h-4 text-[#D9AD54] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-300 text-[11px] uppercase font-semibold">Duration</div>
                    <div className="font-bold text-white text-sm">{course.duration}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                  <ShieldCheck className="w-4 h-4 text-[#D9AD54] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-300 text-[11px] uppercase font-semibold">Affiliation &amp; Approval</div>
                    <div className="font-bold text-white text-sm">{course.affiliation}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-white/10">
                  <Users className="w-4 h-4 text-[#D9AD54] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-300 text-[11px] uppercase font-semibold">Seat Intake</div>
                    <div className="font-bold text-white text-sm">{course.seats || "Sanctioned Seats"}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-4 h-4 text-[#D9AD54] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-slate-300 text-[11px] uppercase font-semibold">Mode of Learning</div>
                    <div className="font-bold text-white text-sm">Full-Time Offline / Regular</div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href="#enquiry"
                  className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-bold text-[#172A50] bg-white hover:bg-stone-100 transition-colors block"
                >
                  Direct Admission Enquiry ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Detailed Eligibility & Highlights Section */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Eligibility & Recognition */}
            <div className="lg:col-span-7">
              {/* Eligibility Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFCF6] border border-[#E8E2D8] mb-8 shadow-xs">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#172A50]/10 text-[#172A50] text-xs font-bold uppercase tracking-wider mb-3">
                  <GraduationCap className="w-3.5 h-3.5 text-[#D9AD54]" />
                  <span>Prescribed Eligibility Criteria</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#172A50] mb-3">
                  Who Can Apply for {course.shortCode || course.name}?
                </h2>
                <div className="p-4 rounded-2xl bg-white border border-[#E8E2D8] mb-4">
                  <p className="text-sm sm:text-base font-semibold text-[#172A50] leading-relaxed">
                    {course.eligibility}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-[#718096] leading-relaxed mb-4">
                  Candidates from recognized boards and universities meeting the minimum percentage criteria are eligible. Category relaxations (SC/ST/OBC/PwD) apply as per statutory guidelines of the State Government, Maharshi Dayanand University (MDU), and RCI/NCTE.
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Document verification and counseling support provided on campus.</span>
                </div>
              </div>

              {/* Highlights & Features */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#172A50] mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#D9AD54]" />
                  <span>Program Highlights &amp; Accreditations</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {course.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FFFCF6] border border-[#E8E2D8] flex items-start gap-3 shadow-2xs"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#263238] font-medium leading-snug">
                        {h}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Admission Process & Timeline */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#172A50] text-white shadow-lg sticky top-28">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D9AD54] mb-3">
                  <CalendarCheck className="w-4 h-4 text-[#D9AD54]" />
                  <span>Admission Procedure</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4">
                  How to Secure Your Seat
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {course.admissionProcess ||
                    "Admissions are conducted through centralized merit counseling in accordance with regulatory standards."}
                </p>

                {/* Steps */}
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#D9AD54] text-[#172A50] font-black text-xs flex items-center justify-center shrink-0">
                      1
                    </div>
                    <div>
                      <div className="font-bold text-white">Online Enquiry &amp; Registration</div>
                      <div className="text-slate-300 text-xs">Fill out the official enquiry form below or visit campus.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-white/20 text-[#D9AD54] font-black text-xs flex items-center justify-center shrink-0">
                      2
                    </div>
                    <div>
                      <div className="font-bold text-white">Counseling &amp; Eligibility Check</div>
                      <div className="text-slate-300 text-xs">Our academic desk verifies qualifying marksheets and eligibility.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-white/20 text-[#D9AD54] font-black text-xs flex items-center justify-center shrink-0">
                      3
                    </div>
                    <div>
                      <div className="font-bold text-white">Document Verification &amp; Allotment</div>
                      <div className="text-slate-300 text-xs">Submission of original certificates, photographs, and counseling slip.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-white/20 text-[#D9AD54] font-black text-xs flex items-center justify-center shrink-0">
                      4
                    </div>
                    <div>
                      <div className="font-bold text-white">Seat Confirmation &amp; Class Commencement</div>
                      <div className="text-slate-300 text-xs">Fee clearance and receipt of student ID, syllabus, and orientation date.</div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-2.5">
                  <a
                    href="tel:9896302035"
                    className="w-full py-3 px-4 rounded-xl text-center text-xs font-bold text-[#172A50] bg-[#D9AD54] hover:bg-[#c99d44] transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Admission Coordinator: 9896302035</span>
                  </a>
                  <a
                    href="tel:9992700255"
                    className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D9AD54]" />
                    <span>Counseling Helpline: 9992700255</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Curriculum & Career Opportunities Grid */}
      <section className="py-16 sm:py-24 bg-[#FFFCF6] border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Curriculum Highlights */}
            {course.curriculumHighlights && course.curriculumHighlights.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#172A50]/5 text-[#172A50] text-xs font-bold uppercase tracking-wider mb-3">
                  <BookOpen className="w-3.5 h-3.5 text-[#D9AD54]" />
                  <span>Curriculum Structure</span>
                </div>
                <h3 className="text-2xl font-bold text-[#172A50] mb-3">
                  Core Subjects &amp; Learning Modules
                </h3>
                <p className="text-xs sm:text-sm text-[#718096] mb-6">
                  Carefully balanced between theoretical pedagogy, clinical testing, diagnostic labs, and field engagement.
                </p>

                <div className="space-y-3">
                  {course.curriculumHighlights.map((curr, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#FFFCF6] border border-[#E8E2D8] flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#172A50] text-[#D9AD54] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-xs sm:text-sm text-[#263238] font-medium leading-relaxed">
                        {curr}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Career Scope */}
            {course.careerOpportunities && course.careerOpportunities.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E2D8] shadow-xs">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1745]/10 text-[#8B1745] text-xs font-bold uppercase tracking-wider mb-3">
                  <Briefcase className="w-3.5 h-3.5 text-[#8B1745]" />
                  <span>Career &amp; Professional Scope</span>
                </div>
                <h3 className="text-2xl font-bold text-[#172A50] mb-3">
                  Where Can You Work After Graduation?
                </h3>
                <p className="text-xs sm:text-sm text-[#718096] mb-6">
                  Graduates from S.R. College of Education are equipped for employment across educational institutions, clinics, and government sectors.
                </p>

                <div className="space-y-3">
                  {course.careerOpportunities.map((career, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#FFFCF6] border border-[#E8E2D8] flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#263238] font-medium leading-relaxed">
                        {career}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Dedicated Course Admission Enquiry Form */}
      <div id="enquiry">
        <AdmissionEnquiry
          initialCourse={course.name}
          title={`Enquire for ${course.name}`}
          subtitle={`Submit your details to receive instant counseling and eligibility guidance for ${course.name} from the S.R. College of Education admissions desk.`}
        />
      </div>

      {/* 5. Explore Other Courses Navigation Section */}
      <section className="py-16 sm:py-20 bg-white border-t border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#D9AD54] mb-1">
                Explore More Programs
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172A50]">
                Other Courses at S.R. College of Education
              </h2>
            </div>
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#172A50] hover:text-[#8B1745] transition-colors"
            >
              <span>View All 5 Courses</span>
              <ArrowRight className="w-4 h-4 text-[#D9AD54]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {otherCourses.map((other) => (
              <div
                key={other.id}
                className="p-5 rounded-2xl bg-[#FFFCF6] border border-[#E8E2D8] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#172A50]/5 text-[#172A50] border border-[#172A50]/10 mb-2">
                    {other.category}
                  </span>
                  <h3 className="font-bold text-sm text-[#172A50] mb-1 line-clamp-2">
                    <Link href={`/courses/${other.id}`} className="hover:underline">
                      {other.name}
                    </Link>
                  </h3>
                  <div className="text-[11px] text-[#718096] mb-3 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D9AD54]" />
                    <span>{other.duration}</span>
                  </div>
                  <p className="text-[11px] text-[#718096] line-clamp-2 mb-4">
                    {other.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E2D8] flex items-center justify-between gap-2">
                  <Link
                    href={`/courses/${other.id}`}
                    className="text-xs font-bold text-[#172A50] hover:text-[#8B1745] flex items-center gap-1"
                  >
                    <span>View Page</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#D9AD54]" />
                  </Link>
                  <Link
                    href={`/courses/${other.id}#enquiry`}
                    className="text-[11px] font-bold text-white bg-[#172A50] hover:bg-[#26345B] px-2.5 py-1 rounded-md"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
