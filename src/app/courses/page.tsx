import React from "react";
import Link from "next/link";
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
  School,
  FileCheck,
} from "lucide-react";
import PublicLayout from "@/components/PublicLayout";
import CoursesOffered from "@/components/CoursesOffered";
import { getCourseOfferings } from "@/lib/dataStore";

export const metadata = {
  title: "Academic Courses & Degree Programs | S.R College of Education, Rohtak",
  description:
    "Explore NCTE & RCI approved programs at S.R. College of Education, Rohtak: B.Ed (General), B.Ed Special Education (SLD), M.Ed Special Education (SLD), PGDRP, and DHLS.",
};

export default function CoursesPage() {
  const courses = getCourseOfferings();

  return (
    <PublicLayout>
      {/* Header Banner */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 bg-[#172A50] text-white overflow-hidden border-b border-[#26345B]">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#D9AD54]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Breadcrumbs */}
          <nav className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-slate-300 mb-6 backdrop-blur-xs">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-[#D9AD54]">/</span>
            <span className="text-white font-semibold">Courses</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 leading-tight">
            Academic Courses &amp; <span className="text-[#D9AD54]">Degree Programs</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-200 leading-relaxed mb-8">
            S.R. College of Education offers 5 distinguished, recognized programs in teacher education,
            special education, rehabilitation psychology, and clinical audiology affiliated to
            Maharshi Dayanand University (MDU), Rohtak and approved by NCTE &amp; RCI.
          </p>

          {/* Key Reference Stats Chips */}
          <div className="inline-flex flex-wrap justify-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <Award className="w-4 h-4 text-[#D9AD54]" />
              <span>NCTE &amp; RCI Approved</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <School className="w-4 h-4 text-[#D9AD54]" />
              <span>Affiliated to MDU Rohtak</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <GraduationCap className="w-4 h-4 text-[#D9AD54]" />
              <span>5 Specialized Programs</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-xs">
              <Users className="w-4 h-4 text-[#D9AD54]" />
              <span>180+ Annual Intake Seats</span>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Offered Interactive Grid */}
      <CoursesOffered courses={courses} />

      {/* Comparative Course Matrix Table */}
      <section className="py-16 sm:py-20 bg-white border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#172A50]/5 border border-[#172A50]/10 text-[#172A50] text-xs font-bold uppercase tracking-wider mb-3">
              <FileCheck className="w-3.5 h-3.5 text-[#D9AD54]" />
              <span>Programs at a Glance</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172A50] tracking-tight mb-3">
              Official Course Comparison &amp; Intake
            </h2>
            <p className="text-sm sm:text-base text-[#718096]">
              Detailed breakdown of intake capacities, approving regulatory bodies, and academic duration.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E8E2D8] shadow-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#172A50] text-white text-xs uppercase tracking-wider">
                  <th className="py-4 px-5 font-bold">Course / Program</th>
                  <th className="py-4 px-4 font-bold">Category</th>
                  <th className="py-4 px-4 font-bold">Duration</th>
                  <th className="py-4 px-4 font-bold">Seats</th>
                  <th className="py-4 px-4 font-bold">Approval / Affiliation</th>
                  <th className="py-4 px-4 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D8] text-xs sm:text-sm text-[#263238]">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-[#FFFCF6] transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#172A50] text-sm">
                        <Link href={`/courses/${course.id}`} className="hover:underline">
                          {course.name}
                        </Link>
                      </div>
                      <div className="text-xs text-[#718096] mt-0.5 line-clamp-1">{course.description}</div>
                    </td>
                    <td className="py-4 px-4 font-medium text-[#172A50]">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#172A50]/5 border border-[#172A50]/10">
                        {course.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-medium">{course.duration}</td>
                    <td className="py-4 px-4 font-bold text-[#8B1745]">{course.seats || "Available"}</td>
                    <td className="py-4 px-4 text-xs text-[#718096] max-w-xs">{course.affiliation}</td>
                    <td className="py-4 px-4 text-center">
                      <Link
                        href={`/courses/${course.id}#enquiry`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#172A50] hover:bg-[#26345B] transition-colors"
                      >
                        <span>Enquire</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#D9AD54]" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Study at S.R. College Section */}
      <section className="py-16 sm:py-24 bg-[#FFFCF6] border-b border-[#E8E2D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9AD54]/10 border border-[#D9AD54]/30 text-xs font-bold text-[#B88B2E] uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Institutional Excellence</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#172A50] tracking-tight mb-4">
                Why Pursue Your Career at S.R. College of Education?
              </h2>
              <p className="text-sm sm:text-base text-[#718096] leading-relaxed mb-6">
                Situated in Rohtak, Haryana, our campus blends rigorous university curriculum with real-world clinical and pedagogical practice. Our students gain practical competence that enables them to excel in national recruitment exams and rehabilitation services.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="tel:9896302035"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#172A50] text-white hover:bg-[#26345B] text-xs font-bold shadow-xs transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D9AD54]" />
                  <span>Call Admissions Desk</span>
                </a>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#172A50] border border-[#E8E2D8] hover:bg-stone-50 text-xs font-bold transition-all"
                >
                  <span>Visit Campus</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D9AD54]" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#172A50]/10 flex items-center justify-center text-[#172A50] mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#172A50] mb-1.5">RCI &amp; NCTE Approved</h3>
                <p className="text-xs text-[#718096] leading-relaxed">
                  Every degree and diploma is recognized by government statutory councils, granting eligibility for national CRR numbers, CTET, and HTET exams.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#D9AD54]/15 flex items-center justify-center text-[#B88B2E] mb-3">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#172A50] mb-1.5">Clinical &amp; School Practicum</h3>
                <p className="text-xs text-[#718096] leading-relaxed">
                  Extensive clinical rotations, speech lab practice, sound-treated audiology suites, and structured internship in recognized schools.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-[#8B1745]/10 flex items-center justify-center text-[#8B1745] mb-3">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#172A50] mb-1.5">Expert Faculty Mentorship</h3>
                <p className="text-xs text-[#718096] leading-relaxed">
                  Highly experienced educationists, clinical psychologists, audiologists, and speech therapists guiding students individually.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#E8E2D8] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#172A50] mb-1.5">100% Placement Support</h3>
                <p className="text-xs text-[#718096] leading-relaxed">
                  Active placement cell connecting graduates with government schools, private academies, hospitals, clinics, and rehabilitation institutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
