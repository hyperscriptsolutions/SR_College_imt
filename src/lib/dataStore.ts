import fs from "fs";
import path from "path";
import { hashPassword } from "./auth";

const DATA_DIR = path.join(process.cwd(), ".data");

function ensureDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filename: string, defaultData: T): T {
  ensureDirectory();
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    writeJsonFile(filename, defaultData);
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return defaultData;
  }
}

function writeJsonFile<T>(filename: string, data: T): void {
  ensureDirectory();
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
  }
}

// -------------------------------------------------------------
// 1. DHLS Course Content
// -------------------------------------------------------------
export interface CourseContent {
  courseTitle: string;
  heroHeadline: string;
  heroSupporting: string;
  description: string;
  duration: string;
  eligibility: string;
  mode: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  isPublished: boolean;
  lastUpdated: string;
}

const DEFAULT_COURSE_CONTENT: CourseContent = {
  courseTitle: "Diploma in Hearing Language and Speech (DHLS)",
  heroHeadline: "Understand Hearing. Discover Speech. Empower Communication.",
  heroSupporting:
    "Explore the Diploma in Hearing Language and Speech (DHLS) and discover how communication, language and hearing come together.",
  description:
    "An offline, regular 1-year diploma course recognised by the Rehabilitation Council of India (RCI). The curriculum explores the scientific mechanisms of speech organs, linguistic articulation, acoustic soundwaves, audiology, and community rehabilitation.",
  duration: "1 Year (Regular)",
  eligibility: "12th (PCM / PCB) & Above",
  mode: "Offline (Regular)",
  primaryCtaText: "Explore the DHLS Course",
  secondaryCtaText: "Enquire About Admission",
  isPublished: true,
  lastUpdated: new Date().toISOString(),
};

export function getCourseContent(): CourseContent {
  return readJsonFile<CourseContent>("content.json", DEFAULT_COURSE_CONTENT);
}

export function updateCourseContent(updates: Partial<CourseContent>): CourseContent {
  const current = getCourseContent();
  const updated: CourseContent = {
    ...current,
    ...updates,
    lastUpdated: new Date().toISOString(),
  };
  writeJsonFile("content.json", updated);
  return updated;
}

// -------------------------------------------------------------
// 2. Curriculum & Subjects Management
// -------------------------------------------------------------
export interface SubjectItem {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  isPublished: boolean;
  sortOrder: number;
}

export interface SemesterData {
  id: number;
  name: string;
  tagline: string;
  subjects: SubjectItem[];
}

