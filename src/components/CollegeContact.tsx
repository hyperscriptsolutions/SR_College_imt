import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Navigation,
  Clock,
  Building,
  CheckCircle2,
} from "lucide-react";

export default function CollegeContact() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#F5F7FC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10264A]/10 border border-[#10264A]/20 text-xs font-bold text-[#10264A] uppercase tracking-wider mb-3">
            <Building className="w-3.5 h-3.5 text-[#367BFF]" />
            Campus Location & Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#10264A] tracking-tight mb-4">
            Visit & Contact SR College of Education
          </h2>
          <p className="text-base sm:text-lg text-[#586885] leading-relaxed">
            Reach out directly to the institution in Rohtak, Haryana for in-person consultations, campus tours, and verified DHLS admission guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: Verified Institution Profile Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[#367BFF] mb-2">
                <span className="w-2 h-2 rounded-full bg-[#367BFF]" />
                Institutional Headquarters
              </div>

              <h3 className="text-2xl font-extrabold text-[#10264A] mb-4">
                SR COLLEGE OF EDUCATION
              </h3>

              <div className="space-y-6 mb-8">
                
                {/* Physical Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-[#10264A] flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#367BFF]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10264A] uppercase tracking-wider mb-1">
                      Campus Address
                    </div>
                    <p className="text-sm text-[#586885] leading-relaxed">
                      L.M.T., Sector 30-B, Kheri Sadh, Delhi Road,
                      <br />
                      Rohtak – 124001, Haryana, India.
                    </p>
                  </div>
                </div>

                {/* Telephone Numbers */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-[#10264A] flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#367BFF]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10264A] uppercase tracking-wider mb-1">
                      Direct Telephones (Click to Call)
                    </div>
                    <div className="flex flex-col gap-1 text-sm font-semibold">
                      <a
                        href="tel:9416968076"
                        className="text-[#367BFF] hover:underline flex items-center gap-1.5"
                      >
                        +91 9416968076
                      </a>
                      <a
                        href="tel:9896302035"
                        className="text-[#367BFF] hover:underline flex items-center gap-1.5"
                      >
                        +91 9896302035
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-[#10264A] flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-[#367BFF]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10264A] uppercase tracking-wider mb-1">
                      Official College Email
                    </div>
                    <a
                      href="mailto:srcollegeeducation@gmail.com"
                      className="text-sm font-semibold text-[#10264A] hover:text-[#367BFF] hover:underline transition-colors"
                    >
                      srcollegeeducation@gmail.com
                    </a>
                  </div>
                </div>

                {/* Official Website */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-[#10264A] flex-shrink-0 mt-0.5">
                    <Globe className="w-5 h-5 text-[#367BFF]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10264A] uppercase tracking-wider mb-1">
                      Institutional Website
                    </div>
                    <a
                      href="https://www.srcoe.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-[#367BFF] hover:underline inline-flex items-center gap-1"
                    >
                      <span>https://www.srcoe.com/</span>
                    </a>
                  </div>
                </div>

                {/* Office Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-100 text-[#10264A] flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-[#367BFF]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#10264A] uppercase tracking-wider mb-1">
                      Campus Admissions Hours
                    </div>
                    <p className="text-xs text-[#586885]">
                      Monday – Saturday: 9:00 AM – 4:30 PM IST (Except public holidays)
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct Google Directions Link */}
            <div className="pt-6 border-t border-slate-100">
              <a
                href="https://www.google.com/maps/search/?api=1&query=SR+College+of+Education+Sector+30-B+Kheri+Sadh+Rohtak+Haryana"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold text-[#10264A] bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#367BFF]" />
                <span>Open in Google Maps / Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Map Embed & Campus Visual */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-md flex flex-col justify-between">
            
            {/* Embedded Responsive Map */}
            <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <iframe
                title="SR College of Education Location Map"
                src="https://maps.google.com/maps?q=SR%20College%20of%20Education%2C%20Sector%2030-B%2C%20Kheri%20Sadh%2C%20Delhi%20Road%2C%20Rohtak%20Haryana&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-white/95 backdrop-blur-md shadow-lg border border-slate-200 text-xs">
                <div className="font-bold text-[#10264A] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  SR College of Education
                </div>
                <div className="text-[11px] text-[#586885]">
                  Sector 30-B, Kheri Sadh, Rohtak
                </div>
              </div>
            </div>

            {/* Bottom highlights note */}
            <div className="mt-4 px-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#586885]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Easily accessible from Delhi-Rohtak Expressway</span>
              </div>
              <a
                href="/eligibility-admission#enquiry"
                className="font-bold text-[#2684FF] hover:underline"
              >
                Submit Online Enquiry &rarr;
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
