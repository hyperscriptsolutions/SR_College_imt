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
    <section id="contact" className="py-20 sm:py-28 bg-[#FFFCF6] relative border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9AD54]/10 border border-[#D9AD54]/30 text-xs font-bold text-[#B88B2E] uppercase tracking-wider mb-3">
            <Building className="w-3.5 h-3.5 text-[#D9AD54]" />
            Campus Location &amp; Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#172A50] tracking-tight mb-4">
            Visit &amp; Contact S. R. College of Education
          </h2>
          <p className="text-base sm:text-lg text-[#718096] leading-relaxed">
            Reach out directly to the institution in Rohtak, Haryana for in-person consultations, campus tours, and verified DHLS admission guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left Column: Verified Institution Profile Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-9 border border-[#E8E2D8] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1745] mb-2">
                <span className="w-2 h-2 rounded-full bg-[#8B1745]" />
                Institutional Headquarters
              </div>

              <h3 className="text-2xl font-extrabold text-[#172A50] mb-5">
                S. R. COLLEGE OF EDUCATION
              </h3>

              <div className="space-y-5 mb-8">
                
                {/* Physical Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#172A50]/10 text-[#172A50] flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-[#8B1745]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#172A50] uppercase tracking-wider mb-1">
                      Campus Address
                    </div>
                    <p className="text-xs sm:text-sm text-[#718096] leading-relaxed">
                      S. R. College of Education,
                      <br />
                      IMT, Sector 30-B, Delhi Road, Rohtak, Haryana
                    </p>
                  </div>
                </div>

                {/* Telephone Numbers */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#172A50]/10 text-[#172A50] flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5 text-[#D9AD54]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#172A50] uppercase tracking-wider mb-1">
                      Direct Telephones (Click to Call)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-sm font-semibold font-mono">
                      <a
                        href="tel:9886302035"
                        className="text-[#172A50] hover:text-[#8B1745] hover:underline flex items-center gap-1.5"
                      >
                        +91 9886302035
                      </a>
                      <a
                        href="tel:9992700642"
                        className="text-[#172A50] hover:text-[#8B1745] hover:underline flex items-center gap-1.5"
                      >
                        +91 9992700642
                      </a>
                      <a
                        href="tel:9992700255"
                        className="text-[#172A50] hover:text-[#8B1745] hover:underline flex items-center gap-1.5"
                      >
                        +91 9992700255
                      </a>
                      <a
                        href="tel:9306040793"
                        className="text-[#172A50] hover:text-[#8B1745] hover:underline flex items-center gap-1.5"
                      >
                        +91 9306040793
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#172A50]/10 text-[#172A50] flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5 text-[#8B1745]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#172A50] uppercase tracking-wider mb-1">
                      Official College Email
                    </div>
                    <a
                      href="mailto:srcollegeeducation@gmail.com"
                      className="text-xs sm:text-sm font-semibold text-[#172A50] hover:text-[#8B1745] hover:underline transition-colors"
                    >
                      srcollegeeducation@gmail.com
                    </a>
                  </div>
                </div>

                {/* Official Website */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#172A50]/10 text-[#172A50] flex-shrink-0 mt-0.5">
                    <Globe className="w-5 h-5 text-[#D9AD54]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#172A50] uppercase tracking-wider mb-1">
                      Institutional Website
                    </div>
                    <a
                      href="https://www.srcoe.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-[#172A50] hover:text-[#8B1745] hover:underline inline-flex items-center gap-1"
                    >
                      <span>https://www.srcoe.com/</span>
                    </a>
                  </div>
                </div>

                {/* Office Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-[#172A50]/10 text-[#172A50] flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-[#D9AD54]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#172A50] uppercase tracking-wider mb-1">
                      Campus Admissions Hours
                    </div>
                    <p className="text-xs text-[#718096]">
                      Monday – Saturday: 9:00 AM – 4:00 PM IST
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Direct Google Directions Link */}
            <div className="pt-6 border-t border-stone-100">
              <a
                href="https://www.google.com/maps/search/?api=1&query=S.+R.+College+of+Education+IMT+Sector+30-B+Delhi+Road+Rohtak+Haryana"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-xs sm:text-sm font-bold text-white bg-[#172A50] hover:bg-[#26345B] transition-colors shadow-sm"
              >
                <Navigation className="w-4 h-4 text-[#D9AD54]" />
                <span>Open in Google Maps / Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Map Embed */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-5 border border-[#E8E2D8] shadow-sm flex flex-col justify-between">
            
            {/* Embedded Responsive Map */}
            <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden border border-[#E8E2D8] bg-stone-100">
              <iframe
                title="S. R. College of Education Location Map"
                src="https://maps.google.com/maps?q=S.%20R.%20College%20of%20Education%2C%20IMT%2C%20Sector%2030-B%2C%20Delhi%20Road%2C%20Rohtak%2C%20Haryana&t=&z=14&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />

              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-white/95 backdrop-blur-xs shadow-md border border-[#E8E2D8] text-xs">
                <div className="font-bold text-[#172A50] flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#8B1745]" />
                  S. R. College of Education
                </div>
                <div className="text-[11px] text-[#718096]">
                  IMT, Sector 30-B, Delhi Road, Rohtak
                </div>
              </div>
            </div>

            {/* Bottom highlights note */}
            <div className="mt-4 px-2 flex flex-wrap items-center justify-between gap-3 text-xs text-[#718096]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B1745]" />
                <span>Easily accessible from Delhi-Rohtak Expressway</span>
              </div>
              <a
                href="/eligibility-admission#enquiry"
                className="font-bold text-[#172A50] hover:text-[#8B1745] hover:underline"
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
