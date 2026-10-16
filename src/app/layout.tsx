import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#10264A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "DHLS Course | SR College of Education, Rohtak",
  description:
    "Explore the Diploma in Hearing Language and Speech (DHLS) at SR College of Education, Rohtak. Understand course subjects, eligibility, communication theories, audiology, and admission enquiry.",
  keywords: [
    "DHLS",
    "Diploma in Hearing Language and Speech",
    "SR College of Education",
    "Rohtak",
    "Hearing and Speech Course",
    "Audiology",
    "Speech Language Pathology",
    "Communication Sciences",
    "Haryana Education",
  ],
  authors: [{ name: "SR College of Education", url: "https://www.srcoe.com/" }],
  creator: "SR College of Education",
  publisher: "SR College of Education",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "DHLS Course | SR College of Education, Rohtak",
    description:
      "Understand Hearing. Discover Speech. Empower Communication. Explore the Diploma in Hearing Language and Speech (DHLS) curriculum and admission guidelines.",
    url: "https://www.srcoe.com/",
    siteName: "SR College of Education",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DHLS Course | SR College of Education, Rohtak",
    description:
      "Understand Hearing. Discover Speech. Empower Communication. Explore the Diploma in Hearing Language and Speech (DHLS).",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "SR College of Education",
    "url": "https://www.srcoe.com/",
    "logo": "https://www.srcoe.com/images/logo1.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "L.M.T., Sector 30-B, Kheri Sadh, Delhi Road",
      "addressLocality": "Rohtak",
      "postalCode": "124001",
      "addressRegion": "Haryana",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9416968076",
        "contactType": "admissions",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-9896302035",
        "contactType": "enquiries",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      }
    ]
  };

  return (
    <html lang="en" className={`${jakarta.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#F5F7FC] text-[#17233C] antialiased selection:bg-[#367BFF] selection:text-white">
        {children}
      </body>
    </html>
  );
}
