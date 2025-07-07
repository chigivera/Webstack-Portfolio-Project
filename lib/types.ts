// University and related types
export interface ProgramFocus {
  id: number;
  name: string;
  universityId: number;
}

export interface Scholarship {
  id: number;
  name: string;
  acceptanceRate: number | null;
  universityId: number;
  createdAt: string;
  updatedAt: string;
}

export interface University {
  id: number;
  name: string;
  location: string;
  acceptanceRate: number | null;
  applicationLink: string | null;
  priority: number | null;
  programFocus: ProgramFocus[];
  scholarships: Scholarship[];
  applications: Application[];
  createdAt: string;
  updatedAt: string;
}

// Application
export interface Application {
  id: number;
  universityId: number;
  profileId: number;
  status: string;
  applicationDate: string;
  notes: string | null;
  checklists: ChecklistTemplate[];
  university: University;
  profile: Profile;
  createdAt: string;
  updatedAt: string;
}

// Profile
export interface Profile {
  id: number;
  name: string;
  email: string;
  applications: Application[];
  createdAt: string;
  updatedAt: string;
}

// Checklist
export interface ChecklistItem {
  id: number;
  name: string;
  completed: boolean;
  checklistTemplateId: number;
  ChecklistTemplate: ChecklistTemplate;
  createdAt: string;
  updatedAt: string;
}

export interface ChecklistTemplate {
  id: number;
  name: string;
  applicationId: number | null;
  application: Application | null;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
} 