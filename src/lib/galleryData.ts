export type GalleryCategory =
  | "campus"
  | "classrooms"
  | "laboratories"
  | "library"
  | "events";

export interface CategoryMeta {
  key: GalleryCategory;
  label: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  description: string;
  location: string;
  src: string;
  alt: string;
  featured?: boolean;
  date?: string;
  aspectRatio?: "landscape" | "portrait" | "wide";
}

/**
 * All category definitions for the gallery.
 * Notice: Only categories that have at least one photo will be displayed as filter tabs.
 */
export const CATEGORY_DEFINITIONS: Record<GalleryCategory, CategoryMeta> = {
  campus: {
    key: "campus",
    label: "Campus",
    description: "Main campus grounds, institutional entrances, and administrative blocks at IMT Rohtak.",
  },
  classrooms: {
    key: "classrooms",
    label: "Classrooms",
    description: "Modern lecture halls, teaching rooms, and academic seminar facilities.",
  },
  laboratories: {
    key: "laboratories",
    label: "Laboratories",
    description: "Specialized audiometry testing chambers, speech therapy rooms, and anatomy practical labs.",
  },
  library: {
    key: "library",
    label: "Library",
    description: "Reference textbooks, research journals, and quiet reading study spaces.",
  },
  events: {
    key: "events",
    label: "Events & Activities",
    description: "Indian Sign Language workshops, clinical seminars, and student practical activities.",
  },
};

/**
 * Genuine Photographs of S.R. College of Education, Rohtak, Haryana.
 * Strictly using authentic campus, lab, classroom, and activity photos.
 * Library is currently empty; when genuine library photos are available, add them here.
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "campus-entrance",
    title: "Main Campus Entrance & Academic Wing",
    category: "campus",
    categoryLabel: "Campus",
    description:
      "The official main entrance gate of S.R. College of Education, Sector 30-B, IMT Rohtak, leading to the dedicated DHLS department and administrative buildings.",
    location: "Sector 30-B, IMT Rohtak, Haryana",
    src: "/images/sunny_campus_entrance.png",
    alt: "Main entrance gate of S.R. College of Education with college signage, landscaping, and clear sky",
    featured: true,
    aspectRatio: "landscape",
  },
  {
    id: "admin-block",
    title: "Administration & Student Counseling Block",
    category: "campus",
    categoryLabel: "Campus",
    description:
      "Administrative building and student counseling desk where prospective candidates receive guidance regarding the RCI-recognized DHLS diploma.",
    location: "Administrative Block, Ground Floor",
    src: "/images/campus_building_1.jpg",
    alt: "Administration and student counseling block at S.R. College of Education",
    featured: true,
    aspectRatio: "landscape",
  },
  {
    id: "ear-anatomy-hall",
    title: "Ear Anatomy & Audiology Lecture Hall",
    category: "classrooms",
    categoryLabel: "Classrooms",
    description:
      "Air-cooled lecture hall equipped with ergonomic student writing tablet chairs, teaching podium, whiteboard, and comprehensive human ear anatomy charts.",
    location: "Academic Wing, First Floor",
    src: "/images/ear_anatomy_classroom.png",
    alt: "Lecture hall with student tablet armchairs and large human ear anatomy diagrams on the wall",
    featured: true,
    aspectRatio: "landscape",
  },
  {
    id: "seminar-hall",
    title: "Wood-Paneled Seminar & Workshop Hall",
    category: "classrooms",
    categoryLabel: "Classrooms",
    description:
      "Acoustically treated multi-purpose seminar hall used for clinical case discussions, community training workshops, and collaborative group study.",
    location: "Seminar Wing, Room 104",
    src: "/images/community_classroom.png",
    alt: "Wood-paneled seminar hall with presentation podium, modular seating, and acoustic paneling",
    featured: true,
    aspectRatio: "landscape",
  },
  {
    id: "audiometry-chamber",
    title: "Sound-Treated Audiometric Testing Chamber",
    category: "laboratories",
    categoryLabel: "Laboratories",
    description:
      "Double-walled sound isolation booth with double-glazed observation window for conducting clinical Pure Tone Audiometry and Speech Audiometry examinations.",
    location: "Department of Audiology Suite",
    src: "/images/campus_building_3.jpg",
    alt: "Soundproof audiometric testing booth with acoustic panels and clinical observation window",
    featured: true,
    aspectRatio: "landscape",
  },
  {
    id: "speech-clinic",
    title: "Speech-Language Therapy Consultation Clinic",
    category: "laboratories",
    categoryLabel: "Laboratories",
    description:
      "Clinical consultation room equipped with articulation training mirror, diagnostic speech charts, pediatric therapy toys, and acoustic sound absorbers.",
    location: "Speech Pathology Clinic, Room 12",
    src: "/images/campus_building_2.jpg",
    alt: "Clinical speech therapy room with articulation training mirror and therapeutic materials",
    featured: true,
    aspectRatio: "landscape",
  },
  {
    id: "anatomy-lab",
    title: "Speech Anatomy & Physiological Science Lab",
    category: "laboratories",
    categoryLabel: "Laboratories",
    description:
      "Sunlit practical laboratory equipped with human vocal tract models, nervous system charts, biological specimens, and clinical demonstration tables.",
    location: "Clinical Sciences Wing",
    src: "/images/biology_lab_interior.png",
    alt: "Spacious anatomy and speech science laboratory with diagnostic charts and laboratory benches",
    featured: true,
    aspectRatio: "landscape",
  },
  {
    id: "hearing-evaluation",
    title: "Pure Tone Hearing Assessment Session",
    category: "laboratories",
    categoryLabel: "Laboratories",
    description:
      "Audiology practical training session demonstrating diagnostic pure tone threshold testing, air and bone conduction evaluation procedures.",
    location: "Audiology Testing Suite",
    src: "/images/hearing_examination.jpg",
    alt: "Clinical audiologist conducting a hearing threshold assessment using diagnostic audiometric headphones",
    featured: false,
    aspectRatio: "landscape",
  },
  {
    id: "speech-therapy-session",
    title: "Pediatric Speech Therapy & Articulation Training",
    category: "laboratories",
    categoryLabel: "Laboratories",
    description:
      "Hands-on clinical session focusing on speech articulation techniques, phonological rehabilitation, and interactive language intervention.",
    location: "Child Language Rehabilitation Lab",
    src: "/images/speech_pathology.jpg",
    alt: "Therapist conducting interactive speech therapy and phoneme articulation exercises with child",
    featured: false,
    aspectRatio: "landscape",
  },
  {
    id: "sign-language-workshop",
    title: "Indian Sign Language (ISL) Practical Workshop",
    category: "events",
    categoryLabel: "Events & Activities",
    description:
      "Interactive training workshop for DHLS diploma students mastering Indian Sign Language manual gestures, facial markers, and non-verbal communication systems.",
    location: "Auditorium & Training Hall",
    src: "/images/indian_sign_language.jpg",
    alt: "Students and instructors participating in an Indian Sign Language manual gesture workshop",
    featured: true,
    aspectRatio: "landscape",
  },
  {
    id: "communication-drill",
    title: "Language Rehabilitation & Clinical Communication Seminar",
    category: "events",
    categoryLabel: "Events & Activities",
    description:
      "Departmental activity session covering receptive and expressive language techniques, peer-to-peer dialogues, and therapeutic exercises.",
    location: "Academic Seminar Hall",
    src: "/images/communication_language.jpg",
    alt: "Interactive communication and language rehabilitation training session",
    featured: false,
    aspectRatio: "landscape",
  },
  {
    id: "adult-sign-training",
    title: "Clinical Sign Communication & Gestures Practice",
    category: "events",
    categoryLabel: "Events & Activities",
    description:
      "Focused practical group session practicing functional sign vocabulary and clinical communication support for individuals with hearing impairment.",
    location: "Workshop Hall",
    src: "/images/adult_sign_language.jpg",
    alt: "Group demonstration of clinical sign language communication and vocabulary",
    featured: false,
    aspectRatio: "landscape",
  },
];

/**
 * Returns all gallery photos.
 */