const DEFAULT_CURRICULUM: SemesterData[] = [
  {
    id: 1,
    name: "Semester 1",
    tagline: "Foundations of Communication, Speech Anatomy, Language Expression & Assessment",
    subjects: [
      {
        id: "s1-1",
        code: "DHLS-101",
        title: "Personality Development and Communication Skills",
        category: "Personal & Interpersonal Growth",
        description: "Self-confidence, voice modulation, interpersonal communication, and active listening.",
        isPublished: true,
        sortOrder: 1,
      },
      {
        id: "s1-2",
        code: "DHLS-102",
        title: "Communication Theories",
        category: "Theoretical Linguistics",
        description: "Classical and modern communication models, encoding, decoding, and feedback mechanisms.",
        isPublished: true,
        sortOrder: 2,
      },
      {
        id: "s1-3",
        code: "DHLS-103",
        title: "Expressionism of the Language",
        category: "Language Articulation",
        description: "Emotional tonality, syntax structure, and conveying communicative intent.",
        isPublished: true,
        sortOrder: 3,
      },
      {
        id: "s1-4",
        code: "DHLS-104",
        title: "Developing Language Oral and Written Skills",
        category: "Core Skills Development",
        description: "Pronunciation clarity, syntactic sentence construction, and structured writing.",
        isPublished: true,
        sortOrder: 4,
      },
      {
        id: "s1-5",
        code: "DHLS-105",
        title: "Command Over Targeted Language",
        category: "Linguistic Fluency",
        description: "Grammatical mastery, idiomatic comprehension, and fluency in primary language.",
        isPublished: true,
        sortOrder: 5,
      },
      {
        id: "s1-6",
        code: "DHLS-106",
        title: "Language Interpreting",
        category: "Applied Translation",
        description: "Real-time message interpretation, cross-lingual accuracy, and assistive conversion.",
        isPublished: true,
        sortOrder: 6,
      },
      {
        id: "s1-7",
        code: "DHLS-107",
        title: "Communication, Language and Speech",
        category: "Core Foundations",
        description: "Triad connecting cognition, acoustic speech generation, and listener comprehension.",
        isPublished: true,
        sortOrder: 7,
      },
      {
        id: "s1-8",
        code: "DHLS-108",
        title: "Anatomy and Physiology of the Speech Mechanism",
        category: "Biological Foundations",
        description: "Respiratory apparatus, laryngeal vocal folds, resonation, and articulators.",
        isPublished: true,
        sortOrder: 8,
      },
      {
        id: "s1-9",
        code: "DHLS-109",
        title: "Internal Assessment",
        category: "Academic Evaluation",
        description: "Continuous coursework evaluation, quizzes, presentations, and periodic midterm reviews.",
        isPublished: true,
        sortOrder: 9,
      },
    ],
  },
  {
    id: 2,
    name: "Semester 2",
    tagline: "Audiology, Indian Sign Language (ISL), Speech Pathology & Rehabilitation",
    subjects: [
      {
        id: "s2-1",
        code: "DHLS-201",
        title: "Oral Expression of the Language",
        category: "Speech Articulation",
        description: "Spoken fluency, pronunciation accuracy, pitch variation, and conversational spontaneity.",
        isPublished: true,
        sortOrder: 1,
      },
      {
        id: "s2-2",
        code: "DHLS-202",
        title: "Indian Sign Language (ISL) as a Language",
        category: "Visual-Gestural Language",
        description: "ISL grammar, manual alphabet finger-spelling, facial expressions, and spatial syntax.",
        isPublished: true,
        sortOrder: 2,
      },
      {
        id: "s2-3",
        code: "DHLS-203",
        title: "Communicative English and Computer Fundamentals",
        category: "Digital & Language Tools",
        description: "Computer literacy, documentation processing, and English comprehension for educational setups.",
        isPublished: true,
        sortOrder: 3,
      },
      {
        id: "s2-4",
        code: "DHLS-204",
        title: "Audiology (Sound and Hearing)",
        category: "Auditory Science",
        description: "Sound physics, ear anatomy, decibel calibration, and introductory audiometric assessments.",
        isPublished: true,
        sortOrder: 4,
      },
      {
        id: "s2-5",
        code: "DHLS-205",
        title: "Speech and Language Pathology",
        category: "Clinical Overview",
        description: "Introduction to speech variations, voice characteristics, and rehabilitation concepts.",
        isPublished: true,
        sortOrder: 5,
      },
      {
        id: "s2-6",
        code: "DHLS-206",
        title: "Community-Based Rehabilitation",
        category: "Social Integration",
        description: "Inclusive education, community awareness, and support systems for diverse individuals.",
        isPublished: true,
        sortOrder: 6,
      },
      {
        id: "s2-7",
        code: "DHLS-207",
        title: "Legal Language and Legal Writing",
        category: "Legal Frameworks",
        description: "Disability rights legislation, documentation norms, record keeping, and ethical standards.",
        isPublished: true,
        sortOrder: 7,
      },
      {
        id: "s2-8",
        code: "DHLS-208",
        title: "Internal Assessment and Project",
        category: "Practical Submission",
        description: "Coursework portfolio, project assignment submission, and internal appraisals.",
        isPublished: true,
        sortOrder: 8,
      },
      {
        id: "s2-9",
        code: "DHLS-209",
        title: "Viva",
        category: "Comprehensive Oral Exam",
        description: "Summative oral examination assessing comprehensive understanding of DHLS fundamentals.",
        isPublished: true,
        sortOrder: 9,
      },
    ],
  },
];

export function getCurriculum(): SemesterData[] {
  return readJsonFile<SemesterData[]>("curriculum.json", DEFAULT_CURRICULUM);
}

export function saveCurriculum(curriculum: SemesterData[]): SemesterData[] {
  writeJsonFile("curriculum.json", curriculum);
  updateContentTimestamp();
  return curriculum;
}

