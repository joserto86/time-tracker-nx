export interface DashboardState {
  timeNotes: TimeNote[];
  loading: boolean;
}

export interface ApiFilter {
  field: string;
  value: any;
  method: string; // '=' , 'like'
}

export interface TimeNote {
  id: number;
  glInstance: string;
  glId: number;
  glProjectId: number;
  glProject: string;
  glNamespace: string;
  glIssueId: number;
  glIssue: string;
  milestone?: string | null;
  body: string;
  author: string;
  secondsAdded: number;
  secondsSubtracted: number;
  secondsRemoved: boolean;
  createdAt: string;
  updatedAt: string;
  spentAt: string;
  glIssueIid: number;
  computed: number;
}

export interface LocalTimeNote {
  id: number;
  body: string;
  secondsAdded: number;
  secondsSubstracted: number;
  secondsRemoved: boolean;
  createdAt: string;
  updatedAt: string;
  spentAt: string;
  computed: number;
  author: string;
}

export interface LocalIssue {
  id: number;
  glInstance: string;
  glProjectId: number;
  glProject: string;
  glNamespace: string;
  milestone?: string | null;
  title: string;
  timeNotes: LocalTimeNote[];
}
