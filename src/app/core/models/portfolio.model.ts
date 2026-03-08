export type Locale = 'es' | 'en';
export type Translation = Record<Locale, string>;

export interface Profile {
  name: string;
  role: Translation;
  location: Translation;
  intro: Translation;
  summary: Translation;
  linkedinUrl: string;
  email: string;
  phone: string;
  photoUrl: string;
  yearsOfExperience: number;
}

export interface Skill {
  name: string;
  level: number;
  visible: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: Translation;
  period: string;
  summary: Translation;
  visible: boolean;
}

export interface PortfolioProject {
  id: string;
  title: Translation;
  description: Translation;
  stack: string[];
  link?: string;
  visible: boolean;
}

export interface EducationItem {
  id: string;
  title: Translation;
  institution: Translation;
  year: string;
  visible: boolean;
}

export interface CertificationItem {
  id: string;
  title: Translation;
  issuer: Translation;
  year: string;
  visible: boolean;
}

export interface SectionVisibility {
  hero: boolean;
  experience: boolean;
  skills: boolean;
  education: boolean;
  certifications: boolean;
  portfolio: boolean;
  contact: boolean;
}

export interface PortfolioData {
  profile: Profile;
  sectionVisibility: SectionVisibility;
  skills: Skill[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  portfolioProjects: PortfolioProject[];
}