// -------------------------------------------------------------
// 3. FAQs Management
// -------------------------------------------------------------
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isPublished: boolean;
  sortOrder: number;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What does DHLS stand for?",
    answer: "DHLS stands for Diploma in Hearing Language and Speech. It is an educational diploma program focused on the foundational study of human communication, speech and language articulation, auditory acoustics, and speech mechanisms.",
    isPublished: true,
    sortOrder: 1,
  },
  {
    id: "faq-2",
    question: "How long is the DHLS course and what is its recognition?",
    answer: "The DHLS course is a regular 1-Year (2 Semesters) diploma course recognised by the Rehabilitation Council of India (RCI).",
    isPublished: true,
    sortOrder: 2,
  },
  {
    id: "faq-3",
    question: "What educational qualification is listed for eligibility?",
    answer: "The entry eligibility is 12th (PCM or PCB) and Above. Applicants who have completed their 10+2 / Higher Secondary education with Physics, Chemistry, Mathematics (PCM) or Biology (PCB) from a recognized education board are eligible to apply for this regular offline diploma course recognised by the Rehabilitation Council of India (RCI).",
    isPublished: true,
    sortOrder: 3,
  },
  {
    id: "faq-4",
    question: "What subjects are included in DHLS?",
    answer: "The curriculum includes 18 subjects spanning across 2 semesters, covering Personality Development, Communication Theories, Expressionism, Language Interpreting, Speech Anatomy, Indian Sign Language, Audiology, and Speech Pathology.",
    isPublished: true,
    sortOrder: 4,
  },
  {
    id: "faq-5",
    question: "Is the DHLS course available online or offline?",
    answer: "The DHLS course is conducted strictly in Offline, Regular mode. It is a full-time 1-year diploma course recognised by the Rehabilitation Council of India (RCI), featuring regular classroom lectures, hands-on audiology lab sessions, speech therapy clinics, and practical training on campus at S.R College of Education, Rohtak.",
    isPublished: true,
    sortOrder: 5,
  },
  {
    id: "faq-6",
    question: "How can I contact S.R COLLEGE OF EDUCATION?",
    answer: "You can reach S.R COLLEGE OF EDUCATION by phone at 9896302035, 7404153253, 9992700255, or 9306040793, by email at srcollegeeducation@gmail.com, or by visiting the campus at S.R COLLEGE OF EDUCATION, IMT, Sector 30-B, Delhi Road, Rohtak, Haryana.",
    isPublished: true,
    sortOrder: 6,
  },
  {
    id: "faq-7",
    question: "Is DHLS admission currently available at S.R College?",
    answer: "DHLS has an intake capacity of 30 seats. Admissions are conducted centrally through registration on the NBER-RCI portal, generally during the months of August to October. Candidates must complete the online registration process and follow the prescribed counselling and admission procedure.",
    isPublished: true,
    sortOrder: 7,
  },
  {
    id: "faq-8",
    question: "What are the current fees and admission requirements?",
    answer: "Official fee structures and enrollment documentation must be confirmed directly with S.R College of Education to ensure students receive accurate, up-to-date guidance.",
    isPublished: true,
    sortOrder: 8,
  },
];

export function getFAQs(): FAQItem[] {
  return readJsonFile<FAQItem[]>("faqs.json", DEFAULT_FAQS);
}

export function saveFAQs(faqs: FAQItem[]): FAQItem[] {
  writeJsonFile("faqs.json", faqs);
  updateContentTimestamp();
  return faqs;
}

