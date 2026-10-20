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
  themeColor: "#172A50",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "DHLS Course | S.R College of Education, Rohtak",
  description:
    "Explore the Diploma in Hearing Language and Speech (DHLS) at S.R College of Education, Rohtak. Understand course subjects, eligibility, communication theories, audiology, and admission enquiry.",
  keywords: [
    "DHLS",
    "Diploma in Hearing Language and Speech",
    "S.R College of Education",
    "Rohtak",
    "Hearing and Speech Course",
    "Audiology",
    "Speech Language Pathology",
    "Communication Sciences",
    "Haryana Education",
  ],
  authors: [{ name: "S.R College of Education", url: "https://www.srcoe.com/" }],
  creator: "S.R College of Education",
  publisher: "S.R College of Education",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "DHLS Course | S.R College of Education, Rohtak",
    description:
      "Understand Hearing. Discover Speech. Empower Communication. Explore the Diploma in Hearing Language and Speech (DHLS) curriculum and admission guidelines.",
    url: "https://www.srcoe.com/",
    siteName: "S.R College of Education",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DHLS Course | S.R College of Education, Rohtak",
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
    "name": "S.R College of Education",
    "url": "https://www.srcoe.com/",
    "logo": "https://www.srcoe.com/images/logo1.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "S.R College of Education, IMT, Sector 30-B, Delhi Road",
      "addressLocality": "Rohtak",
      "postalCode": "124001",
      "addressRegion": "Haryana",
      "addressCountry": "IN"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9896302035",
        "contactType": "admissions",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-7404153253",
        "contactType": "admissions",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-9992700255",
        "contactType": "enquiries",
        "areaServed": "IN",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-9306040793",
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
      <body className="min-h-screen bg-[#FFFCF6] text-[#263238] antialiased selection:bg-[#D9AD54]/30 selection:text-[#172A50]">
        {children}
      </body>
    </html>
  );
}