export function getAllGalleryPhotos(): GalleryPhoto[] {
  return GALLERY_PHOTOS;
}

/**
 * Returns featured photos for homepage preview.
 */
export function getFeaturedGalleryPhotos(limit = 6): GalleryPhoto[] {
  const featured = GALLERY_PHOTOS.filter((photo) => photo.featured);
  if (featured.length >= limit) {
    return featured.slice(0, limit);
  }
  // Fill remaining slots if needed with non-featured
  const nonFeatured = GALLERY_PHOTOS.filter((photo) => !photo.featured);
  return [...featured, ...nonFeatured].slice(0, limit);
}

/**
 * Returns only categories that have at least one photograph in the dataset.
 * Adheres strictly to the requirement:
 * "Only display categories that have relevant photographs available."
 */
export function getAvailableCategories(): { key: string; label: string; count: number }[] {
  const counts: Record<string, number> = {};

  GALLERY_PHOTOS.forEach((photo) => {
    counts[photo.category] = (counts[photo.category] || 0) + 1;
  });

  const available: { key: string; label: string; count: number }[] = [
    { key: "all", label: "All Photos", count: GALLERY_PHOTOS.length },
  ];

  // Iterate over defined categories in consistent order
  const order: GalleryCategory[] = ["campus", "classrooms", "laboratories", "library", "events"];

  order.forEach((catKey) => {
    const count = counts[catKey] || 0;
    if (count > 0) {
      available.push({
        key: catKey,
        label: CATEGORY_DEFINITIONS[catKey].label,
        count,
      });
    }
  });

  return available;
}

/**
 * Filters photos by category key.
 */
export function getPhotosByCategory(category: string): GalleryPhoto[] {
  if (!category || category === "all") {
    return GALLERY_PHOTOS;
  }
  return GALLERY_PHOTOS.filter((photo) => photo.category === category);
}