// -------------------------------------------------------------
// 4. Admission Enquiries Management
// -------------------------------------------------------------
export interface StoredEnquiry {
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

export function getEnquiries(): StoredEnquiry[] {
  // Support both dhls_enquiries.json and enquiries.json
  const list = readJsonFile<StoredEnquiry[]>("dhls_enquiries.json", []);
  return list.map((e) => ({
    ...e,
    status: ((e.status as string) === "PENDING_COLLEGE_CONTACT" || !e.status ? "New" : e.status) as "New" | "Contacted" | "Resolved",
  }));
}

export function saveEnquiries(enquiries: StoredEnquiry[]): void {
  writeJsonFile("dhls_enquiries.json", enquiries);
}

export function updateEnquiryStatus(
  enquiryId: string,
  status: "New" | "Contacted" | "Resolved",
  notes?: string
): StoredEnquiry | null {
  const list = getEnquiries();
  const index = list.findIndex((e) => e.enquiryId === enquiryId);
  if (index === -1) return null;

  list[index].status = status;
  if (notes !== undefined) {
    list[index].notes = notes;
  }
  saveEnquiries(list);
  return list[index];
}

// -------------------------------------------------------------
// 5. Website Appearance Settings
// -------------------------------------------------------------
export interface AppearanceSettings {
  themeMode: "light" | "dark";
  accentColor: string;
  showWaveform: boolean;
  showDisciplines: boolean;
  animationIntensity: "reduced" | "standard" | "enhanced";
  lastUpdated: string;
}

const DEFAULT_APPEARANCE: AppearanceSettings = {
  themeMode: "light",
  accentColor: "#2684FF",
  showWaveform: true,
  showDisciplines: true,
  animationIntensity: "standard",
  lastUpdated: new Date().toISOString(),
};

export function getAppearanceSettings(): AppearanceSettings {
  return readJsonFile<AppearanceSettings>("appearance.json", DEFAULT_APPEARANCE);
}

export function updateAppearanceSettings(settings: Partial<AppearanceSettings>): AppearanceSettings {
  const current = getAppearanceSettings();
  const updated: AppearanceSettings = {
    ...current,
    ...settings,
    lastUpdated: new Date().toISOString(),
  };
  writeJsonFile("appearance.json", updated);
  updateContentTimestamp();
  return updated;
}

// -------------------------------------------------------------
// 6. Admin User Credentials Store (PBKDF2 Hashed)
// -------------------------------------------------------------
export interface AdminUserRecord {
  username: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  lastLogin?: string;
}

// Default credentials initialized with PBKDF2 hash of "Admin@SRCollege2026"
export async function getAdminAccount(): Promise<AdminUserRecord> {
  const fallback = await hashPassword("Admin@SRCollege2026");
  const defaultAdmin: AdminUserRecord = {
    username: "admin",
    email: "srcollegeeducation@gmail.com",
    passwordHash: fallback.hash,
    passwordSalt: fallback.salt,
    lastLogin: undefined,
  };

  const stored = readJsonFile<AdminUserRecord | null>("admin_account.json", null);
  if (!stored) {
    writeJsonFile("admin_account.json", defaultAdmin);
    return defaultAdmin;
  }
  return stored;
}

export async function updateAdminAccount(updates: Partial<AdminUserRecord>): Promise<AdminUserRecord> {
  const current = await getAdminAccount();
  const updated = {
    ...current,
    ...updates,
  };
  writeJsonFile("admin_account.json", updated);
  return updated;
}

// -------------------------------------------------------------
// 7. Dashboard Aggregated Statistics
// -------------------------------------------------------------
export interface DashboardStats {
  totalEnquiries: number;
  newEnquiries: number;
  contactedEnquiries: number;
  resolvedEnquiries: number;
  totalSubjects: number;
  totalFAQs: number;
  lastContentUpdate: string;
}

export function getDashboardStats(): DashboardStats {
  const enquiries = getEnquiries();
  const curriculum = getCurriculum();
  const faqs = getFAQs();
  const content = getCourseContent();

  const totalSubjects = curriculum.reduce((acc, sem) => acc + sem.subjects.length, 0);

  return {
    totalEnquiries: enquiries.length,
    newEnquiries: enquiries.filter((e) => e.status === "New").length,
    contactedEnquiries: enquiries.filter((e) => e.status === "Contacted").length,
    resolvedEnquiries: enquiries.filter((e) => e.status === "Resolved").length,
    totalSubjects,
    totalFAQs: faqs.length,
    lastContentUpdate: content.lastUpdated,
  };
}

function updateContentTimestamp() {
  try {
    const current = getCourseContent();
    current.lastUpdated = new Date().toISOString();
    writeJsonFile("content.json", current);
  } catch {}
}
